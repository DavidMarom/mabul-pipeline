import type { Track } from "./PipelineFlow.types";

export const TRACKS: Track[] = [
  {
    label: "Track A — Full Pipeline",
    description:
      "New UI surfaces, components, layouts, or interactions that aren't covered by existing design system tokens.",
    steps: ["You", "/product", "/designer", "/developer", "/product"],
  },
  {
    label: "Track B — Fast Track",
    description:
      "Bug fixes, copy changes, logic updates, and small tweaks where all values already exist in the design system.",
    steps: ["You", "/product", "/developer", "/product"],
  },
];
