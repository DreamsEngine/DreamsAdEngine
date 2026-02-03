import type { AdBlockConfig, AdBlockDetectionResult } from "./adblock.types";

const DEFAULT_CONFIG: Required<AdBlockConfig> = {
  enabled: true,
  addBodyClass: true,
  bodyClass: "ad-blocker-detected",
  timeout: 1000,
};

declare global {
  interface Window {
    adBlockDetected?: boolean;
  }
}

export class AdBlockDetector {
  private static config: Required<AdBlockConfig> = DEFAULT_CONFIG;
  private static detected: boolean | null = null;
  private static detecting: Promise<AdBlockDetectionResult> | null = null;

  /**
   * Configure the ad block detector
   */
  static configure(config: AdBlockConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Check if ad blocker is detected (cached result)
   */
  static isBlocked(): boolean {
    return this.detected === true;
  }

  /**
   * Run ad blocker detection
   */
  static async detect(): Promise<AdBlockDetectionResult> {
    // Return cached result
    if (this.detected !== null) {
      return {
        blocked: this.detected,
        method: this.detected ? "googletag" : "none",
      };
    }

    // Return pending detection
    if (this.detecting) {
      return this.detecting;
    }

    this.detecting = this.runDetection();
    const result = await this.detecting;
    this.detecting = null;

    return result;
  }

  /**
   * Initialize detection and apply body class if blocked
   */
  static async init(): Promise<boolean> {
    if (!this.config.enabled) {
      return false;
    }

    const result = await this.detect();

    if (result.blocked && this.config.addBodyClass) {
      document.body.classList.add(this.config.bodyClass);
    }

    // Dispatch event
    window.dispatchEvent(
      new CustomEvent("adblock:detected", {
        detail: result,
      }),
    );

    return result.blocked;
  }

  /**
   * Reset detection state
   */
  static reset(): void {
    this.detected = null;
    this.detecting = null;
    window.adBlockDetected = undefined;

    if (this.config.addBodyClass) {
      document.body.classList.remove(this.config.bodyClass);
    }
  }

  private static async runDetection(): Promise<AdBlockDetectionResult> {
    const methods: Array<() => Promise<AdBlockDetectionResult | null>> = [
      () => this.testGoogleTag(),
      () => this.testBaitElement(),
      () => this.testFetch(),
    ];

    for (const test of methods) {
      try {
        const result = await test();
        if (result?.blocked) {
          this.detected = true;
          window.adBlockDetected = true;
          return result;
        }
      } catch {
        // Continue to next test
      }
    }

    this.detected = false;
    window.adBlockDetected = false;
    return { blocked: false, method: "none" };
  }

  /**
   * Method 1: Check if googletag loaded properly
   */
  private static testGoogleTag(): Promise<AdBlockDetectionResult | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const blocked =
          typeof window.googletag === "undefined" ||
          typeof window.googletag.pubads !== "function";

        resolve(blocked ? { blocked: true, method: "googletag" } : null);
      }, 100);
    });
  }

  /**
   * Method 2: Bait element detection
   * Ad blockers often hide elements with common ad class names
   */
  private static testBaitElement(): Promise<AdBlockDetectionResult | null> {
    return new Promise((resolve) => {
      const bait = document.createElement("div");
      bait.className =
        "adsbox ad-placement pub_300x250 pub_728x90 text-ad textAd text_ad";
      bait.style.cssText =
        "position: absolute; top: -10px; left: -10px; width: 1px; height: 1px;";
      bait.innerHTML = "&nbsp;";

      document.body.appendChild(bait);

      requestAnimationFrame(() => {
        const blocked =
          bait.offsetHeight === 0 ||
          bait.offsetParent === null ||
          window.getComputedStyle(bait).display === "none" ||
          window.getComputedStyle(bait).visibility === "hidden";

        bait.remove();
        resolve(blocked ? { blocked: true, method: "bait" } : null);
      });
    });
  }

  /**
   * Method 3: Fetch a known ad resource
   */
  private static testFetch(): Promise<AdBlockDetectionResult | null> {
    return new Promise((resolve) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout,
      );

      fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      })
        .then(() => {
          clearTimeout(timeoutId);
          resolve(null); // Not blocked
        })
        .catch(() => {
          clearTimeout(timeoutId);
          resolve({ blocked: true, method: "fetch" });
        });
    });
  }
}
