# Template add-on MotionGraphic Studio

Standar `studio-direct-v4`: Layer utama bernama dan memakai `Interactive.*` dengan style inline, teks literal di node yang perlu diedit langsung, serta animasi berbasis frame. Hapus layer demo setelah mengganti dengan objek video nyata. Jangan flatten seluruh scene atau menganggap semua HTML otomatis draggable.

Motion dahulu → review visual → VO Guide → rekam VO sendiri → sinkronisasi → QA → render. Update `EDITABLE-LAYER-MAP.md`, `narration.json`, dan panduan aset pada video baru.

## Standar scene editable & sound terbaru

Saat menghasilkan add-on, baca `docs/SCENE-LAYER-AND-SOUND-STANDARD.md` di root Master. Tulis satu JSX `Interactive` berbeda untuk setiap objek yang harus diedit mandiri, bukan membuat banyak instance dari satu wrapper. Gunakan cue audio per aksi (`production/sound-cues.json`) dan jangan menjanjikan native editing tanpa tes GUI Save/reload.

### Editable First
Template telah berisi `production/editable-blueprint.json` dengan target teks/headline/subtitle dan objek utama. Setiap scene baru harus memperbarui daftar ini. Hindari `.map()` yang membuat satu callsite `Interactive` untuk banyak teks. Jalankan validator ketat dan `npm run qa:native`; uji Save/reload langsung di Studio sebelum mengklaim native editable.
