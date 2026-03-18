# Dreams Ad Engine

A lightweight, framework-agnostic Web Component for Google Ad Manager (GPT) with optional Amazon APS header bidding. Built with [Lit](https://lit.dev/) for compatibility across React, Next.js, Vue, Nuxt, Qwik, WordPress, and vanilla HTML.

## Features

- **Framework agnostic** — works with any framework or plain HTML
- **Google Publisher Tags (GPT)** integration with proper lifecycle management
- **Amazon APS** header bidding (opt-in via config)
- **SSR-safe** — dedicated server entry for Next.js App Router and Node.js environments
- **Responsive ads** with size mapping per viewport
- **Centralized config** — initialize once, use slot names everywhere
- **Auto-targeting** — polls CMS context and caches per URL
- **SPA support** — detects client-side navigation and cleans up slots
- **Optional services** — viewability tracking, skeleton loaders, ad block detection, sticky ads, auto-refresh, logging

## Installation

```bash
pnpm add @dreamsengine/dreams-ad-engine
```

### Required Scripts

Add the GPT script to your HTML `<head>`:

```html
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
```

If using Amazon APS, also add:

```html
<script async src="https://c.amazon-adsystem.com/aax2/apstag.js"></script>
```

---

## Quick Start

### 1. Initialize config (once, at app startup)

```typescript
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

DreamsAdConfig.init({
  networkId: "270959339",
  sitePrefix: "mysite",
  pubId: "your-amazon-pub-id", // Optional: enables APS for all slots
  lazyLoad: {                  // Optional: enables GPT lazy loading
    fetchMarginPercent: 500,
    renderMarginPercent: 200,
    mobileScaling: 2.0,
  },
  centering: true,             // Optional: center ads horizontally
});
```

### 2. Place ad components

```html
<dreams-ad-engine slot="top-1" auto-targeting></dreams-ad-engine>
<dreams-ad-engine slot="box-1" auto-targeting></dreams-ad-engine>
```

That's it. The component resolves network ID, ad unit path, size mapping, and APS configuration from `DreamsAdConfig` automatically.

> **Race-safe:** Components using `slot` that mount before `init()` completes will wait automatically (up to 5s). This handles Next.js dynamic imports, lazy hydration, and async module loading without any special ordering.

### Manual configuration (no config provider)

For full control over individual slots without `DreamsAdConfig`. No `init()` call needed — components render immediately using the provided attributes:

```html
<dreams-ad-engine
  networkId="270959339"
  adUnit="mysite-is-t-01"
  mapping='[{"viewport":[320,0],"sizing":[[320,50]]}]'
  sizing="[[320,50],[728,90]]"
  targeting='[{"key":"page","value":"home"}]'
></dreams-ad-engine>
```

---

## Configuration Provider

`DreamsAdConfig` is a singleton that centralizes all ad settings. Initialize it once before any `<dreams-ad-engine>` components mount.

### `DreamsAdConfig.init(options)`

```typescript
DreamsAdConfig.init({
  // Required
  networkId: string,           // Google Ad Manager network ID
  sitePrefix: string,          // Prefix for ad unit paths (e.g., "mysite")

  // Optional — Amazon APS
  pubId?: string,              // APS publisher ID. If set, enables APS for all slots.
  bidTimeout?: number,         // APS bid timeout in ms (default: 2000)

  // Optional — Global GPT settings (applied before enableServices)
  lazyLoad?: LazyLoadConfig | false,  // GPT lazy load config, or false to disable
  centering?: boolean,                // Center ads horizontally (default: false)

  // Optional — Slot overrides
  slots?: Record<string, SlotConfig>, // Custom slot definitions (merged with defaults)

  // Optional — Re-initialization
  force?: boolean,             // Set true to overwrite existing config
});
```

### Methods

```typescript
DreamsAdConfig.whenReady(timeout?: number): Promise<void>  // Awaits init(), 5s default timeout
DreamsAdConfig.isInitialized(): boolean
DreamsAdConfig.getNetworkId(): string
DreamsAdConfig.getSitePrefix(): string
DreamsAdConfig.getPubId(): string | undefined
DreamsAdConfig.getBidTimeout(): number
DreamsAdConfig.getLazyLoad(): LazyLoadConfig | false
DreamsAdConfig.getCentering(): boolean
DreamsAdConfig.getSlot(name: string): SlotConfig | undefined
DreamsAdConfig.getSlotMapping(name: string): DreamsAdMapping[]
DreamsAdConfig.getSlotSizing(name: string): number[][]
DreamsAdConfig.buildAdUnit(name: string): string
DreamsAdConfig.registerSlot(name: string, config: SlotConfig): void
DreamsAdConfig.reset(): void
```

### Built-in Slot Presets

12 pre-configured slots with responsive size mappings:

| Slot Name      | Position     | Sizes                              |
| -------------- | ------------ | ---------------------------------- |
| `top-1`        | top          | 320x50, 320x100, 728x90, 970x250  |
| `top-2`        | top          | 300x250, 320x50, 728x90, 970x90   |
| `top-3`        | top          | 300x250, 320x50, 728x90, 970x90   |
| `top-4`        | top          | 300x250, 320x50, 728x90, 970x90   |
| `top-5`        | top          | 300x250, 320x50, 728x90           |
| `box-1`        | box          | 300x250, 300x600                   |
| `box-2`        | box          | 300x250, 300x600, 1x1             |
| `box-3`        | box          | 300x250, 300x600, 1x1             |
| `box-4`        | box          | 300x250, 300x600, 1x1             |
| `box-5`        | box          | 300x250, 300x600, 1x1             |
| `footer`       | footer       | 320x50, 320x100                   |
| `interstitial` | interstitial | 1x1                                |

Override or extend with `slots` in `init()`.

---

## Component Reference

### `<dreams-ad-engine>`

| Property        | Type    | Default       | Description                             |
| --------------- | ------- | ------------- | --------------------------------------- |
| `slot`          | String  | —             | Slot name from config (e.g., `"top-1"`) |
| `networkId`     | String  | —             | GAM network ID (auto from config)       |
| `adUnit`        | String  | —             | Ad unit path (auto from config)         |
| `mapping`       | Array   | `[]`          | Viewport/sizing mappings (auto from config) |
| `sizing`        | Array   | `[]`          | Supported ad sizes (auto from config)   |
| `targeting`     | Array   | `[]`          | Manual targeting key-value pairs        |
| `autoTargeting` | Boolean | `false`       | Enable automatic CMS targeting          |
| `refresh`       | Boolean | `false`       | Register slot for auto-refresh pool     |
| `enableTitle`   | Boolean | `false`       | Show label above ad                     |
| `title`         | String  | `"Publicidad"`| Custom label text                       |
| `trackViewability` | Boolean | `false`    | Enable IAB viewability tracking         |
| `showSkeleton`  | Boolean | `false`       | Show skeleton loader until ad renders   |

When using `slot` with `DreamsAdConfig`, the component auto-resolves `networkId`, `adUnit`, `mapping`, `sizing`, `pubId`, and APS settings from the config provider.

### GPT Lifecycle

The component manages GPT with the following sequence:

1. **First component mounts** — waits for `DreamsAdConfig.whenReady()` if config is pending, then calls `disableInitialLoad()`, applies `lazyLoad` and `centering` from config, then `enableServices()`. If config is never initialized (manual mode), GPT enables without config settings after timeout.
2. **Each component** — defines a slot, registers size mapping, calls `display()` (register only), then `refresh()` (actual fetch)
3. **With APS** — `display()` registers the slot, `fetchBids()` requests bids, `setDisplayBids()` applies targeting, then `refresh()` fetches with bid data
4. **On disconnect** — destroys the GPT slot, removes event listeners, clears pending timeouts

### CSS Custom Properties

The component exposes CSS custom properties for styling:

```css
dreams-ad-engine {
  --dae-display: block;
  --dae-min-heigh: 100px;
  --dae-ad-serving-display: flex;
  --dae-ad-serving-justify-content: center;
  --dae-ad-label-color: #999;
  --dae-ad-label-font-size: 9px;
  /* See ad.styles.css for full list */
}
```

---

## SSR / Server-Side Rendering

The main entry imports Lit components that extend `HTMLElement`, which crashes in Node.js. The package provides a separate SSR-safe entry automatically via conditional exports.

### How it works

```json
// package.json exports (simplified)
{
  ".": {
    "node": "./dist/dreams-ad-engine-server.js",  // Node.js/SSR
    "default": "./dist/dreams-ad-engine.js"        // Browser
  }
}
```

- **Node.js** (Next.js SSR, Nuxt SSR) — automatically resolves the server entry, which exports only `DreamsAdConfig`, `DEFAULT_SLOTS`, and TypeScript types. No DOM dependencies.
- **Browser** — resolves the full entry with components and services.

### Explicit server import

```typescript
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine/server";
```

### Next.js App Router

```tsx
// app/layout.tsx — runs on server, uses server entry automatically
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

DreamsAdConfig.init({
  networkId: "270959339",
  sitePrefix: "mysite",
  pubId: "amazon-pub-id",
  lazyLoad: { fetchMarginPercent: 500, renderMarginPercent: 200, mobileScaling: 2 },
});

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" />
        <script async src="https://c.amazon-adsystem.com/aax2/apstag.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// components/Ad.tsx — client component, uses browser entry
"use client";
import "@dreamsengine/dreams-ad-engine";

export default function Ad({ slot }: { slot: string }) {
  return <dreams-ad-engine slot={slot} auto-targeting />;
}
```

```tsx
// app/page.tsx
import dynamic from "next/dynamic";
const Ad = dynamic(() => import("@/components/Ad"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Ad slot="top-1" />
      <article>...</article>
      <Ad slot="box-1" />
    </main>
  );
}
```

---

## Targeting Service

`DreamsTargetingService` polls your CMS context and builds GPT targeting key-value pairs.

### Setup

Your CMS or backend populates `window.dfp` on each page:

```typescript
window.dfp = {
  "@context": {
    postId: "12345",
    catId: "news",
    tagId: "sports,featured",
    typeId: "article",
    dataSection: {
      catName: "News",
      author: "John Doe",
    },
  },
};
```

### Usage

Add `auto-targeting` to the component:

```html
<dreams-ad-engine slot="top-1" auto-targeting></dreams-ad-engine>
```

The service polls for `window.dfp["@context"]` (max 20 retries at 100ms), builds targeting, caches per URL, and clears on navigation.

### Programmatic API

```typescript
import { DreamsTargetingService } from "@dreamsengine/dreams-ad-engine";

const result = await DreamsTargetingService.getTargeting();
// result.targeting: Array<{ key: string, value: string }>
// result.source: "cache" | "context" | "timeout"

DreamsTargetingService.getTargetingSync();  // Returns cache or null
DreamsTargetingService.clearCache();        // Invalidate cache
```

### Generated Keys

| Key      | Source                        |
| -------- | ----------------------------- |
| url      | `window.location.pathname`    |
| postId   | `context.postId`              |
| catId    | `context.catId`               |
| catName  | `context.dataSection.catName` |
| tag      | `context.tagId`               |
| type     | `context.typeId`              |
| taxId    | `context.taxId`               |
| author   | `context.dataSection.author`  |
| _rl      | `window._rl_gen_sg()` result  |

---

## Optional Services

All services are standalone, opt-in, and tree-shakeable. Import only what you need.

### Viewability Tracking

IAB-compliant viewability tracking using IntersectionObserver.

```typescript
import { ViewabilityService } from "@dreamsengine/dreams-ad-engine";

ViewabilityService.configure({
  threshold: 0.5,   // 50% visible (IAB standard)
  duration: 2000,   // 2 seconds (IAB standard)
  debug: false,
});

// Or enable per-component:
// <dreams-ad-engine slot="top-1" track-viewability />

// Listen for viewability events
window.addEventListener("ad:viewability", (e) => {
  console.log(e.detail); // { adId, position, isViewable, viewableTime, viewabilityRate }
});

ViewabilityService.getAllMetrics();  // Get all tracked metrics
```

### Skeleton Loaders

Shimmer placeholder while ads load. Dimensions auto-calculated from slot type and viewport.

```html
<dreams-ad-engine slot="top-1" show-skeleton></dreams-ad-engine>
```

```typescript
import { getSkeletonDimensions } from "@dreamsengine/dreams-ad-engine";

const dims = getSkeletonDimensions("top-1", window.innerWidth);
// { width: 970, height: 250 } on desktop
// { width: 320, height: 50 } on mobile
```

### Ad Block Detection

Detects ad blockers via multiple methods (GPT check, bait element, network fetch).

```typescript
import { AdBlockDetector } from "@dreamsengine/dreams-ad-engine";

AdBlockDetector.configure({
  enabled: true,
  addBodyClass: true,         // Adds "ad-blocker-detected" to body
  timeout: 1000,
});

const result = await AdBlockDetector.detect();
// result: boolean

window.addEventListener("adblock:detected", () => {
  // Show alternative content
});
```

### Smart Sticky Ads

Sticky positioning with scroll tracking and viewport guards.

```typescript
import { StickyManager } from "@dreamsengine/dreams-ad-engine";

StickyManager.configure({
  enabled: true,
  positions: ["box-2", "box-3"],  // Which slots can be sticky
  topOffset: 80,                   // Pixels from top
  minViewportHeight: 768,          // Disable on short viewports
});
```

### Auto-Refresh

Refresh ads on a timer with GAM policy safeguards (30s minimum, tab visibility check).

```typescript
import { RefreshManager } from "@dreamsengine/dreams-ad-engine";

RefreshManager.configure({
  enabled: true,
  interval: 60000,              // 60 seconds (enforces 30s minimum)
  checkVisibility: true,        // Skip refresh when tab is hidden
  disableOnSinglePost: true,    // Disable on article pages
});

RefreshManager.start();

// Manual control
RefreshManager.block();    // Temporarily prevent refreshes
RefreshManager.unblock();
RefreshManager.stop();
```

### Logger

Production-aware logging that auto-disables on production hostnames.

```typescript
import { Logger } from "@dreamsengine/dreams-ad-engine";

Logger.configure({
  enabled: "auto",              // true in dev, false in prod
  prefix: "[DreamsAdEngine]",
  verbose: false,
});

Logger.log("Slot rendered");
Logger.warn("No targeting context");
Logger.error("GPT not loaded");    // Always logs, even in prod
```

---

## SPA Support

The component automatically detects client-side navigation by intercepting `pushState`, `replaceState`, `popstate`, and `hashchange`. On navigation:

1. All existing GPT slots are destroyed
2. Global slot arrays are cleared
3. Targeting cache is invalidated
4. New components re-initialize their slots

No configuration needed. Works with Next.js, React Router, Vue Router, and hash-based routing.

---

## Framework Examples

### React

```tsx
import { useEffect } from "react";
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

function App() {
  useEffect(() => {
    DreamsAdConfig.init({
      networkId: "270959339",
      sitePrefix: "mysite",
    });
    import("@dreamsengine/dreams-ad-engine");
  }, []);

  return <dreams-ad-engine slot="top-1" auto-targeting />;
}
```

### Vue / Nuxt

```vue
<script setup>
import { onMounted } from "vue";
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

const props = defineProps({ slot: { type: String, required: true } });

onMounted(async () => {
  if (!DreamsAdConfig.isInitialized()) {
    DreamsAdConfig.init({ networkId: "270959339", sitePrefix: "mysite" });
  }
  await import("@dreamsengine/dreams-ad-engine");
});
</script>

<template>
  <dreams-ad-engine :slot="slot" auto-targeting />
</template>
```

In Nuxt, wrap with `<ClientOnly>`:

```vue
<ClientOnly>
  <Ad slot="top-1" />
</ClientOnly>
```

### WordPress (PHP)

```php
<!-- In header.php or via wp_enqueue_script -->
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script type="module">
  import { DreamsAdConfig } from 'https://cdn.jsdelivr.net/npm/@dreamsengine/dreams-ad-engine@0.4/dist/dreams-ad-engine.js';

  DreamsAdConfig.init({
    networkId: '270959339',
    sitePrefix: 'mysite',
    lazyLoad: { fetchMarginPercent: 500, renderMarginPercent: 200, mobileScaling: 2 },
  });
</script>
```

```html
<!-- In templates -->
<dreams-ad-engine slot="top-1" auto-targeting></dreams-ad-engine>
```

### Vanilla HTML

```html
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script type="module">
  import { DreamsAdConfig } from 'https://cdn.jsdelivr.net/npm/@dreamsengine/dreams-ad-engine@0.4/dist/dreams-ad-engine.js';
  DreamsAdConfig.init({ networkId: '270959339', sitePrefix: 'mysite' });
</script>

<dreams-ad-engine slot="top-1"></dreams-ad-engine>
<dreams-ad-engine slot="box-1"></dreams-ad-engine>
```

---

## TypeScript

### JSX Type Declaration

Add to your project for type-safe JSX:

```typescript
// src/custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "dreams-ad-engine": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        slot?: string;
        "auto-targeting"?: boolean;
        networkId?: string;
        adUnit?: string;
        mapping?: string;
        sizing?: string;
        targeting?: string;
        refresh?: boolean;
        "enable-title"?: boolean;
        title?: string;
        "track-viewability"?: boolean;
        "show-skeleton"?: boolean;
      },
      HTMLElement
    >;
  }
}
```

### Exported Types

```typescript
import type {
  AdConfigInit,
  LazyLoadConfig,
  SlotConfig,
  DreamsAdMapping,
  DreamsAdTargeting,
  DFPContext,
  TargetingOptions,
  TargetingResult,
} from "@dreamsengine/dreams-ad-engine";
```

---

## Migration

### From v0.3.x to v0.4.x

**Breaking:** Global GPT settings moved from component attributes to `DreamsAdConfig`:

```typescript
// Before (v0.3.x) — per-component attributes
<dreams-ad-engine slot="top-1" enableLazyLoad setCentering />

// After (v0.4.x) — config-level settings
DreamsAdConfig.init({
  networkId: "...",
  sitePrefix: "...",
  lazyLoad: { fetchMarginPercent: 500, renderMarginPercent: 200, mobileScaling: 2 },
  centering: true,
});
<dreams-ad-engine slot="top-1" />
```

**Removed properties:** `enableLazyLoad`, `setCentering`, `configLazyLoad` — these were global GPT settings that couldn't work correctly as per-component attributes.

**Deprecated:** `defaultLazyLoad` config key renamed to `lazyLoad` (accepts `LazyLoadConfig | false`). The old key still works.

**New:** SSR-safe server entry via `"node"` conditional export. Next.js App Router imports resolve automatically.

### From v0.1.x to v0.4.x

1. Install latest: `pnpm add @dreamsengine/dreams-ad-engine@latest`
2. Add `DreamsAdConfig.init()` to your app entry point
3. Replace manual attributes with `slot="name"` and `auto-targeting`
4. Set up `window.dfp["@context"]` in your CMS for auto-targeting
5. Move `pubId` from component attributes to config

---

## Browser Support

Chrome, Edge, Firefox, Safari (latest 2 versions). Requires ES2020+.

## License

GPL-3.0
