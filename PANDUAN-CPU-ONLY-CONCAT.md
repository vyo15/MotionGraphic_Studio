# Mode CPU-only native untuk Concat 0.2.8 (eksperimental)

## Mengapa berbeda dari `concat:safe`?

Concat 0.2.8 memaksa wgpu/DX12 untuk jendela. `CONCAT_GPU=software` memilih Microsoft WARP, **masih melalui DX12**. Log sesi pengguna menunjukkan WARP sendiri kehilangan perangkat saat impor video. Ini bukan masalah yang bisa dijamin sembuh hanya dengan launcher.

Patch ini menambah **build source berbeda**, bukan mengubah binary resmi Concat. Mode `CONCAT_CPU_UI=1` pada source hasil patch melewati `Gpu::acquire()` sepenuhnya, memakai Slint `renderer-software` untuk jendela dan `Host::start(None)` untuk monitor CPU. Implementasi alternatif ini belum diverifikasi pada Windows dan *mungkin tidak mendukung seluruh efek dan preview seperti GPU*.

**Alternatif tanpa memasang Rust di Windows:** baca `PANDUAN-CLOUD-BUILD-CONCAT-CPU.md`, lalu jalankan `npm run concat:cpu:cloud`. GitHub Actions menyiapkan build di Windows runner; setelah berhasil, import ZIP dengan `npm run concat:cpu:import`.

## Persyaratan (jika build lokal)

- Windows 64-bit, koneksi GitHub saat source belum tersedia.
- Rust/Cargo 1.93+, CMake, Microsoft Visual Studio C++ Build Tools/Windows SDK, kemungkinan LLVM/libclang, serta dependency build native yang diperlukan Concat. Toolchain ini diperlukan **untuk kompilasi saja**; aplikasi Concat tidak diinstal.
- Source resmi GitHub **tepat Concat v0.2.8**, commit `79116bd0f9a1`. Versi lain ditolak otomatis.
- Ruang disk untuk proses build Rust (dapat mencapai beberapa GB).

## Pakai

1. Simpan backup Master lebih dulu.
2. Dari folder Master, jalankan `npm run concat:cpu:build`. Sistem memeriksa toolchain, clone source jika belum ada, memverifikasi checksum file source, membuat backup `platform.rs`, menambal source, dan mengompilasi binary lokal.
3. Bila build **benar-benar berhasil**, jalankan `npm run concat:cpu`.
4. Gunakan `npm run concat` untuk jalur sebelumnya. Mode CPU tidak dijalankan otomatis bila belum punya binary CPU yang tervalidasi.

**Jangan gunakan** `CONCAT_GPU=software` sebagai pengganti mode CPU-only native; itu mode WARP yang sudah gagal dalam log sebelumnya. Jika build tidak tersedia, installer Concat resmi tidak dapat diubah menjadi native CPU-only dengan mengganti environment variable.

## Batas dan keamanan

- Proyek video, profil portable, runtime `concat.exe` resmi, dan log sebelumnya tidak dihapus atau ditimpa patch.
- Original source `platform.rs` disalin ke `apps/concat/deps/cpu-source-backups` sebelum diedit. Source dengan commit/checksum tak cocok **tidak disentuh**.
- Binary hasil build lokal digunakan hanya bila `build-stamp.json` cocok dengan commit dan status patch CPU.
- Uji video kecil dan simpan project terlebih dahulu sebelum mencoba proyek penting. Preview bisa lebih lambat, dan build source dari proyek upstream AGPL tetap tunduk pada lisensi upstream.
- Output build **belum tersedia** di dalam ZIP CHANGE ONLY ini. Perlu kompilasi native pada Windows.
- Jika native CPU mode juga gagal, perbaikan lanjutan perlu melibatkan pengembang upstream Concat; jangan mengulang WARP.
