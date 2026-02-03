export interface StickyConfig {
    /** Enable sticky behavior. Default: false */
    enabled?: boolean;
    /** Positions that support sticky (e.g., ["box-2", "box-3"]). Default: [] */
    positions?: string[];
    /** Minimum viewport height for sticky. Default: 768 */
    minViewportHeight?: number;
    /** Top offset in pixels. Default: 80 */
    topOffset?: number;
    /** CSS selector for header (for dynamic offset). Default: null */
    headerSelector?: string | null;
    /** Enable smooth transitions. Default: true */
    smoothTransition?: boolean;
    /** Transition duration in ms. Default: 150 */
    transitionDuration?: number;
}
export interface StickyMetrics {
    adId: string;
    position: string;
    stickyTime: number;
    totalTime: number;
    isCurrentlySticky: boolean;
}
