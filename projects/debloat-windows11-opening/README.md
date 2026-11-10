# Debloat Windows 11 — Scene 01–04 (Editable)

**Add-on folder-first untuk MotionGraphic Studio v1.8.1.** Ini adalah pembaruan project `debloat-windows11-opening` yang sama, **bukan project/video baru**. Scene 01–03 sebelumnya dipertahankan; Scene 04 ditambahkan sebagai komposisi terpisah sekaligus bagian video gabungan.

## Komposisi
- `DebloatWindows11Opening` — preview gabungan Scene 01–04, **53,5 detik** (1605 frame).
- `DebloatWindows11Opening-S01` — hanya Scene 01, **8 detik**.
- `DebloatWindows11Opening-S02` — hanya Scene 02, **15,5 detik**.
- `DebloatWindows11Opening-S03` — hanya Scene 03, **15 detik**.
- `DebloatWindows11Opening-S04` — hanya Scene 04, **15 detik**.

Semua komposisi: vertikal 1080×1920, 30 fps. Voice-over **belum tersedia**, dan dua berkas WAV hanyalah placeholder hening. Scene 05–06 **belum dibuat**.

## Instalasi / upgrade tanpa mengubah Master
1. Cadangkan folder `MotionGraphic-Studio/projects/debloat-windows11-opening` yang sudah ada, jika pernah diedit pada PC sendiri.
2. Ekstrak ZIP sampai tampak **satu folder** `debloat-windows11-opening/` yang berisi `motiongraphic-video.json`.
3. Salin folder itu sebagai **pengganti project yang sama** di `MotionGraphic-Studio/projects/`. Jangan salin isinya ke `src/` atau `public/` root master. Kalau sebelumnya tidak ada folder tersebut, cukup tambahkan.
4. Dari root Master jalankan `npm run sync` (atau `npm run dev` bila Studio belum dibuka).
5. Di sidebar Remotion Studio buka **Videos → Debloat Windows 11 → Scenes → 02 — Xbox, Bing Search, Copilot** untuk edit hanya Scene 02. Lihat menu **Full-Video** untuk gabungan.

**Jangan** mengubah `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, atau `package.json` Master. `npm run sync` menghasilkan registrasi otomatis.

## Cerita Scene 02
Narasi yang digunakan untuk mapping visual:
> Gue sendiri jarang pakai Xbox, Bing Search, sama Copilot. Nah, daripada nggak kepakai, mending kita rapihin aja.

- Xbox: ikon dari Scene 01 berkembang menjadi jendela Xbox.
- Bing Search: jendela berganti ke simulasi Windows Search.
- Copilot: panel Copilot dan contoh interaksinya.
- Penutup: ketiganya disusun ke daftar review **Belum dihapus**, karena penghapusan baru dibahas pada scene tutorial berikutnya.

Tampilan Windows/Xbox/Bing/Copilot adalah **rekonstruksi UI untuk storytelling**, bukan pengambilan layar/hasil aplikasi sebenarnya. Screenshot scene utuh tidak dipakai sebagai layer; ikon merupakan aset terpisah.

## Berkas penting
- `src/Video.tsx` — scene gabungan, entry dan export `Video`.
- `src/SegmentVideo.tsx` — tiap scene dapat dipreview/edit langsung dalam komposisi terpisah.
- `src/scenes/OpeningScene.tsx` — Scene 01 lama, tidak diubah.
- `src/scenes/Scene02.tsx` — Scene 02, kartu & subtitle editable.
- `src/components/Scene02Panels.tsx` — UI simulasi Xbox, Windows Search dan Copilot sebagai elemen React yang terpisah.
- `src/config/scene02.ts` — timing dan posisi dasar Scene 02.
- `src/config/design.ts` — warna dan visual utama (sama dengan Scene 01).
- `public/images/` — ikon per aplikasi, mandiri.
- `public/audio/voiceover-scene02.wav` — placeholder 16 detik, **bukan VO asli**.

Baca `PANDUAN-EDIT-ASSET.md`, `EDITABLE-LAYER-MAP.md`, `STORYBOARD.md`, dan `VALIDASI.md`.

## UPDATE 2026-11-10 — Scene 03 (WinUtil → Tong Sampah → GitHub)

Paket ini kini berisi **tiga scene** dalam **satu proyek** dengan ID/slug yang sama: `DebloatWindows11Opening` / `debloat-windows11-opening`. Scene 01 dan 02 berasal dari paket sebelumnya tanpa source scene diubah. Hanya komposisi dan manifest yang diperpanjang.

- Komposisi utama (setelah Scene 04): `DebloatWindows11Opening` — 53,5 detik (1605 frame).
- Scene 01: `DebloatWindows11Opening-S01` — 8 detik / 240 frame.
- Scene 02: `DebloatWindows11Opening-S02` — 15,5 detik / 465 frame.
- Scene 03: `DebloatWindows11Opening-S03` — 15 detik / 450 frame.

**Scene 03 disusun dari HTML/CSS, SVG, dan layer Remotion**: tiga kartu aplikasi terpisah, body dan tutup tong sampah SVG, kartu browser GitHub, nama pemilik, direktori kode, ikon bintang, angka dan subtitle. Tidak ada video yang diflatten menjadi background.

Suara Scene 03 adalah placeholder **hening** (`public/audio/voiceover-scene03.wav`). Preview yang disetujui sebelumnya adalah **referensi** (`preview-scene03-tong-sampah-github-v8.mp4`), belum render sumber Remotion ini.

Aset dan SVG GitHub: GitHub logo based on Font Awesome Free brand icon (Fonticons; Font Awesome license in original repository). Untuk proyek ini diubah menjadi `public/icons/github.svg`, dan saat sync diakses sebagai `videos/debloat-windows11-opening/icons/github.svg`.

## UPDATE 2026-11-10 — Scene 04 PowerShell + Windows 11 Bloom + Progress Bar

- Project tetap `DebloatWindows11Opening`, folder tetap `debloat-windows11-opening`.
- Komposisi utama menjadi **53,5 detik (1605 frame)** dengan empat scene.
- Scene 04: `DebloatWindows11Opening-S04` — **15 detik (450 frame)**.
- Scene 01–03 diambil dari ZIP editable sebelumnya, source komponen/scenenya **tidak diubah**.
- Scene 04 adalah reproduksi **UI HTML/SVG/CSS dan aset wallpaper independen**, bukan video hasil render yang ditempel di background. Windows Search, dialog UAC, terminal, satu-baris command, progress bar, kursor, dan WinUtil adalah komponen terpisah.
- Audio S04: `public/audio/voiceover-scene04.wav` adalah placeholder **hening**, bukan rekaman VO.

### Edit Scene 04

1. Instalasi: ekstrak seluruh folder `debloat-windows11-opening` dari ZIP dan salin **folder utuh** ke `MotionGraphic-Studio/projects/`. Cadangkan folder lama bila telah dimodifikasi.
2. Dari root Master, jalankan `npm run sync` / `npm run dev`.
3. Buka `DebloatWindows11Opening-S04` untuk mengedit Scene 04 saja. Komposisi `DebloatWindows11Opening` menampilkan keempat scene.
4. **Ganti teks melalui layer langsung** `S04 — ...` di Studio jika fitur `Interactive` Master berjalan, terutama `S04 — PERINTAH SATU BARIS (edit teks di sini)`. Timeline dan lintasan dapat diubah di `src/config/scene04.ts`.
5. **Ganti background** dengan file PNG bernama `public/images/windows11-bloom-scene04.png` atau ubah path di `src/components/Scene04Windows.tsx`.
6. **Audio:** ganti `public/audio/voiceover-scene04.wav` dengan rekaman WAV final, lalu aktifkan `voiceEnabled` pada Props. Timing subtitle masih perkiraan, cocokkan dengan rekaman baru.

### Menampilkan perintah secara benar

`irm https://christitus.com/win | iex` tetap satu baris; gunakan **Windows PowerShell sebagai Administrator**, bukan CMD. Perintah menjalankan skrip jarak jauh dengan hak tinggi, sehingga hanya gunakan setelah memverifikasi sumber serta memahami risikonya. Rujukan sumber: https://github.com/ChrisTitusTech/winutil

Progress bar yang muncul setelah Enter merupakan **ilustrasi proses loading**, bukan klaim output CLI WinUtil. Antarmuka UAC/PowerShell/WinUtil adalah rekonstruksi visual, bukan bukti rekaman Windows 11 sungguhan. Baca `SCENE-04-EDITABLE-LAYER-MAP.md` dan `VALIDASI.md` untuk detail.
