# QA Native Remotion v1.8.1 — Easy2Boot

- Sumber: ZIP Master v1.8.1 yang diunggah user, bukan format editor baru.
- Lingkup: hanya folder `projects/easy2boot-multiboot-reels/`, ID/slug tidak berubah. Master/proyek lainnya tidak dikemas.
- `src/SegmentVideo.tsx` baru: enam komposisi Scene 01–06, source sama dengan full 2400 frame/30fps.
- 135 layer SVG logis dipecah ke `Interactive.Svg` Remotion dengan nama stabil.
- `editor/` dan `Buka-Editor-Windows.cmd` dihapus dari paket versi native; tidak ada server/editor kedua.
- Native Interactive adalah grup/panel; **bukan** setiap path/titik/label SVG punya editor teks langsung. Typography masih via Props.
- Audio SFX enam scene tetap berada pada `public/audio/`; VO final belum tersedia.
- Pemeriksaan TS/TSX: 38 source files, 0 kesalahan parsing syntax TypeScript.
- Uji integrasi pada **salinan Master**: `node tools/sync-projects.mjs` berhasil (5 video, 29 komposisi); `node tools/validate-library.mjs` berhasil (0 masalah); pemeriksaan editability mengenali 135 Interactive.
- Uji static image layer decomposition pada Chromium: satu frame sampel setiap Scene 01–06 vs original SVG; mean error per channel berturut-turut 0.00, 0.04, 0.00, 0.01, 0.00, 0.00 piksel (skala 0–255; hasil pada area 1080×1920); tidak ada pixel berbeda >15 pada sampel tersebut. Ini bukan uji kesamaan seluruh 2400 frame.
- **Belum diuji**: interaksi drag/save props/reload dari Remotion Studio di Windows user, performa render 2400 frame di Master terpasang, full `tsc --noEmit` (node_modules Master tidak disertakan), dan VO sinkron.
- Pemeriksaan `node tools/studio-check.mjs` melaporkan TypeScript belum terpasang pada salinan Master; jalankan `npm ci` dan `npm run check` di komputer user.
- Komposisi Full Video, scene cuts, teks default, palette, SFX, serta CTA versi terakhir dipertahankan.
