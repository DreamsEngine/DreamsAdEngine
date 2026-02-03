import { LitElement, html, unsafeCSS as style } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
import adCss from "../styles/ad.styles.css?raw";
import { DreamsAdMapping, DreamsAdTargeting } from "../types/interfaces";
import { DreamsAdConfig } from "../../config";
import { DreamsTargetingService } from "../../targeting";
import { ViewabilityService } from "../../viewability";
import { getSkeletonDimensions } from "../../skeleton";
import "../../skeleton/skeleton.component"; // Register the skeleton component

@customElement("dreams-ad-engine")
export class DreamsAdComponent extends LitElement {
  static styles = style(adCss);

  static initialized = false;
  static old_url = "";
  static initialized_aps = false;
  static navigationListenersAttached = false;
  static servicesWereAlreadyEnabled = false;
  static lazyLoadConfigured = false;

  // Instance references for cleanup
  private adSlot: any = null;
  private slotRenderHandler: ((event: any) => void) | null = null;

  /**
   * Handle SPA navigation - destroys all slots and clears targeting cache
   */
  private static _handleNavigation = () => {
    const currentUrl = location.href;
    if (DreamsAdComponent.old_url === currentUrl) return;

    // Destroy all existing slots
    if (window.googletag?.destroySlots && window.dreamsAllSlots?.length > 0) {
      window.googletag.destroySlots(window.dreamsAllSlots);
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
  @property({ type: Boolean, reflect: true }) setCentering = false;
  @property({ type: Boolean, reflect: true }) enableLazyLoad = false;
  @property({ type: Object }) configLazyLoad = {
    fetchMarginPercent: 500,
    renderMarginPercent: 200,
    mobileScaling: 2.0,
  };
  @property({ type: Boolean, reflect: true }) refresh = false;
  @property({ type: Boolean, reflect: true }) enableTitle = false;
  @property({ type: Boolean, reflect: true }) apstag = false;
  @property({ type: String }) pubId = "";
  @property({ type: Number }) bidTimeout = 2e3;
  @property({ type: String }) title = "Publicidad";
  @property({ type: Boolean }) adLoaded = false;
  @property({ type: Boolean, reflect: true }) trackViewability = false;
  @property({ type: Boolean, reflect: true }) showSkeleton = false;

  connectedCallback() {
    super.connectedCallback();
    if (!DreamsAdComponent.initialized) {
      this.#initGoogleTag();
      DreamsAdComponent.initialized = true;
      DreamsAdComponent.old_url = location.href;
    } else {
      // Fallback check for components connecting after navigation
      // Main navigation handling is done via _handleNavigation()
      DreamsAdComponent._handleNavigation();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Stop viewability tracking
    if (this.trackViewability && this.divId) {
      ViewabilityService.untrack(this.divId);
    }

    // Remove event listener
    if (this.slotRenderHandler && window.googletag?.pubads) {
      window.googletag
        .pubads()
        .removeEventListener("slotRenderEnded", this.slotRenderHandler);
      this.slotRenderHandler = null;
    }

    // Destroy this component's slot and remove from global arrays
    if (this.adSlot) {
      // Remove from dreamsAllSlots
      if (window.dreamsAllSlots) {
        const allIndex = window.dreamsAllSlots.indexOf(this.adSlot);
        if (allIndex > -1) {
          window.dreamsAllSlots.splice(allIndex, 1);
        }
      }

      // Remove from dreamsSlotsToUpdate
      if (window.dreamsSlotsToUpdate) {
        const updateIndex = window.dreamsSlotsToUpdate.indexOf(this.adSlot);
        if (updateIndex > -1) {
          window.dreamsSlotsToUpdate.splice(updateIndex, 1);
        }
      }

      // Destroy the slot in GPT
      if (window.googletag?.destroySlots) {
        window.googletag.destroySlots([this.adSlot]);
      }

      this.adSlot = null;
    }
  }

  #initGoogleTag() {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      window.dreamsAllSlots = window.dreamsAllSlots || [];
      window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [];

      // Check if services already enabled by external script (FirstImpression, deployads, etc.)
      const alreadyEnabled = window.googletag.pubadsReady === true;
      DreamsAdComponent.servicesWereAlreadyEnabled = alreadyEnabled;

      if (!alreadyEnabled) {
        // SRA disabled - causes timing issues with async web components
        // Each slot will make individual requests instead
        window.googletag.enableServices();
      }
    });

    // Set up SPA navigation detection
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
          // APS init failed - disable APS for this component
          this.apstag = false;
        }
      } else {
        // apstag not loaded - disable APS
        this.apstag = false;
      }
    }
    this.#renderSlot();
  }

  async #resolveConfiguration() {
    if (this.slot && DreamsAdConfig.isInitialized()) {
      const slotConfig = DreamsAdConfig.getSlot(this.slot);
      if (slotConfig) {
        if (!this.networkId) {
          this.networkId = DreamsAdConfig.getNetworkId();
        }
        if (!this.adUnit) {
          this.adUnit = DreamsAdConfig.buildAdUnit(this.slot);
        }
        if (!this.mapping || this.mapping.length === 0) {
          this.mapping = slotConfig.mapping;
        }
        if (!this.sizing || this.sizing.length === 0) {
          this.sizing = slotConfig.sizing;
        }
        if (!this.pubId) {
          this.pubId = DreamsAdConfig.getPubId() || "";
        }
        if (this.pubId) {
          this.apstag = true;
        }
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
    if (this.configLazyLoad && typeof this.configLazyLoad === "string") {
      try {
        this.configLazyLoad = JSON.parse(this.configLazyLoad);
      } catch {
        this.configLazyLoad = {
          fetchMarginPercent: 500,
          renderMarginPercent: 200,
          mobileScaling: 2.0,
        };
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

  #renderSlot() {
    const SLOT = `/${this.networkId}/${this.adUnit}`;
    const CONTAINER_ID = this.divId;
    const adContainer = document.createElement("div");
    adContainer.id = CONTAINER_ID;
    adContainer.setAttribute("data-ad", this.divId);
    adContainer.setAttribute("slot", "ad-slot");
    adContainer.classList.add("ad-serving-rendered");

    if (!adContainer.parentElement) {
      this.appendChild(adContainer);
    }

    window.googletag.cmd.push(() => {
      window.googletag.pubads().setCentering(this.setCentering);

      // Lazy load is global - only configure once with first component's settings
      if (this.enableLazyLoad && !DreamsAdComponent.lazyLoadConfigured) {
        window.googletag.pubads().enableLazyLoad(this.configLazyLoad);
        DreamsAdComponent.lazyLoadConfigured = true;
      }
      const defineAdSlot = window.googletag
        .defineSlot(SLOT, this.sizing, CONTAINER_ID)
        .addService(window.googletag.pubads());
      this.resolvedTargeting.forEach((target: DreamsAdTargeting) => {
        defineAdSlot.setTargeting(target.key, target.value);
      });

      // Store handler reference for cleanup
      this.slotRenderHandler = (event: any) => {
        if (event.slot.getSlotElementId() === CONTAINER_ID) {
          this.adLoaded = true;

          // Start viewability tracking if enabled
          if (this.trackViewability) {
            const adElement = this.querySelector(`#${CONTAINER_ID}`);
            if (adElement instanceof HTMLElement) {
              ViewabilityService.track(
                adElement,
                CONTAINER_ID,
                this.slot || this.adUnit,
              );
            }
          }
        }
      };
      window.googletag
        .pubads()
        .addEventListener("slotRenderEnded", this.slotRenderHandler);

      // Define mapping
      const AD_MAPPING = window.googletag.sizeMapping();
      this.mapping.forEach((map: DreamsAdMapping) => {
        AD_MAPPING.addSize(map.viewport, map.sizing);
      });
      const AD_MAPPING_BUILD = AD_MAPPING.build();
      const DEFINED_AD_SLOT = defineAdSlot
        .defineSizeMapping(AD_MAPPING_BUILD)
        .addService(window.googletag.pubads());

      // Store slot reference for cleanup
      this.adSlot = DEFINED_AD_SLOT;

      if (this.refresh) {
        window.dreamsSlotsToUpdate.push(DEFINED_AD_SLOT);
      }
      window.dreamsAllSlots.push(DEFINED_AD_SLOT);

      // Use APS flow only if both apstag is enabled AND pubId is set
      const useAps = this.apstag && this.pubId;

      if (!useAps) {
        window.googletag.display(CONTAINER_ID);

        // Late-slot refresh: if services were already enabled by external script,
        // slots defined after enableServices() won't auto-fetch, so refresh them
        if (DreamsAdComponent.servicesWereAlreadyEnabled) {
          window.googletag.pubads().refresh([DEFINED_AD_SLOT]);
        }
      } else {
        // Check if apstag is available and properly initialized
        if (typeof window.apstag?.fetchBids !== "function") {
          // Fallback to direct display without APS
          window.googletag.display(CONTAINER_ID);
          if (DreamsAdComponent.servicesWereAlreadyEnabled) {
            window.googletag.pubads().refresh([DEFINED_AD_SLOT]);
          }
          return;
        }

        let bidsReceived = false;
        const bidTimeout = this.bidTimeout || 2000;

        // Timeout fallback - display ads even if APS doesn't respond
        const timeoutId = setTimeout(() => {
          if (!bidsReceived) {
            bidsReceived = true;
            window.googletag.cmd.push(() => {
              window.googletag.pubads().refresh([DEFINED_AD_SLOT]);
            });
          }
        }, bidTimeout + 500); // Add buffer to APS timeout

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
            if (bidsReceived) return; // Timeout already fired
            bidsReceived = true;
            clearTimeout(timeoutId);

            window.googletag.cmd.push(() => {
              window.apstag.setDisplayBids();
              window.googletag.pubads().refresh([DEFINED_AD_SLOT]);
            });
          },
        );
      }
    });
  }

  protected render(): TemplateResult {
    const skeletonDims = this.showSkeleton
      ? getSkeletonDimensions(this.slot || "box-1", window.innerWidth)
      : { width: 0, height: 0 };

    return html`
			<div class="ad-container">
				${when(
          this.enableTitle,
          () => html`<span class="ad-label">${this.title}</span>`,
          () => html``,
        )}
				${when(
          !this.adLoaded,
          () =>
            this.showSkeleton
              ? html`<dreams-ad-skeleton
                  width="${skeletonDims.width}"
                  height="${skeletonDims.height}"
                ></dreams-ad-skeleton>`
              : html`<div
                  class="ad-loader"
                  data-ad-loader="${this.divId}"
                ></div>`,
          () => html``,
        )}
				<div
					class="ad-serving"
					data-post-id="${this.divId}"
					data-tag="${this.adUnit}"
					data-refresh="${this.refresh ? "true" : "false"}"
					style="${!this.adLoaded && this.showSkeleton ? "opacity: 0;" : ""}"
				>
					<slot name="ad-slot"></slot>
				</div>
			</div>
		`;
  }
}
