# SCENE 06 — EDITABLE LAYER MAP (PENUTUP + CTA FINAL)

**Komposisi:** `DebloatWindows11Opening-S06` — **517 frame / 17,233 detik** (30 FPS).

## Timeline berdasarkan VO (estimasi sebelum WAV asli tersedia)

| Detik lokal | VO | Aksi objek / hasil |
|---|---|---|
| 0,0–3,75 | “Tapi jangan asal hapus semuanya, ya.” | WinUtil masih menampilkan Xbox App + Copilot terpilih, opsi lain tetap tidak terpilih. Kursor mengarah ke aplikasi yang tidak dipilih. |
| 3,75–5,95 | “Selesai!” | Klik ilustratif Remove Selected hanya untuk pilihan tadi; progress panel muncul, lalu hasil. Ini tidak menjalankan penghapusan asli. |
| 5,95–8,72 | “Restart kalau diperlukan.” | Desktop Windows 11 Bloom / Start Menu / Power menu → highlight Restart, **tanpa diklik**. |
| 8,72–13,92 | “Menurut kamu, debloat Windows perlu nggak sih?” | Transisi jadi background off-white. Logo Windows → pertanyaan tetap terbangun → dua opsi PERLU/NGGAK. |
| 13,92–17,23 | “Coba tulis di kolom komentar!” | Dua opsi meluncur ke tengah, berubah jadi bubble percakapan; teks TULIS DI KOLOM KOMENTAR muncul. |

## Layer penting

| Elemen | Nama / lokasi | Editable |
|---|---|---|
| Judul tutorial | `src/scenes/Scene06.tsx`, `S06 — Judul ...` | Teks langsung di `Interactive.Div`, posisi/ukuran/warna JSX |
| Subtitle tutorial | `src/scenes/Scene06.tsx`, `S06 — Subtitle ...` | Teks literal langsung; tampil hanya selama tutorial |
| WinUtil & checkbox awal | `src/components/Scene05WinUtil.tsx` dipakai ulang | UI HTML/SVG, bukan rekaman layar; source S05 tidak dimodifikasi |
| Progress simulasi | `S06 — Panel proses pilihan WinUtil` dan `S06 — Progress bar pilihan` | Dimensi, warna, durasi `process` di config |
| Desktop & Wallpaper | `src/components/Scene06Windows.tsx` | Wallpaper asset terpisah di `public/images/windows11-bloom-scene04.png`; taskbar/Start Menu layer tersendiri |
| Power menu / Restart | `S06 — Menu Power / Restart`, `S06 — Restart` | Posisi, sorot, teks langsung di JSX |
| Kursor & klik | `src/components/Scene06Pointer.tsx` | Track `SCENE06.cursor.keyframes`, waktu klik di config; Restart tidak di-klik |
| CTA latar/grid | `src/components/Scene06CTA.tsx` | Warna dari `SCENE06.colors`, grid via Props `showGrid` |
| Logo Windows CTA | `S06 — Windows tile 1–4` | Empat layer persegi terpisah; posisi, warna, easing |
| Pertanyaan CTA | `S06 — Menurut kamu`, `S06 — DEBLOAT`, `S06 — WINDOWS`, `S06 — PERLU NGGAK SIH?` | Teks literal di `Interactive.Div`, timing via `reveal()` |
| Pilihan | `S06 — Pilihan PERLU / posisi`, `S06 — Pilihan NGGAK / posisi` | Kartu HTML/CSS terpisah dan teks literal `PERLU` / `NGGAK` |
| Bubble | `S06 — Bubble komentar`, tiga layer `S06 — Titik komentar` | Bentuk SVG/HTML, bukan gambar flat |
| Footer CTA | `S06 — TULIS DI KOLOM`, `S06 — KOMENTAR` | Teks literal editable; aksen coral layer tersendiri |
| VO audio | `public/audio/voiceover-scene06.wav` | Placeholder 18 detik hening; ganti dengan rekaman VO, aktifkan Props `voiceEnabled` |

## Cara edit tanpa mengubah animasi

1. Buka komposisi `DebloatWindows11Opening-S06` di Remotion Studio.
2. Gunakan layer bernama `S06 — ...` untuk memilih judul/teks; di Master yang mendukung `Interactive.Div`, perbarui teks/style melalui inspector sesuai dukungan Studio.
3. Untuk pengeditan source presisi: ubah teks literal di `src/scenes/Scene06.tsx` atau `src/components/Scene06CTA.tsx`, posisi dasar/UI di `src/config/scene06.ts`, dan animasi di `src/animations/scene06.ts`.
4. **Animasi tidak dicampur ke `translate` layer**; gerak diletakkan di wrapper luar atau berdasarkan perhitungan progress. Menggeser layer interaktif di inspector yang mendukungnya tidak seharusnya memengaruhi durasi reveal.
5. Jika ingin menyesuaikan VO nyata, ganti WAV hening, lalu set waktu di `SCENE06.subtitleBeats`, `SCENE06.timing`, dan titik onset `reveal()` yang dipakai CTA.

### Catatan akurasi

- Preview acuan `preview-scene06-penutup-cta-final-gabungan-v1.mp4` dibuat terpisah. Source editable ini merekonstruksi visual dengan React/SVG; **belum diklaim pixel-identical**.
- Scene 06 memakai **penghapusan pilihan sebagai simulasi ilustratif**. Tidak ada tindakan Windows sungguhan; Restart juga tidak diklik.
- Editing drag/simpan/reload dari PC pengguna tetap memerlukan uji lokal.
