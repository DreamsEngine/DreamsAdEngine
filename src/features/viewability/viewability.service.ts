import type {
  ViewabilityConfig,
  ViewabilityEvent,
  ViewabilityMetrics,
} from "./viewability.types";

const DEFAULT_CONFIG: Required<ViewabilityConfig> = {
  threshold: 0.5, // IAB: 50% visible
  duration: 2000, // IAB: 2 seconds
  debug: false,
};

interface TrackedAd {
  element: HTMLElement;
  metrics: ViewabilityMetrics;
  observer: IntersectionObserver;
  viewabilityTimer: ReturnType<typeof setTimeout> | null;
  trackingInterval: ReturnType<typeof setInterval> | null;
  startTime: number;
  isCurrentlyVisible: boolean;
}

export class ViewabilityService {
  private static config: Required<ViewabilityConfig> = DEFAULT_CONFIG;
  private static trackedAds: Map<string, TrackedAd> = new Map();

  /**
   * Configure the viewability service
   */
  static configure(config: ViewabilityConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Start tracking an ad element for viewability
   */
  static track(element: HTMLElement, adId: string, position: string): void {
    // Don't double-track
    if (this.trackedAds.has(adId)) {
      return;
    }

    const metrics: ViewabilityMetrics = {
      adId,
      position,
      isViewable: false,
      viewableTime: 0,
      totalTime: 0,
      viewabilityRate: 0,
    };

    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries, adId),
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin: "0px",
      },
    );

    const trackedAd: TrackedAd = {
      element,
      metrics,
      observer,
      viewabilityTimer: null,
      trackingInterval: null,
      startTime: Date.now(),
      isCurrentlyVisible: false,
    };

    this.trackedAds.set(adId, trackedAd);
    observer.observe(element);

    // Dispatch impression event
    this.dispatchEvent("impression", adId, metrics);

    if (this.config.debug) {
      console.log(`[Viewability] Tracking started: ${adId}`);
    }
  }

  /**
   * Stop tracking an ad element
   */
  static untrack(adId: string): void {
    const tracked = this.trackedAds.get(adId);
    if (!tracked) return;

    tracked.observer.disconnect();

    if (tracked.viewabilityTimer) {
      clearTimeout(tracked.viewabilityTimer);
    }
    if (tracked.trackingInterval) {
      clearInterval(tracked.trackingInterval);
    }

    this.trackedAds.delete(adId);

    if (this.config.debug) {
      console.log(`[Viewability] Tracking stopped: ${adId}`);
    }
  }

  /**
   * Get metrics for a specific ad
   */
  static getMetrics(adId: string): ViewabilityMetrics | null {
    const tracked = this.trackedAds.get(adId);
    return tracked ? { ...tracked.metrics } : null;
  }

  /**
   * Get all tracked metrics
   */
  static getAllMetrics(): ViewabilityMetrics[] {
    return Array.from(this.trackedAds.values()).map((t) => ({ ...t.metrics }));
  }

  /**
   * Show metrics summary in console
   */
  static showMetrics(): void {
    const metrics = this.getAllMetrics();
    if (metrics.length === 0) {
      console.log("[Viewability] No ads being tracked");
      return;
    }

    console.table(
      metrics.map((m) => ({
        "Ad ID": m.adId,
        Position: m.position,
        Viewable: m.isViewable ? "✓" : "✗",
        "Viewable Time": `${(m.viewableTime / 1000).toFixed(1)}s`,
        "Total Time": `${(m.totalTime / 1000).toFixed(1)}s`,
        "Viewability %": `${m.viewabilityRate.toFixed(1)}%`,
      })),
    );
  }

  /**
   * Clear all tracking
   */
  static reset(): void {
    for (const adId of this.trackedAds.keys()) {
      this.untrack(adId);
    }
  }

  private static handleIntersection(
    entries: IntersectionObserverEntry[],
    adId: string,
  ): void {
    const tracked = this.trackedAds.get(adId);
    if (!tracked) return;

    for (const entry of entries) {
      const isVisible = entry.intersectionRatio >= this.config.threshold;

      if (isVisible && !tracked.isCurrentlyVisible) {
        // Became visible
        tracked.isCurrentlyVisible = true;
        this.startViewabilityTimer(adId);
      } else if (!isVisible && tracked.isCurrentlyVisible) {
        // Became hidden
        tracked.isCurrentlyVisible = false;
        this.stopViewabilityTimer(adId);
        this.dispatchEvent("hidden", adId, tracked.metrics);
      }
    }
  }

  private static startViewabilityTimer(adId: string): void {
    const tracked = this.trackedAds.get(adId);
    if (!tracked) return;

    // Start the viewability duration timer
    tracked.viewabilityTimer = setTimeout(() => {
      if (!tracked.metrics.isViewable) {
        tracked.metrics.isViewable = true;
        this.dispatchEvent("viewable", adId, tracked.metrics);

        if (this.config.debug) {
          console.log(`[Viewability] Ad viewable: ${adId}`);
        }
      }
    }, this.config.duration);

    // Start tracking time accumulation
    tracked.trackingInterval = setInterval(() => {
      this.updateMetrics(adId);
    }, 500);
  }

  private static stopViewabilityTimer(adId: string): void {
    const tracked = this.trackedAds.get(adId);
    if (!tracked) return;

    if (tracked.viewabilityTimer) {
      clearTimeout(tracked.viewabilityTimer);
      tracked.viewabilityTimer = null;
    }

    if (tracked.trackingInterval) {
      clearInterval(tracked.trackingInterval);
      tracked.trackingInterval = null;
    }
  }

  private static updateMetrics(adId: string): void {
    const tracked = this.trackedAds.get(adId);
    if (!tracked) return;

    const now = Date.now();
    tracked.metrics.totalTime = now - tracked.startTime;

    if (tracked.isCurrentlyVisible) {
      tracked.metrics.viewableTime += 500;
    }

    if (tracked.metrics.totalTime > 0) {
      tracked.metrics.viewabilityRate =
        (tracked.metrics.viewableTime / tracked.metrics.totalTime) * 100;
    }
  }

  private static dispatchEvent(
    type: ViewabilityEvent["type"],
    adId: string,
    metrics: ViewabilityMetrics,
  ): void {
    const event = new CustomEvent<ViewabilityEvent>("ad:viewability", {
      detail: {
        type,
        adId,
        metrics: { ...metrics },
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(event);
  }
}
