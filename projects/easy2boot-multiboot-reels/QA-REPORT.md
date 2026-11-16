# Audit Konsistensi — Easy2Boot (Revisi Font)

**Sumber audit:** `Easy2Boot-FULL-Preview-80detik.mp4` dan source add-on `Easy2Boot-FULL-Editable-Addon-80detik.zip` yang sudah ada.

## Temuan dan revisi

| Aspek | Temuan awal | Tindakan | Hasil |
|---|---|---|---|
| Font Scene 6 | Serif/Times New Roman muncul pada CTA dan cover, berbeda dari Scene 1–5 | Typography Inter ditetapkan dalam SVG | Diperbaiki pada MP4 dan source |
| Font internal source Scene 3–5 | Preview browser tampak sans-serif, tetapi aturan font tidak tertanam pada SVG; ada risiko fallback pada renderer | Tambah injeksi gaya terpusat `src/config/typography.ts` ke semua scene | Diverifikasi dengan computed style browser pada 6 scene |
| Label USB Scene 6 | Logo EASY2BOOT di badan USB terlalu panjang dan tertutup konektor setelah Inter | Kecilkan dan geser teks khusus label USB, tidak mengubah CTA | Diperbaiki |
| Latar / warna | Off-white `#F7F7F5`, coral `#DF805F`, charcoal, kartu putih | Pertahankan | Konsisten secara visual pada frame audit |
| Bahasa visual | Header/footer, grid, label scene dan kontras dari Scene 1–5 | Pertahankan | Konsisten secara visual pada frame audit |
| Gerak / narasi | CTA versi ringkas sudah disetujui; Scene 1–5 tidak diminta direvisi | Tidak ubah koreografi, durasi, atau naskah | Tetap 6 scene, 80 detik |
| Cover | Frame akhir berasal dari Scene 6, sebelumnya memakai serif | Ekspor ulang dari frame sumber Scene 6 yang sama | PNG 1080×1920 tersedia |

## Hasil pemeriksaan

- **Video:** MP4 H.264, 720×1280, 30 fps, 80.000 detik, 2.400 frame (diperiksa dengan ffprobe).
- **Audio:** Track SFX asli dipertahankan; hash MD5 bitstream audio sebelum/sesudah identik (`6a486804c5f4c015be2b85b3b21729d3`).
- **Tipografi:** `getComputedStyle` browser memverifikasi `Inter, Arial, sans-serif` pada keenam scene dari SVG sumber yang ditambah aturan font.
- **Source:** 28 file TypeScript/TSX lolos transpile sintaks. 6 string SVG berhasil di-parse sebagai XML. Manifest tetap memakai ID `Easy2BootMultibootReels`, slug `easy2boot-multiboot-reels`, 2.400 frames.
- **Visual:** 18 frame dari awal hingga akhir diperiksa untuk gaya, komposisi, teks terpotong, dan continuity. Frame Scene 6 diperiksa ulang sesudah revisi.

## Belum diverifikasi

- **Remotion Master di PC pengguna:** tidak tersedia di lingkungan ini; `npm run check`/render Remotion Master secara aktual belum diuji.
- **Voice-over:** rekaman suara final belum terpasang; sinkronisasi per kata terhadap audio VO asli belum bisa diuji. Preview tetap **SFX-only**.
- **UI teknis Easy2Boot:** menu boot merupakan simulasi edukatif, belum direkam/diuji di PC target.

## Catatan revisi

Source project lama lain tidak diubah. Scene 1–5 mempertahankan desain dan koreografi. Revisi visual diterapkan khusus pada Scene 6, sedangkan aturan font universal diperbaiki di semua source scene agar konsisten saat preview dan render selanjutnya. Font bisa diubah dari satu Prop `fontFamily` jika dibutuhkan, dengan default Inter.
