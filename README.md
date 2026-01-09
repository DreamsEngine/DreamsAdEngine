# Dreams Ad Engine

A lightweight Web Component for Google Ad Manager (GPT) integration with optional Amazon APS header bidding support. Built with [Lit](https://lit.dev/) for maximum compatibility across frameworks.

## Features

- Web Component that works with any framework (React, Next.js, Vue, Nuxt, Qwik, vanilla JS)
- Google Publisher Tags (GPT) integration
- Amazon APS header bidding support
- Responsive ad slots with size mapping
- Lazy loading support
- Centralized configuration management
- Automatic targeting with caching
- TypeScript support

## Installation

```bash
# npm
npm install @dreamsengine/dreams-ad-engine

# pnpm
pnpm add @dreamsengine/dreams-ad-engine

# yarn
yarn add @dreamsengine/dreams-ad-engine
```

## Required Scripts

Add the GPT script to your HTML head:

```html
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
```

If using Amazon APS, also add:

```html
<script async src="https://c.amazon-adsystem.com/aax2/apstag.js"></script>
```

---

## Quick Start

### Option 1: Simple Configuration (Recommended for v0.2.0+)

Initialize once in your app entry point, then use slot names throughout:

```typescript
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

// Initialize once (e.g., in layout.tsx or _app.tsx)
DreamsAdConfig.init({
  networkId: "270959339",
  sitePrefix: "mysite",
  pubId: "your-amazon-pub-id", // Optional: enables Amazon APS
});
```

Then use the component with just a slot name:

```html
<dreams-ad-engine slot="top-1" auto-targeting></dreams-ad-engine>
```

### Option 2: Manual Configuration (Backward Compatible)

Full control over each ad slot:

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

The `DreamsAdConfig` class provides centralized configuration management.

### Initialization

```typescript
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

DreamsAdConfig.init({
  networkId: "270959339",      // Required: Google Ad Manager network ID
  sitePrefix: "mysite",        // Required: Prefix for ad unit names
  pubId: "amazon-pub-id",      // Optional: Amazon APS publisher ID
  bidTimeout: 2000,            // Optional: APS bid timeout in ms (default: 2000)
  defaultLazyLoad: {           // Optional: Default lazy load settings
    fetchMarginPercent: 500,
    renderMarginPercent: 200,
    mobileScaling: 2.0,
  },
  slots: {                     // Optional: Custom slot configurations
    "custom-slot": {
      mapping: [{ viewport: [320, 0], sizing: [[300, 250]] }],
      sizing: [[300, 250]],
      position: "box",
    },
  },
});
```

### Configuration Methods

```typescript
// Check if initialized
DreamsAdConfig.isInitialized(): boolean

// Get configuration values
DreamsAdConfig.getNetworkId(): string
DreamsAdConfig.getSitePrefix(): string
DreamsAdConfig.getPubId(): string | undefined
DreamsAdConfig.getBidTimeout(): number
DreamsAdConfig.getDefaultLazyLoad(): LazyLoadConfig

// Slot management
DreamsAdConfig.getSlot(slotName: string): SlotConfig | undefined
DreamsAdConfig.getSlotMapping(slotName: string): DreamsAdMapping[]
DreamsAdConfig.getSlotSizing(slotName: string): number[][]
DreamsAdConfig.buildAdUnit(slotName: string): string

// Register custom slots at runtime
DreamsAdConfig.registerSlot(name: string, config: SlotConfig): void

// Reset configuration (useful for testing)
DreamsAdConfig.reset(): void
```

### Built-in Slot Presets

The library includes common ad slot configurations:

| Slot Name      | Position     | Common Sizes                    |
| -------------- | ------------ | ------------------------------- |
| `top-1`        | top          | 320x50, 320x100, 728x90, 970x250 |
| `top-2`        | top          | 300x250, 320x50, 728x90, 970x90 |
| `top-3`        | top          | 300x250, 320x50, 728x90, 970x90 |
| `top-4`        | top          | 300x250, 320x50, 728x90, 970x90 |
| `top-5`        | top          | 300x250, 320x50, 728x90         |
| `box-1`        | box          | 300x250, 300x600                |
| `box-2`        | box          | 300x250, 300x600, 1x1           |
| `box-3`        | box          | 300x250, 300x600, 1x1           |
| `box-4`        | box          | 300x250, 300x600, 1x1           |
| `box-5`        | box          | 300x250, 300x600, 1x1           |
| `footer`       | footer       | 320x50, 320x100                 |
| `interstitial` | interstitial | 1x1                             |

---

## Targeting Service

The `DreamsTargetingService` provides automatic targeting based on page context with caching support.

### How It Works

The service polls for a `window.dfp["@context"]` object that your CMS or backend should populate:

```typescript
// Your CMS/backend should set this on each page
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

### Automatic Usage

Simply add `auto-targeting` to your component:

```html
<dreams-ad-engine slot="top-1" auto-targeting></dreams-ad-engine>
```

The service will:
1. Poll for the DFP context (max 20 retries, 100ms interval)
2. Build targeting key-value pairs
3. Cache results per URL
4. Clear cache on navigation

### Manual Usage

```typescript
import { DreamsTargetingService } from "@dreamsengine/dreams-ad-engine";

// Async: wait for context with polling
const result = await DreamsTargetingService.getTargeting();
console.log(result.targeting); // Array of { key, value }
console.log(result.source);    // "cache" | "context" | "timeout"

// Sync: get cached targeting (returns null if not cached)
const cached = DreamsTargetingService.getTargetingSync();

// Clear cache (e.g., on route change)
DreamsTargetingService.clearCache();
```

### Configuration Options

```typescript
const result = await DreamsTargetingService.getTargeting({
  contextKey: "@context",    // Key in window.dfp (default: "@context")
  maxRetries: 20,            // Max polling attempts (default: 20)
  retryInterval: 100,        // Ms between retries (default: 100)
  includeUrl: true,          // Include URL in targeting (default: true)
  customSegmentFn: "_rl_gen_sg", // Window function for segments (default: "_rl_gen_sg")
});
```

### Generated Targeting Keys

| Key      | Source                         |
| -------- | ------------------------------ |
| url      | `window.location.pathname`     |
| catName  | `context.dataSection.catName`  |
| postId   | `context.postId`               |
| catId    | `context.catId`                |
| tag      | `context.tagId`                |
| type     | `context.typeId`               |
| taxId    | `context.taxId`                |
| author   | `context.dataSection.author`   |
| _rl      | `window._rl_gen_sg()` result   |

---

## Component Reference

### Properties

| Property       | Type    | Required | Default     | Description                                |
| -------------- | ------- | -------- | ----------- | ------------------------------------------ |
| slot           | String  | No*      | -           | Slot name from config (e.g., "top-1")      |
| autoTargeting  | Boolean | No       | false       | Enable automatic targeting                 |
| networkId      | String  | No*      | -           | Google Ad Manager network ID               |
| adUnit         | String  | No*      | -           | Full ad unit name                          |
| mapping        | String  | No*      | -           | JSON array of viewport/sizing mappings     |
| sizing         | String  | No*      | -           | JSON array of ad sizes                     |
| targeting      | String  | No       | []          | JSON array of key-value targeting pairs    |
| setCentering   | Boolean | No       | false       | Center ads horizontally                    |
| enableLazyLoad | Boolean | No       | false       | Enable GPT lazy loading                    |
| configLazyLoad | String  | No       | (see below) | JSON lazy load configuration               |
| refresh        | Boolean | No       | false       | Mark slot for refresh capability           |
| enableTitle    | Boolean | No       | false       | Show title above ad                        |
| title          | String  | No       | "Publicidad"| Custom title text                          |
| apstag         | Boolean | No       | false       | Enable Amazon APS                          |
| pubId          | String  | No       | -           | Amazon APS publisher ID                    |
| bidTimeout     | Number  | No       | 2000        | APS bid timeout in milliseconds            |

*When using `slot`, the `networkId`, `adUnit`, `mapping`, and `sizing` are automatically resolved from configuration.

### Default Lazy Load Configuration

```json
{
  "fetchMarginPercent": 500,
  "renderMarginPercent": 200,
  "mobileScaling": 2.0
}
```

---

## Framework Examples

### Next.js (App Router)

```tsx
// app/layout.tsx
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

// Initialize configuration
DreamsAdConfig.init({
  networkId: "270959339",
  sitePrefix: "mysite",
  pubId: "amazon-pub-id",
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
// components/Ad.tsx
"use client";
import "@dreamsengine/dreams-ad-engine";

export default function Ad({ slot }: { slot: string }) {
  return <dreams-ad-engine slot={slot} auto-targeting enable-lazy-load />;
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

    // Import component
    import("@dreamsengine/dreams-ad-engine");
  }, []);

  return (
    <div>
      <dreams-ad-engine slot="top-1" auto-targeting />
    </div>
  );
}
```

### Vue / Nuxt

```vue
<!-- components/Ad.vue -->
<script setup>
import { onMounted } from "vue";
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

const props = defineProps({
  slot: { type: String, required: true },
});

onMounted(async () => {
  if (!DreamsAdConfig.isInitialized()) {
    DreamsAdConfig.init({
      networkId: "270959339",
      sitePrefix: "mysite",
    });
  }
  await import("@dreamsengine/dreams-ad-engine");
});
</script>

<template>
  <dreams-ad-engine :slot="slot" auto-targeting />
</template>
```

```vue
<!-- Usage in Nuxt -->
<template>
  <ClientOnly>
    <Ad slot="top-1" />
  </ClientOnly>
</template>
```

### Qwik

```tsx
import { component$, useOnDocument, $ } from "@builder.io/qwik";
import { DreamsAdConfig } from "@dreamsengine/dreams-ad-engine";

export default component$(() => {
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      DreamsAdConfig.init({
        networkId: "270959339",
        sitePrefix: "mysite",
      });
      import("@dreamsengine/dreams-ad-engine");
    })
  );

  return <dreams-ad-engine slot="top-1" auto-targeting />;
});
```

---

## TypeScript Support

Create a type declaration file in your project:

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
        setCentering?: boolean;
        enableLazyLoad?: boolean;
        configLazyLoad?: string;
        refresh?: boolean;
        enableTitle?: boolean;
        title?: string;
        apstag?: boolean;
        pubId?: string;
        bidTimeout?: number;
      },
      HTMLElement
    >;
  }
}
```

### Exported Types

```typescript
import type {
  DreamsAdMapping,
  DreamsAdTargeting,
  DFPContext,
  TargetingOptions,
  TargetingResult,
  AdConfigInit,
  LazyLoadConfig,
  SlotConfig,
} from "@dreamsengine/dreams-ad-engine";
```

---

## Migration from v0.1.x

Version 0.2.0 is fully backward compatible. Your existing code will continue to work.

### Before (v0.1.x)

```tsx
// Manual configuration on every component
<dreams-ad-engine
  networkId="270959339"
  adUnit="mysite-is-t-01"
  mapping='[{"viewport":[320,0],"sizing":[[320,50],[320,100]]},...]'
  sizing="[[320,50],[320,100],[728,90],...]"
  targeting='[{"key":"url","value":"/home"},...]'
  apstag
  pubId="amazon-pub-id"
/>
```

### After (v0.2.0)

```tsx
// Initialize once
DreamsAdConfig.init({
  networkId: "270959339",
  sitePrefix: "mysite",
  pubId: "amazon-pub-id",
});

// Simple usage everywhere
<dreams-ad-engine slot="top-1" auto-targeting />
```

### Migration Steps

1. Install v0.2.0: `pnpm add @dreamsengine/dreams-ad-engine@latest`
2. Add `DreamsAdConfig.init()` to your app entry point
3. Optionally replace manual props with `slot` and `auto-targeting`
4. Set up `window.dfp["@context"]` in your CMS/backend for auto-targeting

---

## Refreshing Ads

To refresh ads marked with `refresh`:

```typescript
// Access the global slots array
if (window.dreamsSlotsToUpdate?.length) {
  window.googletag.pubads().refresh(window.dreamsSlotsToUpdate);
}
```

---

## Browser Support

- Chrome, Edge, Firefox, Safari (latest 2 versions)
- Requires ES2020+ support (async/await, optional chaining)

## License

GPL-3.0
