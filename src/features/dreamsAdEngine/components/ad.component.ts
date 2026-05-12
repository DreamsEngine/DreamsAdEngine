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
  static initialized_prebid = false;
  static configApplied = false;
  static navigationListenersAttached = false;
  static outOfPageRegistered = false;

  // Instance references for cleanup
  private gptSlot: any = null;
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
  @property({ type: String, attribute: 'ad-slot' }) adSlot = "";
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
  @property({ type: Boolean, reflect: true }) prebid = false;
  @property({ type: String }) prebidConfig = "";
  @property({ type: Array }) bidders: Array<{ bidder: string; params: Record<string, unknown> }> = [];
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
    if (this.gptSlot) {
      if (window.dreamsAllSlots) {
        const allIndex = window.dreamsAllSlots.indexOf(this.gptSlot);
        if (allIndex > -1) window.dreamsAllSlots.splice(allIndex, 1);
      }
      if (window.dreamsSlotsToUpdate) {
        const updateIndex = window.dreamsSlotsToUpdate.indexOf(this.gptSlot);
        if (updateIndex > -1) window.dreamsSlotsToUpdate.splice(updateIndex, 1);
      }
      if (window.googletag?.destroySlots) {
        window.googletag.destroySlots([this.gptSlot]);
      }
      this.gptSlot = null;
    }
  }

  #initGoogleTag() {
    window.googletag = window.googletag || { cmd: [] };

    // Phase A: enable GPT services. ALWAYS runs synchronously so the
    // dreamsAllSlots/dreamsSlotsToUpdate globals and pubads service exist
    // before any slot push from #renderSlot(). Idempotent via pubadsReady.
    // disableInitialLoad() runs only when lazyLoad is not configured;
    // if DreamsAdConfig isn't initialized yet we default to the safer
    // "no lazy load" path (matches pre-config-provider behavior).
    const enableGptServices = () => {
      window.googletag.cmd.push(() => {
        window.dreamsAllSlots = window.dreamsAllSlots || [];
        window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [];

        if (window.googletag.pubadsReady === true) return;

        const lazyLoad = DreamsAdConfig.isInitialized()
          ? DreamsAdConfig.getLazyLoad()
          : null;

        if (!lazyLoad) {
          window.googletag.pubads().disableInitialLoad();
        }

        window.googletag.enableServices();
      });
    };

    // Phase B: apply config-dependent settings. Safe to call after
    // enableServices — setConfig/setCentering/setPrivacySettings are
    // documented as runtime-mutable. Guarded by configApplied so it
    // only fires once when DreamsAdConfig is (or eventually becomes)
    // initialized.
    const applyConfigSettings = () => {
      if (!DreamsAdConfig.isInitialized()) return;
      if (DreamsAdComponent.configApplied) return;
      DreamsAdComponent.configApplied = true;

      window.googletag.cmd.push(() => {
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

        this.#registerOutOfPageSlots();
      });
    };

    enableGptServices();

    if (DreamsAdConfig.isInitialized()) {
      applyConfigSettings();
    } else {
      DreamsAdConfig.whenReady()
        .then(applyConfigSettings)
        .catch(() => {});
    }

    DreamsAdComponent._setupNavigationListeners();
  }

  async firstUpdated() {
    await this.#resolveConfiguration();
    await this.#resolveTargeting();

    const uid = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    this.divId = `div-gpt-ad-${this.adUnit}-${uid}`;

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

    // Initialize Prebid.js if configured and available
    if (this.prebid && !DreamsAdComponent.initialized_prebid) {
      if (typeof window.pbjs?.que?.push === "function") {
        try {
          window.pbjs.que.push(() => {
            if (this.prebidConfig) {
              const cfg =
                typeof this.prebidConfig === "string"
                  ? JSON.parse(this.prebidConfig)
                  : this.prebidConfig;
              window.pbjs.setConfig(cfg);
            }
            // bidWon → dataLayer for attribution. Registered once.
            window.pbjs.onEvent("bidWon", (bid: any) => {
              (window.dataLayer = window.dataLayer || []).push({
                event: "prebid_bid_won",
                bidder: bid.bidderCode,
                cpm: bid.cpm,
                currency: bid.currency,
                ad_unit: bid.adUnitCode,
                size: bid.size,
              });
            });
          });
          DreamsAdComponent.initialized_prebid = true;
        } catch {
          this.prebid = false;
        }
      } else {
        this.prebid = false;
      }
    }

    // Signal ready — triggers first real render (empty before this for SSR compat)
    this.ready = true;
    // Wait for Lit to flush the ready render so dae-serving is in the DOM
    await this.updateComplete;
    this.#renderSlot();
  }

  async #resolveConfiguration() {
    if (this.adSlot === "interstitial") {
      console.warn(
        '[DreamsAdEngine] <dreams-ad-engine ad-slot="interstitial"> is deprecated. ' +
          "Configure interstitials via DreamsAdConfig.init({ interstitial: { enabled: true } }).",
      );
      return;
    }

    if (this.adSlot) {
      await DreamsAdConfig.whenReady();
      const slotConfig = DreamsAdConfig.getSlot(this.adSlot);
      if (slotConfig) {
        if (!this.networkId) this.networkId = DreamsAdConfig.getNetworkId();
        if (!this.adUnit) this.adUnit = DreamsAdConfig.buildAdUnit(this.adSlot);
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
    if (this.bidders && typeof this.bidders === "string") {
      try {
        this.bidders = JSON.parse(this.bidders);
      } catch {
        this.bidders = [];
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

          // GAM's setTargeting(key, value) was deprecated in 2025. The
          // replacement is slot.setConfig({ targeting: { ... } }), which
          // accepts the full targeting map in one call.
          if (this.resolvedTargeting.length > 0) {
            const targeting: Record<string, string> = {};
            for (const t of this.resolvedTargeting as DreamsAdTargeting[]) {
              targeting[t.key] = t.value;
            }
            defineAdSlot.setConfig({ targeting });
          }

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
                  this.adSlot || this.adUnit,
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
          this.gptSlot = defineAdSlot;

          if (this.refresh) {
            window.dreamsSlotsToUpdate.push(defineAdSlot);
          }
          window.dreamsAllSlots.push(defineAdSlot);

          // Register slot with GPT
          window.googletag.display(CONTAINER_ID);

          // When lazy load is active, GPT manages fetch timing — skip manual refresh
          const lazyLoadActive = DreamsAdConfig.isInitialized() && !!DreamsAdConfig.getLazyLoad();

          if (!lazyLoadActive) {
            // Manual fetch — only when disableInitialLoad() was called.
            // Run APS and Prebid in parallel when both are enabled; refresh
            // GPT once after both settle (or shared timeout fires).
            const useAps =
              this.apstag &&
              this.pubId &&
              typeof window.apstag?.fetchBids === "function";
            const usePrebid =
              this.prebid &&
              Array.isArray(this.bidders) &&
              this.bidders.length > 0 &&
              typeof window.pbjs?.requestBids === "function";

            if (!useAps && !usePrebid) {
              window.googletag.pubads().refresh([defineAdSlot]);
            } else {
              const bidTimeout = this.bidTimeout || 2000;
              let refreshed = false;

              const refreshOnce = () => {
                if (refreshed) return;
                refreshed = true;
                if (this.pendingBidsTimeout) {
                  clearTimeout(this.pendingBidsTimeout);
                  this.pendingBidsTimeout = null;
                }
                window.googletag.cmd.push(() => {
                  // Order matters: prebid targeting → APS bids → refresh.
                  if (usePrebid) {
                    try {
                      window.pbjs.setTargetingForGPTAsync([CONTAINER_ID]);
                    } catch (e) {
                      console.warn(
                        "[DreamsAdEngine] pbjs.setTargetingForGPTAsync failed",
                        e,
                      );
                    }
                  }
                  if (useAps) {
                    try {
                      window.apstag.setDisplayBids();
                    } catch (e) {
                      console.warn(
                        "[DreamsAdEngine] apstag.setDisplayBids failed",
                        e,
                      );
                    }
                  }
                  window.googletag.pubads().refresh([defineAdSlot]);
                });
              };

              // Shared timeout — refreshes whichever (or none) has resolved.
              this.pendingBidsTimeout = setTimeout(
                refreshOnce,
                bidTimeout + 500,
              );

              const fetches: Promise<void>[] = [];

              if (useAps) {
                fetches.push(
                  new Promise<void>((resolve) => {
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
                      () => resolve(),
                    );
                  }),
                );
              }

              if (usePrebid) {
                fetches.push(
                  new Promise<void>((resolve) => {
                    window.pbjs.que.push(() => {
                      try {
                        window.pbjs.addAdUnits([
                          {
                            code: CONTAINER_ID,
                            mediaTypes: { banner: { sizes: this.sizing } },
                            bids: this.bidders,
                          },
                        ]);
                        window.pbjs.requestBids({
                          adUnitCodes: [CONTAINER_ID],
                          bidsBackHandler: () => resolve(),
                        });
                      } catch (e) {
                        console.warn(
                          "[DreamsAdEngine] pbjs.requestBids failed",
                          e,
                        );
                        resolve();
                      }
                    });
                  }),
                );
              }

              Promise.all(fetches).then(refreshOnce);
            }
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
