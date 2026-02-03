import { LitElement } from "lit";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
import { DreamsAdMapping, DreamsAdTargeting } from "../types/interfaces";
import "../../skeleton/skeleton.component";
export declare class DreamsAdComponent extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    static initialized: boolean;
    static old_url: string;
    static initialized_aps: boolean;
    static navigationListenersAttached: boolean;
    static servicesWereAlreadyEnabled: boolean;
    static lazyLoadConfigured: boolean;
    private adSlot;
    private slotRenderHandler;
    /**
     * Handle SPA navigation - destroys all slots and clears targeting cache
     */
    private static _handleNavigation;
    /**
     * Set up global navigation listeners for SPA support
     */
    private static _setupNavigationListeners;
    networkId: string;
    adUnit: string;
    divId: string;
    slot: string;
    mapping: DreamsAdMapping[];
    sizing: number[][];
    targeting: DreamsAdTargeting[];
    autoTargeting: boolean;
    private resolvedTargeting;
    setCentering: boolean;
    enableLazyLoad: boolean;
    configLazyLoad: {
        fetchMarginPercent: number;
        renderMarginPercent: number;
        mobileScaling: number;
    };
    refresh: boolean;
    enableTitle: boolean;
    apstag: boolean;
    pubId: string;
    bidTimeout: number;
    title: string;
    adLoaded: boolean;
    trackViewability: boolean;
    showSkeleton: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): Promise<void>;
    protected render(): TemplateResult;
}
