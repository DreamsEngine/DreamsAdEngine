import type { DreamsAdMapping } from "../dreamsAdEngine/types/interfaces";

export interface LazyLoadConfig {
  fetchMarginPercent: number;
  renderMarginPercent: number;
  mobileScaling: number;
}

export interface SlotConfig {
  mapping: DreamsAdMapping[];
  sizing: number[][];
  position?: "top" | "box" | "footer" | "interstitial";
}

export interface AdConfigInit {
  networkId: string;
  sitePrefix: string;
  pubId?: string;
  bidTimeout?: number;
  /** Enable GPT lazy loading. Must be set before enableServices(). */
  lazyLoad?: LazyLoadConfig | false;
  /** @deprecated Use `lazyLoad` instead */
  defaultLazyLoad?: LazyLoadConfig;
  /** Enable GPT ad centering globally */
  centering?: boolean;
  slots?: Record<string, SlotConfig>;
  /** Set to true to allow re-initialization (overwrites existing config) */
  force?: boolean;
}

export interface AdConfigData {
  networkId: string;
  sitePrefix: string;
  pubId: string;
  bidTimeout: number;
  lazyLoad: LazyLoadConfig | false;
  centering: boolean;
  slots: Record<string, SlotConfig>;
}
