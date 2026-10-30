# Dua aplikasi, satu folder, perintah npm terpisah

Kompatibel dengan Master Studio v1.8.1. Patch ini tidak menghapus video, tidak mengganti `src/Root.tsx`, `src/index.ts`, katalog, atau file scene. Script `npm run dev` tetap seperti semula.

## Pemasangan satu kali

1. Simpan backup Master Studio.
2. Ekstrak **isi** ZIP patch ke dalam folder `MotionGraphic-Studio/` tempat `package.json` berada. Gabungkan folder `tools/`, jangan menghapus isinya.
3. Klik dua kali `07-AKTIFKAN-NPM-CONCAT.bat`, atau dari terminal Master: `node tools/enable-concat-npm.mjs`.
4. Kalau Concat belum terinstal, jalankan `npm run concat:setup` (unduh installer resmi v0.2.8, cocokkan checksum SHA-256, pasang pada `apps/concat/runtime/`). Perlu koneksi internet dan ruang penyimpanan yang cukup.

## Pemakaian harian

```bash
npm run dev             # Remotion Studio
npm run concat          # Aplikasi Concat (jendela berbeda)
```

Tambahan:

```bash
npm run concat:status   # Deteksi executable Concat
npm run concat:safe     # Mode rendering antarmuka perangkat lunak jika GPU bermasalah
npm run concat:clone    # OPSIONAL, clone SOURCE Concat ke apps/concat/source
```

**Perhatian:** `git clone` hanya mengunduh source Rust; itu BUKAN aplikasi terpasang dan tidak diperlukan untuk menggunakan Concat. `concat:setup` menggunakan installer Windows resmi dan menyimpan runtime di folder Master; `concat:clone` terpisah.

## Project dan aset

- Source video tetap di `projects/<slug>/`.
- Remotion dipakai untuk membuat Hook, Isi, CTA lalu render MP4 per bagian.
- Concat digunakan untuk menyusun tiga bagian, mengatur suara, auto-caption dari GUI, mixing SFX, dan eksport akhir.
- Hasil export dan file edit Concat harus disimpan dan dicadangkan terpisah. File MP4 tidak otomatis berubah menjadi komponen TSX editable di Concat.
- Path `apps/concat/` lokal diabaikan oleh `.gitignore` pada saat setup. Model dan pengaturan aplikasi Concat dapat berada di profil pengguna Windows, bukan semuanya di Master.

## Keamanan dan kompatibilitas

- Script pendaftaran hanya menambahkan lima entri `scripts` dalam `package.json` dan berhenti jika ada nama script yang berbenturan.
- Sebelum mengubah `package.json`, script menyimpan backup di `apps/concat/backups/`.
- Menjalankan script dua kali tidak menduplikasi perintah.
- Launcher menggunakan PowerShell bawaan Windows, tidak menginstal package npm baru.
- Bila saat menjalankan Concat muncul masalah rendering antarmuka, gunakan `npm run concat:safe`.
- Jangan commit binary/runtime, model AI, atau hasil Git clone ke repo Master.
- Patch ini dibuat dan diuji secara statis di luar Windows. Instalasi Concat, tampilan GPU, dan export MP4 pada PC pengguna tetap perlu diuji.
