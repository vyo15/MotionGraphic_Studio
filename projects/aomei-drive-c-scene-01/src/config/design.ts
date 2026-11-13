/** Design tokens, all coordinates in the 1080x1920 canvas. */
export const DESIGN = {
  bg: '#F7F7F5',
  surface: '#FFFFFF',
  ink: '#282A2B',
  muted: '#898F91',
  grid: 'rgba(161,153,141,.047)',
  accent: '#DF805F',
  stroke: '#E7E7E5',
  focusC: '#D85C67',
  focusD: '#7CAEA8',
  diskC: '#DF805F',
  diskD: '#83ABA2',
  font: 'Inter, Segoe UI, Arial, sans-serif',
  shadow: '0 22px 50px rgba(37,44,44,.085)',
} as const;

export const BOUNDS = {width: 1080, height: 1920, fps: 60, frames: 447} as const;
