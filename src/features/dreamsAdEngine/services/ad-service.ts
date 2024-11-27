import { AdConfig, ApstagBidConfig } from '../types/ad.types';

export class AdService {
	private static instance: AdService;
	private initialized = false;
	private oldUrl = '';

	private constructor() { }

	static getInstance(): AdService {
		if (!AdService.instance) {
			AdService.instance = new AdService();
		}
		return AdService.instance;
	}

	async initializeGoogleTag(config: AdConfig): Promise<void> {
		if (this.initialized) {
			return this.handleUrlChange();
		}

		window.googletag = window.googletag || { cmd: [] };

		await new Promise<void>((resolve) => {
			window.googletag.cmd.push(() => {
				window.dreamsAllSlots = [];
				window.dreamsSlotsToUpdate = [];
				window.googletag.pubads().enableSingleRequest();
				window.googletag.enableServices();
				resolve();
			});
		});

		if (config.apstag && config.pubId) {
			this.initializeApstag(config);
		}

		this.initialized = true;
		this.oldUrl = location.href;
	}

	private handleUrlChange(): void {
		const currentUrl = location.href;
		if (this.oldUrl !== currentUrl) {
			window.googletag.destroySlots(window.dreamsAllSlots);
			this.oldUrl = currentUrl;
			window.dreamsAllSlots = [];
			window.dreamsSlotsToUpdate = [];
		}
	}

	private initializeApstag(config: AdConfig): void {
		window.apstag?.init({
			pubID: config.pubId!,
			adServer: 'googletag',
			bidTimeout: config.bidTimeout || 2000
		});
	}

	async defineAdSlot(config: AdConfig, containerId: string): Promise<googletag.Slot> {
		const slot = `/${config.networkId}/${config.adUnit}`;

		return new Promise((resolve) => {
			window.googletag.cmd.push(() => {
				const adSlot = window.googletag
					.defineSlot(slot, config.sizing, containerId)
					.addService(window.googletag.pubads());

				if (config.mapping?.length) {
					const mapping = this.createSizeMapping(config.mapping);
					adSlot.defineSizeMapping(mapping);
				}

				resolve(adSlot);
			});
		});
	}

	private createSizeMapping(mapping: AdConfig['mapping']): googletag.SizeMappingArray {
		const sizeMapping = window.googletag.sizeMapping();
		mapping.forEach((map: any) => {
			sizeMapping.addSize(map.viewport, map.sizing);
		});
		return sizeMapping.build();
	}

	async requestBids(config: ApstagBidConfig): Promise<void> {
		if (!window.apstag) return;

		return new Promise((resolve) => {
			window.apstag.fetchBids(config, resolve);
		});
	}
}