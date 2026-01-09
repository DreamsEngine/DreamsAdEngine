import type { DreamsAdTargeting } from "../dreamsAdEngine/types/interfaces";
import type { DFPContext, TargetingOptions, TargetingResult } from "./targeting.types";

const DEFAULT_OPTIONS: Required<TargetingOptions> = {
	contextKey: "@context",
	maxRetries: 20,
	retryInterval: 100,
	includeUrl: true,
	customSegmentFn: "_rl_gen_sg",
};

export class DreamsTargetingService {
	private static cache: DreamsAdTargeting[] | null = null;
	private static cacheUrl = "";
	private static pendingPromise: Promise<TargetingResult> | null = null;

	static async getTargeting(
		options?: TargetingOptions
	): Promise<TargetingResult> {
		const opts = { ...DEFAULT_OPTIONS, ...options };
		const currentUrl = typeof window !== "undefined" ? window.location.href : "";

		if (this.cache && this.cacheUrl === currentUrl) {
			return { targeting: this.cache, source: "cache" };
		}

		if (this.pendingPromise) {
			return this.pendingPromise;
		}

		this.pendingPromise = this.pollForContext(opts, currentUrl);
		const result = await this.pendingPromise;
		this.pendingPromise = null;

		return result;
	}

	private static pollForContext(
		opts: Required<TargetingOptions>,
		currentUrl: string
	): Promise<TargetingResult> {
		return new Promise((resolve) => {
			let retryCount = 0;

			const tryGetContext = (): boolean => {
				if (typeof window === "undefined") return false;

				const dfpData = window.dfp;
				if (!dfpData?.[opts.contextKey]) return false;

				const ctx = dfpData[opts.contextKey];
				const targeting = this.buildFromContext(ctx, opts);

				this.cache = targeting;
				this.cacheUrl = currentUrl;

				resolve({ targeting, source: "context" });
				return true;
			};

			if (tryGetContext()) return;

			const interval = setInterval(() => {
				retryCount++;

				if (tryGetContext()) {
					clearInterval(interval);
					return;
				}

				if (retryCount >= opts.maxRetries) {
					clearInterval(interval);
					resolve({ targeting: [], source: "timeout" });
				}
			}, opts.retryInterval);
		});
	}

	static buildFromContext(
		ctx: DFPContext,
		options?: TargetingOptions
	): DreamsAdTargeting[] {
		const opts = { ...DEFAULT_OPTIONS, ...options };
		const targeting: DreamsAdTargeting[] = [];

		if (opts.includeUrl && typeof window !== "undefined") {
			targeting.push({ key: "url", value: window.location.pathname });
		}

		if (ctx.dataSection?.catName) {
			targeting.push({ key: "catName", value: ctx.dataSection.catName });
		}

		if (ctx.postId) {
			targeting.push({ key: "postId", value: ctx.postId });
		}

		if (ctx.catId) {
			targeting.push({ key: "catId", value: ctx.catId });
		}

		if (ctx.tagId) {
			targeting.push({ key: "tag", value: ctx.tagId });
		}

		if (ctx.typeId) {
			targeting.push({ key: "type", value: ctx.typeId });
		}

		if (ctx.taxId) {
			targeting.push({ key: "taxId", value: ctx.taxId });
		}

		if (ctx.dataSection?.author) {
			targeting.push({ key: "author", value: ctx.dataSection.author });
		}

		if (typeof window !== "undefined" && opts.customSegmentFn) {
			const segmentFn = (window as unknown as Record<string, unknown>)[
				opts.customSegmentFn
			] as (() => string) | undefined;
			if (typeof segmentFn === "function") {
				const segment = segmentFn();
				if (segment) {
					targeting.push({ key: "_rl", value: segment });
				}
			}
		}

		return targeting;
	}

	static clearCache(): void {
		this.cache = null;
		this.cacheUrl = "";
		this.pendingPromise = null;
	}

	static getTargetingSync(): DreamsAdTargeting[] | null {
		const currentUrl = typeof window !== "undefined" ? window.location.href : "";
		if (this.cache && this.cacheUrl === currentUrl) {
			return this.cache;
		}
		return null;
	}
}
