/** 69.5s, VO-friendly, each native demo at 1x speed, short pause after. FPS=30. */
export const TIMELINE = [
  {
    "key": "HOOK",
    "label": "Hook",
    "start": 0,
    "frames": 240,
    "nativeFrames": 210,
    "hold": 30,
    "end": 240
  },
  {
    "key": "CTRL_SHIFT_T",
    "label": "01 · Ctrl + Shift + T",
    "start": 240,
    "frames": 285,
    "nativeFrames": 270,
    "hold": 15,
    "end": 525
  },
  {
    "key": "CTRL_SHIFT_ESC",
    "label": "02 · Ctrl + Shift + Esc",
    "start": 525,
    "frames": 330,
    "nativeFrames": 300,
    "hold": 30,
    "end": 855
  },
  {
    "key": "WIN_SHIFT_S",
    "label": "03 · Win + Shift + S",
    "start": 855,
    "frames": 330,
    "nativeFrames": 300,
    "hold": 30,
    "end": 1185
  },
  {
    "key": "WIN_E",
    "label": "04 · Win + E · dua jendela",
    "start": 1185,
    "frames": 330,
    "nativeFrames": 300,
    "hold": 30,
    "end": 1515
  },
  {
    "key": "CTRL_SHIFT_N",
    "label": "05 · Ctrl + Shift + N",
    "start": 1515,
    "frames": 450,
    "nativeFrames": 450,
    "hold": 0,
    "end": 1965
  },
  {
    "key": "CTA",
    "label": "CTA · Simpan video",
    "start": 1965,
    "frames": 120,
    "nativeFrames": 114,
    "hold": 6,
    "end": 2085
  }
] as const;
export const START = {
  "HOOK": 0,
  "CTRL_SHIFT_T": 240,
  "CTRL_SHIFT_ESC": 525,
  "WIN_SHIFT_S": 855,
  "WIN_E": 1185,
  "CTRL_SHIFT_N": 1515,
  "CTA": 1965
} as const;
export const FRAMES = {
  "HOOK": 240,
  "CTRL_SHIFT_T": 285,
  "CTRL_SHIFT_ESC": 330,
  "WIN_SHIFT_S": 330,
  "WIN_E": 330,
  "CTRL_SHIFT_N": 450,
  "CTA": 120
} as const;
export const NATIVE_FRAMES = {
  "HOOK": 210,
  "CTRL_SHIFT_T": 270,
  "CTRL_SHIFT_ESC": 300,
  "WIN_SHIFT_S": 300,
  "WIN_E": 300,
  "CTRL_SHIFT_N": 450,
  "CTA": 114
} as const;
export const NARASI = {
  "HOOK": "Ngapain klik sana-sini, kalau ada cara lebih cepat? Kamu pengguna Windows? Wajib tahu 5 shortcut ini!",
  "CTRL_SHIFT_T": "Tab browser nggak sengaja ketutup? Jangan panik! Tekan Ctrl Shift T, tab-nya langsung balik!",
  "CTRL_SHIFT_ESC": "Lagi kerja, aplikasi malah nge-hang? Tekan Ctrl Shift Escape, buka Task Manager, lalu pilih aplikasi yang macet!",
  "WIN_SHIFT_S": "Butuh screenshot cuma sebagian layar? Tekan Windows Shift S, lalu pilih area yang mau diambil!",
  "WIN_E": "Mau cari file tanpa ribet buka menu? Tekan Windows E, File Explorer langsung kebuka!",
  "CTRL_SHIFT_N": "Bikin folder baru masih lewat klik kanan? Di File Explorer, tekan Ctrl Shift N. Bonusnya, di Chrome atau Edge, shortcut yang sama bisa buka mode privat!",
  "CTA": "Simpan videonya, biar nggak lupa!"
} as const;
export const LABELS = {
 "HOOK":"Hook",
 "CTRL_SHIFT_T":"01 · Ctrl + Shift + T",
 "CTRL_SHIFT_ESC":"02 · Ctrl + Shift + Esc",
 "WIN_SHIFT_S":"03 · Win + Shift + S",
 "WIN_E":"04 · Win + E · dua jendela",
 "CTRL_SHIFT_N":"05 · Ctrl + Shift + N",
 "CTA":"CTA · Simpan video",
} as const;
export const COLORS = {background:'#071321',cyan:'#67E8F9',mint:'#9FF6C7',text:'#F8FCFF',muted:'#91B1CE',yellow:'#FFCC77'} as const;
export const TOTAL_FRAMES = 2085;
