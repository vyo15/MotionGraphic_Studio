# Panduan operasional — Remotion Studio

Dokumen ini menyatukan panduan penggunaan Studio, audio, dan aturan edit visual yang sebelumnya tersebar dalam beberapa file root.

## Penggunaan harian

1. Jalankan `npm ci` setelah instalasi awal atau update dependensi, lalu `npm run dev`. Gunakan `npm run sync` bila menambah/mengubah add-on.
2. Pilih komposisi **full**, **segmen**, atau `<ID>VOGuide`. Gunakan elemen `Interactive`/Props yang memang tersedia pada video tersebut. Tidak semua JSX bisa drag-and-drop otomatis.
3. Simpan perubahan melalui kontrol Remotion Studio yang sesuai; lakukan **Save → reload → cek hasil → render** sebelum menganggap edit tersimpan.
4. Sebelum final: `npm test`, `npm run check`, dan `npm run qa:render -- out/video.mp4 --src projects/<slug>`.

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


Lihat [User Flow](USER-FLOW-CHATGPT.md) untuk pembuatan bersama ChatGPT, dan [Kontrak Editable](EDITABLE-CONTRACT.md) untuk standar add-on baru.

## Pemulihan perubahan visual dan folder tidak terdaftar

- Sebelum Studio dimulai, source aktif secara otomatis dibackup **di luar Master** (3 snapshot terakhir; tidak masuk ZIP Master), supaya penghapusan layer akibat `Delete` dapat dibandingkan/dipulihkan tanpa menimpa project lain. Lihat [Studio Editing & Recovery](STUDIO-EDITABILITY-AND-RECOVERY.md).
- `npm run retire:unregistered` menampilkan folder video yang ada di disk tetapi tidak ada di katalog. `--apply` memindahkannya ke folder backup luar Master. Jangan jalankan apabila ingin mendaftarkannya ulang saat sync.
- `npm run sync` hanya diperlukan untuk perubahan manifest, VO, segmen atau aset. Edit layer TSX biasa mengikuti HMR tanpa registrasi ulang.
