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
- **Light DOM rendering** — third-party viewability scripts (IAS, MOAT, DoubleVerify) can traverse the DOM
- **CLS prevention** — reserves min-height from responsive mapping per viewport
- **GPT native events** — `ad:rendered`, `ad:viewable`, `ad:visibility` CustomEvents with rich ad metadata
- **Privacy/consent API** — GDPR/CCPA support via `setPrivacySettings()`
- **Web interstitials & anchors** — via `defineOutOfPageSlot()` (config-driven)
- **Viewability-gated refresh** — only refreshes slots confirmed viewable by GPT
- **Accessibility** — ARIA `role="complementary"` and `aria-label="Advertisement"` on ad containers
- **Motion-safe animations** — respects `prefers-reduced-motion`
- **Backward-compatible** — graceful fallback to legacy GPT methods when `setConfig` is unavailable
- **Optional services** — skeleton loaders, ad block detection, sticky ads, auto-refresh, logging

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
  lazyLoad: {                  // Optional: enables GPT lazy loading (via setConfig)
    fetchMarginPercent: 500,
    renderMarginPercent: 200,
    mobileScaling: 2.0,
  },
  centering: true,             // Optional: center ads horizontally
  threadYield: true,           // Optional: improve INP via scheduler yield
  privacy: {                   // Optional: GDPR/CCPA settings
    restrictDataProcessing: true,
  },
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
  threadYield?: boolean,              // Enable scheduler thread yield for INP (default: false)

  // Optional — Privacy / Consent
  privacy?: PrivacyConfig,     // GDPR/CCPA settings (applied via pubads().setPrivacySettings)

  // Optional — Out-of-page ads
  interstitial?: InterstitialConfig,  // Web interstitial via defineOutOfPageSlot
  anchor?: AnchorConfig,              // Top/bottom anchor ads via defineOutOfPageSlot

  // Optional — Slot overrides
  slots?: Record<string, SlotConfig>, // Custom slot definitions (merged with defaults)

  // Optional — Re-initialization
  force?: boolean,             // Set true to overwrite existing config
});
```

### Privacy Config

```typescript
interface PrivacyConfig {
  restrictDataProcessing?: boolean;   // CCPA: restrict data processing
  childDirectedTreatment?: boolean;   // COPPA: child-directed treatment
  underAgeOfConsent?: boolean;        // GDPR: under age of consent
  trafficSource?: boolean;            // Traffic source signal
}
```

Privacy settings can also be updated at runtime (e.g., after a consent dialog):

```typescript
DreamsAdConfig.setPrivacy({ restrictDataProcessing: true });
```

### Interstitial Config

```typescript
interface InterstitialConfig {
  enabled: boolean;
  triggers?: string[];  // Reserved for future trigger configuration
}
```

Interstitials are registered globally via `defineOutOfPageSlot()` during GPT initialization. No `<dreams-ad-engine>` element needed in the DOM.

### Anchor Config

```typescript
interface AnchorConfig {
  enabled: boolean;
  position: "top" | "bottom" | "both";
}
```

Anchors are registered globally via `defineOutOfPageSlot()`. Example:

```typescript
DreamsAdConfig.init({
  networkId: "270959339",
  sitePrefix: "mysite",
  anchor: { enabled: true, position: "bottom" },
});
```

### Methods

```typescript
DreamsAdConfig.whenReady(timeout?: number): Promise<void>
DreamsAdConfig.isInitialized(): boolean
DreamsAdConfig.getNetworkId(): string
DreamsAdConfig.getSitePrefix(): string
DreamsAdConfig.getPubId(): string | undefined
DreamsAdConfig.getBidTimeout(): number
DreamsAdConfig.getLazyLoad(): LazyLoadConfig | false
DreamsAdConfig.getCentering(): boolean
DreamsAdConfig.getPrivacy(): PrivacyConfig | null
DreamsAdConfig.getInterstitial(): InterstitialConfig | null
DreamsAdConfig.getAnchor(): AnchorConfig | null
DreamsAdConfig.getThreadYield(): boolean
DreamsAdConfig.setPrivacy(config: PrivacyConfig): void  // Runtime update
DreamsAdConfig.getSlot(name: string): SlotConfig | undefined
DreamsAdConfig.getSlotMapping(name: string): DreamsAdMapping[]
DreamsAdConfig.getSlotSizing(name: string): number[][]
DreamsAdConfig.buildAdUnit(name: string): string
DreamsAdConfig.registerSlot(name: string, config: SlotConfig): void
DreamsAdConfig.reset(): void
```

### Built-in Slot Presets

11 pre-configured slots with responsive size mappings:

| Slot Name | Position | Sizes |
|-----------|----------|-------|
| `top-1`   | top      | 320x50, 320x100, 728x90, 920x250, 970x250 |
| `top-2`   | top      | 300x250, 320x50, 728x90, 970x90 |
| `top-3`   | top      | 300x250, 320x50, 728x90, 970x90 |
| `top-4`   | top      | 300x250, 320x50, 728x90, 970x90 |
| `top-5`   | top      | 300x250, 320x50, 728x90 |
| `box-1`   | box      | 300x250, 300x600 |
| `box-2`   | box      | 300x250, 300x600, 1x1 |
| `box-3`   | box      | 300x250, 300x600, 1x1 |
| `box-4`   | box      | 300x250, 300x600, 1x1 |
| `box-5`   | box      | 300x250, 300x600, 1x1 |
| `footer`  | footer   | 320x50, 320x100 |

Override or extend with `slots` in `init()`.

> **Note:** The `interstitial` slot preset was removed in v0.5.0. Use `interstitial: { enabled: true }` in config instead. See [Migration](#from-v04x-to-v050).

---

## Component Reference

### `<dreams-ad-engine>`

| Property        | Type    | Default       | Description                             |
|-----------------|---------|---------------|-----------------------------------------|
| `slot`          | String  | --            | Slot name from config (e.g., `"top-1"`) |
| `networkId`     | String  | --            | GAM network ID (auto from config)       |
| `adUnit`        | String  | --            | Ad unit path (auto from config)         |
| `mapping`       | Array   | `[]`          | Viewport/sizing mappings (auto from config) |
| `sizing`        | Array   | `[]`          | Supported ad sizes (auto from config)   |
| `targeting`     | Array   | `[]`          | Manual targeting key-value pairs        |
| `autoTargeting` | Boolean | `false`       | Enable automatic CMS targeting          |
| `refresh`       | Boolean | `false`       | Register slot for auto-refresh pool     |
| `enableTitle`   | Boolean | `false`       | Show label above ad                     |
| `title`         | String  | `"Publicidad"`| Custom label text                       |
| `trackViewability` | Boolean | `false`    | Enable legacy IntersectionObserver tracking (deprecated) |
| `showSkeleton`  | Boolean | `false`       | Show skeleton loader until ad renders   |

When using `slot` with `DreamsAdConfig`, the component auto-resolves `networkId`, `adUnit`, `mapping`, `sizing`, `pubId`, and APS settings from the config provider.

### GPT Lifecycle

The component manages GPT with the following sequence:

1. **First component mounts** -- waits for `DreamsAdConfig.whenReady()` if config is pending, then calls `disableInitialLoad()`, applies `lazyLoad` and `threadYield` via `googletag.setConfig()` (falls back to `enableLazyLoad()` on older GPT versions), applies `centering` and `privacy`, then `enableServices()`. After services are enabled, registers interstitial/anchor out-of-page slots if configured (once only, guarded against re-registration).
2. **Each component** -- defines a slot, registers size mapping, calls `display()` (register only), then `refresh()` (actual fetch)
3. **With APS** -- `display()` registers the slot, `fetchBids()` requests bids, `setDisplayBids()` applies targeting, then `refresh()` fetches with bid data
4. **On disconnect** -- destroys the GPT slot, removes all event listeners (slotRenderEnded, impressionViewable, slotVisibilityChanged), clears pending timeouts

### CLS Prevention

The component computes a reserve `min-height` from the responsive size mapping for the current viewport width. This prevents layout shift when the ad creative renders.

**How it works:**
1. Finds the mapping entry whose viewport width is closest to (but not exceeding) `window.innerWidth`
2. Takes the maximum height from that entry's sizes (excluding 1x1)
3. Applies as `min-height` on the ad container

When `slotRenderEnded` fires with `isEmpty: true`, the reserve height collapses to 0.

### Events

Every `<dreams-ad-engine>` component dispatches these CustomEvents (all `bubbles: true`):

#### `ad:rendered`

Fired on `slotRenderEnded`. Contains rich metadata from GPT:

```typescript
element.addEventListener("ad:rendered", (e) => {
  const {
    isEmpty,       // boolean — true if no creative filled
    size,          // [number, number] | null — rendered creative size
    advertiserId,  // number | null
    creativeId,    // number | null
    lineItemId,    // number | null
    isBackfill,    // boolean
    slotId,        // string — DOM element ID
    adUnit,        // string — full ad unit path
  } = e.detail;
});
```

#### `ad:viewable`

Fired on GPT `impressionViewable` -- MRC-accredited viewability signal. This is the standard used by advertisers and verification vendors.

```typescript
element.addEventListener("ad:viewable", (e) => {
  const { slotId, adUnit } = e.detail;
});
```

#### `ad:visibility`

Fired on GPT `slotVisibilityChanged`, throttled to 25% threshold crossings (0%, 25%, 50%, 75%, 100%) to prevent scroll jank.

```typescript
element.addEventListener("ad:visibility", (e) => {
  const { slotId, adUnit, inViewPercentage } = e.detail;
  // inViewPercentage dispatched at: 0, 25, 50, 75, 100
});
```

### CSS Class Names

All internal class names use a `dae-` prefix to prevent collisions with publisher CSS:

| Class | Description |
|-------|-------------|
| `dae-container` | Outer wrapper |
| `dae-serving` | Inner flex container with `[AD]` placeholder |
| `dae-slot` | The GPT ad container div (created dynamically, has `role="complementary"`) |
| `dae-label` | "Publicidad" label (when `enableTitle` is set) |
| `dae-loader` | Shimmer loading animation (uses `transform`-based animation, compositor-only) |
| `dae-skeleton` | Skeleton loader placeholder (from `<dreams-ad-skeleton>`) |
| `dae-skeleton-label` | Optional "Ad" label on skeleton |

### CSS Custom Properties

The component renders in light DOM, so custom properties apply directly in your stylesheets:

```css
dreams-ad-engine {
  --dae-display: block;
  --dae-min-height: 100px;
  --dae-contain: layout style;  /* safe for expandable creatives */
  --dae-ad-serving-display: flex;
  --dae-ad-serving-justify-content: center;
  --dae-ad-serving-padding-block: 1rem;
  --dae-ad-serving-margin-block: 1rem;
  --dae-ad-serving-min-height: 100px;
  --dae-ad-label-color: #999;
  --dae-ad-label-font-size: 9px;
  --dae-ad-serving-before-content: "[AD]";
  /* See ad.styles.css for full list */
}
```

The skeleton component uses separate custom properties:

```css
dreams-ad-skeleton {
  --dreams-skeleton-bg: #f0f0f0;
  --dreams-skeleton-shine: rgba(255, 255, 255, 0.6);
  --dreams-skeleton-radius: 4px;
  --dreams-skeleton-label-color: #999;
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
    "node": "./dist/dreams-ad-engine-server.js",
    "default": "./dist/dreams-ad-engine.js"
  }
}
```

- **Node.js** (Next.js SSR, Nuxt SSR) -- automatically resolves the server entry, which exports only `DreamsAdConfig`, `DEFAULT_SLOTS`, and TypeScript types. No DOM dependencies.
- **Browser** -- resolves the full entry with components and services.

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
  threadYield: true,
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
|----------|-------------------------------|
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

> **Deprecation notice (v0.5.0):** The `ViewabilityService` IntersectionObserver-based tracking is deprecated. GPT's native `impressionViewable` event (MRC-accredited) is now exposed via the `ad:viewable` CustomEvent. Prefer listening to `ad:viewable` events on the component. `ViewabilityService` will be removed in v1.0.

For legacy usage:

```typescript
import { ViewabilityService } from "@dreamsengine/dreams-ad-engine";

ViewabilityService.configure({
  threshold: 0.5,   // 50% visible (IAB standard)
  duration: 2000,   // 2 seconds (IAB standard)
  debug: false,
});

// Or enable per-component:
// <dreams-ad-engine slot="top-1" track-viewability />
```

**Recommended (v0.5.0+):** Use native GPT events instead:

```typescript
document.querySelector("dreams-ad-engine").addEventListener("ad:viewable", (e) => {
  console.log("MRC-accredited viewable:", e.detail.slotId);
});
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

Refresh ads on a timer with GAM policy safeguards (30s minimum, tab visibility check, viewability gate).

```typescript
import { RefreshManager } from "@dreamsengine/dreams-ad-engine";

RefreshManager.configure({
  enabled: true,
  interval: 60000,              // 60 seconds (enforces 30s minimum)
  checkVisibility: true,        // Skip refresh when tab is hidden
  disableOnSinglePost: true,    // Disable on article pages
  viewabilityGated: true,       // Only refresh slots confirmed viewable by GPT (default: true)
});

RefreshManager.start();

// Manual control
RefreshManager.block();    // Temporarily prevent refreshes
RefreshManager.unblock();
RefreshManager.stop();
```

**Viewability gating (v0.5.0):** When `viewabilityGated: true` (default), only slots that have received a GPT `impressionViewable` event will be included in refresh cycles. This ensures compliance with GAM refresh policies and prevents wasting impressions on non-viewable slots. Each refreshed slot also receives a `refresh_count` targeting key for reporting.

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
2. Correlator is updated for new pageview tracking
3. Global slot arrays are cleared
4. Targeting cache is invalidated
5. New components re-initialize their slots

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
      threadYield: true,
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

```html
<!-- In header.php or via wp_enqueue_script -->
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script type="module">
  import { DreamsAdConfig } from 'https://cdn.jsdelivr.net/npm/@dreamsengine/dreams-ad-engine@0.5/dist/dreams-ad-engine.js';

  DreamsAdConfig.init({
    networkId: '270959339',
    sitePrefix: 'mysite',
    lazyLoad: { fetchMarginPercent: 500, renderMarginPercent: 200, mobileScaling: 2 },
    threadYield: true,
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
  import { DreamsAdConfig } from 'https://cdn.jsdelivr.net/npm/@dreamsengine/dreams-ad-engine@0.5/dist/dreams-ad-engine.js';
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
  AnchorConfig,
  InterstitialConfig,
  LazyLoadConfig,
  PrivacyConfig,
  SlotConfig,
  DreamsAdMapping,
  DreamsAdTargeting,
  SlotRenderEndedEvent,
  ImpressionViewableEvent,
  SlotVisibilityChangedEvent,
  DFPContext,
  TargetingOptions,
  TargetingResult,
  RefreshConfig,
  RefreshEvent,
} from "@dreamsengine/dreams-ad-engine";
```

---

## Migration

### From v0.4.x to v0.5.x

> **Use v0.5.1+.** Version 0.5.0 had a bug where light DOM styles were not injected into the document. v0.5.1 fixes this and adds additional hardening.

#### Breaking: Light DOM (Shadow DOM removed)

Components now render in light DOM. This improves compatibility with third-party viewability verification scripts (IAS, MOAT, DoubleVerify) that cannot traverse shadow roots.

**Impact:** If your CSS targets the component's internal structure via shadow-piercing selectors or `::slotted(*)`, update accordingly:

```css
/* Before (v0.4.x) — shadow DOM */
dreams-ad-engine::part(...) { }

/* After (v0.5.0) — light DOM, target classes directly */
dreams-ad-engine .dae-container { }
dreams-ad-engine .dae-serving { }
```

#### Breaking: CSS class names renamed

All internal class names now use a `dae-` prefix to prevent collisions with publisher CSS.

| v0.4.x | v0.5.x |
|--------|--------|
| `.ad-container` | `.dae-container` |
| `.ad-serving` | `.dae-serving` |
| `.ad-serving-rendered` | `.dae-slot` |
| `.ad-label` | `.dae-label` |
| `.ad-loader` | `.dae-loader` |
| `.skeleton` | `.dae-skeleton` |
| `.skeleton-label` | `.dae-skeleton-label` |

**Action required:** Search your theme CSS for any of the v0.4.x class names and update them. CSS custom properties (`--dae-*`) remain unchanged.

#### Breaking: `interstitial` slot removed from defaults

The `interstitial` preset slot (`<dreams-ad-engine slot="interstitial">`) has been removed. Interstitials now use GPT's `defineOutOfPageSlot()` API, which is the correct method per Google's documentation.

```typescript
// Before (v0.4.x)
<dreams-ad-engine slot="interstitial"></dreams-ad-engine>

// After (v0.5.0) — config-driven, no DOM element needed
DreamsAdConfig.init({
  networkId: "...",
  sitePrefix: "...",
  interstitial: { enabled: true },
});
```

Using `slot="interstitial"` in v0.5.0 will log a deprecation warning and skip rendering.

#### Breaking: CLS reserve height changed

The ad container `min-height` is now computed from the responsive size mapping for the current viewport instead of a flat `2px`. This means ad slots will reserve space matching their largest configured size at the current breakpoint, preventing CLS but showing a taller placeholder before fill.

When an ad returns empty (`isEmpty: true`), the reserve collapses to `0`.

#### New: GPT `setConfig()` migration

`enableLazyLoad()` is replaced by `googletag.setConfig({ lazyLoad: ... })` per GPT's July 2025 deprecation notice. The library detects whether `setConfig` is available and falls back to `enableLazyLoad()` on older GPT script versions. No action required -- the config API is unchanged.

#### New: `threadYield` option

Enables GPT scheduler thread yield for improved INP (Interaction to Next Paint):

```typescript
DreamsAdConfig.init({
  // ...
  threadYield: true,
});
```

#### New: Privacy / consent API

```typescript
DreamsAdConfig.init({
  // ...
  privacy: {
    restrictDataProcessing: true,  // CCPA
    childDirectedTreatment: false, // COPPA
    underAgeOfConsent: false,      // GDPR
  },
});

// Runtime update after consent dialog
DreamsAdConfig.setPrivacy({ restrictDataProcessing: false });
```

#### New: Rich `ad:rendered` events

Components now dispatch `ad:rendered`, `ad:viewable`, and `ad:visibility` CustomEvents with GPT metadata. See [Events](#events).

#### New: Viewability-gated refresh

`RefreshManager` now defaults to `viewabilityGated: true`, only refreshing slots that GPT has confirmed as viewable. Opt out with `viewabilityGated: false`.

#### Deprecated: `ViewabilityService.track()`

The IntersectionObserver-based `ViewabilityService` is deprecated in favor of GPT's native `impressionViewable` event (MRC-accredited). Listen for `ad:viewable` on the component instead. Will be removed in v1.0.

#### New: Anchor ads

```typescript
DreamsAdConfig.init({
  // ...
  anchor: { enabled: true, position: "bottom" },  // or "top" or "both"
});
```

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

**Removed properties:** `enableLazyLoad`, `setCentering`, `configLazyLoad` -- these were global GPT settings that couldn't work correctly as per-component attributes.

**Deprecated:** `defaultLazyLoad` config key renamed to `lazyLoad` (accepts `LazyLoadConfig | false`). The old key still works.

**New:** SSR-safe server entry via `"node"` conditional export. Next.js App Router imports resolve automatically.

### From v0.1.x to v0.5.x

1. Install latest: `pnpm add @dreamsengine/dreams-ad-engine@latest`
2. Add `DreamsAdConfig.init()` to your app entry point
3. Replace manual attributes with `slot="name"` and `auto-targeting`
4. Set up `window.dfp["@context"]` in your CMS for auto-targeting
5. Move `pubId` from component attributes to config
6. Replace `slot="interstitial"` with `interstitial: { enabled: true }` in config
7. Update any CSS targeting old class names (`.ad-container` -> `.dae-container`, etc.)
8. Replace `ViewabilityService.track()` usage with `ad:viewable` event listeners

---

## Accessibility

Ad containers are rendered with `role="complementary"` and `aria-label="Advertisement"` for screen reader identification.

Loading animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .dae-loader::after { animation: none; }
}
```

This is built in -- no configuration needed.

---

## Browser Support

Chrome, Edge, Firefox, Safari (latest 2 versions). Requires ES2020+.

## License

GPL-3.0
