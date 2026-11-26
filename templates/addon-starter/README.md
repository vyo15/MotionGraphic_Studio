# Template add-on MotionGraphic Studio

Standar `studio-direct-v4`: Layer utama bernama dan memakai `Interactive.*` dengan style inline, teks literal di node yang perlu diedit langsung, serta animasi berbasis frame. Hapus layer demo setelah mengganti dengan objek video nyata. Jangan flatten seluruh scene atau menganggap semua HTML otomatis draggable.

Motion dahulu → review visual → VO Guide → rekam VO sendiri → sinkronisasi → QA → render. Update `EDITABLE-LAYER-MAP.md`, `narration.json`, dan panduan aset pada video baru.

## Standar scene editable & sound terbaru

Saat menghasilkan add-on, baca `docs/SCENE-LAYER-AND-SOUND-STANDARD.md` di root Master. Tulis satu JSX `Interactive` berbeda untuk setiap objek yang harus diedit mandiri, bukan membuat banyak instance dari satu wrapper. Gunakan cue audio per aksi (`production/sound-cues.json`) dan jangan menjanjikan native editing tanpa tes GUI Save/reload.

### CLEAN FOCUS v2.1 saat menulis scene baru

Jangan salin desain placeholder Scene01 sebagai shell yang dipasang ke semua adegan. Ganti layer judul/kartu dummy dengan **objek utama nyata**. Tidak ada running header/footer, progress bar dekoratif, badge `01 — HOOK`, nomor scene atau garis atas/bawah pada render video. Judul hook boleh tampil **sementara** lalu menghilang ketika demonstrasi mulai; overlay penjelas hanya saat fungsi informasi diperlukan. Background off-white polos lebih baik daripada grid dekoratif. Semua metadata produksi tetap di storyboard/timeline dan bukan layar akhir. Lihat `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` §4A di root Master.

### Editable First
Template telah berisi `production/editable-blueprint.json` dengan target teks/headline/subtitle dan objek utama. Setiap scene baru harus memperbarui daftar ini. Hindari `.map()` yang membuat satu callsite `Interactive` untuk banyak teks. Jalankan validator ketat dan `npm run qa:native`; uji Save/reload langsung di Studio sebelum mengklaim native editable.

**TEXT HIERARCHY & SUBTITLE LOCK v1.0 (video baru):** subtitle draft VO wajib aktif secara default pada preview bernarasi; teks pendukung atas/dekat objek hanya jika memberi fungsi tambahan (parameter, arti, nilai, status atau batasan), bukan mengulang subtitle atau UI. Visual utama mendemonstrasikan aksi/hasil. Maksimal satu penegasan relevan per beat, boleh kosong; subtitle bawah maksimal dua baris, aman, konsisten dan editable per cue. Cover silent tanpa subtitle. Setelah motion ACC, rekam VO dan sinkronkan subtitle final; tampilkan hanya satu track. CapCut HQ menonaktifkan subtitle melalui Props sementara. Baca `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` §5A dan gate `docs/QA-VISUAL-MOTION-CHECKLIST.md`. Jangan retrofit project/scene ACC.

Starter mencontohkan satu cue DRAFT (frame 128–218), bukan script lengkap. Isi naskah dan cue untuk seluruh beat bernarasi pada project baru, ganti semua placeholder dan verifikasi `showSubtitles` dengan full/segment serta CapCut HQ. Teks literal cue harus sama dengan naskah; jangan menjadikan sample sebagai video final.

## Motion Direction v3.0

Baca `production/MOTION-PLAN.md`. Scaffold adalah placeholder, bukan video final. Setelah narration lengkap, buat `production/motion-plan.json` dan set `motionPlanContract: "focus-driven-v1"` pada manifest. Jangan sekadar menyalin contoh. Jalankan QA plan dan validator strict sebelum delivery; jangan menambah dependensi atau klaim native edit dari metadata.

## Gate release 2.0.0
Untuk video baru jalankan `npm run qa:motion -- <folder-addon>` dan `npm run qa:spatial -- <folder-addon>` lalu `npm run addon:validate -- <folder-addon> --production --syntax` (flag produksi eksplisit; scaffold/legacy tetap dapat memakai `--strict`). `npm run qa:motion -- --all` melewati legacy tanpa kontrak, bukan PASS visual. `npm run release:check` memeriksa konsistensi versi sebelum ekspor Master. Baca `docs/RELEASE-2.0.0-AUDIT.md` (riwayat sebelumnya: `docs/RELEASE-1.9.0-AUDIT.md`).

## Production Toolkit v1.0 — Master 2.0.0
Baca `docs/PRODUCTION-TOOLKIT.md` sebelum build. Untuk video baru: pilih/copy kamera/asset lokal dari `templates/production-toolkit/` bila relevan; wajib `production/spatial-plan.json` dan `npm run qa:spatial -- <folder-addon>` di gate produksi. Catat world/viewport, focus bounds, track aktif dan collision exemption beralasan, gunakan keyframe yang sama dengan source; cek seluruh frame deklarasi dan tetap inspeksi preview full/segment. Setelah rekaman VO: `vo:align` hanya proposal timestamp, bukan ASR/ACC atau retiming otomatis. `qa:approval` read-only; `qa:render` bedakan declared hold dan kandidat dead zone. Legacy/ACC tidak dipaksa migrasi. Lihat laporan release 2.0.0 untuk batas verifikasi.
