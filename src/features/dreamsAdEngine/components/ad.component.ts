import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
import adCss from "../styles/ad.styles.css?raw";
import { DreamsAdMapping, DreamsAdTargeting } from "../types/interfaces";
import { DreamsAdConfig } from "../../config";
import { DreamsTargetingService } from "../../targeting";
import { ViewabilityService } from "../../viewability";
import { RefreshManager } from "../../refresh";
import "../../skeleton/skeleton.component";

let adStylesInjected = false;

function injectAdStyles() {
  if (adStylesInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = adCss;
  document.head.appendChild(el);
  adStylesInjected = true;
}

@customElement("dreams-ad-engine")
export class DreamsAdComponent extends LitElement {
  createRenderRoot() {
    return this;
  }

  static initialized = false;
  static old_url = "";
  static initialized_aps = false;
  static navigationListenersAttached = false;
  static outOfPageRegistered = false;

  // Instance references for cleanup
  private adSlot: any = null;
  private slotRenderHandler: ((event: any) => void) | null = null;
  private impressionViewableHandler: ((event: any) => void) | null = null;
  private slotVisibilityHandler: ((event: any) => void) | null = null;
  private pendingBidsTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastVisibilityPct = -1;

  /**
   * Handle SPA navigation - destroys all slots and clears targeting cache
   */
  private static _handleNavigation = () => {
    const currentUrl = location.href;
    if (DreamsAdComponent.old_url === currentUrl) return;

    // Destroy all existing slots and start new pageview
    if (window.googletag?.destroySlots && window.dreamsAllSlots?.length > 0) {
      window.googletag.destroySlots(window.dreamsAllSlots);
      window.googletag.pubads().updateCorrelator();
    }

    DreamsAdComponent.old_url = currentUrl;
    window.dreamsAllSlots = [];
    window.dreamsSlotsToUpdate = [];

    // Clear targeting cache for new page context
    DreamsTargetingService.clearCache();
  };

  /**
   * Set up global navigation listeners for SPA support
   */
  private static _setupNavigationListeners() {
    if (DreamsAdComponent.navigationListenersAttached) return;
    if (typeof window === "undefined") return;

    // Browser back/forward navigation
    window.addEventListener("popstate", DreamsAdComponent._handleNavigation);

    // Hash-based routing
    window.addEventListener("hashchange", DreamsAdComponent._handleNavigation);

    // Intercept History API for client-side routing (Next.js, React Router, etc.)
    const originalPushState = history.pushState.bind(history);
    const originalReplaceState = history.replaceState.bind(history);

    history.pushState = (...args) => {
      originalPushState(...args);
      DreamsAdComponent._handleNavigation();
    };

    history.replaceState = (...args) => {
      originalReplaceState(...args);
      DreamsAdComponent._handleNavigation();
    };

    DreamsAdComponent.navigationListenersAttached = true;
  }

  @property({ type: String }) networkId = "";
  @property({ type: String }) adUnit = "";
  @property({ type: String }) divId = "";
  @property({ type: String }) slot = "";
  @property({ type: Array }) mapping: DreamsAdMapping[] = [];
  @property({ type: Array }) sizing: number[][] = [];
  @property({ type: Array }) targeting: DreamsAdTargeting[] = [];
  @property({ type: Boolean, reflect: true }) autoTargeting = false;
  @state() private resolvedTargeting: DreamsAdTargeting[] = [];
  @property({ type: Boolean, reflect: true }) refresh = false;
  @property({ type: Boolean, reflect: true }) enableTitle = false;
  @property({ type: Boolean, reflect: true }) apstag = false;
  @property({ type: String }) pubId = "";
  @property({ type: Number }) bidTimeout = 2e3;
  @property({ type: String }) title = "Publicidad";
  @property({ type: Boolean, reflect: true }) trackViewability = false;
  @property({ type: Boolean, reflect: true }) showSkeleton = false;

  // Controls when Lit renders content (empty until ready — fixes React hydration #418)
  @state() private ready = false;

  connectedCallback() {
    super.connectedCallback();
    injectAdStyles();
    if (!DreamsAdComponent.initialized) {
      this.#initGoogleTag();
      DreamsAdComponent.initialized = true;
      DreamsAdComponent.old_url = location.href;
    } else {
      DreamsAdComponent._handleNavigation();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Stop viewability tracking
    if (this.trackViewability && this.divId) {
      ViewabilityService.untrack(this.divId);
    }

    // Clear pending APS timeout
    if (this.pendingBidsTimeout) {
      clearTimeout(this.pendingBidsTimeout);
      this.pendingBidsTimeout = null;
    }

    // Remove GPT event listeners
    if (window.googletag?.pubads) {
      const pubads = window.googletag.pubads();
      if (this.slotRenderHandler) {
        pubads.removeEventListener("slotRenderEnded", this.slotRenderHandler);
        this.slotRenderHandler = null;
      }
      if (this.impressionViewableHandler) {
        pubads.removeEventListener(
          "impressionViewable",
          this.impressionViewableHandler,
        );
        this.impressionViewableHandler = null;
      }
      if (this.slotVisibilityHandler) {
        pubads.removeEventListener(
          "slotVisibilityChanged",
          this.slotVisibilityHandler,
        );
        this.slotVisibilityHandler = null;
      }
    }

    // Destroy this component's slot and remove from global arrays
    if (this.adSlot) {
      if (window.dreamsAllSlots) {
        const allIndex = window.dreamsAllSlots.indexOf(this.adSlot);
        if (allIndex > -1) window.dreamsAllSlots.splice(allIndex, 1);
      }
      if (window.dreamsSlotsToUpdate) {
        const updateIndex = window.dreamsSlotsToUpdate.indexOf(this.adSlot);
        if (updateIndex > -1) window.dreamsSlotsToUpdate.splice(updateIndex, 1);
      }
      if (window.googletag?.destroySlots) {
        window.googletag.destroySlots([this.adSlot]);
      }
      this.adSlot = null;
    }
  }

  #initGoogleTag() {
    window.googletag = window.googletag || { cmd: [] };

    const enableGpt = () => {
      window.googletag.cmd.push(() => {
        window.dreamsAllSlots = window.dreamsAllSlots || [];
        window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [];

        const alreadyEnabled = window.googletag.pubadsReady === true;

        if (!alreadyEnabled) {
          window.googletag.pubads().disableInitialLoad();

          if (DreamsAdConfig.isInitialized()) {
            const setConfigPayload: Record<string, unknown> = {};

            const lazyLoad = DreamsAdConfig.getLazyLoad();
            if (lazyLoad) {
              setConfigPayload.lazyLoad = lazyLoad;
            }

            if (DreamsAdConfig.getThreadYield()) {
              setConfigPayload.threadYield = "ENABLED_ALL_SLOTS";
            }

            if (Object.keys(setConfigPayload).length > 0) {
              if (typeof window.googletag.setConfig === "function") {
                window.googletag.setConfig(setConfigPayload);
              } else if (lazyLoad) {
                window.googletag.pubads().enableLazyLoad(lazyLoad);
              }
            }

            if (DreamsAdConfig.getCentering()) {
              window.googletag.pubads().setCentering(true);
            }

            const privacy = DreamsAdConfig.getPrivacy();
            if (privacy) {
              window.googletag
                .pubads()
                .setPrivacySettings(privacy as Record<string, boolean>);
            }
          }

          window.googletag.enableServices();
        }

        // Register out-of-page slots after services are enabled
        if (DreamsAdConfig.isInitialized()) {
          this.#registerOutOfPageSlots();
        }
      });
    };

    if (DreamsAdConfig.isInitialized()) {
      enableGpt();
    } else {
      DreamsAdConfig.whenReady()
        .then(enableGpt)
        .catch(() => enableGpt());
    }

    DreamsAdComponent._setupNavigationListeners();
  }

  async firstUpdated() {
    await this.#resolveConfiguration();
    await this.#resolveTargeting();

    this.divId = `div-gpt-ad-${this.adUnit}-${crypto.randomUUID()}`;

    // Initialize APS if configured and available
    if (this.apstag && this.pubId && !DreamsAdComponent.initialized_aps) {
      if (typeof window.apstag?.init === "function") {
        try {
          window.apstag.init({
            pubID: this.pubId,
            adServer: "googletag",
            bidTimeout: this.bidTimeout,
          });
          DreamsAdComponent.initialized_aps = true;
        } catch {
          this.apstag = false;
        }
      } else {
        this.apstag = false;
      }
    }

    // Signal ready — triggers first real render (empty before this for SSR compat)
    this.ready = true;
    // Wait for Lit to flush the ready render so dae-serving is in the DOM
    await this.updateComplete;
    this.#renderSlot();
  }

  async #resolveConfiguration() {
    if (this.slot === "interstitial") {
      console.warn(
        '[DreamsAdEngine] <dreams-ad-engine slot="interstitial"> is deprecated. ' +
          "Configure interstitials via DreamsAdConfig.init({ interstitial: { enabled: true } }).",
      );
      return;
    }

    if (this.slot) {
      await DreamsAdConfig.whenReady();
      const slotConfig = DreamsAdConfig.getSlot(this.slot);
      if (slotConfig) {
        if (!this.networkId) this.networkId = DreamsAdConfig.getNetworkId();
        if (!this.adUnit) this.adUnit = DreamsAdConfig.buildAdUnit(this.slot);
        if (!this.mapping || this.mapping.length === 0)
          this.mapping = slotConfig.mapping;
        if (!this.sizing || this.sizing.length === 0)
          this.sizing = slotConfig.sizing;
        if (!this.pubId) this.pubId = DreamsAdConfig.getPubId() || "";
        if (this.pubId) this.apstag = true;
      }
    }

    // Parse JSON attributes with error handling
    if (typeof this.mapping === "string") {
      try {
        this.mapping = JSON.parse(this.mapping);
      } catch {
        this.mapping = [];
      }
    }
    if (typeof this.sizing === "string") {
      try {
        this.sizing = JSON.parse(this.sizing);
      } catch {
        this.sizing = [];
      }
    }
    if (this.targeting && typeof this.targeting === "string") {
      try {
        this.targeting = JSON.parse(this.targeting);
      } catch {
        this.targeting = [];
      }
    }
  }

  async #resolveTargeting() {
    if (this.autoTargeting) {
      const result = await DreamsTargetingService.getTargeting();
      this.resolvedTargeting = result.targeting;
    } else if (this.targeting && this.targeting.length > 0) {
      this.resolvedTargeting = this.targeting;
    }
  }

  #registerOutOfPageSlots() {
    if (DreamsAdComponent.outOfPageRegistered) return;
    DreamsAdComponent.outOfPageRegistered = true;

    const networkId = DreamsAdConfig.getNetworkId();
    const sitePrefix = DreamsAdConfig.getSitePrefix();
    const adUnitBase = `/${networkId}/${sitePrefix}-is-i`;

    const interstitial = DreamsAdConfig.getInterstitial();
    if (interstitial?.enabled) {
      const slot = window.googletag.defineOutOfPageSlot(
        adUnitBase,
        window.googletag.enums.OutOfPageFormat.INTERSTITIAL,
      );
      if (slot) {
        slot.addService(window.googletag.pubads());
        window.dreamsAllSlots.push(slot);
      }
    }

    const anchor = DreamsAdConfig.getAnchor();
    if (anchor?.enabled) {
      const anchorUnit = `/${networkId}/${sitePrefix}-is-a`;

      if (anchor.position === "top" || anchor.position === "both") {
        const slot = window.googletag.defineOutOfPageSlot(
          anchorUnit,
          window.googletag.enums.OutOfPageFormat.TOP_ANCHOR,
        );
        if (slot) {
          slot.addService(window.googletag.pubads());
          window.dreamsAllSlots.push(slot);
        }
      }

      if (anchor.position === "bottom" || anchor.position === "both") {
        const slot = window.googletag.defineOutOfPageSlot(
          anchorUnit,
          window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR,
        );
        if (slot) {
          slot.addService(window.googletag.pubads());
          window.dreamsAllSlots.push(slot);
        }
      }
    }
  }

  #computeReserveHeight(): number {
    if (!this.mapping || this.mapping.length === 0) return 2;

    const vw = typeof window !== "undefined" ? window.innerWidth : 0;
    let matchedEntry: DreamsAdMapping | null = null;

    for (const entry of this.mapping) {
      if (entry.viewport[0] <= vw) {
        if (!matchedEntry || entry.viewport[0] > matchedEntry.viewport[0]) {
          matchedEntry = entry;
        }
      }
    }

    if (!matchedEntry) return 2;

    let maxH = 0;
    for (const [, h] of matchedEntry.sizing) {
      if (h > 1) maxH = Math.max(maxH, h);
    }

    return maxH || 2;
  }

  #renderSlot() {
    const SLOT = `/${this.networkId}/${this.adUnit}`;
    const CONTAINER_ID = this.divId;
    const adContainer = document.createElement("div");
    adContainer.id = CONTAINER_ID;
    adContainer.setAttribute("data-ad", this.divId);
    adContainer.setAttribute("role", "complementary");
    adContainer.setAttribute("aria-label", "Advertisement");
    adContainer.classList.add("dae-slot");
    adContainer.style.cssText = "width:100%";

    // Apply CLS reserve to dae-serving wrapper
    const reserveHeight = this.#computeReserveHeight();
    const serving = this.querySelector(".dae-serving");
    if (serving instanceof HTMLElement) {
      serving.style.minHeight = `${reserveHeight}px`;
      serving.appendChild(adContainer);
    } else {
      this.appendChild(adContainer);
    }

    // Use setTimeout(0) instead of rAF — rAF never fires in background tabs,
    // which silently prevents slot registration when the page loads unfocused.
    setTimeout(() => {
      try {
        if (!window.googletag?.cmd?.push) {
          console.error(
            "[DreamsAdEngine] googletag.cmd not available for",
            this.adUnit,
          );
          return;
        }
        window.googletag.cmd.push(() => {
          if (!document.getElementById(CONTAINER_ID)) {
            console.warn(
              `[DreamsAdEngine] Slot div ${CONTAINER_ID} not in DOM, aborting`,
            );
            return;
          }

          const defineAdSlot = window.googletag
            .defineSlot(SLOT, this.sizing, CONTAINER_ID)
            .addService(window.googletag.pubads());

          this.resolvedTargeting.forEach((target: DreamsAdTargeting) => {
            defineAdSlot.setTargeting(target.key, target.value);
          });

          // slotRenderEnded — resize, collapse, dispatch ad:rendered
          this.slotRenderHandler = (event: any) => {
            if (event.slot.getSlotElementId() !== CONTAINER_ID) return;

            // Hide loader/skeleton imperatively — no Lit re-render needed
            const loader = this.querySelector(".dae-loader");
            if (loader instanceof HTMLElement) loader.style.display = "none";
            const skeleton = this.querySelector("dreams-ad-skeleton");
            if (skeleton instanceof HTMLElement)
              skeleton.style.display = "none";

            const container = this.querySelector(`#${CONTAINER_ID}`);
            const isTrackingPixel =
              event.size?.length === 2 &&
              event.size[0] <= 1 &&
              event.size[1] <= 1;
            if (event.isEmpty || isTrackingPixel) {
              if (container instanceof HTMLElement)
                container.style.minHeight = "0";
              const s = this.querySelector(".dae-serving");
              if (s instanceof HTMLElement) s.style.minHeight = "0";
            } else if (container instanceof HTMLElement) {
              // Use event.size as single source of truth
              if (event.size?.length === 2) {
                const [w, h] = event.size;
                if (w > 1 && h > 1) {
                  container.style.minHeight = `${h}px`;
                  const iframe =
                    container.querySelector<HTMLIFrameElement>("iframe");
                  if (iframe) {
                    iframe.style.width = `${w}px`;
                    iframe.style.height = `${h}px`;
                  }
                }
              }

              // ResizeObserver fallback for expandable creatives
              if (typeof ResizeObserver !== "undefined") {
                requestAnimationFrame(() => {
                  const iframe =
                    container.querySelector<HTMLIFrameElement>("iframe");
                  if (iframe) {
                    const observer = new ResizeObserver((entries) => {
                      for (const entry of entries) {
                        const { width, height } = entry.contentRect;
                        if (width > 1 && height > 1) {
                          container.style.minHeight = `${height}px`;
                          observer.disconnect();
                        }
                      }
                    });
                    observer.observe(iframe);
                    setTimeout(() => observer.disconnect(), 10000);
                  }
                });
              }
            }

            // Dispatch rich ad:rendered event
            this.dispatchEvent(
              new CustomEvent("ad:rendered", {
                bubbles: true,
                detail: {
                  isEmpty: event.isEmpty,
                  size: event.size ?? null,
                  advertiserId: event.advertiserId ?? null,
                  creativeId: event.creativeId ?? null,
                  lineItemId: event.lineItemId ?? null,
                  isBackfill: event.isBackfill ?? false,
                  slotId: CONTAINER_ID,
                  adUnit: SLOT,
                },
              }),
            );

            // Legacy viewability tracking (deprecated path)
            if (this.trackViewability && !event.isEmpty) {
              const adElement = this.querySelector(`#${CONTAINER_ID}`);
              if (adElement instanceof HTMLElement) {
                ViewabilityService.track(
                  adElement,
                  CONTAINER_ID,
                  this.slot || this.adUnit,
                );
              }
            }
          };
          window.googletag
            .pubads()
            .addEventListener("slotRenderEnded", this.slotRenderHandler);

          // impressionViewable — GPT MRC-accredited viewability
          this.impressionViewableHandler = (event: any) => {
            if (event.slot.getSlotElementId() !== CONTAINER_ID) return;

            RefreshManager.markViewable(CONTAINER_ID);

            this.dispatchEvent(
              new CustomEvent("ad:viewable", {
                bubbles: true,
                detail: { slotId: CONTAINER_ID, adUnit: SLOT },
              }),
            );
          };
          window.googletag
            .pubads()
            .addEventListener(
              "impressionViewable",
              this.impressionViewableHandler,
            );

          // slotVisibilityChanged — dispatch only on 25% threshold crossings
          this.slotVisibilityHandler = (event: any) => {
            if (event.slot.getSlotElementId() !== CONTAINER_ID) return;

            const pct = event.inViewPercentage;
            const bucket = Math.floor(pct / 25) * 25;
            const lastBucket = Math.floor(this.lastVisibilityPct / 25) * 25;
            if (bucket === lastBucket && this.lastVisibilityPct >= 0) return;
            this.lastVisibilityPct = pct;

            this.dispatchEvent(
              new CustomEvent("ad:visibility", {
                bubbles: true,
                detail: {
                  slotId: CONTAINER_ID,
                  adUnit: SLOT,
                  inViewPercentage: pct,
                },
              }),
            );
          };
          window.googletag
            .pubads()
            .addEventListener(
              "slotVisibilityChanged",
              this.slotVisibilityHandler,
            );

          // Define responsive size mapping
          const AD_MAPPING = window.googletag.sizeMapping();
          this.mapping.forEach((map: DreamsAdMapping) => {
            AD_MAPPING.addSize(map.viewport, map.sizing);
          });
          defineAdSlot.defineSizeMapping(AD_MAPPING.build());

          // Store slot reference for cleanup
          this.adSlot = defineAdSlot;

          if (this.refresh) {
            window.dreamsSlotsToUpdate.push(defineAdSlot);
          }
          window.dreamsAllSlots.push(defineAdSlot);

          // Register slot — with disableInitialLoad(), this only registers without fetching
          window.googletag.display(CONTAINER_ID);

          // Use APS flow only if both apstag is enabled AND pubId is set
          const useAps = this.apstag && this.pubId;

          if (!useAps) {
            window.googletag.pubads().refresh([defineAdSlot]);
          } else {
            if (typeof window.apstag?.fetchBids !== "function") {
              window.googletag.pubads().refresh([defineAdSlot]);
              return;
            }

            let bidsReceived = false;
            const bidTimeout = this.bidTimeout || 2000;

            this.pendingBidsTimeout = setTimeout(() => {
              if (!bidsReceived) {
                bidsReceived = true;
                window.googletag.cmd.push(() => {
                  window.googletag.pubads().refresh([defineAdSlot]);
                });
              }
            }, bidTimeout + 500);

            window.apstag.fetchBids(
              {
                slots: [
                  {
                    slotID: CONTAINER_ID,
                    slotName: SLOT,
                    sizes: this.sizing,
                  },
                ],
              },
              () => {
                if (bidsReceived) return;
                bidsReceived = true;
                clearTimeout(this.pendingBidsTimeout!);

                window.googletag.cmd.push(() => {
                  window.apstag.setDisplayBids();
                  window.googletag.pubads().refresh([defineAdSlot]);
                });
              },
            );
          }
        });
      } catch (error) {
        console.error(
          `[DreamsAdEngine] Slot registration failed: ${this.adUnit}`,
          error,
        );
      }
    }, 0); // end setTimeout
  }

  protected render(): TemplateResult {
    // Render empty until ready — prevents React hydration mismatch (#418)
    if (!this.ready) return html``;

    return html`
			<div class="dae-container">
				${
          this.enableTitle
            ? html`<span class="dae-label">${this.title}</span>`
            : ""
        }
				${
          this.showSkeleton
            ? html`<dreams-ad-skeleton
              width="${this.#getSkeletonWidth()}"
              height="${this.#getSkeletonHeight()}"
            ></dreams-ad-skeleton>`
            : html`<div class="dae-loader" data-ad-loader="${this.divId}"></div>`
        }
				<div
					class="dae-serving"
					data-post-id="${this.divId}"
					data-tag="${this.adUnit}"
					data-refresh="${this.refresh ? "true" : "false"}"
				>
				</div>
			</div>
		`;
  }

  #getSkeletonWidth(): number {
    const vw = typeof window !== "undefined" ? window.innerWidth : 320;
    if (vw >= 1280) return 970;
    if (vw >= 728) return 728;
    return 320;
  }

  #getSkeletonHeight(): number {
    return this.#computeReserveHeight();
  }
}
