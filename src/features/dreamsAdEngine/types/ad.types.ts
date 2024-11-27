export interface AdMapping {
	viewport: [number, number];
	sizing: Array<[number, number]>;
}

export interface AdConfig {
	networkId: string;
	adUnit: string;
	sizing: Array<[number, number]>;
	mapping: AdMapping[];
	refresh?: boolean;
	enableTitle?: boolean;
	apstag?: boolean;
	pubId?: string;
	bidTimeout?: number;
	title?: string;
}

export interface ApstagBidConfig {
	slots: Array<{
		slotID: string;
		slotName: string;
		sizes: Array<[number, number]>;
	}>;
	timeout?: number;
}

declare global {
	interface Window {
		googletag: any;
		apstag: any;
		dreamsSlotsToUpdate: googletag.Slot[];
		dreamsAllSlots: googletag.Slot[];
	}
}