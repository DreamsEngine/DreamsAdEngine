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
     * Check if refresh is currently blocked
     */
    static isBlocked(): boolean;
    private static setupVisibilityTracking;
    private static scheduleRefresh;
    private static executeRefresh;
    private static safeRefresh;
    private static dispatchEvent;
}
