/** Pengaturan Scene 02. Durasi internal 465 frame pada 30 fps. */
export const SCENE02 = {
  durationInFrames: 465,
  durationSeconds: 15.5,
  panels: {
    xbox: {start: 0.2, end: 3.65},
    bing: {start: 3.18, end: 6.84},
    copilot: {start: 6.42, end: 10.68},
  },
  summary: {start: 10.2, cardsStart: 10.65, stackStart: 12.45, complete: 14.0},
  subtitleSwitches: [3.45, 6.45, 10.2, 12.85],
  position: {
    panel: {x: 74, y: 545, width: 936, height: 684},
    subtitle: {x: 65, y: 1440, width: 950, height: 96},
    header: {x: 79, y: 190},
    summary: {x: 90, y: 443},
  },
  layout: {
    xboxSidebarWidth: 248,
    tileTop: 870,
    rowTop: 766,
    rowStep: 164,
  },
} as const;
