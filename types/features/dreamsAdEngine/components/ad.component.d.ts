import { LitElement } from "lit";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
export declare class DreamsAdComponent extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    static initialized: boolean;
    static old_url: string;
    static initialized_aps: boolean;
    networkId: string;
    adUnit: string;
    divId: string;
    mapping: never[];
    sizing: never[];
    targeting: never[];
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
    firstUpdated(): void;
    protected render(): TemplateResult;
}
