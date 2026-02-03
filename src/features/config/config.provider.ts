import type { DreamsAdMapping } from "../dreamsAdEngine/types/interfaces";
import type {
  AdConfigData,
  AdConfigInit,
  LazyLoadConfig,
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

  static init(config: AdConfigInit): void {
    // Prevent accidental re-initialization
    if (this.instance && !config.force) {
      console.warn(
        "[DreamsAdConfig] Already initialized. Use { force: true } to override.",
      );
      return;
    }

    this.instance = {
      networkId: config.networkId,
      sitePrefix: config.sitePrefix,
      pubId: config.pubId || "",
      bidTimeout: config.bidTimeout || 2000,
      defaultLazyLoad: config.defaultLazyLoad || DEFAULT_LAZY_LOAD,
      slots: {
        ...DEFAULT_SLOTS,
        ...config.slots,
      },
    };
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

  static getDefaultLazyLoad(): LazyLoadConfig {
    this.assertInitialized();
    return this.instance!.defaultLazyLoad;
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
  }

  private static assertInitialized(): void {
    if (!this.instance) {
      throw new Error(
        "DreamsAdConfig not initialized. Call DreamsAdConfig.init() first.",
      );
    }
  }
}
