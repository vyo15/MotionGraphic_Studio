# Motion Graphic — WIN + E | Dua File Explorer Sekaligus — PRO V2

**Tujuan video:** Saat folder lama masih dipakai, `Win + E` membuka jendela File Explorer **baru** tanpa menutup jendela pertama. Visual memperlihatkan dua jendela secara simultan.

**Konsep narasi 10 detik:** "Lagi buka folder kerja, tapi mau cari folder lain? Nggak perlu ditutup. Tekan Win + E. File Explorer baru langsung terbuka, folder lama tetap aman!"

## Alur storyboard
| Durasi | Narasi/teks | Visual | Animasi | Layer penting |
|---|---|---|---|---|
| 0-1.7s | Folder lama masih dipakai? | Explorer Documents > Project Kerja, terbuka | Zoom monitor, glowing badge | `Desktop.tsx` old window |
| 1.7-3.35s | Jangan ditutup. Win + E. | Keyboard Win dan E ditekan | Spring/keypress | `Keyboard` pada `Video.tsx` |
| 3.35-5.2s | File Explorer baru terbuka | Explorer Home baru menimpa window lama sebagian | Pop/slide, tidak menutup window pertama | `Desktop.tsx` new window |
| 5.2-7.45s | Dua folder sekaligus | 2 jendela disusun berdampingan; new window pindah ke Downloads | Side by side camera / mouse click | `ExplorerWindow.tsx` kedua window |
| 7.45-10s | Folder lama tetap aman | 2 kartu status ✓ | Pop/scale | `StatusCompare` |

## Cara impor ke MotionGraphic-Studio
1. **Jangan mengekstrak add-on** dan jangan mengganti file studio utama.
2. Letakkan `WinE-Dua-Jendela-PRO-V2-Remotion-Editable.zip` di `MotionGraphic-Studio/library/masuk/`.
3. Jalankan `01-MULAI-STUDIO.bat` atau `npm run dev` untuk sinkronisasi otomatis.
4. Cari komposisi **WindowsShortcutWinEDuaJendelaProV2** di panel Remotion Studio.
5. Jika struktur studio lain dari yang diuji, impor manual `src/`, `public/`, dan manifest menggunakan loader studio.

## Edit
- `src/config/video.ts`: ganti judul, teks, nama folder, path file, palet warna, timing, posisi dan skala 2 jendela.
- `src/Video.tsx`: timeline, layer judul, keyboard, kartu pembanding, animasi.
- `src/components/Desktop.tsx`: transform window lama/baru, mouse dan highlight, posisi di monitor.
- `src/components/ExplorerWindow.tsx`: UI detail Explorer (SVG/HTML/CSS), halaman Project Kerja / Home / Downloads.
- `src/styles.css`: styling tiap elemen.
- `public/audio/win-e-two-windows.wav`: audio SFX terpisah.

**Editing:** Layer utama memiliki nama eksplisit dan komponen interaktif `Interactive.Div`. Mengubah teks/warna/posisi juga bisa lewat config. Remotion Studio mungkin tidak mengenali drag-and-drop otomatis pada anak komponen kompleks; ubah melalui config jika kontrol visual dinonaktifkan. Perubahan file tersimpan dan akan digunakan pada preview/render.

Video 1080 x 1920, 30 FPS, 300 frames. Hanya adegan Win + E; bukan seluruh video 5 shortcut.
