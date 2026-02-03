import type { SlotConfig } from "./config.types";

export const DEFAULT_SLOTS: Record<string, SlotConfig> = {
  "top-1": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [320, 50],
          [320, 100],
        ],
      },
      { viewport: [720, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 0],
        sizing: [
          [920, 250],
          [970, 90],
          [728, 90],
        ],
      },
      {
        viewport: [1280, 0],
        sizing: [
          [920, 250],
          [970, 250],
          [970, 90],
          [728, 90],
        ],
      },
    ],
    sizing: [
      [320, 50],
      [320, 100],
      [728, 90],
      [970, 90],
      [920, 250],
      [970, 250],
    ],
    position: "top",
  },
  "top-2": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50],
        ],
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 90],
        sizing: [
          [970, 90],
          [728, 90],
        ],
      },
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90],
    ],
    position: "top",
  },
  "top-3": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50],
        ],
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 90],
        sizing: [
          [970, 90],
          [728, 90],
        ],
      },
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90],
    ],
    position: "top",
  },
  "top-4": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [300, 250],
          [320, 50],
        ],
      },
      { viewport: [760, 0], sizing: [[728, 90]] },
      {
        viewport: [970, 90],
        sizing: [
          [970, 90],
          [728, 90],
        ],
      },
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
      [970, 90],
    ],
    position: "top",
  },
  "top-5": {
    mapping: [
      { viewport: [320, 0], sizing: [[300, 250]] },
      { viewport: [760, 0], sizing: [[728, 90]] },
    ],
    sizing: [
      [300, 250],
      [320, 50],
      [728, 90],
    ],
    position: "top",
  },
  "box-1": {
    mapping: [{ viewport: [320, 0], sizing: [[300, 250]] }],
    sizing: [
      [300, 250],
      [300, 600],
    ],
    position: "box",
  },
  "box-2": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600],
        ],
      },
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1],
    ],
    position: "box",
  },
  "box-3": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600],
        ],
      },
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1],
    ],
    position: "box",
  },
  "box-4": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600],
        ],
      },
    ],
    sizing: [
      [300, 250],
      [300, 600],
      [1, 1],
    ],
    position: "box",
  },
  "box-5": {
    mapping: [
      {
        viewport: [320, 0],
        sizing: [
          [1, 1],
          [300, 250],
          [300, 600],
        ],
      },
    ],
    sizing: [
      [1, 1],
      [300, 250],
      [300, 600],
    ],
    position: "box",
  },
  footer: {
    mapping: [
      {
        viewport: [0, 0],
        sizing: [
          [320, 50],
          [320, 100],
        ],
      },
    ],
    sizing: [
      [320, 50],
      [320, 100],
    ],
    position: "footer",
  },
  interstitial: {
    mapping: [{ viewport: [320, 0], sizing: [[1, 1]] }],
    sizing: [[1, 1]],
    position: "interstitial",
  },
};
