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
  defaultLazyLoad?: LazyLoadConfig;
  slots?: Record<string, SlotConfig>;
  /** Set to true to allow re-initialization (overwrites existing config) */
  force?: boolean;
}

export interface AdConfigData
  extends Required<Omit<AdConfigInit, "slots" | "force">> {
  slots: Record<string, SlotConfig>;
}
