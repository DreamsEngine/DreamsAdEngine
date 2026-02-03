export interface RefreshConfig {
  /** Enable auto-refresh. Default: false */
  enabled?: boolean;
  /** Refresh interval in ms. Minimum 30000 (30s). Default: 60000 */
  interval?: number;
  /** Skip refresh when tab is hidden. Default: true */
  checkVisibility?: boolean;
  /** Disable on single-post pages. Default: true */
  disableOnSinglePost?: boolean;
  /** CSS selector for single-post detection. Default: "body.single" */
  singlePostSelector?: string;
}

export interface RefreshEvent {
  type: "refresh" | "skipped";
  reason?: "hidden" | "blocked" | "throttled";
  slots: number;
  timestamp: number;
}
