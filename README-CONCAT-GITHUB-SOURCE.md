# HOTFIX: `npm run concat` menggunakan source GitHub, BUKAN installer

Ditujukan untuk **MotionGraphic Studio v1.8.1 di Windows 64-bit** yang sudah memiliki skrip `npm run concat` menuju `tools/concat-manager.ps1`.

## Instal patch

1. Backup Master. Ekstrak ZIP patch ke folder `MotionGraphic-Studio/` yang berisi `package.json`.
2. **Ganti hanya** `tools/concat-manager.ps1`. File scene, `projects/`, katalog, `package.json`, dan `npm run dev` tidak diubah.
3. Jalankan:

   ```bash
   npm run concat
   ```

Launcher akan (a) clone repository `https://github.com/jub0t/Concat.git` ke `apps/concat/source/` bila belum ada, (b) memakai hasil build bila sudah tersedia, atau (c) menjalankan `cargo build --profile quick -p concat`, kemudian membuka `concat.exe` **hasil build lokal**. Tidak menggunakan atau menjalankan installer Concat dari GitHub Releases. Hasil clone tidak otomatis di-`pull` sehingga perubahan source tidak tertimpa.

## Catatan penting: Clone belum berarti aplikasi bisa jalan

Concat adalah aplikasi desktop **Rust**, bukan project Node.js. Menjalankan dari source **tetap membutuhkan kompilasi native**, terlepas dari apakah source berada di dalam folder Master. Prasyarat lokal untuk build Windows, sesuai dokumentasi upstream:

- Git for Windows untuk clone (kemungkinan sudah ada karena Anda menggunakan Git Bash).
- **Rust 1.93+** dengan `cargo` serta toolchain target Windows MSVC (https://rustup.rs/).
- **MSVC C++ Build Tools** untuk native dependencies.
- **CMake** (https://cmake.org/download/).
- **LLVM/libclang** jika diperlukan oleh bindgen (`LIBCLANG_PATH`), misalnya C:\Program Files\LLVM\bin.
- **FFmpeg 7+ development libraries**. Script ini mengunduh arsip BtbN GPL shared yang **URL dan SHA-256-nya terdapat dalam source upstream `scripts/ci/deps.lock`**, lalu mengekstraknya ke `apps/concat/deps/` tanpa installer. Script memanfaatkan `FFMPEG_DIR` yang sudah disetel jika valid.

**Patch tidak menginstal Rust, MSVC, CMake, atau LLVM diam-diam.** Jika salah satu tidak ada, pesan akan menunjukkan apa yang kurang. Dibutuhkan ruang disk yang cukup untuk code, native dependency, dan hasil build (dapat berukuran beberapa GB). Kompilasi pertama dapat berat. Ini konsekuensi menjalankan langsung dari source GitHub dan tidak bisa dielakkan hanya dengan `git clone`.

## Perintah

```bash
npm run dev              # Remotion Studio, tidak diubah
npm run concat           # Clone saat pertama, build jika diperlukan, lalu buka Concat dari source
npm run concat:status    # Cek keberadaan source, binary, git/cargo/rustc/cmake
npm run concat:clone     # Clone source saja, tanpa build
npm run concat:setup     # Build ulang source (tanpa installer Concat)
npm run concat:safe      # Buka versi hasil build dengan --software
```

Untuk mengkompilasi ulang setelah mengedit kode Concat, gunakan `npm run concat:setup`. Default launcher mengutamakan hasil build yang sudah ada untuk mempercepat pembukaan; setelah update source secara manual, compile ulang.

**Hak cipta:** Source Concat berlisensi AGPL-3.0-or-later. Jika nanti mendistribusikan fork hasil modifikasi, patuhi lisensi, ketentuan atribusi/source, dan kebijakan merek Concat. Keamanan unggahan Reels/TikTok/Shorts tetap ditentukan pula oleh izin musik, footage, SFX, font, dan aset yang digunakan.

**Batas pengujian:** ZIP dan script sudah diperiksa statis. Kompilasi Rust dan peluncuran native Windows **belum diverifikasi di PC pengguna**. Build upstream juga dapat berubah dan memerlukan dependency tambahan; jika error, berikan potongan log build agar bisa ditangani pada sumbernya.
