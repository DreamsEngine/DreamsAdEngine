import { LitElement } from "lit";
import type { TemplateResult } from "lit/html.js";
import "../types/interfaces";
export declare class DreamsAdComponent extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    static initialized: boolean;
    static old_url: string;
    networkId: string;
    adUnit: string;
    divId: string;
    mapping: never[];
    sizing: never[];
    refresh: boolean;
    enableTitle: boolean;
    title: string;
    adLoaded: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    protected render(): TemplateResult;
}
