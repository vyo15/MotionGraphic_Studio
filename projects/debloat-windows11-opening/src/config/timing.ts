/** Dalam detik dari frame 0; basis semua animasi & subtitle. 30 fps, total 8 detik. */
export const TIMING = {
  duration: 8,
  logoIn: [0.0, 0.75],
  logoOut: [1.25, 2.25],
  headingIn: [0.85, 1.55],
  menuIn: [2.0, 3.1],
  iconReveal: [2.65, 3.55],
  questionIn: [4.32, 4.93],
  menuDim: [5.35, 6.25],
  cardsIn: [5.05, 6.15],
  selectedCard: [6.55, 7.76],
  subtitleSwitch: [3.65, 4.18],
} as const;
