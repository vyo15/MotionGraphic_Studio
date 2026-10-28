# Ctrl + Shift + N — Smooth Motion Preview | MotionGraphic Studio v1.6

**ID dan slug dipertahankan** dari proyek master yang pengguna kirim. Ini adalah REVISI, bukan proyek video baru.

## Spesifikasi
- Vertikal 1080 × 1920, 30 FPS, 450 frame (15 detik)
- Windows 11 Explorer → shortcut → New folder → rename/Enter → Edge InPrivate → recap
- Kursor, toolbar, browser, teks, keyboard dan inset zoom menggunakan komponen HTML/SVG editable.
- Percepatan dibanding versi 22 detik dilakukan dengan memadatkan jeda, **bukan slow-motion atau frame skipping**.
- MP4 preview dibuat dengan retiming segmental dari render sebelumnya yang memakai komponen React yang sama. Mapping video baru dicerminkan dalam `timelineTime()` agar preview dan source mengacu pada kejadian yang sama.

## Integrasi ke Master v1.6
1. Backup master, jika perlu.
2. Ganti **hanya** folder `projects/windows-shortcut-ctrl-shift-n-pro-slow-v1/` dengan isi folder add-on ini. Jangan mengganti `src/`, `package.json`, atau `library/catalog.json` master.
3. Jalankan `npm run sync` atau `npm run dev` dari root master.
4. Cek komposisi `WindowsShortcutCtrlShiftNProSlowV1`.
5. Jalankan `npm run render` untuk merender ulang.

Karena ini revisi terhadap proyek yang sudah ada, jika Anda ingin mempertahankan versi lama, simpan cadangan folder lamanya lebih dulu.

**CATATAN:** Preview MP4 telah dibuat dengan retiming render terdahulu, sesuai `timelineTime()`. Render ulang dari source yang direvisi dalam Remotion Studio Windows pengguna belum diuji.
