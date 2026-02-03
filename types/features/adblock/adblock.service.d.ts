import type { AdBlockConfig, AdBlockDetectionResult } from "./adblock.types";
declare global {
    interface Window {
        adBlockDetected?: boolean;
    }
}
export declare class AdBlockDetector {
    private static config;
    private static detected;
    private static detecting;
    /**
     * Configure the ad block detector
     */
    static configure(config: AdBlockConfig): void;
    /**
     * Check if ad blocker is detected (cached result)
     */
    static isBlocked(): boolean;
    /**
     * Run ad blocker detection
     */
    static detect(): Promise<AdBlockDetectionResult>;
    /**
     * Initialize detection and apply body class if blocked
     */
    static init(): Promise<boolean>;
    /**
     * Reset detection state
     */
    static reset(): void;
    private static runDetection;
    /**
     * Method 1: Check if googletag loaded properly
     */
    private static testGoogleTag;
    /**
     * Method 2: Bait element detection
     * Ad blockers often hide elements with common ad class names
     */
    private static testBaitElement;
    /**
     * Method 3: Fetch a known ad resource
     */
    private static testFetch;
}
