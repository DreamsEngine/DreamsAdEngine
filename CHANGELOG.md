# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
