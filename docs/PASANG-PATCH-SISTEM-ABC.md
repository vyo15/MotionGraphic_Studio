# Memasang PATCH SISTEM ABC

**Patch ini hanya mengganti file engine dan menambah dokumentasi/template. Tidak berisi `projects/` atau generated Root/katalog.**

1. Cadangkan folder Master yang saat ini ada di PC (gunakan `npm run zip -- --studio` atau salin foldernya).
2. Ekstrak `PATCH-SISTEM-MotionGraphic-ABC.zip` di **folder induk** yang berisi `MotionGraphic-Studio/`; pilih replace untuk file **sistem** yang sama. Jangan ekstrak folder `tools/` secara terpisah ke root yang salah.
3. Buka terminal di `MotionGraphic-Studio/` lalu:

```bash
npm ci
npm run sync
npm test
npm run check:syntax
npm run check
npm run dev
```

4. Periksa `npm run list` untuk memastikan semua video yang ada di PC masih terdaftar; tidak perlu menyalin ulang folder project.
5. Untuk video baru, kirim `contracts/studio-capabilities.json` ke ChatGPT jika Master terbaru tidak dikirim. Hasil add-on harus memiliki `contractVersion: 1.0.0`. Jalankan `npm run addon:validate -- "C:\\path\\slug" --strict`, kemudian `npm run addfolder -- "C:\\path\\slug"`.
6. Revisi file tertentu: gunakan `npm run addon:patch -- "C:\\path\\patch.zip" --dry-run`, lalu perintah sama tanpa `--dry-run` jika tidak ada konflik.

**Penting:** jika Master PC sudah berubah dari ZIP dasar pada file engine, telaah perbedaan sistem terlebih dahulu. Patch tidak bisa melakukan three-way merge otomatis untuk file engine Master. Mekanisme SHA-256 berlaku untuk **patch project add-on**, bukan instalasi patch upgrade Master ini.
