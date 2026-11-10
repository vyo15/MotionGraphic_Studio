/** Ubah warna dan koordinat dasar di sini. Tidak mengubah animasi pengguna. */
export const DESIGN = {
  bg: '#F8F7F4',
  grid: 'rgba(115,109,102,0.045)',
  white: '#FFFFFF',
  ink: '#232322',
  muted: '#8B8B86',
  coral: '#D8876D',
  stroke: '#EAE8E5',
  shadow: '0 23px 72px rgba(48,43,37,0.095), 0 3px 12px rgba(48,43,37,0.04)',
  font: 'Inter, Segoe UI, Arial, sans-serif',
} as const;

/** Base posisi terpisah dari transform yang dapat diubah pengguna di layer Interactive. */
export const BASE_POSITION = {
  windowLogo: {x: 440, y: 680, width: 200, height: 200},
  startMenu: {x: 115, y: 645, width: 850, height: 665},
  focusPanel: {x: 170, y: 960, width: 740, height: 205},
  subtitle: {x: 116, y: 1492, width: 848, height: 74},
  heading: {x: 92, y: 253},
} as const;

/** ID layer dan teks dasar; teks yang terlihat tetap literal di Interactive.Div agar edit langsung berfungsi. */
export const LAYER_IDS = {
  eyebrow: 'S01 — Label WINDOWS 11',
  headline: 'S01 — Judul FITUR BAWAAN',
  question: 'S01 — Pertanyaan SEMUANYA DIPAKAI',
  subtitleA: 'S01 — Subtitle bagian 1',
  subtitleB: 'S01 — Subtitle bagian 2',
  appNames: ['S01 — Label Xbox', 'S01 — Label Bing Search', 'S01 — Label Copilot'],
} as const;
