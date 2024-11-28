export interface Googletag {
	cmd: Array<() => void>;
	pubads: () => PubAdsService;
	defineSlot: (
		adUnitPath: string,
		size: Array<number> | Array<Array<number>>,
		divId: string
	) => Slot;
	display: (divId: string) => void;
	enableServices: () => void;
	sizeMapping: () => SizeMappingArray;
	destroySlots: (slots?: Slot[]) => void;
}

export interface DreamsAdMapping {
	viewport: [number, number];
	sizing: [number, number][];
}
export interface DreamsAdTargeting {
	key: string;
	value: string;
}

interface SizeMappingArray {
	addSize(
		viewportSize: [number, number],
		slotSize: [number, number][]
	): SizeMappingArray;
	build(): SizeMappingArray[];
}

interface LazyLoadObject {
	fetchMarginPercent: number,
	renderMarginPercent: number,
	mobileScaling: number
};

interface PubAdsService {
	disableInitialLoad: () => void;
	enableSingleRequest: () => void;
	refresh: (slots?: Slot[]) => void;
	addService: (service: ServiceType) => Slot;
	addEventListener: (
		eventType: string,
		handler: (event: any) => void
	) => void;
	setCentering: (centerAds: boolean) => void;
	enableLazyLoad: (config: LazyLoadObject) => void;
}

interface Slot {
	setTargeting: (key: string, value: string) => Slot;
	addService: (service: ServiceType) => Slot;
	defineSizeMapping(sizeMapping: SizeMappingArray[]): Slot;
}

type ServiceType = PubAdsService;
declare global {
	interface Window {
		googletag: Googletag;
		dreamsSlotsToUpdate: Slot[];
		dreamsAllSlots: Slot[];
		apstag: any;
	}
}
