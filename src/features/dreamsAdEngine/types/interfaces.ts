/**
 * Page-level settings accepted by `googletag.setConfig()`. Mirrors the
 * documented PageSettingsConfig surface. Open-ended: unknown future keys
 * are still accepted by GPT, so we keep an index signature for forward
 * compatibility without losing the typed-key autocomplete on known fields.
 *
 * https://developers.google.com/publisher-tag/reference#googletag.setConfig
 */
export interface PageSettingsConfig {
  /** GPT-managed lazy loading. Set before `enableServices()`. */
  lazyLoad?: LazyLoadObject;
  /**
   * Yield the main thread between slot work to improve INP/Core Web Vitals.
   * Default: yields only for off-viewport slots.
   */
  threadYield?: "DISABLED" | "ENABLED_ALL_SLOTS";
  /**
   * Replacement for `pubads().collapseEmptyDivs()`. Controls when empty
   * slots collapse. `DISABLED` preserves the current CLS-reserve behavior.
   */
  collapseDiv?: "DISABLED" | "BEFORE_FETCH" | "AFTER_FETCH";
  /** Publisher Provided Signals taxonomy data. Post-cookie audience signal. */
  pps?: Record<string, { values: string[] }>;
  /** Forward-compat escape hatch — unknown keys pass through to GPT. */
  [key: string]: unknown;
}

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
  setConfig: (config: PageSettingsConfig) => void;
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
   * Slot-level key-value targeting. Still supported and not deprecated;
   * use it when you need to set targeting incrementally. Prefer setConfig
   * when applying a full targeting map in one call.
   * https://developers.google.com/publisher-tag/reference#googletag.Slot_setTargeting
   */
  setTargeting: (key: string, value: string) => Slot;
  /**
   * Per-slot configuration. Accepts a batch of slot settings including
   * `targeting`, `interstitial`, `componentAuction`, etc. Newer alternative
   * to chained setTargeting() calls.
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
    /**
     * Runtime debug toggle. Set to `true` to force-enable Logger output
     * in production without redeploying. Lowest precedence after
     * `DreamsAdConfig.init({ debug })` and `?dae-debug=1`.
     */
    __dreamsDebug?: boolean;
  }
}
