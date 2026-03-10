// SSR-safe entry point — no DOM dependencies (HTMLElement, window, document)
// Use this in Node.js / Next.js SSR environments

// Config (pure TS singleton)
export { DreamsAdConfig } from "./features/config/config.provider";
export { DEFAULT_SLOTS } from "./features/config/default-mappings";
export type {
  AdConfigInit,
  LazyLoadConfig,
  SlotConfig,
} from "./features/config/config.types";

// Types only (interfaces, no runtime code)
export type {
  DreamsAdMapping,
  DreamsAdTargeting,
} from "./features/dreamsAdEngine/types/interfaces";
export type {
  TargetingOptions,
  DFPContext,
  TargetingResult,
} from "./features/targeting/targeting.types";
