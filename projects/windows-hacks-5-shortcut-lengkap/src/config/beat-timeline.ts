/** 30 FPS, real-speed source clips. Pause only at natural completion of each demo.
 * Each beat is authored as a separate <Sequence> in DemoSlot.tsx for editing/cutting.
 * Edit beat boundary source frames to re-cut without stretching time.
 * When changing total frames, update config/series.ts + manifest durationInFrames.
 */
export type Beat = { start: number; frames: number; name: string };
export const DEMO_BEATS = {
  "CTRL_SHIFT_T": [
    {
      "start": 0,
      "frames": 63,
      "name": "Tab browser terbuka"
    },
    {
      "start": 63,
      "frames": 43,
      "name": "Tab tertutup"
    },
    {
      "start": 106,
      "frames": 64,
      "name": "Tekan shortcut"
    },
    {
      "start": 170,
      "frames": 62,
      "name": "Tab kembali"
    },
    {
      "start": 232,
      "frames": 38,
      "name": "Hasil"
    }
  ],
  "CTRL_SHIFT_ESC": [
    {
      "start": 0,
      "frames": 60,
      "name": "Aplikasi tidak merespons"
    },
    {
      "start": 60,
      "frames": 60,
      "name": "Tekan shortcut"
    },
    {
      "start": 120,
      "frames": 75,
      "name": "Cari proses"
    },
    {
      "start": 195,
      "frames": 57,
      "name": "Klik End task"
    },
    {
      "start": 252,
      "frames": 48,
      "name": "Hasil"
    }
  ],
  "WIN_SHIFT_S": [
    {
      "start": 0,
      "frames": 60,
      "name": "Butuh tangkapan layar"
    },
    {
      "start": 60,
      "frames": 75,
      "name": "Tekan shortcut"
    },
    {
      "start": 135,
      "frames": 70,
      "name": "Pilih mode rectangular"
    },
    {
      "start": 205,
      "frames": 55,
      "name": "Drag area screenshot"
    },
    {
      "start": 260,
      "frames": 40,
      "name": "Tersalin ke clipboard"
    }
  ],
  "WIN_E": [
    {
      "start": 0,
      "frames": 60,
      "name": "Folder pertama tetap dibuka"
    },
    {
      "start": 60,
      "frames": 60,
      "name": "Tekan Windows E"
    },
    {
      "start": 120,
      "frames": 65,
      "name": "Jendela Explorer kedua"
    },
    {
      "start": 185,
      "frames": 67,
      "name": "Buka Downloads"
    },
    {
      "start": 252,
      "frames": 48,
      "name": "Dua jendela tetap terbuka"
    }
  ],
  "CTRL_SHIFT_N": [
    {
      "start": 0,
      "frames": 90,
      "name": "Klik kanan terlalu lama"
    },
    {
      "start": 90,
      "frames": 85,
      "name": "Tekan Ctrl Shift N"
    },
    {
      "start": 175,
      "frames": 120,
      "name": "Buat dan beri nama folder"
    },
    {
      "start": 295,
      "frames": 115,
      "name": "Folder baru selesai"
    },
    {
      "start": 410,
      "frames": 130,
      "name": "Bonus Edge InPrivate"
    }
  ]
} as const;
