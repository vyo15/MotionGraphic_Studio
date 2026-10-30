# Catatan clean-up Master v1.8.1

Dokumen referensi untuk memisahkan langkah pengguna dari utilitas internal, bukan instruksi menghapus file.

## Tampilkan hanya alur utama

1. `npm run dev`: desain dan revisi motion graphic.
2. `npm run handoff -- --project <slug>`: hasil Hook/Isi/CTA di `out/concat/<slug>/current/`.
3. `npm run concat`: finishing voice-over, caption, hasil MP4.
4. `npm run zip`: backup ketika dibutuhkan, bukan bagian dari tiap editing.

## Pertahankan

`projects/*/src`, `projects/*/public`, `motiongraphic-video.json`, `library/backups`, `library/sampah`, `library/catalog.json`, `src/Root.tsx`, `src/index.ts`, semua source audio dan preset, serta semua skill Remotion. Jangan sentuh project/slug/ID lain saat revisi satu scene.

## Kandidat arsip **bukan untuk dihapus otomatis**

- Dokumen revisi historis `CATATAN-REVISI-*`, `EDIT-MAP-V3/V4`, `HASIL-VALIDASI-V3/V4`, dan `PANDUAN-EDITOR-*` pada video Windows Hacks.
- Setup utility lama seperti `tools/enable-concat-npm.mjs` (cek referensi sebelum dipindahkan).
- Snapshot `library/backups/` dan ZIP lama: ini arsip pemulihan, bukan sampah. Jangan menghapus hanya karena terlihat duplikat.

Prioritas adalah kestabilan, bukan menghapus file yang berfungsi sebagai cadangan. Dokumentasi alur yang baru harus selalu ikut ZIP Master.

## Quality gate yang belum otomatis terbukti

QA statis bukan pengganti render visual; cek titik rawan (Task Manager, Snipping, folder, CTA, klik) di preview nyata. Jangan mengubah posisi animasi yang sengaja overlap hanya berdasarkan kotak deteksi statis. Periksa hak cipta musik, SFX, gambar, font dan footage secara manual sebelum upload. Tidak ada otomatisasi yang dapat menjamin bebas klaim hak cipta.
