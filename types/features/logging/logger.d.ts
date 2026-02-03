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
     * Log verbose/debug message (only when verbose is enabled)
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
    private static shouldLog;
    private static isProduction;
}
