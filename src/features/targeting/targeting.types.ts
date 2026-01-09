import type { DreamsAdTargeting } from "../dreamsAdEngine/types/interfaces";

export interface TargetingOptions {
	contextKey?: string;
	maxRetries?: number;
	retryInterval?: number;
	includeUrl?: boolean;
	customSegmentFn?: string;
}

export interface DFPContext {
	postId?: string;
	catId?: string;
	tagId?: string;
	typeId?: string;
	taxId?: string;
	dataSection?: {
		catName?: string;
		author?: string;
	};
}

export interface TargetingResult {
	targeting: DreamsAdTargeting[];
	source: "cache" | "context" | "timeout";
}

declare global {
	interface Window {
		dfp?: Record<string, DFPContext>;
		_rl_gen_sg?: () => string;
	}
}
