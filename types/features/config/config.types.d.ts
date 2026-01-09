import type { DreamsAdMapping } from "../dreamsAdEngine/types/interfaces";
export interface LazyLoadConfig {
    fetchMarginPercent: number;
    renderMarginPercent: number;
    mobileScaling: number;
}
export interface SlotConfig {
    mapping: DreamsAdMapping[];
    sizing: number[][];
    position?: "top" | "box" | "footer" | "interstitial";
}
export interface AdConfigInit {
    networkId: string;
    sitePrefix: string;
    pubId?: string;
    bidTimeout?: number;
    defaultLazyLoad?: LazyLoadConfig;
    slots?: Record<string, SlotConfig>;
}
export interface AdConfigData extends Required<Omit<AdConfigInit, "slots">> {
    slots: Record<string, SlotConfig>;
}
