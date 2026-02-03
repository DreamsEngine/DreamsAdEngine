import type { StickyConfig, StickyMetrics } from "./sticky.types";

const DEFAULT_CONFIG: Required<StickyConfig> = {
  enabled: false,
  positions: [],
  minViewportHeight: 768,
  topOffset: 80,
  headerSelector: null,
  smoothTransition: true,
  transitionDuration: 150,
};

interface StickyAd {
  element: HTMLElement;
  container: HTMLElement;
  metrics: StickyMetrics;
  startTime: number;
  stickyStartTime: number | null;
  scrollHandler: () => void;
}

export class StickyManager {
  private static config: Required<StickyConfig> = DEFAULT_CONFIG;
  private static stickyAds: Map<string, StickyAd> = new Map();
  private static lastScrollTime = 0;

  /**
   * Configure the sticky manager
   */
  static configure(config: StickyConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Check if a position supports sticky
   */
  static isStickyPosition(position: string): boolean {
    return this.config.positions.includes(position);
  }

  /**
   * Enable sticky behavior for an ad element
   */
  static enable(
    container: HTMLElement,
    adId: string,
    position: string,
  ): boolean {
    if (!this.config.enabled) return false;
    if (!this.isStickyPosition(position)) return false;
    if (this.stickyAds.has(adId)) return false;

    // Check viewport height
    if (window.innerHeight < this.config.minViewportHeight) {
      return false;
    }

    // Find the inner ad element
    const element = container.querySelector(
      '[class*="ad-serving"]',
    ) as HTMLElement;
    if (!element) return false;

    // Get dynamic top offset
    const topOffset = this.getTopOffset();

    // Apply sticky styles
    if (this.config.smoothTransition) {
      element.style.transition = `top ${this.config.transitionDuration}ms ease-out`;
    }
    element.style.position = "sticky";
    element.style.top = `${topOffset}px`;
    element.style.alignSelf = "flex-start";
    element.style.zIndex = "10";

    const metrics: StickyMetrics = {
      adId,
      position,
      stickyTime: 0,
      totalTime: 0,
      isCurrentlySticky: false,
    };

    // Create scroll handler
    const scrollHandler = () => this.handleScroll(adId, topOffset);

    const stickyAd: StickyAd = {
      element,
      container,
      metrics,
      startTime: Date.now(),
      stickyStartTime: null,
      scrollHandler,
    };

    this.stickyAds.set(adId, stickyAd);

    // Add scroll listener
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return true;
  }

  /**
   * Disable sticky behavior for an ad
   */
  static disable(adId: string): void {
    const stickyAd = this.stickyAds.get(adId);
    if (!stickyAd) return;

    // Remove styles
    stickyAd.element.style.position = "";
    stickyAd.element.style.top = "";
    stickyAd.element.style.alignSelf = "";
    stickyAd.element.style.zIndex = "";
    stickyAd.element.style.transition = "";

    // Remove listener
    window.removeEventListener("scroll", stickyAd.scrollHandler);

    this.stickyAds.delete(adId);
  }

  /**
   * Get metrics for a sticky ad
   */
  static getMetrics(adId: string): StickyMetrics | null {
    const stickyAd = this.stickyAds.get(adId);
    if (!stickyAd) return null;

    // Update total time
    stickyAd.metrics.totalTime = Date.now() - stickyAd.startTime;

    return { ...stickyAd.metrics };
  }

  /**
   * Get all sticky metrics
   */
  static getAllMetrics(): StickyMetrics[] {
    return Array.from(this.stickyAds.values()).map((ad) => {
      ad.metrics.totalTime = Date.now() - ad.startTime;
      return { ...ad.metrics };
    });
  }

  /**
   * Reset all sticky ads
   */
  static reset(): void {
    for (const adId of this.stickyAds.keys()) {
      this.disable(adId);
    }
  }

  private static getTopOffset(): number {
    if (this.config.headerSelector) {
      const header = document.querySelector(
        this.config.headerSelector,
      ) as HTMLElement;
      if (header) {
        return header.offsetHeight + 10; // Add small buffer
      }
    }
    return this.config.topOffset;
  }

  private static handleScroll(adId: string, topOffset: number): void {
    const now = Date.now();

    // Debounce at 100ms
    if (now - this.lastScrollTime < 100) return;
    this.lastScrollTime = now;

    requestAnimationFrame(() => this.checkSticky(adId, topOffset));
  }

  private static checkSticky(adId: string, topOffset: number): void {
    const stickyAd = this.stickyAds.get(adId);
    if (!stickyAd) return;

    const rect = stickyAd.element.getBoundingClientRect();
    const isStuck = rect.top <= topOffset + 5; // 5px tolerance

    if (isStuck && !stickyAd.stickyStartTime) {
      // Started sticking
      stickyAd.stickyStartTime = Date.now();
      stickyAd.metrics.isCurrentlySticky = true;

      this.dispatchEvent("sticky:start", adId, stickyAd.metrics);
    } else if (!isStuck && stickyAd.stickyStartTime) {
      // Stopped sticking
      stickyAd.metrics.stickyTime += Date.now() - stickyAd.stickyStartTime;
      stickyAd.stickyStartTime = null;
      stickyAd.metrics.isCurrentlySticky = false;

      this.dispatchEvent("sticky:end", adId, stickyAd.metrics);
    }
  }

  private static dispatchEvent(
    type: string,
    adId: string,
    metrics: StickyMetrics,
  ): void {
    window.dispatchEvent(
      new CustomEvent(type, {
        detail: {
          adId,
          metrics: { ...metrics },
          timestamp: Date.now(),
        },
      }),
    );
  }
}
