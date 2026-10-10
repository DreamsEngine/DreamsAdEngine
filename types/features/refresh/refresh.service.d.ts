import type { RefreshConfig } from "./refresh.types";
declare global {
    interface Window {
        DreamsBlockedRefresh?: boolean;
        lastAdRefresh?: number;
        isTabVisible?: boolean;
    }
}
export declare class RefreshManager {
    private static config;
    private static refreshTimer;
    private static running;
    private static viewableSlots;
    private static refreshCounts;
    private static lastRenderBackfill;
    /**
     * Configure the refresh manager
     */
    static configure(config: RefreshConfig): void;
    /**
     * Start auto-refresh loop
     */
    static start(): void;
    /**
     * Stop auto-refresh loop
     */
    static stop(): void;
    /**
     * Manually trigger a refresh (respects safeguards)
     */
    static refresh(slots?: any[]): boolean;
    /**
     * Block refresh (e.g., during user interaction)
     */
    static block(): void;
    /**
     * Unblock refresh
     */
    static unblock(): void;
    /**
     * Mark a slot as viewable (called from GPT impressionViewable handler)
     */
    static markViewable(slotId: string): void;
    /**
     * Record whether a slot's last render was backfill (called from GPT
     * slotRenderEnded handler)
     */
    static markRendered(slotId: string, isBackfill: boolean): void;
    /**
     * Reset per-pageview state (called on SPA navigation)
     */
    static resetPageview(): void;
    /**
     * Check if refresh is currently blocked
     */
    static isBlocked(): boolean;
    private static setupVisibilityTracking;
    private static scheduleRefresh;
    private static executeRefresh;
    private static safeRefresh;
    private static dispatchEvent;
}
