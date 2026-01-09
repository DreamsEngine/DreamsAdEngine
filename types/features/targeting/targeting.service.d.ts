import type { DreamsAdTargeting } from "../dreamsAdEngine/types/interfaces";
import type { DFPContext, TargetingOptions, TargetingResult } from "./targeting.types";
export declare class DreamsTargetingService {
    private static cache;
    private static cacheUrl;
    private static pendingPromise;
    static getTargeting(options?: TargetingOptions): Promise<TargetingResult>;
    private static pollForContext;
    static buildFromContext(ctx: DFPContext, options?: TargetingOptions): DreamsAdTargeting[];
    static clearCache(): void;
    static getTargetingSync(): DreamsAdTargeting[] | null;
}
