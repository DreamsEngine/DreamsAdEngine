import type { RefreshConfig, RefreshEvent } from "./refresh.types";

const MIN_INTERVAL = 30000; // 30 seconds - GAM policy minimum

const DEFAULT_CONFIG: Required<RefreshConfig> = {
  enabled: false,
  interval: 60000,
  checkVisibility: true,
  disableOnSinglePost: true,
  singlePostSelector: "body.single",
  viewabilityGated: true,
};

declare global {
  interface Window {
    DreamsBlockedRefresh?: boolean;
    lastAdRefresh?: number;
    isTabVisible?: boolean;
  }
}

export class RefreshManager {
  private static config: Required<RefreshConfig> = DEFAULT_CONFIG;
  private static refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private static running = false;
  private static viewableSlots: Set<string> = new Set();
  private static refreshCounts: Map<string, number> = new Map();

  /**
   * Configure the refresh manager
   */
  static configure(config: RefreshConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Enforce minimum interval
    if (this.config.interval < MIN_INTERVAL) {
      this.config.interval = MIN_INTERVAL;
    }
  }

  /**
   * Start auto-refresh loop
   */
  static start(): void {
    if (!this.config.enabled || this.running) {
      return;
    }

    // Check if on single post page
    if (
      this.config.disableOnSinglePost &&
      document.querySelector(this.config.singlePostSelector)
    ) {
      return;
    }

    this.running = true;
    this.setupVisibilityTracking();
    this.scheduleRefresh();
  }

  /**
   * Stop auto-refresh loop
   */
  static stop(): void {
    this.running = false;
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Manually trigger a refresh (respects safeguards)
   */
  static refresh(slots?: any[]): boolean {
    return this.safeRefresh(slots);
  }

  /**
   * Block refresh (e.g., during user interaction)
   */
  static block(): void {
    window.DreamsBlockedRefresh = true;
  }

  /**
   * Unblock refresh
   */
  static unblock(): void {
    window.DreamsBlockedRefresh = false;
  }

  /**
   * Mark a slot as viewable (called from GPT impressionViewable handler)
   */
  static markViewable(slotId: string): void {
    this.viewableSlots.add(slotId);
  }

  /**
   * Check if refresh is currently blocked
   */
  static isBlocked(): boolean {
    return window.DreamsBlockedRefresh === true;
  }

  private static setupVisibilityTracking(): void {
    if (typeof window === "undefined") return;

    window.isTabVisible = !document.hidden;

    document.addEventListener("visibilitychange", () => {
      window.isTabVisible = !document.hidden;
    });
  }

  private static scheduleRefresh(): void {
    if (!this.running) return;

    this.refreshTimer = setTimeout(() => {
      this.executeRefresh();
      this.scheduleRefresh(); // Schedule next
    }, this.config.interval);
  }

  private static executeRefresh(): void {
    // Check visibility
    if (this.config.checkVisibility && !window.isTabVisible) {
      this.dispatchEvent("skipped", "hidden");
      return;
    }

    // Check if blocked
    if (window.DreamsBlockedRefresh) {
      this.dispatchEvent("skipped", "blocked");
      return;
    }

    // Execute refresh
    const success = this.safeRefresh();
    if (!success) {
      this.dispatchEvent("skipped", "throttled");
    }
  }

  private static safeRefresh(slots?: any[]): boolean {
    if (!window.googletag?.pubads) {
      return false;
    }

    const now = Date.now();
    const lastRefresh = window.lastAdRefresh || 0;
    const timeSince = now - lastRefresh;

    // Enforce minimum interval
    if (timeSince < MIN_INTERVAL) {
      return false;
    }

    window.lastAdRefresh = now;

    let slotsToRefresh = slots || window.dreamsSlotsToUpdate || [];

    // Filter to only viewable slots if gating is enabled
    if (this.config.viewabilityGated && !slots) {
      slotsToRefresh = slotsToRefresh.filter((s: any) => {
        try {
          return this.viewableSlots.has(s.getSlotElementId());
        } catch {
          return false;
        }
      });
    }

    const slotCount = slotsToRefresh.length;

    if (slotCount === 0) {
      return false;
    }

    // Set refresh_count targeting on each slot
    for (const s of slotsToRefresh) {
      try {
        const id = s.getSlotElementId();
        const count = (this.refreshCounts.get(id) || 0) + 1;
        this.refreshCounts.set(id, count);
        s.setTargeting("refresh_count", String(count));
      } catch {
        // Slot may not support these methods
      }
    }

    try {
      window.googletag.pubads().refresh(slotsToRefresh, {
        changeCorrelator: false,
      });

      this.dispatchEvent("refresh", undefined, slotCount);
      return true;
    } catch {
      return false;
    }
  }

  private static dispatchEvent(
    type: RefreshEvent["type"],
    reason?: RefreshEvent["reason"],
    slots = 0,
  ): void {
    window.dispatchEvent(
      new CustomEvent<RefreshEvent>("ad:refresh", {
        detail: {
          type,
          reason,
          slots,
          timestamp: Date.now(),
        },
      }),
    );
  }
}
