/**
 * Minimal Editorial defaults for NEW add-ons (Design System v2.0).
 * Reference: docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md.
 * Important: Native Remotion Studio editing may require literal inline style props;
 * importing tokens here does not automatically make arbitrary JSX draggable.
 * Never replace an approved project's palette or font just to match this starter.
 */
export const DESIGN = {
  background: '#F7F7F5',
  surface: '#FFFFFF',
  ink: '#202020',
  secondary: '#646464',
  muted: '#888888', // decoration only; avoid small informational text
  accent: '#DF805F',
  accentForeground: '#202020', // readable text on coral; white-on-coral has weak contrast
  stroke: '#E7E7E5',
  success: '#31A878',
  fontFamily: 'Arial, Helvetica, sans-serif', // stable baseline, not bundled Inter
  codeFontFamily: "Consolas, 'Courier New', monospace",
} as const;

export const SAFE_AREA = {top: 250, bottom: 350, side: 50} as const;

// Starting scale for 1080 × 1920. Always verify text on actual rendered frames.
export const TYPE_SCALE = {
  hook: 96,
  sceneTitle: 74,
  subhead: 50,
  subtitle: 42,
  label: 32,
  command: 44,
} as const;

export const LAYOUT = {
  grid: 8,
  innerMargin: 96,
  cardRadius: 24,
  cardStroke: 2,
  cardShadow: '0 12px 32px rgba(32, 32, 32, 0.08)',
} as const;

// Durations are recommendations, not hard limits; narration and ACC govern.
export const MOTION_TIMING = {
  fps: 30,
  entranceFrames: [8, 15],
  simpleTransitionFrames: [9, 18],
  holdFrames: [24, 60],
  coverHoldFrames: [30, 60],
} as const;
