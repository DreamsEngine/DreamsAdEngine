import type { DreamsAdMapping } from "../dreamsAdEngine/types/interfaces";
import type {
  AdConfigData,
  AdConfigInit,
  AnchorConfig,
  InterstitialConfig,
  LazyLoadConfig,
  PrivacyConfig,
  SlotConfig,
} from "./config.types";
import { DEFAULT_SLOTS } from "./default-mappings";

const DEFAULT_LAZY_LOAD: LazyLoadConfig = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2.0,
};

export class DreamsAdConfig {
  private static instance: AdConfigData | null = null;
  private static readyResolve: (() => void) | null = null;
  private static readyPromise: Promise<void> =
    DreamsAdConfig.createReadyPromise();

  private static createReadyPromise(): Promise<void> {
    return new Promise((resolve) => {
      DreamsAdConfig.readyResolve = resolve;
    });
  }

  static init(config: AdConfigInit): void {
    // Prevent accidental re-initialization
    if (this.instance && !config.force) {
      console.warn(
        "[DreamsAdConfig] Already initialized. Use { force: true } to override.",
      );
      return;
    }

    // Resolve lazyLoad: new `lazyLoad` takes precedence over deprecated `defaultLazyLoad`
    let resolvedLazyLoad: LazyLoadConfig | false = false;
    if (config.lazyLoad !== undefined) {
      resolvedLazyLoad = config.lazyLoad;
    } else if (config.defaultLazyLoad) {
      resolvedLazyLoad = config.defaultLazyLoad;
    }

    this.instance = {
      networkId: config.networkId,
      sitePrefix: config.sitePrefix,
      pubId: config.pubId || "",
      bidTimeout: config.bidTimeout || 2000,
      lazyLoad: resolvedLazyLoad,
      centering: config.centering ?? false,
      slots: {
        ...DEFAULT_SLOTS,
        ...config.slots,
      },
      privacy: config.privacy || null,
      interstitial: config.interstitial || null,
      anchor: config.anchor || null,
      threadYield: config.threadYield ?? false,
    };

    if (this.readyResolve) {
      this.readyResolve();
      this.readyResolve = null;
    }
  }

  private static pendingReady: Promise<void> | null = null;

  /** Resolves when init() has been called. Immediate if already initialized. */
  static whenReady(timeout = 5000): Promise<void> {
    if (this.instance) return Promise.resolve();
    if (this.pendingReady) return this.pendingReady;

    let timeoutId: ReturnType<typeof setTimeout>;

    this.pendingReady = Promise.race([
      this.readyPromise,
      new Promise<void>((_, reject) => {
        timeoutId = setTimeout(
          () =>
            reject(
              new Error(
                "[DreamsAdConfig] init() not called within timeout. Ensure DreamsAdConfig.init() runs before <dreams-ad-engine> elements mount.",
              ),
            ),
          timeout,
        );
      }),
    ]).finally(() => {
      clearTimeout(timeoutId);
      this.pendingReady = null;
    });

    return this.pendingReady;
  }

  static isInitialized(): boolean {
    return this.instance !== null;
  }

  static getNetworkId(): string {
    this.assertInitialized();
    return this.instance!.networkId;
  }

  static getSitePrefix(): string {
    this.assertInitialized();
    return this.instance!.sitePrefix;
  }

  static getPubId(): string | undefined {
    this.assertInitialized();
    return this.instance!.pubId || undefined;
  }

  static getBidTimeout(): number {
    this.assertInitialized();
    return this.instance!.bidTimeout;
  }

  /** @deprecated Use `getLazyLoad()` instead */
  static getDefaultLazyLoad(): LazyLoadConfig {
    this.assertInitialized();
    const ll = this.instance!.lazyLoad;
    return ll || DEFAULT_LAZY_LOAD;
  }

  static getLazyLoad(): LazyLoadConfig | false {
    this.assertInitialized();
    return this.instance!.lazyLoad;
  }

  static getCentering(): boolean {
    this.assertInitialized();
    return this.instance!.centering;
  }

  static getPrivacy(): PrivacyConfig | null {
    this.assertInitialized();
    return this.instance!.privacy;
  }

  static getInterstitial(): InterstitialConfig | null {
    this.assertInitialized();
    return this.instance!.interstitial;
  }

  static getAnchor(): AnchorConfig | null {
    this.assertInitialized();
    return this.instance!.anchor;
  }

  static getThreadYield(): boolean {
    this.assertInitialized();
    return this.instance!.threadYield;
  }

  static setPrivacy(config: PrivacyConfig): void {
    this.assertInitialized();
    this.instance!.privacy = config;
    if (typeof window !== "undefined" && window.googletag) {
      window.googletag.cmd.push(() => {
        window.googletag.pubads().setPrivacySettings(config as Record<string, boolean>);
      });
    }
  }

  static getSlot(slotName: string): SlotConfig | undefined {
    this.assertInitialized();
    return this.instance!.slots[slotName];
  }

  static getSlotMapping(slotName: string): DreamsAdMapping[] {
    const slot = this.getSlot(slotName);
    if (!slot) {
      throw new Error(`Unknown ad slot: ${slotName}`);
    }
    return slot.mapping;
  }

  static getSlotSizing(slotName: string): number[][] {
    const slot = this.getSlot(slotName);
    if (!slot) {
      throw new Error(`Unknown ad slot: ${slotName}`);
    }
    return slot.sizing;
  }

  static getSlotPosition(slotName: string): string {
    const slot = this.getSlot(slotName);
    return slot?.position || "top";
  }

  static buildAdUnit(slotName: string): string {
    this.assertInitialized();
    const prefix = this.instance!.sitePrefix;

    const slotSuffixes: Record<string, string> = {
      "top-1": "is-t-01",
      "top-2": "is-t-02",
      "top-3": "is-t-03",
      "top-4": "is-t-04",
      "top-5": "is-t-05",
      "box-1": "is-b-01",
      "box-2": "is-b-02",
      "box-3": "is-b-03",
      "box-4": "is-b-04",
      "box-5": "is-b-05",
      footer: "is-f-01",
      interstitial: "is-i",
    };

    const suffix = slotSuffixes[slotName];
    if (!suffix) {
      return `${prefix}-${slotName}`;
    }

    return `${prefix}-${suffix}`;
  }

  static registerSlot(name: string, config: SlotConfig): void {
    this.assertInitialized();
    this.instance!.slots[name] = config;
  }

  static reset(): void {
    this.instance = null;
    this.pendingReady = null;
    this.readyPromise = DreamsAdConfig.createReadyPromise();
  }

  private static assertInitialized(): void {
    if (!this.instance) {
      throw new Error(
        "DreamsAdConfig not initialized. Call DreamsAdConfig.init() first.",
      );
    }
  }
}
