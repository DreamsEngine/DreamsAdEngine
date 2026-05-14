var d = (s) => {
  throw TypeError(s);
};
var f = (s, i, t) => i.has(s) || d("Cannot " + t);
var c = (s, i, t) => i.has(s) ? d("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(s) : i.set(s, t);
var p = (s, i, t) => (f(s, i, "access private method"), t);
const u = {
  enabled: "auto",
  prefix: "[DreamsAdEngine]",
  verbose: !1
}, a = class a {
  /**
   * Configure the logger
   */
  static configure(i) {
    this.config = { ...u, ...i };
  }
  /**
   * Log info message
   */
  static log(i, ...t) {
    this.shouldLog() && console.log(`${this.config.prefix} ${i}`, ...t);
  }
  /**
   * Log warning message
   */
  static warn(i, ...t) {
    this.shouldLog() && console.warn(`${this.config.prefix} ${i}`, ...t);
  }
  /**
   * Log error message (always logs in production, but less verbose)
   */
  static error(i, ...t) {
    this.isProduction() ? console.error(`${this.config.prefix} Error: ${i}`) : console.error(`${this.config.prefix} ${i}`, ...t);
  }
  /**
   * Log verbose/debug message (only when verbose is enabled or runtime forced)
   */
  static debug(i, ...t) {
    this.shouldLog() && (!this.config.verbose && !this.isRuntimeForced() || console.debug(`${this.config.prefix} ${i}`, ...t));
  }
  /**
   * Log a table (useful for metrics)
   */
  static table(i) {
    this.shouldLog() && console.table(i);
  }
  /**
   * Group logs together
   */
  static group(i) {
    this.shouldLog() && console.group(`${this.config.prefix} ${i}`);
  }
  /**
   * End log group
   */
  static groupEnd() {
    this.shouldLog() && console.groupEnd();
  }
  /**
   * Time a operation
   */
  static time(i) {
    this.shouldLog() && console.time(`${this.config.prefix} ${i}`);
  }
  /**
   * End timing
   */
  static timeEnd(i) {
    this.shouldLog() && console.timeEnd(`${this.config.prefix} ${i}`);
  }
  /**
   * Dispatch a structured `ad:error` CustomEvent on the host element and
   * mirror it to `window.dataLayer` for GTM consumers. Also logs the error
   * via Logger.error so it surfaces in console regardless of debug mode.
   *
   * Consumers wire vendor-specific tracking (Sentry, Datadog, etc.) by
   * listening for `ad:error` — the library stays vendor-agnostic.
   */
  static dispatchAdError(i, t) {
    i.dispatchEvent(
      new CustomEvent("ad:error", {
        bubbles: !0,
        composed: !0,
        detail: t
      })
    ), typeof window < "u" && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
      event: "dreams_ad_error",
      phase: t.phase,
      slotId: t.slotId,
      adUnit: t.adUnit,
      error_message: t.error instanceof Error ? t.error.message : String(t.error)
    })), a.error(
      `[${t.phase}] ${t.slotId || t.adUnit}: ${t.error instanceof Error ? t.error.message : String(t.error)}`
    );
  }
  static shouldLog() {
    return this.config.enabled === !0 ? !0 : this.config.enabled === !1 ? !1 : this.isRuntimeForced() ? !0 : !this.isProduction();
  }
  static isRuntimeForced() {
    return typeof window < "u" && window.__dreamsDebug === !0;
  }
  static isProduction() {
    if (typeof window > "u") return !0;
    const i = window.location.hostname;
    return i !== "localhost" && !i.includes(".local") && !i.includes("127.0.0.1") && !i.includes("192.168.") && !i.includes("0.0.0.0");
  }
};
a.config = u;
let n = a;
const w = {
  "top-1": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [320, 50],
          [320, 100]
        ]
      },
      { viewport: [720, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 0],
        sizing: [
          [920, 250],
          [970, 90],
          [728, 90]
        ]
      },
      {
        viewport: [1280, 0],
        sizing: [
          [920, 250],
          [970, 250],
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [320, 50],
      [320, 100],
      [728, 90],
      [970, 90],
      [920, 250],
      [970, 250]
    ],
    position: "top"
  },
  "top-2": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50]
        ]
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 0],
        sizing: [
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90]
    ],
    position: "top"
  },
  "top-3": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50]
        ]
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 0],
        sizing: [
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90]
    ],
    position: "top"
  },
  "top-4": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50]
        ]
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 0],
        sizing: [
          [970, 90],
          [728, 90]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90]
    ],
    position: "top"
  },
  "top-5": {
    mapping: [
      { viewport: [320, 0], sizing: [[300, 250]] },
      { viewport: [760, 0], sizing: [[728, 90]] }
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90]
    ],
    position: "top"
  },
  "box-1": {
    mapping: [{ viewport: [320, 0], sizing: [[300, 250]] }],
    sizing: [
      [300, 250],
      [300, 600]
    ],
    position: "box"
  },
  "box-2": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1]
    ],
    position: "box"
  },
  "box-3": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1]
    ],
    position: "box"
  },
  "box-4": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1]
    ],
    position: "box"
  },
  "box-5": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600]
        ]
      }
    ],
    sizing: [
      [1, 1],
      [300, 250],
      [300, 600]
    ],
    position: "box"
  },
  footer: {
    mapping: [
      {
        viewport: [0, 0],
        sizing: [
          [320, 50],
          [320, 100]
        ]
      }
    ],
    sizing: [
      [320, 50],
      [320, 100]
    ],
    position: "footer"
  }
}, z = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2
}, y = (() => {
  if (typeof window > "u") return !1;
  try {
    return new URLSearchParams(window.location.search).get("dae-debug") === "1";
  } catch {
    return !1;
  }
})();
var l, h;
const e = class e {
  static createReadyPromise() {
    return new Promise((i) => {
      e.readyResolve = i;
    });
  }
  static init(i) {
    var o;
    if (p(o = e, l, h).call(o, i.debug), this.instance && !i.force) {
      n.warn(
        "Already initialized. Use { force: true } to override."
      );
      return;
    }
    let t = !1;
    i.lazyLoad !== void 0 ? t = i.lazyLoad : i.defaultLazyLoad && (t = i.defaultLazyLoad), this.instance = {
      networkId: i.networkId,
      sitePrefix: i.sitePrefix,
      pubId: i.pubId || "",
      bidTimeout: i.bidTimeout || 2e3,
      lazyLoad: t,
      centering: i.centering ?? !1,
      slots: {
        ...w,
        ...i.slots
      },
      privacy: i.privacy || null,
      interstitial: i.interstitial || null,
      anchor: i.anchor || null,
      threadYield: i.threadYield ?? !1,
      collapseEmptyDivs: i.collapseEmptyDivs ?? "DISABLED"
    }, this.readyResolve && (this.readyResolve(), this.readyResolve = null);
  }
  /**
   * Open the GPT Console overlay for ad debugging. Safe to call even
   * when GPT hasn't fully booted — queued onto `googletag.cmd`.
   *
   * https://developers.google.com/publisher-tag/reference#googletag.openConsole
   */
  static openConsole(i) {
    if (typeof window > "u" || !window.googletag) {
      n.warn("openConsole called but googletag is not available");
      return;
    }
    const t = window.googletag;
    window.googletag.cmd.push(() => {
      try {
        typeof t.openConsole == "function" ? t.openConsole(i) : n.warn("googletag.openConsole is not available in this build");
      } catch (o) {
        n.error("openConsole failed", o);
      }
    });
  }
  /** Resolves when init() has been called. Immediate if already initialized. */
  static whenReady(i = 5e3) {
    if (this.instance) return Promise.resolve();
    if (this.pendingReady) return this.pendingReady;
    let t;
    return this.pendingReady = Promise.race([
      this.readyPromise,
      new Promise((o, r) => {
        t = setTimeout(
          () => r(
            new Error(
              "[DreamsAdConfig] init() not called within timeout. Ensure DreamsAdConfig.init() runs before <dreams-ad-engine> elements mount."
            )
          ),
          i
        );
      })
    ]).finally(() => {
      clearTimeout(t), this.pendingReady = null;
    }), this.pendingReady;
  }
  static isInitialized() {
    return this.instance !== null;
  }
  static getNetworkId() {
    return this.assertInitialized(), this.instance.networkId;
  }
  static getSitePrefix() {
    return this.assertInitialized(), this.instance.sitePrefix;
  }
  static getPubId() {
    return this.assertInitialized(), this.instance.pubId || void 0;
  }
  static getBidTimeout() {
    return this.assertInitialized(), this.instance.bidTimeout;
  }
  /** @deprecated Use `getLazyLoad()` instead */
  static getDefaultLazyLoad() {
    return this.assertInitialized(), this.instance.lazyLoad || z;
  }
  static getLazyLoad() {
    return this.assertInitialized(), this.instance.lazyLoad;
  }
  static getCentering() {
    return this.assertInitialized(), this.instance.centering;
  }
  static getPrivacy() {
    return this.assertInitialized(), this.instance.privacy;
  }
  static getInterstitial() {
    return this.assertInitialized(), this.instance.interstitial;
  }
  static getAnchor() {
    return this.assertInitialized(), this.instance.anchor;
  }
  static getThreadYield() {
    return this.assertInitialized(), this.instance.threadYield;
  }
  static getCollapseEmptyDivs() {
    return this.assertInitialized(), this.instance.collapseEmptyDivs;
  }
  static setPrivacy(i) {
    this.assertInitialized(), this.instance.privacy = i, typeof window < "u" && window.googletag && window.googletag.cmd.push(() => {
      window.googletag.pubads().setPrivacySettings(i);
    });
  }
  static getSlot(i) {
    return this.assertInitialized(), this.instance.slots[i];
  }
  static getSlotMapping(i) {
    const t = this.getSlot(i);
    if (!t)
      throw new Error(`Unknown ad slot: ${i}`);
    return t.mapping;
  }
  static getSlotSizing(i) {
    const t = this.getSlot(i);
    if (!t)
      throw new Error(`Unknown ad slot: ${i}`);
    return t.sizing;
  }
  static getSlotPosition(i) {
    return this.getSlot(i)?.position || "top";
  }
  static buildAdUnit(i) {
    this.assertInitialized();
    const t = this.instance.sitePrefix, r = {
      "top-1": "is-t-01",
      "top-2": "is-t-02",
      "top-3": "is-t-03",
      "top-4": "is-t-04",
      "top-5": "is-t-05",
      "box-1": "is-b-01",
      "box-2": "is-b-02",
      "box-3": "is-b-03",
      "box-4": "is-b-04",
      "box-5": "is-b-05",
      footer: "is-f-01",
      interstitial: "is-i"
    }[i];
    return r ? `${t}-${r}` : `${t}-${i}`;
  }
  static registerSlot(i, t) {
    this.assertInitialized(), this.instance.slots[i] = t;
  }
  static reset() {
    this.instance = null, this.pendingReady = null, this.readyPromise = e.createReadyPromise();
  }
  static assertInitialized() {
    if (!this.instance)
      throw new Error(
        "DreamsAdConfig not initialized. Call DreamsAdConfig.init() first."
      );
  }
};
l = new WeakSet(), h = function(i) {
  if (i === !0 || i === !1) {
    n.configure({
      enabled: i,
      verbose: i
    });
    return;
  }
  if (y) {
    n.configure({ enabled: !0, verbose: !0 });
    return;
  }
}, c(e, l), e.instance = null, e.readyResolve = null, e.readyPromise = e.createReadyPromise(), e.pendingReady = null;
let g = e;
export {
  w as DEFAULT_SLOTS,
  g as DreamsAdConfig
};
