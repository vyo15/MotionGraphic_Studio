# Panduan Edit Scene 01 & Scene 02

## Mengubah teks langsung di Remotion Studio
Buka **komposisi `DebloatWindows11Opening-S02`** agar playhead hanya menampilkan Scene 02. Pilih waktu ketika elemennya terlihat, klik layer `Interactive.Div` yang ingin diubah dan gunakan dukungan editor langsung di versi Master.

- **0–3,5 detik:** Xbox panel. Contoh layer: `S02 — Xbox Heading`, `S02 — Xbox Menu Game Pass`, `S02 — Nama Fokus Xbox`, `S02 — Subtitle Xbox`.
- **3,5–6,7 detik:** Windows Search. Contoh: `S02 — Search Title Bing Search`, `S02 — Search Placeholder`, `S02 — Subtitle Bing`.
- **6,7–10,6 detik:** Copilot. Contoh: `S02 — Copilot Heading Apa Yang Bisa Kubantu`, `S02 — Copilot Description`, `S02 — Subtitle Copilot`, tiga aksi Copilot.
- **10,5–15,5 detik:** daftar untuk ditinjau. Contoh: `S02 — Judul JARANG DIPAKAI`, `S02 — Teks Pilih Aplikasi`, `S02 — Daftar Nama Xbox`, `S02 — Daftar Nama Bing Search`, `S02 — Daftar Nama Copilot`, dan `S02 — Status Belum Dihapus`.

Jika teks tidak dapat diubah langsung karena fungsi Interactive pada instalasi pengguna belum mendukungnya, fallback pasti adalah mengubah literal di `src/scenes/Scene02.tsx` dan `src/components/Scene02Panels.tsx`. Tidak perlu mengubah file Master.

## Edit timing, gerak, posisi, warna, ikon
- Posisi dasar dan pemicu beat VO: `src/config/scene02.ts`.
- Preset fade/slide dan easing: `src/animations/presets.ts`.
- Gerakan dan susunan daftar: `src/scenes/Scene02.tsx`.
- Posisi, ukuran, dan warna komponen UI: `src/components/Scene02Panels.tsx` atau Interactive layer langsung.
- Warna off-white, grid samar, coral: `src/config/design.ts`.
- Aset ikon Xbox/Bing/Copilot: `public/images/xbox.svg`, `bing.svg`, `copilot.png`, bisa diganti file yang sama.

**Penting:** Animasi bergerak pada elemen pembungkus terpisah; kontrol posisi/scale/rotate dari `Interactive.Div` berada pada layer anak agar perpindahan manual tidak langsung merusak keyframe gerakan.

## Menggunakan VO asli
1. Rekam hanya bagian Scene 02: “Gue sendiri jarang pakai Xbox ... mending kita rapihin aja.”
2. Ganti `public/audio/voiceover-scene02.wav` dalam folder project sumber. Ini sekarang masih WAV **hening**.
3. Jalankan `npm run sync` di Master dan set Props `voiceEnabled=true`.
4. Sesuaikan timing di `src/config/scene02.ts` berdasarkan onset kata dari rekaman. Durasi 15,5 detik adalah estimasi preview, bukan transkripsi audio.

Untuk Scene 01, gunakan `public/audio/voiceover.wav` dan source `src/scenes/OpeningScene.tsx`. `showSubtitles` dan `showGrid` dapat diubah melalui Props.

## Catatan editabilitas
Semua teks penting Scene 02 disediakan dalam layer Interactive mandiri; aset ikon per aplikasi dapat diganti. Pengubahan teks dan posisi langsung lewat browser serta persistensi save/reload **belum diuji pada PC Windows pengguna**, sehingga jangan menganggap semua drag/drop berhasil sebelum diperiksa pada Studio pengguna.

## Scene 03 — edit tanpa mengubah Scene 01/02

1. Dari Master jalankan `npm run dev` atau `npm run sync`; buka komposisi **DebloatWindows11Opening-S03** untuk hanya Scene 03. Buka **DebloatWindows11Opening** untuk ketiga scene bergabung.
2. Klik layer bernama `S03 — ...` pada Remotion Studio. Teks langsung di dalam `Interactive.Div` (mis. `S03 — Angka 65K+ GitHub Stars`, `S03 — Pembuat Chris Titus Tech`, `S03 — Subtitle ...`) bisa dicoba dengan mekanisme Direct Studio Text Master. Jika ingin mengubah source secara permanen dan tidak bergantung editor, ubah literal teks pada `src/scenes/Scene03.tsx` atau `src/components/Scene03Github.tsx`.
3. **Posisi/ukuran**: lihat `src/config/scene03.ts` (timing, koordinat sumber). Jika menggeser/resize layer Interactive di Studio, animasi dipasang pada *wrapper* luar sehingga gerakan utamanya tidak tertimpa transform edit. Jika perlu memperbaiki lintasan ikon, ubah nilai `fromX/fromY` dan interpolasi di `src/components/Scene03Trash.tsx`.
4. **Icon Xbox/Bing/Copilot**: `public/images/xbox.svg`, `bing.svg`, `copilot.png`. File baru harus disimpan tetap di dalam folder add-on; asset yang tersinkron otomatis muncul di `public/videos/debloat-windows11-opening/` pada Master. Jangan edit mirror tersebut.
5. **Tong sampah**: badan & tutup adalah SVG dalam `src/components/Scene03Trash.tsx`, editable sebagai layer terpisah. Waktu buka/tutup dari `src/config/scene03.ts`.
6. **Github**: kartu browser dan file editable di `src/components/Scene03Github.tsx`. `65K+` merupakan teks literal yang editable; perbarui jika ingin memutakhirkan angka. Stars bukan jumlah pengguna dan jangan ditulis sebagai rating keamanan.
7. **Subtitle**: ON/OFF lewat prop `showSubtitles`. Tiap potong suara punya layer teks sendiri. Timing ambang pada `Scene03Subtitle` dalam `src/scenes/Scene03.tsx`; sesuaikan setelah memasukkan VO asli.
8. **VO**: ganti `public/audio/voiceover-scene03.wav` dengan file WAV narasi asli yang sudah sinkron, atau pakai nama/path lain yang sama-sama diperbarui di `Video.tsx` dan `SegmentVideo.tsx`. Setelah itu aktifkan `voiceEnabled` pada props Remotion Studio. Saat ini file masih hening 15 detik.
9. **Gaya warna**: `src/config/design.ts` (off-white, grid, coral) dan `src/config/scene03.ts` (warna khusus scene). Efek deterministik berbasis `useCurrentFrame`, bukan timer/runtime.

**Penting**: `Interactive.Div` tidak menjamin drag/resize/save otomatis tersimpan permanen di semua komputer; fitur itu harus didukung oleh Master v1.8.1. Tidak ada editor visual tambahan / tombol palsu dalam add-on ini.

## Scene 04 — Tutorial PowerShell

- **Teks judul/subtitle:** buka komposisi `DebloatWindows11Opening-S04`, pilih layer `S04 — Judul ...` atau `S04 — Subtitle ...`. Source di `src/scenes/Scene04.tsx`.
- **Perintah:** pilih `S04 — PERINTAH SATU BARIS (edit teks di sini)` di `src/components/Scene04Terminal.tsx`; `whiteSpace: pre` menjaga satu baris. Bila karakter berubah jumlahnya, sesuaikan timing/reveal di `src/config/scene04.ts`.
- **Background Bloom:** `public/images/windows11-bloom-scene04.png`. Aset masuk `public/videos/debloat-windows11-opening/images/` secara otomatis saat sync.
- **Terminal dan progress bar:** `src/components/Scene04Terminal.tsx`. Kecepatan bar: `SCENE04.timing.progressStart/progressEnd` (default 10,30–12,15 s); tidak disamakan dengan log terminal nyata.
- **Windows Search/UAC:** `src/components/Scene04Windows.tsx`.
- **WinUtil end card:** `src/components/Scene04WinUtil.tsx`.
- **Kursor:** `SCENE04.cursorKeyframes` di `src/config/scene04.ts`.
- **Audio:** ganti file `public/audio/voiceover-scene04.wav` (sekarang hening). Setelah mengganti audio, cek ulang timing subtitle.

Jangan memindahkan isi `src/` add-on ke root Master. Jangan menimpa/mengganti file proyek Scene 01–03 secara selektif. Gunakan seluruh folder proyek yang sama, dan cadangkan modifikasi lokal sebelum memperbarui.
