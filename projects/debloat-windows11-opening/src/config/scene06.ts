/** Scene 06 — Penutup tutorial + CTA final, frame-deterministic.
 * Semua waktu dalam detik lokal S06, semua koordinat pada kanvas 1080x1920.
 * Teks untuk edit langsung ada sebagai literal di Interactive.Div masing-masing.
 */
export const SCENE06 = {
  fps: 30,
  durationInFrames: 517, // 17.233333 detik: penutup + CTA gabungan
  bounds: {width: 1080, height: 1920},
  timing: {
    warning: {start: 0, end: 3.85},
    process: {start: 3.86, finish: 5.72},
    desktop: {start: 5.78, end: 9.22},
    restart: {start: 6.45, highlight: 7.34},
    cta: {start: 8.72, fullyVisible: 9.35},
  },
  canvas: {
    desktop: {x: 70, y: 530, width: 940, height: 970},
    header: {x: 80, y: 246},
    headline: {x: 100, y: 342, width: 880},
    subtitles: {x: 115, y: 1510, width: 850, height: 78},
    ctaLogo: {x: 540, y: 675},
  },
  assets: {
    bloom: 'videos/debloat-windows11-opening/images/windows11-bloom-scene04.png',
  },
  colors: {
    bg: '#FAF9F6',
    ink: '#202226',
    muted: '#707479',
    accent: '#E2735D',
    accentSoft: '#F9E5DF',
    uiBlue: '#266FDB',
    white: '#FFFFFF',
    stroke: '#E8E6E1',
    success: '#2E9F70',
  },
  cursor: {
    // Animasi tangan/kursor berangkat dari titik mouse di akhir Scene 05.
    keyframes: [
      {s: 0.00, x: 788, y: 1405},
      {s: 1.10, x: 772, y: 1393},
      {s: 1.60, x: 240, y: 1347}, // tunjukkan opsi yang tidak dipilih
      {s: 2.50, x: 244, y: 1347},
      {s: 3.38, x: 782, y: 1408}, // kembali ke Remove Selected
      {s: 3.98, x: 792, y: 1411},
      {s: 5.60, x: 792, y: 1411},
      {s: 6.33, x: 756, y: 1380},
      {s: 7.40, x: 668, y: 1310}, // hover opsi restart, tidak dieksekusi
      {s: 8.47, x: 668, y: 1310},
    ],
    clickTimes: [4.08], // klik simulasi Remove Selected, bukan klik Restart
  },
  // Visual onset ditautkan pada unit makna VO; sesuaikan saat WAV asli masuk.
  subtitleBeats: [
    {from: 0.0, to: 3.75, text: 'Tapi jangan asal hapus semuanya, ya.'},
    {from: 3.75, to: 5.95, text: 'Selesai!'},
    {from: 5.95, to: 8.7, text: 'Restart kalau diperlukan.'},
    {from: 8.72, to: 13.92, text: 'Menurut kamu, debloat Windows perlu nggak sih?'},
    {from: 13.92, to: 17.233333, text: 'Coba tulis di kolom komentar!'},
  ],
} as const;
