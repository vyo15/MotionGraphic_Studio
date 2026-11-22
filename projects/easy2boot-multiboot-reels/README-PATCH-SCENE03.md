# PATCH Scene 03 Easy2Boot — ACC 2026-11-21

**Target:** MotionGraphic Studio Master v1.8.1, project `projects/easy2boot-multiboot-reels/` yang sudah ada.

**Isi:** `addon-patch.json` + 7 file yang ditambah/diubah. Patch *bukan* Master baru dan bukan add-on baru; ID/slug tetap. Perubahan hanya pada workflow visual Scene03, SFX statis/retiming Scene03, status, dan dokumentasi. Bagian video Scene01/02, Match Move 02→03, Scene04/05/06 dan manifest tidak diubah.

## Instal melalui Master (direkomendasikan)

1. Simpan ZIP patch ini di PC. Jangan ekstrak ke `src/` atau `public/` Master.
2. Buka terminal pada folder `MotionGraphic-Studio/` Master v1.8.1 yang **sudah memiliki** project `projects/easy2boot-multiboot-reels/`.
3. Periksa konflik terlebih dahulu:
   `node tools/apply-addon-patch.mjs "C:\\path\\ke\\Easy2Boot-SCENE03-ACC-Fold-Unfold-Loading-PATCH.zip" --dry-run`
4. Jika muncul `DRY-RUN` dan tidak ada `KONFLIK`, jalankan tanpa `--dry-run`.
5. Jalankan `npm run sync` lalu `npm run dev`. Pilih komposisi `S03 — Persiapan USB`, dan uji nama layer `S03 — ...` di Remotion Studio.

Tool patch Master membuat backup file sebelumnya dan menolak secara aman jika checksum file lama berbeda dari snapshot yang diberikan. Jika PC sudah menyunting file yang sama setelah snapshot, patch **harus berhenti**; jangan menimpa paksa. Komposisi tetap 2701 frame, Scene03 472 frame, 30 FPS.

## Cakupan editabilitas

Layer UI baru adalah React/SVG + `Interactive.G`/`Interactive.Text` terpisah (bukan video atau bitmap). Ubah frame di `src/components/Scene03MergedWorkflow.tsx` → `S03_MERGED_TIMING`; teks label `Interactive.Text` dan bentuk UI di file yang sama. `titleOpen` dan `usbDriveLabel` juga mengikuti Props. Uji klik, drag, edit teks, Save/reload dan render native di Studio Windows **belum** dilakukan oleh ChatGPT.

Scene03 progress 0–100% adalah **simulasi animasi**, bukan proses Easy2Boot yang sebenarnya. VO final belum ditambahkan.
