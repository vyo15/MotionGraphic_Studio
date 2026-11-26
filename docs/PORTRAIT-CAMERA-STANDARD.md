# Portrait Virtual Camera Standard v1.0

**Scope:** UI landscape, diagram luas, atau objek yang memerlukan detail pada Reels portrait. Bukan aturan semua beat harus zoom. Tetap satu Master, 1080×1920 default, safe zone x=50..1030, y=250..1570. Format lain: tetapkan viewport dan zona aman sesuai brief.

## Coordinate contract
- **World space:** UI mempertahankan rasio asli, koordinat piksel konsisten untuk objek, menu/dialog, cursor dan hotspot. Satu `worldId` per world kontinu; ukuran world dan origin tetap. Camera pose `cx`, `cy` dalam world px dan `zoom` dalam screen px per world px, >0. Jangan menyebut 1.0 = fit kecuali benar.
- **Screen space:** background, subtitle, supporting text yang dibutuhkan, safe area dan viewport tetap stabil. `viewport` adalah rect x/y/w/h dalam output px. UI ditempatkan di viewport dengan clipping teknis; bukan mask transition. Jangan potong label/target penting. Sediakan area subtitle terpisah, jangan ikut zoom.
- Transform titik: `sx = viewport.x + viewport.w/2 + (wx-cx)*zoom`, `sy = viewport.y + viewport.h/2 + (wy-cy)*zoom`. Fit awal `min(viewport.w/world.w, viewport.h/world.h)`; center pada world. Untuk focus rect gunakan fit maksimum `min((viewport.w-2*padding)/rect.w,(viewport.h-2*padding)/rect.h)`, center/reframe sesuai ruang dan readability. Jangan stretch X/Y. Padding fleksibel sesuai UI; jika target tidak muat, ubah framing atau pisah beat, jangan crop informasi.
- Camera bounds: world boleh lebih kecil daripada viewport (background off-white); hindari menampilkan area kosong akibat pan tanpa alasan. Target aktif termasuk label, hotspot, menu atau dialog yang perlu dibaca harus muat pada viewport; area lain boleh terpotong dengan sengaja.

## Direction sequence
1. Establish fit utuh sampai penonton memahami konteks.
2. Zoom in hanya ketika detail perlu dibaca. Target harus tersedia sebelum klik/aksi; kamera settle atau tracking terkontrol.
3. Pan ke target berikutnya dengan zoom dipertahankan bila cukup; tidak perlu zoom out tiap scene. Pointer mengikuti lintasan wajar di world dan tidak menutupi label saat hold.
4. Saat UI bereaksi, sesuaikan framing dialog/hasil tanpa mengubah rasio; fokus berpindah setelah reaksi nyata.
5. Hold stabil untuk membaca hasil. Zoom out jika konteks perlu kembali, bukan secara otomatis. Handoff pose terakhir ke pose awal beat/scene berikutnya jika world sama.

## Remotion implementation (reference, bukan patch engine)
- Gunakan `useCurrentFrame()` + `interpolate` clamped atau spring, FPS aktual. Hitung global frame = local frame + offset scene manifest; full video dan SegmentVideo memakai komponen yang sama dan parameter global/scene offset konsisten. Jangan menjalankan timeline scene dua kali atau menggandakan UI selama overlap.
- Parent camera punya transform uniform dan viewport overflow hidden; child native targets tetap bernama dan inline sesuai `studio-direct-v4`. Hindari menjadikan satu wrapper kamera computed sebagai janji semua child dapat drag. Pisahkan base/user/animation transforms. Camera params dapat source/Props-editable; klaim native hanya jika benar-benar diuji. Jangan ubah Root generated.
- Untuk visual hold, kamera tidak bergerak kecuali fokus memang berubah. Cursor park di ruang kosong dekat hasil, bukan di atas teks. Subtitle stabil di screen space.
- Preview full + segment, terutama frame sebelum/tepat/setelah batas scene; verifikasi world pose, target/cursor, crop, scale, z-order. QA plan hanya menilai deklarasi, bukan hasil DOM/render.

## Production Toolkit v1.0 — Master 2.0.0
Baca `docs/PRODUCTION-TOOLKIT.md` sebelum build. Untuk video baru: pilih/copy kamera/asset lokal dari `templates/production-toolkit/` bila relevan; wajib `production/spatial-plan.json` dan `npm run qa:spatial -- <folder-addon>` di gate produksi. Catat world/viewport, focus bounds, track aktif dan collision exemption beralasan, gunakan keyframe yang sama dengan source; cek seluruh frame deklarasi dan tetap inspeksi preview full/segment. Setelah rekaman VO: `vo:align` hanya proposal timestamp, bukan ASR/ACC atau retiming otomatis. `qa:approval` read-only; `qa:render` bedakan declared hold dan kandidat dead zone. Legacy/ACC tidak dipaksa migrasi. Lihat laporan release 2.0.0 untuk batas verifikasi.
