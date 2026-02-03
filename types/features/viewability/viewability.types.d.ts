export interface ViewabilityMetrics {
    adId: string;
    position: string;
    isViewable: boolean;
    viewableTime: number;
    totalTime: number;
    viewabilityRate: number;
}
export interface ViewabilityEvent {
    type: "viewable" | "impression" | "hidden";
    adId: string;
    metrics: ViewabilityMetrics;
    timestamp: number;
}
export interface ViewabilityConfig {
    /** Minimum visibility ratio (0-1). Default: 0.5 (IAB standard) */
    threshold?: number;
    /** Time in ms to be considered viewable. Default: 2000 (IAB standard) */
    duration?: number;
    /** Enable console metrics output */
    debug?: boolean;
}
