# Panduan operasional — Remotion Studio

Dokumen ini menyatukan panduan penggunaan Studio, audio, dan aturan edit visual yang sebelumnya tersebar dalam beberapa file root.

## Penggunaan harian

1. Cukup `npm run dev` dari root Master. Dependency yang hilang dipasang otomatis (internet diperlukan hanya bila instalasi). Startup menjalankan pemulihan font lokal yang diketahui hilang (Sharing Printer, hanya pack resmi terverifikasi), release check, sync, source/asset, sintaks, editable, layout, snapshot dan regression suite. Kegagalan gate/test menghentikan startup dengan log. Log detail di folder eksternal `Logs/Studio-startup.log`; error/warning tetap terlihat.
2. Untuk paket FILE CHANGE ONLY baru/revisi: tutup Studio, ekstrak di luar Master, cek backup/hash, salin isi ke root Master, buka kembali dev. Jangan masukkan paket ini ke inbox. Import ZIP lama hanya kompatibilitas recovery. Edit TSX menggunakan hot reload; perubahan manifest, Props, VO, segmen dan aset ditangani watcher. Tidak perlu sync manual rutin.
3. Pilih full, segmen, atau `<ID>VOGuide`; simpan edit dan periksa Save → reload → hasil. Setelah source stabil, proses lokal otomatis membuat `Master/CHATGPT-LATEST.zip` di root ekspor eksternal. File ini hanya handoff terbaru, bukan backup historis. Tunggu pesan ZIP terbaru siap sebelum menutup Studio/mengunggah. Jika invalid, versi terakhir dipertahankan; detail `Logs/ChatGPT-export.log`. Upload ChatGPT tetap manual.
4. Setelah Studio terbuka, AUTO SPATIAL melakukan sampling pada project dengan kontrak screen-space-v1 setelah source stabil. Legacy tampil NOT RUN (bukan lulus aktual). Full preview / full final High / declared spatial / full CapCut dan pilot tersedia lewat `npm run menu` → 17. Capture berat memakai shared lock; menutup Studio terlebih dahulu disarankan untuk mengurangi beban. Menu 7 → 6 membuat ZIP diagnostik terpisah jika handoff normal gagal. Render dan pemeriksaan visual/listening tetap memerlukan pilihan pengguna. Opsi lanjutan ada di `npm run menu` → M. Regression dijalankan pada startup, bukan tiap Save. Opsional `MOTION_STUDIO_AUTO_CHATGPT=0` menonaktifkan handoff otomatis dan `MOTION_STUDIO_AUTO_SPATIAL=0` menonaktifkan sampling otomatis.

## Preview cepat — `npm run prod`

Gunakan setelah `npm run dev` berhasil menyiapkan project. Membuka Studio yang sama pada port 3000; tanpa instalasi dependency, sync, static production gate, regression, backup, auto spatial, auto sync maupun auto ZIP. Hanya pemeriksaan read-only kesiapan CLI, Root, katalog, Props dan keberadaan aset literal/mirror. Jika belum siap, keluar dengan pesan untuk menjalankan dev; tidak otomatis memperbaiki atau menimpa source. Pemeriksaan ini bukan jaminan freshness semua aset, VO, atau kualitas render. Mode ini **bukan** read-only native Studio: jangan Save/edit di prod; gunakan dev untuk itu dan setelah perubahan source/patch. Tutup sesi dev sebelum prod dan sebaliknya. Tidak memengaruhi workflow render/menu/QA.

## Audio dan VO

- Audio asli: `projects/<slug>/public/audio/nama.wav`. Saat sync, mirror tersedia untuk Remotion melalui `staticFile('videos/<slug>/audio/nama.wav')`. Jangan mengedit mirror.
- Visual dan naskah draft disetujui **sebelum** merekam. Komposisi VO Guide adalah panduan, bukan subtitle final atau transkripsi otomatis.
- Setelah rekaman, atur timing, trim, volume, dan subtitle melalui konfigurasi/Props yang didukung video itu; cek hasil MP4.
- Master tidak menyediakan waveform multitrack atau DAW tersendiri.

## Editing yang aman

- Pertahankan `basePosition`, `userTransform`, dan `animationTransform` pada komponen baru. Animasi gunakan `useCurrentFrame()`, `interpolate()`, dan `spring()`.
- Gunakan `Interactive` hanya sesuai API Remotion yang terpasang. Nilai computed tidak otomatis dapat diubah langsung di timeline.
- Project dengan kontrak edit lama dipertahankan, tidak dimigrasikan otomatis. Baca juga [Aturan Produksi](../PRODUCTION-RULES.md).

## Hasil ekspor

`npm run zip` mengemas source editable, **bukan MP4 yang editable**. `npm run zip -- --studio` adalah Master Engine Only; `--with-projects` menyertakan video, sedangkan `--full` juga menyertakan riwayat.


Lihat [User Flow](../PRODUCTION-RULES.md) untuk pembuatan bersama ChatGPT, dan [Kontrak Editable](EDITABLE-CONTRACT.md) untuk standar add-on baru.

## Pemulihan perubahan visual dan folder tidak terdaftar

- Sebelum Studio dimulai, source aktif secara otomatis dibackup **di luar Master** (3 snapshot terakhir; tidak masuk ZIP Master), supaya penghapusan layer akibat `Delete` dapat dibandingkan/dipulihkan tanpa menimpa project lain. Lihat [Studio Editing & Recovery](STUDIO-EDITABILITY-AND-RECOVERY.md).
- `npm run retire:unregistered` menampilkan folder video yang ada di disk tetapi tidak ada di katalog. `--apply` memindahkannya ke folder backup luar Master. Jangan jalankan apabila ingin mendaftarkannya ulang saat sync.
- Sync manual adalah fallback diagnostik jika watcher bermasalah; jangan mengulangnya sebagai ritual harian.
