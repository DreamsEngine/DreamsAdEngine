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
   * Log verbose/debug message (only when verbose is enabled)
   */
  static debug(message: string, ...args: unknown[]): void {
    if (!this.shouldLog() || !this.config.verbose) return;
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

  private static shouldLog(): boolean {
    if (this.config.enabled === true) return true;
    if (this.config.enabled === false) return false;
    // Auto: log only in development
    return !this.isProduction();
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
