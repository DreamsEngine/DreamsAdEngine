import { LitElement, html, unsafeCSS as style } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
import adCss from "../styles/ad.styles.css?raw";
import { DreamsAdMapping, DreamsAdTargeting } from "../types/interfaces";

@customElement("dreams-ad-engine")
export class DreamsAdComponent extends LitElement {
	static styles = style(adCss);

	static initialized = false;
	static old_url = "";
	static initialized_aps = false;
	@property({ type: String }) networkId = "";
	@property({ type: String }) adUnit = "";
	@property({ type: String }) divId = "";
	@property({ type: Array }) mapping = [];
	@property({ type: Array }) sizing = [];
	@property({ type: Array }) targeting = [];
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

	connectedCallback() {
		super.connectedCallback();
		if (!DreamsAdComponent.initialized) {
			this.#initGoogleTag();
			DreamsAdComponent.initialized = true;
			DreamsAdComponent.old_url = location.href;
		} else {
			const current_url = location.href;
			if (DreamsAdComponent.old_url !== current_url) {
				window.googletag.destroySlots(window.dreamsAllSlots);
				DreamsAdComponent.old_url = current_url;
				window.dreamsAllSlots = [];
				window.dreamsSlotsToUpdate = [];
			}
		}
	}

	#initGoogleTag() {
		window.googletag = window.googletag || { cmd: [] };
		window.googletag.cmd.push(() => {
			window.dreamsAllSlots = window.dreamsAllSlots || [];
			window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [];
			window.googletag.pubads().enableSingleRequest();
			window.googletag.enableServices();
		});
	}

	firstUpdated() {
		this.divId = `div-gpt-ad-${this.adUnit}-${crypto.randomUUID()}`;
		if (typeof this.mapping === "string") {
			this.mapping = JSON.parse(this.mapping);
		}
		if (typeof this.sizing === "string") {
			this.sizing = JSON.parse(this.sizing);
		}
		if (this.targeting && typeof this.targeting === "string") {
			this.targeting = JSON.parse(this.targeting);
		}
		if (this.configLazyLoad && typeof this.configLazyLoad === "string") {
			this.configLazyLoad = JSON.parse(this.configLazyLoad);
		}
		if (this.apstag && this.pubId && !DreamsAdComponent.initialized_aps) {
			window.apstag.init({
				pubID: this.pubId,
				adServer: "googletag",
				bidTimeout: this.bidTimeout,
			});
			DreamsAdComponent.initialized_aps = true;
		}
		this.#renderSlot();
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
			if (this.enableLazyLoad) {
				window.googletag.pubads().enableLazyLoad(this.configLazyLoad);
			}
			const defineAdSlot = window.googletag
				.defineSlot(SLOT, this.sizing, CONTAINER_ID)
				.addService(window.googletag.pubads());
			this.targeting.map((target: DreamsAdTargeting) => {
				defineAdSlot.setTargeting(target.key, target.value)
			});
			window.googletag
				.pubads()
				.addEventListener("slotRenderEnded", (event: any) => {
					if (event.slot.getSlotElementId() === CONTAINER_ID) {
						this.adLoaded = true;
					}
				});
			// * Define mapping
			const AD_MAPPING = window.googletag.sizeMapping();
			this.mapping.forEach((map: DreamsAdMapping) => {
				AD_MAPPING.addSize(map.viewport, map.sizing);
			});
			const AD_MAPPING_BUILD = AD_MAPPING.build();
			const DEFINED_AD_SLOT = defineAdSlot
				.defineSizeMapping(AD_MAPPING_BUILD)
				.addService(window.googletag.pubads());
			if (this.refresh) {
				window.dreamsSlotsToUpdate.push(defineAdSlot);
			}
			window.dreamsAllSlots.push(DEFINED_AD_SLOT);
			if (!this.apstag && !this.pubId) {
				window.googletag.display(CONTAINER_ID);
			}
			if (this.apstag && this.pubId) {
				window.apstag.fetchBids({
					slots: [
						{
							slotID: CONTAINER_ID,
							slotName: SLOT,
							sizes: this.sizing
						}
					]
				}, () => {
					window.googletag.cmd.push(() => {
						window.apstag.setDisplayBids();
						window.googletag.pubads().refresh([DEFINED_AD_SLOT]);
					});
				});
			}
		});
	}

	protected render(): TemplateResult {
		return html`
			<div class="ad-container">
				${when(
			this.enableTitle,
			() => html`<span class="ad-label">${this.title}</span>`,
			() => html``
		)}
				${when(
			!this.adLoaded,
			() =>
				html`<div
							class="ad-loader"
							data-ad-loader="${this.divId}"
						></div>`,
			() => html``
		)}
				<div
					class="ad-serving"
					data-post-id="${this.divId}"
					data-tag="${this.adUnit}"
					data-refresh="${this.refresh ? "true" : "false"}"
				>
					<slot name="ad-slot"></slot>
				</div>
			</div>
		`;
	}
}
