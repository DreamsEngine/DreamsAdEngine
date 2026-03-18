import type { DreamsAdMapping } from "../dreamsAdEngine/types/interfaces";
import type { AdConfigInit, LazyLoadConfig, SlotConfig } from "./config.types";
export declare class DreamsAdConfig {
    private static instance;
    private static readyResolve;
    private static readyPromise;
    private static createReadyPromise;
    static init(config: AdConfigInit): void;
    private static pendingReady;
    /** Resolves when init() has been called. Immediate if already initialized. */
    static whenReady(timeout?: number): Promise<void>;
    static isInitialized(): boolean;
    static getNetworkId(): string;
    static getSitePrefix(): string;
    static getPubId(): string | undefined;
    static getBidTimeout(): number;
    /** @deprecated Use `getLazyLoad()` instead */
    static getDefaultLazyLoad(): LazyLoadConfig;
    static getLazyLoad(): LazyLoadConfig | false;
    static getCentering(): boolean;
    static getSlot(slotName: string): SlotConfig | undefined;
    static getSlotMapping(slotName: string): DreamsAdMapping[];
    static getSlotSizing(slotName: string): number[][];
    static getSlotPosition(slotName: string): string;
    static buildAdUnit(slotName: string): string;
    static registerSlot(name: string, config: SlotConfig): void;
    static reset(): void;
    private static assertInitialized;
}
