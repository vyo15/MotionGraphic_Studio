# HASIL VALIDASI — MotionGraphic Studio v1.8.1 (Remotion Studio saja)

Tanggal: 29 Oktober 2026. Sumber: `MotionGraphic-Studio-Master-v1.8.0-20261029-064808.zip` milik pengguna.

## Implementasi

1. `npm run dev` menyiapkan dependensi, import, sync dan audit, kemudian meluncurkan **Remotion Studio asli saja di port 3000**. Tidak mengaktifkan server Hub/Easy/Visual Editor (port 4077), atau editor kursor khusus port 4081.
2. Launcher `01-BUKA-STUDIO.bat` membuka Remotion Studio satu kali, memeriksa record PID dan menolak salah membuka Remotion dari Master lain. Launcher stop mempertahankan verifikasi PID dan identitas Master, log tetap di folder backup luar Master.
3. Hanya tools CLI untuk sinkronisasi, QA, render/ZIP dan backup yang dipertahankan. Petunjuk pengguna sudah diarahkan ke Studio. Arsip lama dalam `library/` **tidak dihapus**.
4. Tambahan bridge `tools/studio-props-bridge.mjs`: bila tombol **Save props to code** Remotion mengubah `src/Root.tsx`, `npm run sync` memindahkan Props literal yang berubah ke manifest add-on dengan backup otomatis, lalu membuat ulang Root. Jika ada konflik dengan manifest atau perubahan non-Props di Root, sync berhenti daripada menimpa data.
5. Tidak mengubah isi file **source video, media dan manifest video** asli; semua perbandingan isi untuk 73 berkas sumber/aset/manifest yang ada di ZIP awal **identik**.

## Bukti tes lingkungan ini

- `npm test`: **8/8 lulus** — termasuk deteksi editor tunggal, Props disimpan ke manifest, konflik data dan perubahan non-Props ditolak; empat tes regresi v1.8.0 tetap lulus.
- `node tools/sync-projects.mjs`: **2 project** tetap aktif, `IPAddressReels` dan `WindowsHacks5ShortcutLengkap`.
- `node tools/validate-library.mjs`: **9 rujukan aset**, 0 masalah.
- `node tools/check-editability.mjs --strict` dan `node tools/check-layout-flow.mjs`: lulus (3 kandidat style computed tetap informatif, tidak dimodifikasi diam-diam).
- `node --check tools/*.mjs`: lulus.
- `npm run check`: **tidak lulus penuh** karena paket `node_modules`/TypeScript belum tersedia pada lingkungan verifikasi. Pemeriksaan statis sebelum tahap TypeScript selesai tanpa error. Menginstal dependensi pada PC pengguna tetap diperlukan.
- QA statis lama mendeteksi **5 kandidat** pada Windows Hacks: satu efek klik sementara melewati batas kanvas, empat overlap status perlu review. Ini bukan bukti rendering rusak, tetapi memerlukan pemeriksaan visual manual pada frame terkait.

## Belum diverifikasi

- Peluncuran dan penghentian launcher PowerShell langsung di Windows.
- Edit/drag semua layer menggunakan mouse asli dan persisten setelah tutup/restart browser Windows.
- Hasil render MP4 H.264, suara audio, dan click-target kursor pada frame aktual.
- Parsing variasi format source yang mungkin ditulis versi Remotion di Windows; bridge diuji terhadap JSX properti literal dan menolak struktur yang tidak dikenal agar tidak kehilangan data.

## Batas fitur

Remotion Studio resmi menggantikan semua halaman editor tambahan. Namun proyek Windows Hacks masih memiliki beberapa gaya animasi `computed` dan node HTML biasa; tidak otomatis bisa di-drag langsung meski editor tunggal. Audio track dapat dikontrol lewat Props dan file lokal, **bukan** waveform multi-track buatan sendiri. Render dari Studio memakai dialog render bawaan; render dari CLI memakai folder backup di luar Master.
