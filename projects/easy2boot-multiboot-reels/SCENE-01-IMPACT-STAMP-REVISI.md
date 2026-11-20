# Scene 01 — Impact Stamp (Pilihan Efek 02)

**Proyek:** `Easy2BootMultibootReels` / `easy2boot-multiboot-reels`. Ini *revisi Scene 01* dari Master v1.8.1 yang diberikan pengguna, bukan Master baru.

## Fokus revisi

- Hook tetap: “Mau instal Windows 11, tapi flashdisk bootable-nya masih Windows 10? Masa harus bikin bootable ulang lagi?”
- Tidak ada garis lingkaran pada logo Windows, USB, atau pertanyaan terakhir.
- Angka **11** dan **10** masuk bergantian dengan *rolling reveal* (masing-masing layer editable).
- Pada ujung kalimat “bikin bootable ulang lagi?”, tanda silang besar **Impact Stamp** menghantam jendela USB Bootable, memantul sekali, membuat jendela bergetar singkat, lalu *hold*.
- Tanda X di-*clip* pada area aplikasi supaya tidak melewati headline. Subtitle tetap layer mandiri.
- SFX stamp berada di `public/audio/scene01_impact_stamp.wav` dan dimulai pada frame 243; hit pada frame sekitar 332.

## Durasi dan komposisi

S01 sekarang **381 frame (12,7 detik) @30fps**, semula 360 frame. Durasi S02–S06 **tidak berubah**; start frame S02–S06 bergeser +21 frame. Total 2421 frame. ID dan slug tetap.

## Mengedit di Remotion Master

Setelah copy folder add-on ke `MotionGraphic-Studio/projects/easy2boot-multiboot-reels/`, jalankan `npm run dev` atau `npm run sync` di folder Master. **Jangan** menyalin hanya `src/` ke root Master dan jangan mengedit `src/Root.tsx`, `src/index.ts`, `package.json`, atau `library/catalog.json`.

Props yang bisa diedit di Studio:

| Prop | Fungsi | Default |
|---|---|---|
| `scene01StampFrame` | kapan X mulai masuk, dalam frame lokal S01 | `332` |
| `scene01StampScale` | besar X | `1` |
| `scene01ShakePower` | intensitas getaran jendela bootable | `1` |
| `scene01StampColor` | warna X dan sparks | `#DA7A5C` |
| `scene01ShowStamp` | tampil/sembunyikan efek X | `true` |
| `scene01ShowCaptions` | tampil/sembunyikan subtitle S01 | `true` |
| `scene01CaptionLines` | 3 unit subtitle; pakai `|` untuk baris baru | array 3 string |
| `scene01MismatchTitle` | teks “TAPI USB-NYA” | `TAPI USB-NYA` |
| `scene01MismatchValue` | teks “MASIH WIN 10” | `MASIH WIN 10` |
| `scene01FinalLine1/2` | dua baris pertanyaan penutup | `MASA HARUS` / `BIKIN ULANG LAGI?` |

Teks headline pembuka masih dikontrol `title01Need` dan `title01Target`. Semua elemen utama menggunakan `Interactive.G` (Remotion native) terpisah dan diberi nama jelas dalam layer/timeline. *Non-destructive transforms* juga bisa melalui `layerOverrides`, misalnya `S01:stampX` dengan `{ "x": 0, "y": -12, "scale": 1.12 }` atau `S01:headlineWin11` dengan `{"x":-10}`. Untuk pengaturan animasi lanjutan, lihat `src/animations/scene01Impact.ts` dan `src/config/scene01Impact.ts`.

Kamu dapat memasukkan `public/audio/voiceover.wav` dan mengaktifkan `showVoiceOver` serta `voiceOverFileName` setelah sync. Sumber VO asli tidak disertakan karena belum tersedia untuk versi revisi ini.

## Catatan validasi

Preview MP4 540×960 di-render ulang dengan mengeksekusi pohon SVG dari komponen Scene01 yang sama, memakai renderer QA offline (bukan rekaman Remotion Studio). Script TSX ditranspilasi secara sintaksis, dan setiap frame bersifat deterministik. **Render Remotion 1080×1920 dan interaksi drag/save/reload pada PC Windows pengguna belum diuji** karena modul Remotion tidak tersedia di lingkungan render lokal. Jangan menafsirkan preview sebagai bukti pengujian UI Studio.
