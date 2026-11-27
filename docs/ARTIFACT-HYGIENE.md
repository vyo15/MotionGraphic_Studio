# ARTIFACT HYGIENE — KEBERSIHAN MASTER / TANPA KEHILANGAN PROJECT

Tujuan: Master ringan dan dapat dipelihara, **tanpa menghapus video, ACC, aset, backup, atau riwayat keputusan** karena salah deteksi.

## Klasifikasi sebelum menghapus

| Kategori | Contoh | Kebijakan |
|---|---|---|
| Source & keputusan | `projects/<slug>/src`, `public`, `PRODUCTION-STATE.json`, `production/*.json`, storyboard/ACC | **Lindungi**. Jangan hapus hanya karena tidak ter-import secara statis. Komponen bisa dipanggil dinamis. |
| Backup & arsip | `library/backups/`, `sampah/`, arsip video dan file `Root-*.txt` | **Pertahankan** untuk recovery. Boleh dihilangkan dari ZIP *lean*, bukan otomatis menghapus dari PC. |
| Hasil generated aktif | `src/Root.tsx`, `library/catalog.json`, `public/videos/`, `.studio-generated-state.json` | **Jangan edit/hapus manual**. Diperbarui `npm run sync`, menyimpan referensi edit/registrasi. |
| Cache build | `node_modules`, `dist`, `.cache`, `.remotion`, `out`, `exports` | Umumnya tidak masuk ZIP; hapus manual hanya jika status/produksi memang aman dan disetujui. |
| File sementara jelas | `*.tmp`, `*.partial`, `*.log` di root atau root `logs/` | `npm run clean` pratinjau → `npm run clean -- --apply --logs` hanya untuk scope yang terbukti aman. |
| Dokumen legacy terdaftar | allowlist spesifik di `tools/clean-master.mjs` | Preview dahulu; `npm run clean -- --apply` hanya path yang terdaftar. |
| Duplikat mungkin | nama yang mirip atau file tidak diimpor | **Bukan bukti tidak terpakai**; periksa dependency graph, dinamis, manifest, audio path, dokumen ACC, dan backup sebelum hapus. |
| Dashboard turunan | `production/SCENE-VO-ACC-BOARD.md` | Generated, bukan source; disegarkan saat `sync`. Jangan hapus dari ZIP bila ingin ChatGPT baru membaca VO/ACC. |

## Alur audit yang benar

1. Backup atau catat checksum file yang hendak diubah; verifikasi `npm run check:sync`, `npm run clean` (read-only).
2. Cari referensi aktual secara tekstual, import dinamis, `staticFile`, `motiongraphic-video.json`, `production/sound-cues.json`, proyek terkait, dan dokumentasi. Jika ada keraguan, **jangan hapus**.
3. Bandingkan daftar kandidat dengan blacklist terlindungi: `projects/`, `src/`, `public/`, `contracts/`, `templates/`, `tests/`, `library/` dan semua file ACC/backup.
4. Jika kandidat terbukti disposable dan ada dalam allowlist cleanup, jalankan `npm run clean -- --apply` (tambahkan `--logs` hanya untuk logs) **di PC setelah backup**. Jangan pakai `--history` untuk memangkas backup tanpa keputusan terpisah.
5. Untuk patch copy–paste–Replace, file yang dihapus **tidak hilang** dari Master target. Daftar penghapusan manual harus eksplisit, kecil, dan disertai alasan + hash, bukan disamarkan sebagai patch Replace.
6. Setelah perubahan, jalankan `npm test`, `npm run check:sync`, `npm run sync`, validator, lalu tes ekspor ZIP. Bedakan kegagalan lama dan kegagalan baru.
7. Jangan menghapus seluruh project/scene lama hanya karena video sudah dipublikasikan. Arsip/retire adalah operasi terpisah yang dapat dipulihkan.

## Pemulihan metadata registry lama (tanpa memaksa override Root)

Pada sebagian ZIP Master terdapat `src/Root.tsx` 9 scene yang sudah mengikuti manifest, tetapi `library/.studio-generated-state.json` masih menyimpan registrasi versi 8 scene. Ini **bukan alasan menghapus Root**. Ketika `npm run sync` melihat konflik itu, `tools/reconcile-generated-state.mjs` akan membangun canonical registry di sandbox sementara dan membandingkannya **byte demi byte** dengan Root aktual. Hanya jika identik, metadata state lama dicadangkan dan direkonsiliasi. Jika tidak cocok, sinkronisasi tetap ditolak agar hasil Save-to-code tidak hilang. Jalankan `node tools/reconcile-generated-state.mjs` untuk audit read-only, dan `node tools/reconcile-generated-state.mjs --repair` hanya jika proof lulus.

Riwayat pembelajaran ada di `CHATGPT-HISTORY.md`; bukti detail disimpan di backup di luar Master.
