import type { ViewabilityConfig, ViewabilityMetrics } from "./viewability.types";
export declare class ViewabilityService {
    private static config;
    private static trackedAds;
    /**
     * Configure the viewability service
     */
    static configure(config: ViewabilityConfig): void;
    /**
     * Start tracking an ad element for viewability
     */
    static track(element: HTMLElement, adId: string, position: string): void;
    /**
     * Stop tracking an ad element
     */
    static untrack(adId: string): void;
    /**
     * Get metrics for a specific ad
     */
    static getMetrics(adId: string): ViewabilityMetrics | null;
    /**
     * Get all tracked metrics
     */
    static getAllMetrics(): ViewabilityMetrics[];
    /**
     * Show metrics summary in console
     */
    static showMetrics(): void;
    /**
     * Clear all tracking
     */
    static reset(): void;
    private static handleIntersection;
    private static startViewabilityTimer;
    private static stopViewabilityTimer;
    private static updateMetrics;
    private static dispatchEvent;
}
