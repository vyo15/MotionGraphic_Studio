# Maintenance, backup, import, rollback

- Root/katalog/mirror aset otomatis: jangan edit `src/Root.tsx`, `library/catalog.json`, atau `public/videos` secara manual.
- `npm run sync`: jalankan preflight sebelum capture props; snapshot registrasi/manifests, stage mirror aset dan rollback ketika sync gagal. Data proyek kreatif tidak dihapus otomatis. Sebelum upgrade besar, ekspor Master lengkap.
- `npm run zip -- --studio`: backup lengkap termasuk riwayat. `npm run zip -- --studio --lean`: ZIP distribusi ringan tanpa `library/backups`/`sampah`/arsip lawas; data asli di PC tetap ada.
- Project lama tetap dilindungi oleh catalog missing-project guard. Arsip melalui `npm run delete` dan pulihkan melalui `npm run restore`, bukan `rm -rf projects/`.
- Add-on dari ChatGPT: `npm run addon:validate -- <folder> --strict` dan `npm run addfolder -- <folder>`. Importer menguji ZIP central-directory sebelum ekstraksi. Tidak menjamin source add-on aman dieksekusi; inspeksi kode yang tidak dipercaya sebelum dijalankan.
- Revisi: `addon:patch` memeriksa checksum, membuat cadangan per-file. Patch dibatalkan bila sudah ada edit berbeda di PC. `--dry-run` melihat daftar perubahan tanpa menulis.
- QA: `npm run check` (termasuk TypeScript ketika deps terpasang) kemudian `npm run qa:render -- file.mp4 --src projects/slug`. Keluaran QA di `qa-out/<video>` dan tidak termasuk backup lean.
- Tidak ada perintah cleanup otomatis yang menghapus backup. Untuk penghapusan, verifikasi cadangan dan pilih file spesifik, jangan massal berdasarkan nama `backup` atau `frames`.
