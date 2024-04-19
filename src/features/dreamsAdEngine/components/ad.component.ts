import { LitElement, html, unsafeCSS as style } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
import adCss from "../styles/ad.styles.css?raw";

@customElement("dreams-ad-engine")
export class DreamsAdComponent extends LitElement {
	static styles = style(adCss);

	static initialized = false;
	@property({ type: String }) networkId = "";
	@property({ type: String }) adUnit = "";
	@property({ type: String }) divId = `div-gpt-ad-${
		this.adUnit
	}-${crypto.randomUUID()}`;
	@property({ type: Array }) mapping = [];
	@property({ type: Array }) sizing = [];
	@property({ type: Boolean, reflect: true }) refresh = false;
	@property({ type: Boolean, reflect: true }) enableTitle = false;
	@property({ type: String }) title = "Publicidad";
	@property({ type: Number }) minHeight = 100;
	@property({ type: Boolean }) adLoaded = false;

	connectedCallback() {
		super.connectedCallback();
		if (!DreamsAdComponent.initialized) {
			this.#initGoogleTag();
			DreamsAdComponent.initialized = true;
		}
	}

	#initGoogleTag() {
		window.googletag = window.googletag || { cmd: [] };
		window.googletag.cmd.push(() => {
			window.dreamsAllSlots = window.dreamsAllSlots || [];
			window.dreamsSlotsToUpdate = window.dreamsSlotsToUpdate || [];
			window.googletag.pubads().disableInitialLoad();
			window.googletag.pubads().enableSingleRequest();
			window.googletag.enableServices();
		});
	}

	firstUpdated() {
		if (typeof this.mapping === "string") {
			this.mapping = JSON.parse(this.mapping);
		}
		if (typeof this.sizing === "string") {
			this.sizing = JSON.parse(this.sizing);
		}
		if (typeof this.minHeight === "string") {
			this.minHeight = parseInt(this.minHeight);
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
			const defineAdSlot = window.googletag
				.defineSlot(SLOT, this.sizing, CONTAINER_ID)
				.addService(window.googletag.pubads());
			window.googletag
				.pubads()
				.addEventListener("slotRenderEnded", (event: any) => {
					if (event.slot.getSlotElementId() === CONTAINER_ID) {
						this.adLoaded = true;
					}
				});
			// * Define mapping
			const AD_MAPPING = window.googletag.sizeMapping();
			this.mapping.forEach((map: any) => {
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
			window.googletag.display(CONTAINER_ID);
			window.googletag.pubads().refresh([defineAdSlot]);
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
					style="min-height: ${this.minHeight}px"
				>
					<slot name="ad-slot"></slot>
				</div>
			</div>
		`;
	}
}
