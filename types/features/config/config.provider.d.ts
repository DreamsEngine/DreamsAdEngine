import type { DreamsAdMapping } from "../dreamsAdEngine/types/interfaces";
import type { AdConfigInit, LazyLoadConfig, SlotConfig } from "./config.types";
export declare class DreamsAdConfig {
    private static instance;
    static init(config: AdConfigInit): void;
    static isInitialized(): boolean;
    static getNetworkId(): string;
    static getSitePrefix(): string;
    static getPubId(): string | undefined;
    static getBidTimeout(): number;
    static getDefaultLazyLoad(): LazyLoadConfig;
    static getSlot(slotName: string): SlotConfig | undefined;
    static getSlotMapping(slotName: string): DreamsAdMapping[];
    static getSlotSizing(slotName: string): number[][];
    static getSlotPosition(slotName: string): string;
    static buildAdUnit(slotName: string): string;
    static registerSlot(name: string, config: SlotConfig): void;
    static reset(): void;
    private static assertInitialized;
}
