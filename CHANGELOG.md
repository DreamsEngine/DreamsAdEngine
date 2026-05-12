# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2026-05-12

### Added

- **Prebid.js header bidding (opt-in)**: parallel auction alongside Amazon APS
  - New `<dreams-ad-engine>` attributes:
    - `prebid` (Boolean, default `false`) — enables Prebid for the slot
    - `prebidConfig` (String JSON) — global config passed to `pbjs.setConfig()`; parsed once via `static initialized_prebid` guard
    - `bidders` (String JSON) — array of `{ bidder, params }` becomes the `bids` array in the per-slot adUnit definition
  - When both `apstag` and `prebid` are enabled, the component runs
    `apstag.fetchBids` and `pbjs.requestBids` concurrently and refreshes GPT
    once both settle (or the shared `bidTimeout + 500ms` fires). Order on
    refresh: `pbjs.setTargetingForGPTAsync` → `apstag.setDisplayBids` →
    `googletag.pubads().refresh`.
  - `bidWon` events are forwarded to `window.dataLayer` as
    `{ event: "prebid_bid_won", bidder, cpm, currency, ad_unit, size }` for
    attribution.
  - Library does **not** inject the pbjs script. Consumers load their own
    custom-built `window.pbjs` (each publisher picks its own bidder adapters).
  - Backward compatible: when `prebid` is absent, behavior is identical to
    0.5.x. APS-only and no-bidder consumers see zero change.
- TypeScript: extended `Window` with `pbjs?: any` and `dataLayer?: any[]`.

## [0.5.10] - 2026-03-20

### Changed

- Republish of 0.5.9 with corrected version metadata. No behavior change.

## [0.5.9] - 2026-03-20

### Fixed

- Replace `requestAnimationFrame` with `setTimeout(0)` for GPT slot
  registration. `rAF` never fires in background tabs, silently preventing
  slot registration when pages loaded unfocused.

## [0.5.8] - 2026-03-18

### Fixed

- Surface silent errors in the slot-registration callback with try/catch
  and a defensive `googletag.cmd` existence check.
- Collapse 1×1 tracking pixels to zero height like empty slots so they
  don't reserve space in the layout.

## [0.5.7] - 2026-03-18

### Fixed

- Deferred-render architecture: `render()` returns empty until `ready=true`
  (set after config and targeting resolve). Eliminates the React
  hydration mismatch (#418) caused by Lit light-DOM `render()` running
  during SSR, and prevents the "slot div not in DOM" error caused by
  re-renders displacing the imperatively-appended GPT container.
- Loader and skeleton are now hidden imperatively via `style.display` on
  `slotRenderEnded` instead of via a reactive `adLoaded` state.

## [0.5.6] - 2026-03-18

### Fixed

- Use `event.size` from `slotRenderEnded` as the source of truth for
  creative dimensions. Stop reading iframe attributes (always 1×1 from
  GPT). Iframe inline styles are forced to match `event.size`.
  `ResizeObserver` remains as a fallback for expandable creatives.

## [0.5.5] - 2026-03-18

### Fixed

- Move `.dae-slot` (GPT container) inside `.dae-serving` (CLS reserve)
  so the ad fills the reserved space instead of stacking vertically at
  double height. Empty slots collapse both to zero.

## [0.5.4] - 2026-03-18

### Fixed

- Three-tier size detection for rich-media creatives (Flashtalking,
  Sizmek, Celtra) that report 1×1 to `slotRenderEnded` then expand via
  internal JS:
  1. Immediate read of `offsetWidth` / inline styles / attributes.
  2. `requestAnimationFrame` pass for GPT post-callback inline styles.
  3. `ResizeObserver` (auto-disconnect after 10s) for async expansion.

## [0.5.3] - 2026-03-18

### Fixed

- Light-DOM `defineSlot`-before-DIV race condition. GPT threw "could not
  find div" when `googletag.cmd.push` ran before the imperatively-appended
  ad container was committed to the DOM. Three-layer fix:
  - `await this.updateComplete` before `#renderSlot()` flushes Lit
    re-renders.
  - `requestAnimationFrame` before `googletag.cmd.push` ensures DOM commit.
  - `document.getElementById` guard before `defineSlot` fails safe.

## [0.5.2] - 2026-03-18

### Changed

- Version bump to refresh README on npm; no code change.

## [0.5.1] - 2026-03-18

### Fixed

- Light-DOM style injection — `<style>` block now appended to
  `document.head` (in shadow DOM it was silently dropped after the
  0.5.0 migration).
- Guard `googletag.setConfig` existence, fall back to legacy
  `enableLazyLoad` when absent.
- Guard out-of-page slot re-registration with a static flag so SPA
  navigation doesn't re-create interstitials.
- Throttle `slotVisibilityChanged` dispatches to 25% threshold
  crossings instead of every pixel.
- Fix `--dae-min-heigh` typo → `--dae-min-height`.
- Downgrade `contain: content` → `contain: layout style` to allow
  expandable creatives to render outside the slot bounds.
- Refactor `dae-loader` shimmer to use `transform` (compositor-only).
- Add `prefers-reduced-motion` media query.
- Namespace skeleton classes and keyframes with `dae-` prefix to
  prevent publisher CSS collisions.
- Add `max-width: 100%` to skeleton for mobile overflow.
- Add ARIA `role="complementary"` + `aria-label` on the ad container.
- Remove stale `interstitial` case from `getSkeletonDimensions`.
- Remove orphaned `pinno-ad-container` class.

### Changed

- Updated TypeScript declarations to match the v0.5.0 surface.

## [0.5.0] - 2026-03-18

### Changed

- **BREAKING — Shadow DOM → Light DOM**: `DreamsAdComponent` and
  `DreamsAdSkeleton` now disable the shadow root so third-party
  viewability vendors (IAS, MOAT, DoubleVerify) can traverse the slot.
  Internal CSS classes were renamed with a `dae-` prefix
  (`.dae-container`, `.dae-label`, `.dae-loader`, `.dae-serving`,
  `.dae-slot`) to avoid colliding with publisher CSS.
- **GPT `setConfig` migration**: Replaced `pubads().enableLazyLoad()`
  with `googletag.setConfig({ lazyLoad })` per GPT's deprecation
  notice. A legacy fallback is retained for older GPT loaders.

### Added

- **CLS reserve**: Reserve `min-height` from the largest creative in
  the matched responsive size mapping. Collapse to zero on empty fill.
- **Privacy controls**: `privacy` config object passed to
  `pubads().setPrivacySettings()`.
- **Thread yield**: `threadYield: true` opts into GPT's
  `ENABLED_ALL_SLOTS` thread-yield mode for INP improvements.
- **GPT-native viewability**: New `ad:viewable`, `ad:visibility`, and
  enriched `ad:rendered` (with `advertiserId`, `creativeId`,
  `lineItemId`, `isBackfill`) CustomEvents emitted from GPT's
  `impressionViewable`, `slotVisibilityChanged`, and `slotRenderEnded`
  listeners. `ViewabilityService.track()` is deprecated in favor of
  these native events.
- **Out-of-page slots**: Interstitial and anchor ads now use
  `googletag.defineOutOfPageSlot()` instead of a 1×1 `defineSlot`.
  Configurable via `DreamsAdConfig.init({ interstitial: { ... },
  anchor: { ... } })`. `<dreams-ad-engine slot="interstitial">` is
  deprecated.
- **Viewability-gated refresh**: `RefreshManager` only refreshes slots
  that have received an `impressionViewable` event (per GAM policy).
  Tracks a `refresh_count` targeting key for reporting. Opt-in via
  `viewabilityGated` (default true).
- New TypeScript exports for the v0.5.0 surface.

### Migration notes

- If you styled internal parts via `::part(...)` or via shadow-DOM
  selectors (`:host`, etc.), those will no-op. The component renders
  in light DOM, so use the public `--dae-*` custom properties (see
  `src/features/dreamsAdEngine/styles/ad.styles.css`) or target the
  `dae-` classes directly.
- Replace `slot="interstitial"` usage with
  `DreamsAdConfig.init({ interstitial: { enabled: true } })`.

## [0.4.7] - 2026-03-18

### Fixed

- `pubads().updateCorrelator()` is now called on SPA navigation so
  GAM treats route changes as a new pageview for reporting.

### Changed

- Expanded GPT TypeScript interfaces; added `updateCorrelator` to
  `PubAdsService`.

## [0.4.6] - 2026-03-18

### Fixed

- Read iframe dimensions for container sizing so the GPT container
  matches the rendered creative when `event.size` is unavailable.

## [0.4.5] - 2026-03-18

### Fixed

- Resize the GPT container to match the rendered creative.

## [0.4.4] - 2026-03-18

### Fixed

- Race condition between `<dreams-ad-engine>` mount and
  `DreamsAdConfig.init()`: components now `await
  DreamsAdConfig.whenReady()` before resolving named slots.

## [0.4.2] - 2026-03-18

### Changed

- Rewrote README for the v0.4.x API.

## [0.4.1] - 2026-03-17

### Fixed

- GPT lifecycle for APS rendering and slot dimensions. Calls
  `disableInitialLoad()` before `enableServices()` so `display()` only
  registers slots without fetching; all fetches go through explicit
  `refresh()`. Fixes the double-request bug when APS is enabled.
- Move `enableLazyLoad()` and `setCentering()` from per-slot
  `renderSlot()` to `initGoogleTag()` before `enableServices()` per
  GPT requirements. New `lazyLoad` and `centering` options on
  `DreamsAdConfig`.
- Set `min-height: 2px` on slot divs to prevent 0×0 collapse that
  blocks GPT iframe creation. Remove duplicate
  `addService(pubads())` call.

## [0.4.0] - 2026-03-10

### Added

- **SSR-safe server entry**: New `./server` export resolves to a
  pure-TypeScript bundle (`dist/dreams-ad-engine-server.js`) exporting
  only `DreamsAdConfig`, `DreamsTargetingService`, types, and
  constants. Imports nothing browser-only, fixing Next.js App Router
  builds that crash on `customElements`.

### Changed

- Upgrade Lit to 3.3.2, TypeScript to 5.9.3, Vite to 7.3.1, Biome to
  2.4.6. Remove dead `cz-conventional-changelog` devDep.

## [0.3.0] - 2026-02-02

### Added

- **Viewability Service (`ViewabilityService`)**: IAB-compliant viewability tracking
  - Tracks 50% visibility for 2+ seconds (configurable)
  - Uses IntersectionObserver for efficient tracking
  - Emits `viewability:viewable`, `viewability:hidden`, `viewability:impression` events
  - Methods: `track()`, `untrack()`, `getMetrics()`, `getAllMetrics()`, `configure()`

- **Skeleton Component (`DreamsAdSkeleton`)**: Loading placeholder with shimmer animation
  - Responsive sizing based on slot type and viewport
  - Helper function `getSkeletonDimensions()` for dynamic sizing
  - Automatic show/hide based on ad slot render events

- **Ad Block Detector (`AdBlockDetector`)**: Three-method detection service
  - Tests googletag availability, bait element injection, and fetch requests
  - Returns confidence level and detection methods
  - Configurable via `configure()` method

- **Refresh Manager (`RefreshManager`)**: Safe auto-refresh with safeguards
  - Enforces 30-second minimum interval
  - Checks page visibility before refresh
  - Configurable slots and intervals
  - Emits `adrefresh:before` and `adrefresh:after` events

- **Sticky Manager (`StickyManager`)**: Smart sticky ads
  - Configurable positions, offsets, and transitions
  - Dynamic header height detection
  - Tracks sticky time metrics
  - Emits `sticky:start` and `sticky:end` events

- **Logger (`Logger`)**: Production-aware logging utility
  - Respects `window.DREAMS_AD_DEBUG` flag
  - Auto-detects production environment (localhost detection)
  - Configurable log levels and prefix

- **New component properties**:
  - `trackViewability`: Enable IAB-compliant viewability tracking (default: false)
  - `showSkeleton`: Show loading skeleton while ad loads (default: false)

### Fixed

- **Promise resolution bug in DreamsTargetingService**: Added try-finally pattern to properly clear pending promise
- **Memory leaks**: Added `disconnectedCallback()` with proper cleanup for event listeners and observers
- **SPA navigation handling**: Added popstate, hashchange, and History API interception for proper slot cleanup
- **FirstImpression compatibility**: Check `pubadsReady` before calling `enableServices()` to avoid conflicts
- **APS race condition**: Added timeout fallback if APS bid never resolves
- **JSON parsing errors**: Added try-catch around JSON.parse for mapping, sizing, and targeting
- **Display logic**: Fixed dual-if to if/else to prevent conflicting display states
- **Lazy load scope**: Added global flag to prevent multiple lazy load configurations
- **Config re-initialization**: Added `force` option and warning for duplicate initialization

### Changed

- Improved TypeScript interfaces with `pubadsReady` and `removeEventListener` on GPT types
- All new features are opt-in with disabled defaults for backward compatibility

## [0.2.1] - 2025-01-10

### Fixed

- Build configuration to include dist folder in repository

## [0.2.0] - 2025-01-09

### Added

- **Configuration Provider (`DreamsAdConfig`)**: Centralized configuration management for ad settings
  - Initialize once with `DreamsAdConfig.init()` and use throughout your application
  - Built-in slot presets for common ad positions (top-1 through top-5, box-1 through box-5, footer, interstitial)
  - Runtime slot registration with `registerSlot()`
  - Methods: `getNetworkId()`, `getSitePrefix()`, `getPubId()`, `getSlot()`, `buildAdUnit()`, etc.

- **Targeting Service (`DreamsTargetingService`)**: Automatic targeting with caching and retry logic
  - Polls for `window.dfp["@context"]` with configurable retry settings
  - Caches targeting per URL to avoid redundant polling
  - Builds targeting from page context (postId, catId, tagId, typeId, catName, author, URL)
  - Support for retargeting segments via `window._rl_gen_sg()`
  - Methods: `getTargeting()`, `getTargetingSync()`, `buildFromContext()`, `clearCache()`

- **New component properties**:
  - `slot`: Use named slot configurations (e.g., `slot="top-1"`)
  - `autoTargeting`: Enable automatic targeting from page context

- **TypeScript exports**: Full type definitions for all new interfaces
  - `DFPContext`, `TargetingOptions`, `TargetingResult`
  - `AdConfigInit`, `LazyLoadConfig`, `SlotConfig`

### Changed

- Updated Vite configuration for proper library build output
- Improved TypeScript types for `mapping`, `sizing`, and `targeting` properties
- Component now uses `resolvedTargeting` internally for better state management

### Fixed

- Build configuration now correctly outputs ES module library format

## [0.0.9] - 2024-10-28

### Added

-   Managing CSS styles using variables

### Removed

-   Property minHeight of element

## [0.1.0] - 2024-11-06

### Added

-   Support for amazon apstag

## [0.1.1] - 2024-11-08

### Added

-   Property bidTimeout of amazon apstag

### Fixed

-   Fixed refresh in slot when apstag is used

## [0.1.3] - 2024-11-11

### Fixed

-   Fixed interstitial display

## [0.1.5] - 2024-11-25

### Fixed

-   Fixed initialization of apsgtag

## [0.1.6] - 2024-11-27

### Fixed

-   Multiple initialization of apstag

### Added

-   Property targeting for ads
-   Property setCentering for ads
-   Property enableLazyLoad for ads
-   Property configLazyLoad for ads
