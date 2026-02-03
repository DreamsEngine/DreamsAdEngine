import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Skeleton loader component for ad placeholders
 * Displays shimmer animation while ad loads
 */
@customElement("dreams-ad-skeleton")
export class DreamsAdSkeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      position: relative;
      overflow: hidden;
      background: var(--dreams-skeleton-bg, #f0f0f0);
      border-radius: var(--dreams-skeleton-radius, 4px);
    }

    .skeleton::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--dreams-skeleton-shine, rgba(255, 255, 255, 0.6)) 50%,
        transparent 100%
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .skeleton-label {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: var(--dreams-skeleton-label-color, #999);
      font-family: system-ui, -apple-system, sans-serif;
    }
  `;

  @property({ type: Number }) width = 300;
  @property({ type: Number }) height = 250;
  @property({ type: Boolean }) showLabel = false;
  @property({ type: String }) label = "Ad";

  render() {
    return html`
      <div
        class="skeleton"
        style="width: ${this.width}px; height: ${this.height}px;"
      >
        ${this.showLabel ? html`<span class="skeleton-label">${this.label}</span>` : ""}
      </div>
    `;
  }
}

/**
 * Get skeleton dimensions based on slot type and viewport width
 */
export function getSkeletonDimensions(
  slotType: string,
  viewportWidth: number,
): { width: number; height: number } {
  const isDesktop = viewportWidth >= 1280;
  const isTablet = viewportWidth >= 728;

  switch (slotType) {
    case "top-1":
      if (isDesktop) return { width: 970, height: 250 };
      if (isTablet) return { width: 728, height: 90 };
      return { width: 320, height: 100 };

    case "top-2":
    case "top-3":
    case "top-4":
    case "top-5":
      if (isDesktop) return { width: 970, height: 90 };
      if (isTablet) return { width: 728, height: 90 };
      return { width: 320, height: 50 };

    case "box-1":
    case "box-2":
    case "box-3":
    case "box-4":
    case "box-5":
      return { width: 300, height: 250 };

    case "footer":
      return { width: 320, height: 50 };

    case "interstitial":
      return { width: 1, height: 1 };

    default:
      return { width: 300, height: 250 };
  }
}
