import type { AdErrorEventDetail } from "./logger.types";
export interface LoggerConfig {
    /** Enable logging. Default: auto (dev only) */
    enabled?: boolean | "auto";
    /** Log prefix. Default: "[DreamsAdEngine]" */
    prefix?: string;
    /** Enable verbose logging. Default: false */
    verbose?: boolean;
}
/**
 * Production-aware logger for Dreams Ad Engine
 */
export declare class Logger {
    private static config;
    /**
     * Configure the logger
     */
    static configure(config: LoggerConfig): void;
    /**
     * Log info message
     */
    static log(message: string, ...args: unknown[]): void;
    /**
     * Log warning message
     */
    static warn(message: string, ...args: unknown[]): void;
    /**
     * Log error message (always logs in production, but less verbose)
     */
    static error(message: string, ...args: unknown[]): void;
    /**
     * Log verbose/debug message (only when verbose is enabled or runtime forced)
     */
    static debug(message: string, ...args: unknown[]): void;
    /**
     * Log a table (useful for metrics)
     */
    static table(data: unknown[]): void;
    /**
     * Group logs together
     */
    static group(label: string): void;
    /**
     * End log group
     */
    static groupEnd(): void;
    /**
     * Time a operation
     */
    static time(label: string): void;
    /**
     * End timing
     */
    static timeEnd(label: string): void;
    /**
     * Dispatch a structured `ad:error` CustomEvent on the host element and
     * mirror it to `window.dataLayer` for GTM consumers. Also logs the error
     * via Logger.error so it surfaces in console regardless of debug mode.
     *
     * Consumers wire vendor-specific tracking (Sentry, Datadog, etc.) by
     * listening for `ad:error` — the library stays vendor-agnostic.
     */
    static dispatchAdError(host: EventTarget, detail: AdErrorEventDetail): void;
    private static shouldLog;
    private static isRuntimeForced;
    private static isProduction;
}
