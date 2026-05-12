export interface Googletag {
  cmd: Array<() => void>;
  pubads: () => PubAdsService;
  pubadsReady?: boolean;
  defineSlot: (
    adUnitPath: string,
    size: Array<number> | Array<Array<number>>,
    divId: string,
  ) => Slot;
  defineOutOfPageSlot: (adUnitPath: string, format: unknown) => Slot | null;
  display: (divId: string) => void;
  enableServices: () => void;
  setConfig: (config: Record<string, unknown>) => void;
  sizeMapping: () => SizeMappingArray;
  destroySlots: (slots?: Slot[]) => void;
  enums: {
    OutOfPageFormat: {
      INTERSTITIAL: unknown;
      TOP_ANCHOR: unknown;
      BOTTOM_ANCHOR: unknown;
    };
  };
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
    slotSize: [number, number][],
  ): SizeMappingArray;
  build(): SizeMappingArray[];
}

interface LazyLoadObject {
  fetchMarginPercent: number;
  renderMarginPercent: number;
  mobileScaling: number;
}

interface PubAdsService {
  disableInitialLoad: () => void;
  enableSingleRequest: () => void;
  refresh: (slots?: Slot[], options?: { changeCorrelator?: boolean }) => void;
  addService: (service: ServiceType) => Slot;
  addEventListener: (eventType: string, handler: (event: any) => void) => void;
  removeEventListener: (
    eventType: string,
    handler: (event: any) => void,
  ) => void;
  setCentering: (centerAds: boolean) => void;
  enableLazyLoad: (config: LazyLoadObject) => void;
  setPrivacySettings: (config: Record<string, boolean>) => void;
  updateCorrelator: () => void;
}

interface Slot {
  /**
   * @deprecated Use setConfig({ targeting: { key: value } }) instead.
   * https://developers.google.com/publisher-tag/reference#googletag.Slot_setTargeting
   */
  setTargeting: (key: string, value: string) => Slot;
  /**
   * Per-slot configuration — replaces deprecated setTargeting and others.
   * https://developers.google.com/publisher-tag/reference#googletag.Slot_setConfig
   */
  setConfig: (config: Record<string, unknown>) => Slot;
  addService: (service: ServiceType) => Slot;
  defineSizeMapping(sizeMapping: SizeMappingArray[]): Slot;
  getSlotElementId(): string;
  getAdUnitPath(): string;
}

export interface SlotRenderEndedEvent {
  slot: Slot;
  isEmpty: boolean;
  size: [number, number] | null;
  advertiserId: number | null;
  creativeId: number | null;
  lineItemId: number | null;
  isBackfill: boolean;
}

export interface ImpressionViewableEvent {
  slot: Slot;
}

export interface SlotVisibilityChangedEvent {
  slot: Slot;
  inViewPercentage: number;
}

type ServiceType = PubAdsService;
declare global {
  interface Window {
    googletag: Googletag;
    dreamsSlotsToUpdate: Slot[];
    dreamsAllSlots: Slot[];
    apstag: any;
    pbjs?: any;
    dataLayer?: any[];
  }
}
