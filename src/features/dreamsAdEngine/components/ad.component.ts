import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { Task } from '@lit/task';
import { AdService } from '../services/ad-service';
import type { AdConfig } from '../types/ad.types';
import adStyles from '../styles/ad.styles.css?raw';

@customElement('dreams-ad-engine')
export class DreamsAdEngine extends LitElement {
	static styles = unsafeCSS(adStyles);

	@property({ type: String }) networkId = '';
	@property({ type: String }) adUnit = '';
	@property({ type: Array }) mapping = [];
	@property({ type: Array }) sizing = [];
	@property({ type: Boolean, reflect: true }) refresh = false;
	@property({ type: Boolean, reflect: true }) enableTitle = false;
	@property({ type: Boolean, reflect: true }) apstag = false;
	@property({ type: String }) pubId = '';
	@property({ type: Number }) bidTimeout = 2000;
	@property({ type: String }) title = 'Advertisement';

	@state() private adLoaded = false;
	@state() private divId = '';

	private adService = AdService.getInstance();

	private initializeAd = new Task(
		this,
		async () => {
			this.divId = `div-gpt-ad-${this.adUnit}-${crypto.randomUUID()}`;
			const config: AdConfig = {
				networkId: this.networkId,
				adUnit: this.adUnit,
				sizing: this.sizing,
				mapping: this.mapping,
				refresh: this.refresh,
				apstag: this.apstag,
				pubId: this.pubId,
				bidTimeout: this.bidTimeout
			};

			await this.adService.initializeGoogleTag(config);

			const adSlot = await this.adService.defineAdSlot(config, this.divId);
			console.log(this.divId);
			if (this.apstag && this.pubId) {
				await this.adService.requestBids({
					slots: [{
						slotID: this.divId,
						slotName: `/${this.networkId}/${this.adUnit}`,
						sizes: this.sizing
					}]
				});

				window.googletag.cmd.push(() => {
					window.apstag?.setDisplayBids();
					window.googletag.pubads().refresh([adSlot]);
				});
			} else {
				window.googletag.display(this.divId);
			}

			if (this.refresh) {
				window.dreamsSlotsToUpdate.push(adSlot);
			}
			window.dreamsAllSlots.push(adSlot);
		},
		() => [this.adUnit]
	);

	connectedCallback() {
		super.connectedCallback();
	}

	protected firstUpdated(): void {
		window.googletag?.pubads().addEventListener('slotRenderEnded', (event: googletag.events.SlotRenderEndedEvent) => {
			console.log(event);
			if (event.slot.getSlotElementId() === this.divId) {
				this.adLoaded = true;
			}
		});
	}

	protected render() {
		return html`
      <div class="ad-container">
        ${when(
			this.enableTitle,
			() => html`<span class="ad-label">${this.title}</span>`
		)}
        ${when(
			!this.adLoaded,
			() => html`<div class="ad-loader" data-ad-loader="${this.divId}"></div>`
		)}
        <div
          class="ad-serving"
          data-post-id="${this.divId}"
          data-tag="${this.adUnit}"
          data-refresh="${this.refresh}"
        >
          <div id="${this.divId}"></div>
        </div>
      </div>
    `;
	}
}