export interface AdBlockDetectionResult {
  blocked: boolean;
  method: "googletag" | "bait" | "fetch" | "none";
}

export interface AdBlockConfig {
  /** Enable detection on load. Default: true */
  enabled?: boolean;
  /** Add body class when detected. Default: true */
  addBodyClass?: boolean;
  /** Body class name. Default: "ad-blocker-detected" */
  bodyClass?: string;
  /** Timeout for detection methods in ms. Default: 1000 */
  timeout?: number;
}
