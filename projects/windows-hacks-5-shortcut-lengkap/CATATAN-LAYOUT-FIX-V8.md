> **ARSIP HISTORIS:** Instruksi editor 4077/4081 dalam dokumen lama ini sudah tidak berlaku. Versi v1.8.1 menggunakan Remotion Studio (`http://127.0.0.1:3000`) saja. Ikuti README proyek untuk langkah terkini.

# Windows Hacks 5 Shortcut — Perbaikan Layout V8

Paket **File Change Only** untuk proyek `windows-hacks-5-shortcut-lengkap` pada MotionGraphic Studio Master v1.7.0. Project lain tidak berubah. ID tetap `WindowsHacks5ShortcutLengkap`, durasi tetap 2.205 frame (73,5 detik pada 30 FPS).

## Penyebab tampilan berantakan

Migrasi editable V6/V7 memindahkan beberapa nilai CSS menjadi JSX inline secara massal. Itu aman untuk sebagian teks, tetapi merusak komponen UI yang mengandalkan layout normal: `position: absolute` diterapkan pada judul Task Manager, sidebar, toolbar, tab File Explorer, address bar, dan header file. Beberapa ukuran yang berasal dari elemen kecil ikut diterapkan pada kontainer besar: toolbar Snipping Tool 30 px dan label folder 12×12 px. Ukuran judul dan keyboard Win + E juga tidak cocok dengan CSS original.

## Perbaikan

- **01 Tab Browser:** judul berpindah dengan crossfade singkat, tanpa cut mendadak; progres bawah kembali ada.
- **02 Task Manager:** title bar, sidebar, header, toolbar, dan kolom proses kembali mengikuti flex/grid. Tombol End task tetap menjadi layer tersendiri.
- **03 Snipping Tool:** toolbar menggunakan lebar natural berdasarkan ikon, bukan 30 px.
- **04 Win + E:** tab, address bar, dan status bar kembali mengikuti layout jendela; lebar keyboard, ukuran judul, dan label folder dipulihkan.
- **05 Ctrl + Shift + N:** tab Explorer, alamat folder, daftar file, dan tab Edge dikembalikan ke layout normal.
- **HOOK:** progress bar bawah dipulihkan.

Teks dan elemen penting yang telah dibuat `Interactive.Div` tetap demikian. Tidak ada penambahan dependensi. Tidak ada perubahan manifest, ID, naskah narasi, durasi, atau aset suara.

## Pemasangan mudah

1. Tutup Studio dan buat backup folder `projects/windows-hacks-5-shortcut-lengkap`.
2. Buka ZIP patch di File Explorer Windows. Pilih folder `projects` di dalam ZIP, lalu copy.
3. Paste ke folder Master `MotionGraphic-Studio` (yang berisi `package.json`). Pilih **Replace** bila diminta.
4. Jalankan `npm run dev` dan buka komposisi `WindowsHacks5ShortcutLengkap`.
5. Periksa sekitar 00:18 (Task Manager), 00:30 (Snipping Tool), 00:43 (Win + E), dan 00:57 (Ctrl + Shift + N).

## Validasi

Lolos pemeriksaan statis atas 41 file TS/TSX, resolusi relative import, manifest, dan pemeriksaan struktur layout yang dipulihkan. Uji interaksi Studio di Windows dan render MP4 aktual belum dilakukan di lingkungan pembuatan patch; mohon periksa visual dan edit/save setelah pemasangan.

## Catatan editing

Remotion menampilkan **Fit** atau 50% sesuai ukuran panel preview; itu hanya skala tampilan Studio, bukan resolusi video yang tetap 1080×1920. Teks utama tetap bisa dipilih melalui layer `Interactive`. Elemen UI yang masih menggunakan teks dinamis tidak semuanya dapat diedit lewat double-click; gunakan Visual/Easy Editor yang sudah terpasang pada Master untuk kontrol yang didukung.
