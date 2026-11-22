# Maintenance, backup, import, rollback

- Root/katalog/mirror aset otomatis: jangan edit `src/Root.tsx`, `library/catalog.json`, atau `public/videos` secara manual.
- `npm run sync`: jalankan preflight sebelum capture props; snapshot registrasi/manifests, stage mirror aset dan rollback ketika sync gagal. Data proyek kreatif tidak dihapus otomatis. Sebelum upgrade besar, ekspor Master lengkap.
- `npm run zip -- --studio`: **Master Engine Only**, tanpa video dan backup historis. `--with-projects` menambahkan seluruh video tanpa backup historis. `--full` membawa semuanya termasuk riwayat; tidak ada penghapusan data PC ketika ZIP dibuat.
- Project lama tetap dilindungi oleh catalog missing-project guard. Arsip melalui `npm run delete` dan pulihkan melalui `npm run restore`, bukan `rm -rf projects/`.
- Add-on dari ChatGPT: `npm run addon:validate -- <folder> --strict` dan `npm run addfolder -- <folder>`. Importer menguji ZIP central-directory sebelum ekstraksi. Tidak menjamin source add-on aman dieksekusi; inspeksi kode yang tidak dipercaya sebelum dijalankan.
- Revisi: `addon:patch` memeriksa checksum, membuat cadangan per-file. Patch dibatalkan bila sudah ada edit berbeda di PC. `--dry-run` melihat daftar perubahan tanpa menulis.
- QA: `npm run check` (termasuk TypeScript ketika deps terpasang) kemudian `npm run qa:render -- file.mp4 --src projects/slug`. Keluaran QA di `qa-out/<video>` dan tidak termasuk backup lean.
- Tidak ada perintah cleanup otomatis yang menghapus backup. Untuk penghapusan, verifikasi cadangan dan pilih file spesifik, jangan massal berdasarkan nama `backup` atau `frames`.


## Kebersihan artefak dan perlindungan scene ACC

Baca `docs/ARTIFACT-HYGIENE.md` sebelum menghapus file. `npm run clean` preview-only secara default dan hanya melaporkan file pada allowlist. Jangan menafsirkan file historis/backup/komponen dynamic sebagai sampah. Jangan hapus `PRODUCTION-STATE.json`, `src/config/narration.json`, ataupun `production/SCENE-VO-ACC-BOARD.md` dari ZIP Master bersama project. Jika memang ada penghapusan aman, berikan daftar file manual; ZIP FILE CHANGE ONLY dengan Replace tidak menghapus file lama.

## Pembersihan yang disengaja

1. Jalankan `npm run clean` untuk preview daftar file sistem lama yang diketahui aman.
2. Jalankan `npm run clean -- --apply --logs` untuk membersihkan dokumen legacy di allowlist dan file `.log`, `.tmp`, `.partial` hanya di root Master atau `logs/`. **Tidak menyentuh `projects/`, `src/`, katalog, mirror, `out/` dan log di luar Master.**
3. Kalau ingin menghapus `library/backups/` historis, simpan ZIP backup terlebih dahulu lalu gunakan `npm run clean -- --apply --history`. Opsi ini memang menghapus titik pemulihan lama dari disk.
4. Untuk log render yang berada **di luar Master**, tinjau dan hapus secara manual hanya jika tidak diperlukan untuk troubleshooting.

Perintah Git Bash untuk menghapus hanya tujuh dokumen/launcher lama yang telah digantikan panduan aktif:

```bash
rm -f -- AUDIT-REMOTION-ONLY-20261104.md PANDUAN-AUDIO-TIMELINE.md \
  STANDAR-EDITABLE-STUDIO.md STANDAR-EDITABLE-STUDIO-v3.md \
  INSTALL-SEMUA-SKILL-REMOTION.bat docs/CLEANUP-ARTEFAK-LEGACY.md \
  docs/SISTEM-GUARDRAILS-DAN-CLEANUP.md
```

Perintah di atas tidak menghapus video. Jangan memakai `rm -rf projects/` hanya untuk memperkecil ZIP.


## Master kosong dan cleanup selektif (audit 21 November 2026)
Jika project lama sudah dihapus dengan sengaja, Master tetap dapat berisi **snapshot
`library/.studio-generated-state.json` lama**. `npm run sync` sekarang mendeteksi dan
menyelaraskan snapshot tersebut **hanya jika** katalog kosong, tidak ada folder project aktif,
dan `src/Root.tsx` identik dengan registry kosong standar. Jika terdapat perubahan Studio
atau proyek aktif, proteksi konflik tetap berlaku.

Setelah menyimpan ZIP Engine Only atau backup yang dapat dipulihkan, dua backup **historis
spesifik** dari ZIP audit boleh dibersihkan lewat Git Bash dari root Master:

```bash
rm -f -- \
  library/backups/catalog-2026-11-21T03-05-21-804Z.json \
  library/backups/Root-2026-11-21T03-05-21-804Z.txt
```

Gunakan `npm run clean` untuk preview file lain. **Jangan menghapus**
`src/Root.tsx`, `library/catalog.json`, `tools/`, `tests/`, `contracts/`,
`projects/` atau `library/.studio-generated-state.json` secara massal.
`npm run sync` akan meregenerasi state yang benar; backup lama di atas tidak dibutuhkan
untuk menjalankan Master kosong. Hindari `rm -rf projects/` sebagai cleanup rutin.
