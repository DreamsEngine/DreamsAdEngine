import type { StickyConfig, StickyMetrics } from "./sticky.types";
export declare class StickyManager {
    private static config;
    private static stickyAds;
    private static lastScrollTime;
    /**
     * Configure the sticky manager
     */
    static configure(config: StickyConfig): void;
    /**
     * Check if a position supports sticky
     */
    static isStickyPosition(position: string): boolean;
    /**
     * Enable sticky behavior for an ad element
     */
    static enable(container: HTMLElement, adId: string, position: string): boolean;
    /**
     * Disable sticky behavior for an ad
     */
    static disable(adId: string): void;
    /**
     * Get metrics for a sticky ad
     */
    static getMetrics(adId: string): StickyMetrics | null;
    /**
     * Get all sticky metrics
     */
    static getAllMetrics(): StickyMetrics[];
    /**
     * Reset all sticky ads
     */
    static reset(): void;
    private static getTopOffset;
    private static handleScroll;
    private static checkSticky;
    private static dispatchEvent;
}
