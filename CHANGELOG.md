# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
