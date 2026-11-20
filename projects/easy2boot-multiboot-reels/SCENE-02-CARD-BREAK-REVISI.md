# Revisi Scene 01 → 02 — Card Break (dipilih 19 November 2026)

## Alur terkunci

1. Scene 01 tetap menggunakan **Impact Stamp (efek 02)** yang disetujui.
2. Pada awal Scene 02, jendela `USB Bootable` yang telah diberi X **terpecah menjadi enam shard SVG**. Tiap shard independen, transformasi dan opacity frame-driven, tidak ada video flatten di Remotion.
3. Pecahan keluar dalam ±0,8 detik, lalu teks **AH, RIBET / BANGET.** masuk dengan ruang bersih.
4. **MENDING PAKAI / EASY2BOOT.** menggantikan reaksi tanpa overlap.
5. Satu USB menampilkan tiga ISO yang masuk bergiliran; hasil di-hold. Video Scene 02 13 detik (390 frame).

## Layer native

Komposisi `S02` memuat beberapa layer seperti `S02 — Card Break — potongan A…F`, `S02 — Card Break — pertanyaan lama 1/2`, `S02 — Ah, ribet — baris 1`, `S02 — Banget — baris 2`, `S02 — USB solusi`, `S02 — ISO WIN 10/11/LINUX masuk ke USB`, serta track caption VO. Layer ini menggunakan `Interactive.G` dan `layerOverrides` non-destruktif.

## Props yang bisa diubah

- `scene02ShowBreak` — tampilkan/sembunyikan transisi
- `scene02BreakStartFrame` — frame mulai pecah, default 5 (relatif Scene 02)
- `scene02BreakDurationFrames` — lama pecahan terbang, default 23 frame
- `scene02BreakSpread`, `scene02BreakRotation` — intensitas penyebaran/rotasi
- `scene02BreakColor` — warna X/percikan dan kata **BANGET.**
- `scene02ReactionLine1/Line2`, `scene02SolutionLine1/Line2`, `scene02ManyLine1/Line2` — kata utama
- `layerOverrides['S02:<id>'].text/fontSize/fill/x/y/scale/rotation/opacity/startFrame/endFrame/keyframes` — per layer penting (grup). SVG detail di dalam grup tidak otomatis setiap path-nya draggable.
- `showSfx` — mengaktifkan SFX; file `public/audio/scene02_card_break.wav` dimainkan pada momen Card Break, terpisah dari SFX Scene 01.

## Naskah VO Scene 02

"Ah, ribet banget. Mending pakai Easy2Boot aja. Satu flashdisk bisa nyimpen installer Windows 10, Windows 11, sampai Linux sekaligus."

Subtitle dalam source adalah contoh perkiraan timing, belum terkunci ke voice-over rekaman asli.

## Instalasi aman

**Master hanya satu.** Pertahankan slug `easy2boot-multiboot-reels` dan ID `Easy2BootMultibootReels`. ZIP patch kumulatif berisi semua perubahan dari Master yang user unggah pada 19 November, termasuk Scene 01 Impact Stamp dan Scene 02 Card Break. Ekstrak lalu salin folder add-on ke `MotionGraphic-Studio/projects/`, gabungkan tanpa menghapus proyek lain. Jalankan `npm run sync` atau `npm run dev`. Tidak mengubah `src/Root.tsx`, `src/index.ts`, `package.json`, atau `library/catalog.json` secara manual.

## Validasi

- **Teruji**: render konsep SVG Scene 02 dari logika JSX/props yang sama menggunakan renderer SVG offline; H.264 preview + SFX; manifest/ZIP dan pemeriksaan struktur.
- **Belum teruji**: render final native Remotion pada Windows, editor drag/drop dan persistensi save/reload, serta sinkron kata per kata dengan VO asli.
