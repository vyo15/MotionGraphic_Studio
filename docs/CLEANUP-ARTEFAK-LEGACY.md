# Pembersihan artefak Easy2Boot dari Master lama

Pada **ZIP Master lengkap yang sudah diperbaiki**, file di bawah telah dikeluarkan dari project aktif. File sumber asli tetap bisa dipulihkan dari ZIP cadangan lama.

Jika kamu memilih **ZIP patch FILE CHANGE ONLY** dan menerapkannya di atas Master yang lebih lama, setelah mencadangkan Master jalankan perintah berikut di **Git Bash dari root `MotionGraphic-Studio`**.

```bash
# Hanya dokumen QA/revisi historis yang tidak dipakai oleh source aktif
rm -f -- \
  projects/easy2boot-multiboot-reels/Buka-Editor-Windows.cmd \
  projects/easy2boot-multiboot-reels/FIX-LAYER-HILANG-v1.8.1.md \
  projects/easy2boot-multiboot-reels/PERBAIKAN-ELEMEN-HILANG.md \
  projects/easy2boot-multiboot-reels/QA-EDITOR.md \
  projects/easy2boot-multiboot-reels/QA-NATIVE-v1.8.1.md \
  projects/easy2boot-multiboot-reels/QA-RENDER-FIX.md \
  projects/easy2boot-multiboot-reels/QA-SCENE-01-IMPACT.md \
  projects/easy2boot-multiboot-reels/REVISI-MASUK-SCENE03.md \
  projects/easy2boot-multiboot-reels/VALIDASI-NATIVE.md \
  projects/easy2boot-multiboot-reels/src/components/SvgViewport.tsx \
  projects/easy2boot-multiboot-reels/src/config/editorState.ts \
  projects/easy2boot-multiboot-reels/src/config/VO_Beats.ts

# Folder editor standalone tidak terhubung ke Remotion render terbaru.
rm -rf -- projects/easy2boot-multiboot-reels/editor/
```

Kemudian jalankan:

```bash
npm run sync
npm test
npm run check
```

**DILARANG dihapus:** `src/config/frames/scene01.ts`–`scene06.ts`, seluruh `projects/` lain, `public/audio/`, manifest, `APPROVAL-LOCK-20261120.json`, file status scene, serta `library/backups/` bila dibutuhkan untuk pemulihan.

Perintah di atas tidak menyentuh project selain Easy2Boot. Skrip ini **tidak dijalankan otomatis** oleh Master; hapus hanya jika backup sudah tersedia.
