# FILE CHANGE ONLY — Scene 01 (ACC split Q&A)

Basis: MotionGraphic-Studio-FULL-v1.8.1-20261125-035554.zip.
**Jangan mengubah project lain atau root Master.**

## Yang masuk patch
- `src/scenes/Scene01.tsx`: timing proof 12,9s; transisi hook→login; teks pertanyaan dan jawaban terpisah; empat tanda tanya kecil; judul tutorial konsisten; VO Guide tetap.
- `src/components/WorkWindows.tsx`: desktop Windows 11 Bloom/SVG mengikuti identitas Scene02; Excel→Gmail (inbox kerja)→ERP muncul bertahap tanpa gerakan susun ulang; kursor diam; aset tetap DOM/SVG (bukan video/image flattened).
- `production/editable-blueprint.json`: memperbarui peta target layer native.
- `production/sound-cues.json`: dua SFX Scene01 diselaraskan dengan munculnya jawaban (frame 677) dan tutorial (frame 732).

## Instalasi aman
1. Tutup `npm run dev` dan backup folder `projects/sample-startup-windows-director/`.
2. Bandingkan SHA-256 empat file asli milik Anda (di bawah) agar tidak menimpa perubahan lokal tak sengaja.
3. Ekstrak ZIP ini ke root `MotionGraphic_Studio/` yang berisi `package.json`; pilih merge/replace **hanya** empat file sesuai path di dalam ZIP.
4. Jalankan `npm run dev`, buka `SampleStartupWindowsDirector`, review 00:08–00:28,5 dan sambungan ke Scene02.
5. Jika ada perbedaan dengan preview browser ACC, revisi source spesifik sebelum dianggap final.

## SHA256 file sumber yang diharapkan (sebelum penggantian)
- `src/scenes/Scene01.tsx`: `c9a43763038ad1ea89715c8160d1899733f9d5db4ea1226fed0691e8470e946d`
- `src/components/WorkWindows.tsx`: `969b1173fc42bf5c621f32f6b56774d1ebe895bf6369d58eb6d6adfd06e7f6f9`
- `production/editable-blueprint.json`: `703e61603ac6d79266fee45fdc71b5996f97024cfe7f23ff6cf517efbc702f2f`
- `production/sound-cues.json`: `0bd9868ec1de6d330286dbf9af3d1444242baf7448dacd4285ce2bd5d55a331a`

Cek PowerShell contoh: `Get-FileHash .\projects\sample-startup-windows-director\src\scenes\Scene01.tsx -Algorithm SHA256`
Jika hash sebelum pemasangan berbeda, **jangan langsung Replace**; berarti ada perubahan lokal/versi Master yang perlu di-merge manual.

## Hasil QA di lingkungan pengembangan
- Source syntax: 128 file diparse, 0 kesalahan.
- Native editable: 139 target, 0 FAIL/WARN pada add-on ini.
- NO-CODE EDIT: 0 pelanggaran; semua teks utama yang baru berupa literal di Interactive.Div.
- Validator add-on --syntax: 0 FAIL/WARN.
- `npm run sync` pada salinan Master: 4 folder video, 43 komposisi, 0 masalah sumber.
- Belum diuji: render native Remotion, interaksi GUI drag/Save/reload, dan kesesuaian visual pixel-by-pixel terhadap MP4 preview browser.
- Instalasi dependency npm gagal pada mesin audit; tidak ada klaim native render.
