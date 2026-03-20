// SSR-safe entry point — no DOM dependencies (HTMLElement, window, document)
// Use this in Node.js / Next.js SSR environments

// Config (pure TS singleton)
export { DreamsAdConfig } from "./features/config/config.provider";
export { DEFAULT_SLOTS } from "./features/config/default-mappings";
export type {
  AdConfigInit,
  AnchorConfig,
  InterstitialConfig,
  LazyLoadConfig,
  PrivacyConfig,
  SlotConfig,
} from "./features/config/config.types";

// Types only (interfaces, no runtime code)
export type {
  DreamsAdMapping,
  DreamsAdTargeting,
  SlotRenderEndedEvent,
  ImpressionViewableEvent,
  SlotVisibilityChangedEvent,
} from "./features/dreamsAdEngine/types/interfaces";
export type {
  TargetingOptions,
  DFPContext,
  TargetingResult,
} from "./features/targeting/targeting.types";
export type {
  RefreshConfig,
  RefreshEvent,
} from "./features/refresh/refresh.types";
