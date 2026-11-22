# VO GUIDE Easy2Boot — Seluruh Visual ACC

**2467 frame / 30 FPS = 82,23 detik.** Naskah adalah panduan rekaman, bukan VO audio final. Buka komposisi `Easy2BootMultibootReelsVOGuide` untuk latihan; satu sumber resmi timing terdapat di `src/config/narration.json`.

- **S01 — Hook (0.00–12.70 detik):** Mau instal Windows 11, tapi flashdisk bootable-nya masih Windows 10? Masa harus bikin bootable ulang lagi?
- **S02 — Solusi (12.70–25.70 detik):** Ah, ribet banget. Mending pakai Easy2Boot aja. Satu flashdisk bisa nyimpen installer Windows 10, Windows 11, sampai Linux sekaligus.
- **Pengantar 02→03 (25.70–29.30 detik):** Gimana cara bikinnya?
- **S03 — Persiapan (29.30–45.03 detik):** Pertama, backup data flashdisk. Buka Easy2Boot. Pilih USB yang benar, lalu buat USB multiboot.
- **S04 — ISO (45.03–53.03 detik):** Salin file ISO installer ke folder masing-masing. Sesuai sistem operasinya.
- **S05 — Booting (53.03–69.23 detik):** Sekarang, booting seperti biasa, Pilih booting USB. Begitu muncul, kamu tinggal pilih ISO yang kamu butuhkan. Jalankan, dan beberapa saat kemudian, Windows Setup pun terbuka.
- **S06 — CTA + cover (69.23–82.23 detik):** Kalau kamu, biasanya bikin bootable ulang atau pakai multiboot? Coba tulis di kolom komentar!

## Scene 06 — Subtitle tanpa kotak

- 0,85–4,1 detik: “Kalau kamu, biasanya bikin bootable ulang”
- 4,1–7,8 detik: “atau pakai multiboot?”
- 8,05–10,7 detik: “Coba tulis di kolom komentar!”
- 11–13 detik: cover final, visual hold tanpa narasi.

Gunakan `scene06ShowTextVO` untuk menampilkan/menyembunyikan teks panduan S06. Subtitle global `showSubtitles` disetel false agar tidak dobel. Sinkronisasi kata per kata dilakukan **setelah** rekaman suara pengguna tersedia.
