import type { DreamsAdMapping } from "../dreamsAdEngine/types/interfaces";

export interface LazyLoadConfig {
  fetchMarginPercent: number;
  renderMarginPercent: number;
  mobileScaling: number;
}

export interface PrivacyConfig {
  restrictDataProcessing?: boolean;
  childDirectedTreatment?: boolean;
  underAgeOfConsent?: boolean;
  trafficSource?: boolean;
}

export interface InterstitialConfig {
  enabled: boolean;
  triggers?: string[];
}

export interface AnchorConfig {
  enabled: boolean;
  position: "top" | "bottom" | "both";
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
  /** GDPR/CCPA privacy settings */
  privacy?: PrivacyConfig;
  /** Web interstitial ad configuration */
  interstitial?: InterstitialConfig;
  /** Anchor ad configuration */
  anchor?: AnchorConfig;
  /** Enable scheduler thread yield for INP improvement */
  threadYield?: boolean;
}

export interface AdConfigData {
  networkId: string;
  sitePrefix: string;
  pubId: string;
  bidTimeout: number;
  lazyLoad: LazyLoadConfig | false;
  centering: boolean;
  slots: Record<string, SlotConfig>;
  privacy: PrivacyConfig | null;
  interstitial: InterstitialConfig | null;
  anchor: AnchorConfig | null;
  threadYield: boolean;
}
