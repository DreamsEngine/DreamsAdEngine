import { LitElement } from "lit";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
import { DreamsAdMapping, DreamsAdTargeting } from "../types/interfaces";
export declare class DreamsAdComponent extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    static initialized: boolean;
    static old_url: string;
    static initialized_aps: boolean;
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
    connectedCallback(): void;
    firstUpdated(): Promise<void>;
    protected render(): TemplateResult;
}
