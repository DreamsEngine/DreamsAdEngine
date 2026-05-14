import type { AdErrorEventDetail } from "./logger.types";

export interface LoggerConfig {
  /** Enable logging. Default: auto (dev only) */
  enabled?: boolean | "auto";
  /** Log prefix. Default: "[DreamsAdEngine]" */
  prefix?: string;
  /** Enable verbose logging. Default: false */
  verbose?: boolean;
}

const DEFAULT_CONFIG: Required<LoggerConfig> = {
  enabled: "auto",
  prefix: "[DreamsAdEngine]",
  verbose: false,
};

/**
 * Production-aware logger for Dreams Ad Engine
 */
export class Logger {
  private static config: Required<LoggerConfig> = DEFAULT_CONFIG;

  /**
   * Configure the logger
   */
  static configure(config: LoggerConfig): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Log info message
   */
  static log(message: string, ...args: unknown[]): void {
    if (!this.shouldLog()) return;
    console.log(`${this.config.prefix} ${message}`, ...args);
  }

  /**
   * Log warning message
   */
  static warn(message: string, ...args: unknown[]): void {
    if (!this.shouldLog()) return;
    console.warn(`${this.config.prefix} ${message}`, ...args);
  }

  /**
   * Log error message (always logs in production, but less verbose)
   */
  static error(message: string, ...args: unknown[]): void {
    if (this.isProduction()) {
      console.error(`${this.config.prefix} Error: ${message}`);
    } else {
      console.error(`${this.config.prefix} ${message}`, ...args);
    }
  }

  /**
   * Log verbose/debug message (only when verbose is enabled or runtime forced)
   */
  static debug(message: string, ...args: unknown[]): void {
    if (!this.shouldLog()) return;
    if (!this.config.verbose && !this.isRuntimeForced()) return;
    console.debug(`${this.config.prefix} ${message}`, ...args);
  }

  /**
   * Log a table (useful for metrics)
   */
  static table(data: unknown[]): void {
    if (!this.shouldLog()) return;
    console.table(data);
  }

  /**
   * Group logs together
   */
  static group(label: string): void {
    if (!this.shouldLog()) return;
    console.group(`${this.config.prefix} ${label}`);
  }

  /**
   * End log group
   */
  static groupEnd(): void {
    if (!this.shouldLog()) return;
    console.groupEnd();
  }

  /**
   * Time a operation
   */
  static time(label: string): void {
    if (!this.shouldLog()) return;
    console.time(`${this.config.prefix} ${label}`);
  }

  /**
   * End timing
   */
  static timeEnd(label: string): void {
    if (!this.shouldLog()) return;
    console.timeEnd(`${this.config.prefix} ${label}`);
  }

  /**
   * Dispatch a structured `ad:error` CustomEvent on the host element and
   * mirror it to `window.dataLayer` for GTM consumers. Also logs the error
   * via Logger.error so it surfaces in console regardless of debug mode.
   *
   * Consumers wire vendor-specific tracking (Sentry, Datadog, etc.) by
   * listening for `ad:error` — the library stays vendor-agnostic.
   */
  static dispatchAdError(host: EventTarget, detail: AdErrorEventDetail): void {
    host.dispatchEvent(
      new CustomEvent<AdErrorEventDetail>("ad:error", {
        bubbles: true,
        composed: true,
        detail,
      }),
    );

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "dreams_ad_error",
        phase: detail.phase,
        slotId: detail.slotId,
        adUnit: detail.adUnit,
        error_message:
          detail.error instanceof Error
            ? detail.error.message
            : String(detail.error),
      });
    }

    Logger.error(
      `[${detail.phase}] ${detail.slotId || detail.adUnit}: ${
        detail.error instanceof Error
          ? detail.error.message
          : String(detail.error)
      }`,
    );
  }

  private static shouldLog(): boolean {
    if (this.config.enabled === true) return true;
    if (this.config.enabled === false) return false;
    // Auto: window.__dreamsDebug forces logging on at runtime,
    // useful for enabling debug output in production without redeploying.
    if (this.isRuntimeForced()) return true;
    // Auto: log only in development
    return !this.isProduction();
  }

  private static isRuntimeForced(): boolean {
    return (
      typeof window !== "undefined" && window.__dreamsDebug === true
    );
  }

  private static isProduction(): boolean {
    if (typeof window === "undefined") return true;

    const hostname = window.location.hostname;
    return (
      hostname !== "localhost" &&
      !hostname.includes(".local") &&
      !hostname.includes("127.0.0.1") &&
      !hostname.includes("192.168.") &&
      !hostname.includes("0.0.0.0")
    );
  }
}
