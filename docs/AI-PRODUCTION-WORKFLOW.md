# MOTIONGRAPHIC STUDIO — AI PRODUCTION CONTRACT v1.0

## Scope
Satu Master, tanpa editor alternatif. ChatGPT menghasilkan add-on sesuai `contracts/addon.schema.json`; Master menerima paket dengan validator bersama dan menolak penimpaan project lain. **File di `projects/` milik pengguna, jangan diganti untuk meng-upgrade engine.**

## Flow tetap (semua topik)
1. Pengguna memberi **judul** (opsional ZIP Master terbaru atau `contracts/studio-capabilities.json`).
2. ChatGPT menyiapkan naskah **draft**, storyboard cause → action → result, cek style, hook, pacing, lalu membangun motion graphic dari draft (belum ada rekaman).
3. Setelah visual diperiksa dan revisi disetujui, ChatGPT mengirim **folder add-on** `<slug>/` dan ZIP-nya saja. `motiongraphic-video.json` wajib, `contractVersion: 1.0.0`, `export const Video`, scene/config/aset terpisah.
4. Pengguna jalankan `npm run addon:validate -- "C:\\path\\slug" --strict`, lalu `npm run addfolder -- "C:\\path\\slug"` (atau masukkan ZIP ke `library/masuk/` kemudian `npm run import`). Tidak perlu mengedit `src/Root.tsx`, `src/index.ts`, `library/catalog.json`.
5. `npm run dev` atau `npm run sync`. Preview/revisi sampai visual disetujui. VO Guide pada `<ID>VOGuide` memakai draft `src/config/narration.json`; teks dapat diubah di Props komposisi guide lalu pilih **Save to code** dan sync. Alternatif: `npm run vo:edit -- <slug>`.
6. **Rekam VO setelah motion disetujui.** Tempel audio asli ke `<slug>/public/audio/`, edit source/Props audio sesuai scene, sinkron timing visual dan subtitle, jangan asal mempercepat narasi.
7. Uji `npm test`, `npm run check:sync`, `npm run check` (tanpa sync otomatis), `npm run qa:smoke -- --still <IDVideo>` setelah `npm ci`, render MP4, `npm run qa:render -- out/video.mp4 --src projects/<slug>`. Review manual frame, subtitle, kursor, keselamatan layar HP dan lip-sync.
8. Arsipkan hasil dengan `npm run zip -- --all` atau ZIP Master Engine Only `npm run zip -- --studio`. Gunakan `--studio --with-projects` hanya untuk backup semua video; `--studio --full` menambah riwayat backup. Tidak satu pun menghapus file di PC.

## Kontrak add-on ChatGPT
- Manifest: `id`, `slug`, `title`, `entry`, `exportName`, `width`, `height`, `fps`, `durationInFrames`, `defaultProps`, opsional `segments`.
- Wajib `contractVersion: "1.0.0"` untuk add-on baru. Folder harus bernama persis slug.
- Source: `src/Video.tsx` export `Video`, `src/scenes/`, `src/components/`, `src/animations/`, `src/config/`, aset mandiri `public/`, README & PANDUAN-EDIT-ASSET.
- Aset: `staticFile('videos/<slug>/audio/suara.wav')`. Hindari dependensi tambahan; jangan menaruh `node_modules` atau cache.
- Gunakan `Interactive` dan properti style inline sesuai dokumen Remotion, bukan mengasumsikan semua React bisa drag. Keyframe ditulis berbasis `useCurrentFrame()`, `interpolate()`, `spring()`; hindari animasi imperatif dan CSS transition di dalam render.
- `narration.json` menyimpan draft naskah VO/beat, bukan audio atau subtitle final. Beat contiguous, 0 sampai `durationInFrames`.
- Lock creative/approval dipertahankan. Project lama tidak direfaktor otomatis.

## Revisi aman (FILE CHANGE ONLY)
- Jangan menimpa semua folder project dengan ZIP revisi jika ada edit PC.
- Untuk revisi, sediakan **snapshot original project** dan **snapshot hasil revisi** (slug/ID sama). Jalankan:
  `npm run addon:patch-create -- /path/sebelum /path/sesudah /path/output-patch`
- Preview tanpa mengubah project:
  `npm run addon:patch -- /path/output-patch --dry-run`
- Terapkan:
  `npm run addon:patch -- /path/output-patch`
- Setiap file patch mencantumkan `expectedSha256`, sehingga modifikasi lokal berbeda akan menyebabkan **KONFLIK**, bukan penimpaan diam-diam. Backup disimpan di `library/backups/addon-patches/` sebelum diubah. Jalankan `npm run sync` setelah patch.
- Kontrak patch: `addon-patch.json` + payload `files/<relative-project-path>` (bukan ZIP Master). Tidak boleh path keluar project, symlink, atau perubahan ID/slug.

## Perbedaan tingkat verifikasi
- **Validator statis**: struktur, manifest, lint import literal, file/asset, dependensi tersedia, symlink, checksum. Bukan bukti kualitas visual, TypeScript typecheck, atau keamanan source third-party.
- **Unit test**: menguji engine/fixture sintetik. Bukan jaminan render setiap project.
- **Studio + render**: memerlukan dependensi lokal dan pengujian Windows untuk memastikan edit drag/save/reload dan hasil MP4 secara nyata.

## Sumber resmi
- https://www.remotion.dev/docs/studio/interactivity-best-practices
- https://www.remotion.dev/docs/interactive
- https://www.remotion.dev/docs/cli/render


## Quality gate tambahan (v1.1)
- `--strict` menolak `defaultProps` yang hilang, aset `staticFile` yang hilang, import dinamis tidak dapat diverifikasi, serta import relatif yang menuju file tak ada.
- `--syntax` mensyaratkan parser TypeScript tersedia. Tanpa dependensi, ini FAIL, bukan PASS palsu.
- Untuk add-on baru, validator kontrak wajib lulus sebelum import. Add-on lawas tetap dibaca dengan validasi non-strict saat sync agar scene lama tidak rusak.
- Revisi `addon:patch --dry-run` membangun salinan proyek **sementara** dan memvalidasi hasil akhirnya sebelum file aktif disentuh. Hash tetap dicek ulang sebelum menulis.
- `npm run check` sekarang READ-ONLY: bila belum sinkron, jalankan `npm run sync` secara eksplisit, lalu ulangi check.
- Smoke Remotion memerlukan `npm ci`, browser, dan CLI yang benar-benar tersedia. Ia memeriksa bundling dan frame pertama; bukan sertifikasi seluruh audio/MP4.
- Lihat `docs/MAINTENANCE-AND-RECOVERY.md` untuk verifikasi dan pembersihan aman.


Alur entry point dan penanganan error terbaru: [USER-FLOW-CHATGPT.md](USER-FLOW-CHATGPT.md). Kontrak editing native: [EDITABLE-CONTRACT.md](EDITABLE-CONTRACT.md).

## MOTION DIRECTION v3.0 — routing otomatis

Untuk tugas motion graphic relevan, gunakan MotionGraphic Studio Director bila tersedia dan baca `skills/motion-continuity-director/SKILL.md`, `docs/MOTION-DECISION-MATRIX.md`, `docs/MOTION-VOCABULARY.md`, `docs/PORTRAIT-CAMERA-STANDARD.md`, `docs/MOTION-PLAN-CONTRACT.md` setelah aturan motion. Pilih gerak berdasarkan makna beat: eye trace, focus handoff, shared element, action/reaction, reflow, hold; tanpa Slide Mask dekoratif sebagai default. UI landscape dalam portrait memakai kamera virtual fit → zoom bila detail → pan/tracking → hold → zoom out bila perlu; world UI/cursor terpisah dari subtitle/background. Periksa collision sepanjang lintasan dan kontinuitas full/segment. Video baru wajib Motion Plan v1 (`motionPlanContract: "focus-driven-v1"`) dan QA metadata, kemudian preview visual. Tidak ada retrofit project lama/ACC. Skill lokal bukan pemasangan otomatis ke akun.

## Gate release 2.0.0
Untuk video baru jalankan `npm run qa:motion -- <folder-addon>` dan `npm run qa:spatial -- <folder-addon>` lalu `npm run addon:validate -- <folder-addon> --production --syntax` (flag produksi eksplisit; scaffold/legacy tetap dapat memakai `--strict`). `npm run qa:motion -- --all` melewati legacy tanpa kontrak, bukan PASS visual. `npm run release:check` memeriksa konsistensi versi sebelum ekspor Master. Baca `docs/RELEASE-2.0.0-AUDIT.md` (riwayat sebelumnya: `docs/RELEASE-1.9.0-AUDIT.md`).

## Production Toolkit v1.0 — Master 2.0.0
Baca `docs/PRODUCTION-TOOLKIT.md` sebelum build. Untuk video baru: pilih/copy kamera/asset lokal dari `templates/production-toolkit/` bila relevan; wajib `production/spatial-plan.json` dan `npm run qa:spatial -- <folder-addon>` di gate produksi. Catat world/viewport, focus bounds, track aktif dan collision exemption beralasan, gunakan keyframe yang sama dengan source; cek seluruh frame deklarasi dan tetap inspeksi preview full/segment. Setelah rekaman VO: `vo:align` hanya proposal timestamp, bukan ASR/ACC atau retiming otomatis. `qa:approval` read-only; `qa:render` bedakan declared hold dan kandidat dead zone. Legacy/ACC tidak dipaksa migrasi. Lihat laporan release 2.0.0 untuk batas verifikasi.
