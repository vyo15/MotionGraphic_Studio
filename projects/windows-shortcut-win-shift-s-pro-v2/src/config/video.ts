/** KONTROL SATU PINTU — ubah teks, warna, tata letak dan keyframe dari file ini. */
export const CONFIG = {
  fps: 30,
  durationInFrames: 300,
  colors: {
    bg: '#071321', accent: '#64ECF5', blue: '#3B9AF7', lime: '#AAFFC5',
    text: '#F7FBFF', muted: '#A4BBD2', frame: '#152A42',
  },
  typography: {font: 'Inter, "Segoe UI", Arial, sans-serif'},
  text: {
    kicker: 'WINDOWS HACKS', episode: '03 / 05',
    problemTop: 'SCREENSHOT', problemBottom: 'CUMA SEBAGIAN?',
    shortcutTop: 'PAKAI SHORTCUT', shortcutBottom: 'WIN + SHIFT + S',
    selectingTop: 'TINGGAL DRAG', selectingBottom: 'AREA-NYA!',
    resultTop: 'SCREENSHOT', resultBottom: 'BERHASIL!',
    subtitleProblem: 'Nggak perlu screenshot satu layar.',
    subtitleShortcut: 'Tekan ketiga tombol bersamaan.',
    subtitleSelecting: 'Klik, tahan, lalu tarik area pilihan.',
    subtitleResult: 'Otomatis tersalin ke clipboard.',
    finalNote: 'TINGGAL CTRL + V UNTUK PASTE',
  },
  layout: {
    kickerX: 74, kickerY: 278,
    titleX: 72, titleY: 340,
    subtitleX: 77, subtitleY: 566,
    monitorX: 62, monitorY: 663, monitorW: 956, monitorH: 650,
    keysX: 102, keysY: 1410,
    noteY: 1688,
    zoomX: 80, zoomY: 1202, zoomW: 920, zoomH: 342,
  },
  // Detik, semua transisi bergantung frame (deterministik).
  timeline: {
    intro: 0, hotkey: 1.38, press: 2.18, overlay: 3.08,
    selectionStart: 4.03, selectionEnd: 5.87, capture: 6.12,
    toast: 6.55, result: 7.28, end: 10,
  },
  selection: {startX: 218, startY: 169, endX: 819, endY: 504},
  screen: {width: 924, height: 601},
  zoom: {scale: 1.40, cropLeft: -183, cropTop: -230}, // area dashboard & seleksi diperbesar
  sound: {enabled: true, volume: 0.47},
} as const;
