# Build Concat CPU-only tanpa memasang Rust di Windows

**Penyebab error sebelumnya:** `npm run concat:cpu:build` membutuhkan Rust/Cargo, C++ Build Tools, FFmpeg development libraries dan toolchain lain di PC. `concat:cpu` belum dapat berjalan karena binary CPU-only belum dibuat.

## Pilihan utama — GitHub Actions (tidak perlu memasang toolchain di PC)

1. Ekstrak CHANGE ONLY ke root Master `MotionGraphic-Studio` yang memiliki `package.json`. **Commit/push** file patch ke branch utama GitHub repository MotionGraphic_Studio (workflow GitHub tidak dapat membaca perubahan yang hanya ada di komputer lokal).
2. Jalankan `npm run concat:cpu:cloud` untuk mendapat tautan workflow. Di GitHub buka **Actions → Build Concat CPU-only (Windows portable) → Run workflow**.
3. Workflow memakai runner Windows, men-clone source Concat v0.2.8 pada commit yang dipin, memverifikasi patch source CPU-only, lalu mengambil dependensi **dengan hash yang ditetapkan upstream**. Ini memakai resource/kuota GitHub Actions, bukan komputer lokal.
4. **Setelah run sukses**, buka run dan unduh artifact **Concat-CPU-Portable-Windows-x64**. Simpan ZIP ke `Downloads` atau lokasi yang kamu pilih. Jika workflow gagal, lihat log merah pada run dan **jangan** mencoba `concat:cpu` dengan executable biasa.
5. Dari terminal Master jalankan `npm run concat:cpu:import` (otomatis mencari ZIP tersebut di Downloads), atau `npm run concat:cpu:import -- "C:\\lokasi\\Concat-CPU-Portable-Windows-x64.zip"`.
6. Setelah muncul `[CPU PORTABLE] Paket terverifikasi`, jalankan `npm run concat:cpu`. Log diagnostik otomatis tetap dibuat melalui launcher Master.

Executable diletakkan di `apps/concat/cpu-portable/current/`; ZIP tervalidasi menurut manifest, hash SHA-256 dan DLL utama. Tidak menimpa rilis resmi di `apps/concat/runtime/current`, proyek Remotion, atau profil lama. Paket sebelumnya disimpan sebagai `previous-*` jika diganti.

## Pilihan alternatif — build lokal

`npm run concat:cpu:build` tetap tersedia jika kamu sengaja memasang Rust/Cargo dan C++ Build Tools lokal. **Menjalankan perintah itu tanpa Rust tetap akan gagal; itu bukan kesalahan `npm`**.

## Penting

- CPU-only ini adalah **perubahan eksperimental pada source Concat**, bukan binary resmi upstream.
- Workflow sudah disiapkan tetapi **belum dijalankan di GitHub Actions**. Hasil kompilasi dan stabilitas saat impor video belum bisa dijamin sampai berhasil di runner Windows lalu diuji di PC.
- Paket tidak ditandatangani secara digital. Windows SmartScreen mungkin memberi peringatan. Jangan jalankan artifact dari run/akun yang tidak dikenal.
- Jika aplikasi masih crash dalam mode CPU UI, kirim `apps/concat/logs/BAGIKAN-LOG-TERAKHIR.txt`; mode software UI tetap tidak menjamin pemrosesan video yang sepenuhnya bebas dari masalah codec/driver.
- **Lisensi**: source Concat AGPL-3.0-or-later. Tetap sertakan LICENSE dan THIRD_PARTY_NOTICES.md bila mendistribusikan build modifikasi.
