# EDITABLE LAYER MAP — studio-direct-v4

- S01 text nodes: hook pertama, pertanyaan, manfaat, jawaban, titel tutorial, contoh file. Semua adalah *satu JSX node bernama per beat*.
- S01 floating cards: `S01 Mini — Excel data laporan`, `S01 Mini — Chrome Gmail`.
- S01 Windows demo: `S01 Desktop — layar Windows 11`, `S01 Shortcut — Excel/Chrome/ERP System`, `S01 Jendela — Excel data kerja`, `S01 Jendela — Chrome Gmail`, `S01 Jendela — ERP Dashboard`, `S01 Windows — Welcome`.
- S01 Clean Motion v3 (17–26 detik): teks `Kayaknya praktis banget`, `Emang bisa`, `Jawabannya bisa`, `Masuk ke cara`, `Masuk ke langkah pertama`, serta shape `Aksen coral menyambung ke tutorial`. Semua terpisah dan bernama; tidak ada chip aplikasi, ikon pertanyaan, atau ikon folder pada bagian ini.
- S01 data text targets: header Excel, aktivitas Excel, Gmail inbox/pesan, ERP nama modul/KPI. Konten lain di dalam jendela bersifat edit via source file.
- S02 Windows11 Natural v7: target native untuk teks dan objek utama pada `Scene02.tsx` dan `Scene02Windows11.tsx`.
  - Teks: `S02 Teks — Siapkan shortcut`, `Pilih file`, `Klik kanan`, `Send to Desktop`, `Shortcut siap`, `Hasil shortcut`.
  - Desktop: `S02 Desktop — simulasi Windows 11`, `S02 Background — Windows 11 Bloom style`, taskbar, shortcut Chrome/ERP/Excel.
  - File Explorer: jendela Kerja, alamat folder, baris `Laporan Kerja.xlsx`, menu modern, `Show more options`, menu klasik, `Send to`, submenu `Desktop create shortcut`.
  - Pointer: `S02 Cursor — posisi dan gerakan`, dengan lintasan Bezier di koordinat komposisi (tanpa membaca DOM menu tersembunyi), kamera desktop stabil.
  - Penekanan hasil editable: `S02 Fokus — bingkai shortcut baru`, `garis penghubung`, `label Shortcut baru`, dan `centang shortcut`. Keempatnya ditampilkan sesudah Explorer diminimalkan; durasi dan posisi ada di `src/components/Scene02Windows11.tsx`.
  - `S02 Cursor — efek klik halus` adalah layer mandiri; lintasan cursor dapat disesuaikan pada konstanta `cursorMoves` di source. Nama layer ditemukan validator, tetapi keyframe/drag Save di GUI belum diuji.
- S03–S06 tetap DRAFT; konten source sebelum revisi tetap dipertahankan.
- VO guide teks polos terlihat ketika `showVoGuide=true` dan `showSubtitles=true`, tanpa background/border. Scene 01/02/05 sekarang memiliki **19 target `Interactive.Div` berbeda**, masing-masing cue berisi teks JSX literal untuk pemilihan/edit teks native di Studio (perlu QA GUI). Scene 03/04 memiliki cue native tersendiri. Timing cue tetap memakai `src/config/vo-subtitle-cues.json`, dan SRT disediakan untuk CapCut. **Perubahan teks Studio tidak otomatis mengubah JSON/SRT**: selaraskan kedua sumber setelah rekaman VO.


**Kontrak praktik:** Native JSX callsite dapat dikenali validator, **belum sama dengan** sukses drag/Save/reload di GUI. UI tidak di-flatten ke PNG/MP4; beberapa elemen penyusun masih harus diedit melalui source. Cek manifest, blueprint, VO, dan hasil akhir di Remotion Studio Windows.

## Subtitle VO teks polos (revisi konsistensi)

- `S01 VO — Cue 01` sampai `S01 VO — Cue 07`, `S02 VO — Cue 01` sampai `S02 VO — Cue 07`, dan `S05 VO — Cue 01` sampai `S05 VO — Cue 05`: 19 callsite native teks di `src/components/SceneBase.tsx`, tanpa kotak/warna latar.
- `S03 VO — ...` dan `S04 VO — ...`: masing-masing layer teks bernama di scene yang sudah ACC, juga tanpa latar.
- Style tipografi VO: Arial 39px, weight 590, `#343434`, alignment center. Font jendela Windows tetap Segoe UI untuk realisme.
- Teks yang **terlihat** pada S01/S02/S05 sekarang berupa JSX literal langsung di tiap `Interactive.Div`, sehingga memenuhi gate teks native; timing berasal dari `src/config/vo-subtitle-cues.json`. Setelah edit teks di Studio, **perbarui teks JSON/SRT secara terpisah** untuk mencegah ketidaksamaan; belum diuji Save/reload di Windows.
- Cek `showVoGuide`/`showSubtitles` pada Props sebelum render; keduanya bisa dimatikan tanpa mengubah subtitle SRT.
