import { LitElement } from "lit";
/**
 * Skeleton loader component for ad placeholders
 * Displays shimmer animation while ad loads
 */
export declare class DreamsAdSkeleton extends LitElement {
    createRenderRoot(): this;
    width: number;
    height: number;
    showLabel: boolean;
    label: string;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
/**
 * Get skeleton dimensions based on slot type and viewport width
 */
export declare function getSkeletonDimensions(slotType: string, viewportWidth: number): {
    width: number;
    height: number;
};
