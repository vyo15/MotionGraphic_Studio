# Panduan editing tanpa kode — Windows Hacks V7

## Teks utama langsung di Studio
Buka `WindowsHacks5ShortcutLengkap` di Remotion Studio. Pada timeline pilih scene HOOK / 01 / 02 / 03 / 04 / 05 / CTA. Cari layer bernama **Judul 1**, **Judul 2** atau **Subtitle** (sudah dipisah untuk setiap fase). Klik dua kali teks untuk mengedit isi dan ubah X/Y, warna, font atau ukuran dari panel Remotion. Perubahan akan ditulis ke source JSX oleh Remotion Studio bila editing interaktif tersedia pada versi Remotion di PC.

## Teks UI Windows yang dinamis
Untuk judul tab browser, nama file, nama aplikasi Task Manager, dan beberapa label UI yang memakai data dinamis, buka **Visual Editor Master** di `http://127.0.0.1:4077/visual`. Pilih project → `EDIT OBJEK DAN TEKS LANGSUNG` → cari nama layer → isi field **Edit Teks** → **Simpan teks ini**. Klik dua kali kotak layer pada kanvas untuk fokus ke field teks. Editor menyimpan ke source (teks literal) atau manifest (copy dinamis), lalu dapat di-Undo. Ini jalur visual no-code, tetapi bukan editor teks langsung di kanvas Remotion Studio.

## Aturan video berikutnya
Semua add-on baru wajib `editableContract: "studio-direct-v3"` dan mengikuti `STANDAR-EDITABLE-STUDIO-v3.md` pada Master. `npm run dev` memeriksa bahwa judul/subtitle bukan lagi expression computed. Satu layer = satu JSX node untuk elemen penting. Tidak otomatis mengubah semua HTML/CSS lama; gambar, kursor, dan animasi yang dihitung tiap frame bisa tetap memakai panel terpisah.

## Suara dan timing
7 track WAV terpisah (HOOK, 5 shortcut, CTA). Demo tetap pada kecepatan asli; sesuaikan durasi potongan `Sequence` / cue voice-over sesuai kebutuhan. Jangan merekam suara bersamaan dengan efek suara di file yang sama.

## Pengujian mandiri wajib
1. Edit teks `01 · Tab tertutup · Judul baris 1` → simpan/reload → cek perubahan.
2. Edit nama tab browser melalui Visual Editor → simpan/reload → cek hasil.
3. Uji kursor dan ring klik setelah drag.
4. Pastikan render akhir dengan audio setelah rekaman tersedia.
