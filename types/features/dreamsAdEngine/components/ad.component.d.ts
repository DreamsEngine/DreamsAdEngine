import { LitElement } from "lit";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
import { DreamsAdMapping, DreamsAdTargeting } from "../types/interfaces";
import "../../skeleton/skeleton.component";
export declare class DreamsAdComponent extends LitElement {
    #private;
    createRenderRoot(): this;
    static initialized: boolean;
    static old_url: string;
    static initialized_aps: boolean;
    static navigationListenersAttached: boolean;
    static outOfPageRegistered: boolean;
    private adSlot;
    private slotRenderHandler;
    private impressionViewableHandler;
    private slotVisibilityHandler;
    private pendingBidsTimeout;
    private lastVisibilityPct;
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
    refresh: boolean;
    enableTitle: boolean;
    apstag: boolean;
    pubId: string;
    bidTimeout: number;
    title: string;
    trackViewability: boolean;
    showSkeleton: boolean;
    private ready;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): Promise<void>;
    protected render(): TemplateResult;
}
