# Maintenance, backup, import, rollback

Operasional normal memakai `npm run dev` dan ZIP handoff otomatis. Command di halaman ini untuk diagnosis/backup khusus, bukan checklist harian. Lihat [Operasional Studio](OPERASIONAL-STUDIO.md).

- Root/katalog/mirror aset otomatis: jangan edit `src/Root.tsx`, `library/catalog.json`, atau `public/videos` secara manual.
- `npm run sync`: jalankan preflight sebelum capture props; snapshot registrasi/manifests, stage mirror aset dan rollback ketika sync gagal. Data proyek kreatif tidak dihapus otomatis. Sebelum upgrade besar, ekspor Master lengkap.
- `npm run zip -- --studio`: **Master Engine Only**, tanpa video dan backup historis. `--with-projects` menambahkan seluruh video tanpa backup historis. `--full` membawa semuanya termasuk riwayat; tidak ada penghapusan data PC ketika ZIP dibuat.
- Project lama tetap dilindungi oleh catalog missing-project guard. Arsip melalui `npm run delete` dan pulihkan melalui `npm run restore`, bukan `rm -rf projects/`.
- Add-on dari ChatGPT: `npm run addon:validate -- <folder> --production --syntax` dan `npm run addfolder -- <folder>`. Importer menguji ZIP central-directory sebelum ekstraksi. Tidak menjamin source add-on aman dieksekusi; inspeksi kode yang tidak dipercaya sebelum dijalankan.
- Revisi ChatGPT: FILE CHANGE ONLY melalui copy–paste–Replace setelah cek hash base dan backup. `addon:patch` adalah tool terpisah untuk paket patch berformat native; jangan gunakan untuk ZIP file-change-only biasa.
- QA: `npm run check` (termasuk TypeScript ketika deps terpasang) kemudian `npm run qa:render -- file.mp4 --src projects/slug`. Keluaran QA di `qa-out/<video>` dan tidak termasuk backup lean.
- Startup/sync normal tidak menghapus backup. Cleanup historis eksplisit tersedia, bukan prosedur rutin. Untuk penghapusan, verifikasi cadangan dan pilih file spesifik, jangan massal berdasarkan nama `backup` atau `frames`.


## Kebersihan artefak dan perlindungan scene ACC

Baca `docs/ARTIFACT-HYGIENE.md` sebelum menghapus file. `npm run clean` preview-only secara default dan hanya melaporkan file pada allowlist. Jangan menafsirkan file historis/backup/komponen dynamic sebagai sampah. Jangan hapus `PRODUCTION-STATE.json`, `src/config/narration.json`, ataupun `production/SCENE-VO-ACC-BOARD.md` dari ZIP Master bersama project. Jika memang ada penghapusan aman, berikan daftar file manual; ZIP FILE CHANGE ONLY dengan Replace tidak menghapus file lama.

## Pembersihan yang disengaja

1. Jalankan `npm run clean` untuk preview daftar file sistem lama yang diketahui aman.
2. Jalankan `npm run clean -- --apply --logs` untuk membersihkan dokumen legacy di allowlist dan file `.log`, `.tmp`, `.partial` hanya di root Master atau `logs/`. **Tidak menyentuh `projects/`, `src/`, katalog, mirror, `out/` dan log di luar Master.**
3. Kalau ingin menghapus `library/backups/` historis, simpan ZIP backup terlebih dahulu lalu gunakan `npm run clean -- --apply --history`. Opsi ini memang menghapus titik pemulihan lama dari disk.
4. Untuk log render yang berada **di luar Master**, tinjau dan hapus secara manual hanya jika tidak diperlukan untuk troubleshooting.

Untuk file obsolete hasil audit terkini gunakan daftar `rm -f -- ...` yang diberikan bersama patch, setelah backup dan cek hash. Jangan gunakan daftar penghapusan dari patch lama atau `rm -rf projects/`.

## Master kosong dan konflik registry
Jika project telah diarsipkan dengan sah, `npm run sync` merekonsiliasi snapshot stale hanya apabila bukti registry canonical cocok. Jika konflik local edits, pulihkan dari backup atau gunakan prosedur dalam [Artifact Hygiene](ARTIFACT-HYGIENE.md); jangan paksa overwrite Root/state. Riwayat kasus terdahulu ada di `CHATGPT-HISTORY.md`.
