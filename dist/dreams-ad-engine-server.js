const a = {
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
        viewport: [970, 90],
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
        viewport: [970, 90],
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
        viewport: [970, 90],
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
}, o = {
  fetchMarginPercent: 500,
  renderMarginPercent: 200,
  mobileScaling: 2
}, e = class e {
  static createReadyPromise() {
    return new Promise((i) => {
      e.readyResolve = i;
    });
  }
  static init(i) {
    if (this.instance && !i.force) {
      console.warn(
        "[DreamsAdConfig] Already initialized. Use { force: true } to override."
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
        ...a,
        ...i.slots
      },
      privacy: i.privacy || null,
      interstitial: i.interstitial || null,
      anchor: i.anchor || null,
      threadYield: i.threadYield ?? !1
    }, this.readyResolve && (this.readyResolve(), this.readyResolve = null);
  }
  /** Resolves when init() has been called. Immediate if already initialized. */
  static whenReady(i = 5e3) {
    if (this.instance) return Promise.resolve();
    if (this.pendingReady) return this.pendingReady;
    let t;
    return this.pendingReady = Promise.race([
      this.readyPromise,
      new Promise((r, s) => {
        t = setTimeout(
          () => s(
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
    return this.assertInitialized(), this.instance.lazyLoad || o;
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
    const t = this.instance.sitePrefix, s = {
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
    return s ? `${t}-${s}` : `${t}-${i}`;
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
e.instance = null, e.readyResolve = null, e.readyPromise = e.createReadyPromise(), e.pendingReady = null;
let n = e;
export {
  a as DEFAULT_SLOTS,
  n as DreamsAdConfig
};
