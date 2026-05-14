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
  /**
   * Control empty-slot collapsing via GPT's modern `setConfig({ collapseDiv })`
   * API — the documented replacement for the deprecated
   * `pubads().collapseEmptyDivs()` call.
   *
   * - `"DISABLED"` (default): slots keep their reserved height even when
   *   empty. Best for CLS; matches the library's prior behavior.
   * - `"AFTER_FETCH"`: collapse after a no-fill response. Denser layout
   *   when fill rate is low, but causes a measurable shift on no-fill.
   * - `"BEFORE_FETCH"`: collapse before fetching; expand only on fill.
   *   Lowest reserved area; highest layout-shift risk.
   */
  collapseEmptyDivs?: "DISABLED" | "AFTER_FETCH" | "BEFORE_FETCH";
  /**
   * Enable verbose debug logging. Precedence (high → low):
   *   1. `init({ debug: true })` here
   *   2. `?dae-debug=1` URL param (parsed once at init)
   *   3. `window.__dreamsDebug = true` (runtime toggleable)
   * Leave undefined to follow URL / window flag, or to use the default
   * auto mode (dev-only logging).
   */
  debug?: boolean;
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
  collapseEmptyDivs: "DISABLED" | "AFTER_FETCH" | "BEFORE_FETCH";
}
