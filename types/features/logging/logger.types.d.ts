/**
 * Phase of the ad lifecycle where an error originated. Used by consumers
 * to triage failures without parsing error messages.
 */
export type AdErrorPhase = "config-resolution" | "targeting-resolution" | "slot-define" | "slot-display" | "slot-refresh" | "apstag-init" | "prebid-init" | "out-of-page-define" | "size-mapping";
/**
 * Detail payload for the `ad:error` CustomEvent dispatched on the host
 * `<dreams-ad-engine>` element. Mirrored to `window.dataLayer` as a
 * `dreams_ad_error` event for GTM consumers.
 */
export interface AdErrorEventDetail {
    /** DOM id of the slot container (also embedded in the GAM ad unit path). */
    slotId: string;
    /** GAM ad unit path, e.g. `/<networkId>/<sitePrefix>-is-t-01`. */
    adUnit: string;
    /** Where in the slot lifecycle the failure happened. */
    phase: AdErrorPhase;
    /** Original thrown value, normalized to Error when possible. */
    error: Error | string;
    /**
     * Whether the slot can still recover (e.g. render with degraded targeting)
     * or is permanently dead for this pageview. Informational only — the
     * library does not auto-retry on this flag.
     */
    recoverable: boolean;
}
