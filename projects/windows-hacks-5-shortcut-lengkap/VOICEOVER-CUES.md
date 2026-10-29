# Voice-over Cues · Windows Hacks 5 Shortcut · V3

**Durasi: 73,5 detik, 30 FPS.** Gerakan native 1×, tidak slow motion; berhenti sejenak hanya di akhir aksi.

| Scene | Start–End | Durasi | Narasi |
|---|---|---:|---|
| Hook | 0.0–8.0s | 8.0s | Hook dikunci: “Ngapain klik sana-sini, kalau ada cara lebih cepat? Kamu pengguna Windows? Wajib tahu 5 shortcut ini!” |
| 01 · Ctrl + Shift + T | 8.0–17.5s | 9.5s | Tab browser nggak sengaja ketutup? Jangan panik! Tekan Ctrl Shift T, tab-nya langsung balik! |
| 02 · Ctrl + Shift + Esc | 17.5–28.5s | 11.0s | Lagi kerja, aplikasi malah nge-hang? Tekan Ctrl Shift Escape, buka Task Manager, lalu pilih aplikasi yang macet! |
| 03 · Win + Shift + S | 28.5–39.5s | 11.0s | Butuh screenshot cuma sebagian layar? Tekan Windows Shift S, lalu pilih area yang mau diambil! |
| 04 · Win + E · dua jendela | 39.5–50.5s | 11.0s | Mau cari file tanpa ribet buka menu? Tekan Windows E, File Explorer langsung kebuka! (Visual menunjukkan jendela kedua sementara folder pertama tetap terbuka.) |
| 05 · Ctrl + Shift + N | 50.5–69.5s | 19.0s | Bikin folder baru masih lewat klik kanan? Di File Explorer, tekan Ctrl Shift N. Bonusnya, di Chrome atau Edge, shortcut yang sama bisa buka mode privat! |
| CTA · Simpan video | 69.5–73.5s | 4.0s | Simpan videonya, biar nggak lupa! |

## Rekam dan potong tanpa mengubah kecepatan

1. Rekam HOOK, setiap shortcut, dan CTA sebagai **tujuh file WAV terpisah**.
2. Ganti hanya file dalam `public/audio/` yang sesuai; jangan mengganti file efek suara di subfolder shortcut.
3. Buka Studio dan aktifkan `voice.enabled = true`. Atur `voice.volume` dan `sceneEditor.<SCENE>.sfxVolume` saat mixing.
4. Setiap shortcut memiliki **5 beat + 1 jeda hasil** di timeline source. Pangkas/revisi beat pada `src/config/beat-timeline.ts`; jangan ubah speed atau CSS animation durations secara acak.
5. Jika rekaman lebih panjang, **tambahkan durasi scene di `src/config/series.ts` dan nilai `durationInFrames` pada manifest**. Tambah jeda freeze di akhir demo (bukan stretching aksi). Semua komponen memakai frame/timeline deterministik.
6. Sesuaikan VO dengan adegan penting, bukan awal animasi semata. Nilai timecode di bawah ini dipakai saat sync.

## Beat-cut guide (frame dan waktu global)

| Scene | Beat | Global start | Global end | Aksi |
|---|---|---:|---:|---|
| CTRL_SHIFT_T | 1 | 8.00s | 10.10s | Tab browser terbuka |
| CTRL_SHIFT_T | 2 | 10.10s | 11.53s | Tab tertutup |
| CTRL_SHIFT_T | 3 | 11.53s | 13.67s | Tekan shortcut |
| CTRL_SHIFT_T | 4 | 13.67s | 15.73s | Tab kembali |
| CTRL_SHIFT_T | 5 | 15.73s | 17.00s | Hasil |
| CTRL_SHIFT_T | VO HOLD | 17.00s | 17.50s | Jeda setelah hasil terlihat |
| CTRL_SHIFT_ESC | 1 | 17.50s | 19.50s | Aplikasi tidak merespons |
| CTRL_SHIFT_ESC | 2 | 19.50s | 21.50s | Tekan shortcut |
| CTRL_SHIFT_ESC | 3 | 21.50s | 24.00s | Cari proses |
| CTRL_SHIFT_ESC | 4 | 24.00s | 25.90s | Klik End task |
| CTRL_SHIFT_ESC | 5 | 25.90s | 27.50s | Hasil |
| CTRL_SHIFT_ESC | VO HOLD | 27.50s | 28.50s | Jeda setelah hasil terlihat |
| WIN_SHIFT_S | 1 | 28.50s | 30.50s | Butuh tangkapan layar |
| WIN_SHIFT_S | 2 | 30.50s | 33.00s | Tekan shortcut |
| WIN_SHIFT_S | 3 | 33.00s | 35.33s | Pilih mode rectangular |
| WIN_SHIFT_S | 4 | 35.33s | 37.17s | Drag area screenshot |
| WIN_SHIFT_S | 5 | 37.17s | 38.50s | Tersalin ke clipboard |
| WIN_SHIFT_S | VO HOLD | 38.50s | 39.50s | Jeda setelah hasil terlihat |
| WIN_E | 1 | 39.50s | 41.50s | Folder pertama tetap dibuka |
| WIN_E | 2 | 41.50s | 43.50s | Tekan Windows E |
| WIN_E | 3 | 43.50s | 45.67s | Jendela Explorer kedua |
| WIN_E | 4 | 45.67s | 47.90s | Buka Downloads |
| WIN_E | 5 | 47.90s | 49.50s | Dua jendela tetap terbuka |
| WIN_E | VO HOLD | 49.50s | 50.50s | Jeda setelah hasil terlihat |
| CTRL_SHIFT_N | 1 | 50.50s | 53.50s | Klik kanan terlalu lama |
| CTRL_SHIFT_N | 2 | 53.50s | 56.33s | Tekan Ctrl Shift N |
| CTRL_SHIFT_N | 3 | 56.33s | 60.33s | Buat dan beri nama folder |
| CTRL_SHIFT_N | 4 | 60.33s | 64.17s | Folder baru selesai |
| CTRL_SHIFT_N | 5 | 64.17s | 68.50s | Bonus Edge InPrivate |
| CTRL_SHIFT_N | VO HOLD | 68.50s | 69.50s | Jeda setelah hasil terlihat |

**Penting:** efek suara asli mulai dari awal shortcut. Jika menambah freeze di tengah aksi, sumber SFX perlu dipotong/ditunda dengan cara yang sama, atau dimatikan lewat `sfxEnabled`. Jeda hasil (akhir scene) aman dan tidak menggeser SFX tombol.
