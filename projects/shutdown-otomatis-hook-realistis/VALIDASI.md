# QA — V35 Editable, 20 November 2026

**Project:** `ShutdownOtomatisHookRealistis` (`shutdown-otomatis-hook-realistis`).

## Benar-benar dijalankan pada salinan Master ZIP user

- ZIP Master terbaru dibaca dan diperiksa. Hanya ada `easy2boot-multiboot-reels` dalam folder `projects/`; source shutdown lama dikumpulkan dari revisi add-on terdahulu, bukan menimpa project yang ada.
- `npm run sync`: **LULUS**, setelah mengatasi path VO opsional yang tidak tersedia.
- `node tools/production-scope.mjs --check`: **LULUS** pada dua project di salinan Master; status shutdown `in-review`.
- Manifest: **2 video, 10 segmen, 12 komposisi termasuk full**, tanpa gap untuk 4 segmen shutdown.
- `npm run check`: bagian sync, validasi library, audit editable, direct studio text, layout, dan studio-check berjalan; **gagal pada pemeriksaan TypeScript penuh karena node_modules/TypeScript lokal belum tersedia** dalam ZIP. Belum dinyatakan lolos penuh.
- Source TS/TSX: transpile syntactic lewat TypeScript global **0 kesalahan sintaks** (21 file sebelum menghapus source legacy yang tidak dipakai).
- `sceneSvg` V29 dan `scene02Svg` V31: masing-masing terurai menjadi **11 dan 10 grup SVG terpisah**, output XML dapat diparse.
- Scene 03 & 04: renderer pemeriksaan internal berbasis source React/TSX berhasil menghasilkan **enam frame SVG yang well-formed** dan enam PNG keyframe. Ini *bukan* render melalui Remotion CLI.
- `npm test`: 25/39 lulus pada ZIP Master terbaru; sebagian tes mengharapkan proyek lama (`ip-address`, dll.) yang **tidak disertakan** dalam ZIP user. Tidak boleh diklaim lulus total.

## Belum diuji / tidak diklaim

- Render lewat **Remotion CLI** dengan dependency Remotion di lingkungan ini (tidak terpasang).
- Drag / resize langsung di Remotion Studio Windows, Save Props lalu reload, dan persistensi edit visual pada PC pengguna.
- VO aktual dan sinkronisasi fonem; subtitle masih **ESTIMASI**.
- Full MP4 yang dirender langsung dari source Remotion terbaru. MP4 V35 terdahulu adalah **referensi storyboard**, bukan bukti render add-on ini.

## Checklist kualitas source

- Scene tetap independen (`Scene01Hook`, `Scene02Download`, `Scene03Time`, `Scene04Run`) dan dipakai identik dalam `Video.tsx` serta `SegmentVideo.tsx`.
- Semua animasi deterministik berdasarkan frame; tanpa `Math.random`, `Date.now`, CSS keyframes, Lottie, atau GIF/screenshot sebagai scene.
- Nama `Interactive.G`/`Interactive.Div` berbahasa Indonesia untuk layer penting; Props mengatur teks, progress, timing umum, transform, dan subtitle.
- Brand kit `src/config/design.ts` dibawa dari project lama tanpa perubahan isi.
- Master user **tidak disertakan** dalam ZIP add-on, dan tidak ada perubahan manual terhadap Root.tsx, index.ts, catalog.json, atau package.json.
