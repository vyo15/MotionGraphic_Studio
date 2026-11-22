# Panduan Edit Aset — Scene 01–02

## Edit tanpa mengubah desain terkunci
- Komposisi penuh: `ShutdownOtomatisHookRealistis`. Komposisi segmen dapat dipakai untuk memilih layer scene secara langsung.
- Aturan penting: Preview V3 Scene 01–02 telah di-ACC; jangan ubah kalimat, layout atau palette tanpa permintaan.
- Coba klik **S01 — Judul Ketiduran pas nonton**, **S01 — Subtitle VO A · Pernah ketiduran pas lagi nonton**, atau **S02 — Subtitle VO B · Tapi download belum selesai** pada segmen. Kontrol bergantung pada kemampuan versi Remotion Studio; lakukan Save/reload dan cek output, bukan sekadar kotak seleksi.

## Props dari Manifest (Remotion Studio Props)
| Props | Fungsi |
|---|---|
| `backgroundColor`, `inkColor`, `coralColor`, `navyColor` | Warna tema dasar |
| `showBackgroundGrid`, `showCaptions`, `showTimeIndicator` | Tampil/sembunyikan elemen |
| `subtitleColor` | Warna teks subtitle (default navy, tanpa blok) |
| `subtitleFontSize` | Besar subtitle (default 39 px) |
| `subtitleBaselineY`, `subtitleShiftX`, `subtitleShiftY` | Posisi subtitle tanpa mengubah karakter atau UI |
| `stickmanShiftX/Y` | Geser stickman tanpa mengubah gerak kepalanya |
| `laptopShiftX/Y` | Geser layar/laptop/indikator progres |
| `nightWindowShiftX/Y`, `deskShiftX/Y` | Geser jendela dan meja |
| `textShiftX/Y` | Geser judul dan subjudul |
| `cameraStrength` | Besar perpindahan kamera menuju Scene 02 (default 1) |
| `playerStartingProgress`, `playerEndingProgress` | Progres video Scene 01 |
| `scene02StickmanShiftX/Y`, `scene02LaptopShiftX/Y` | Pergeseran khusus Scene 02; tidak mengubah Scene 01 |
| `scene02NightWindowShiftX/Y`, `scene02DeskShiftX/Y` | Pergeseran jendela/meja khusus Scene 02 |
| `downloadStartingPercent`, `downloadEndingPercent` | Progres download Scene 02 (default 75 → 76) |

## Source per layer
- `src/components/SceneSet.tsx` — grid, jendela malam, meja, kursi, kaki, tubuh dan tangan, kepala stickman, shell laptop, UI video, UI download, cursor, jam.
- `src/scenes/Scene01.tsx` — chapter, judul, dua subtitle VO bergantian tanpa kotak latar.
- `src/scenes/Scene02.tsx` — chapter, judul, dua subtitle VO bergantian tanpa kotak latar.
- `src/animations/motion.ts` — timing dan kurva easing; semua bergantung pada frame Remotion, tidak memakai CSS animation.
- `src/config/timing.ts` — durasi dan batas scene: 240 + 165 frame.
- `src/config/narration.json` — naskah VO Guide asli, kalimat tidak diubah.
- `src/config/subtitle-cues.json` — titik masuk/keluar tiap potongan subtitle (guide, belum sinkron rekaman final).
- `production/SUBTITLE-VO-GUIDE.srt` — naskah subtitle jika ingin menyinkronkan timing terhadap VO sesudah direkam.

### Subtitle transparan, bukan kotak gelap
Subtitle kini **teks navy saja** (tak ada `rect`/panel latar). Teks literal `Interactive.Text` per potongan bisa disunting di JSX; position/size/color lewat Props. Jangan menggunakan panel caption lama ketika menggabungkan revisi. `subtitle-cues.json` dan SRT adalah guide timing; setelah ubah text atau timing di JSX, sinkronkan guide tersebut secara manual agar tetap sama. 

## Audio & VO Guide
Selesaikan visual, buka komposisi VO Guide dari Master, lalu rekam VO baru setelah review. **Tidak ada audio VO dalam paket ini**, karena audio preview V3 yang tersedia hampir hening. Setelah rekam, letakkan file audio final di `public/audio/voiceover/`, sambungkan di `src/Video.tsx` dan `src/SegmentVideo.tsx` memakai `staticFile('videos/shutdown-otomatis-hook-realistis/audio/voiceover/nama-rekaman.wav')` atau ikuti workflow VO Master. Uji ulang timing dan subtitle lalu render.

## Batasan
Belum diuji apakah semua layer dapat di-drag/resize lalu Save-to-code di PC Windows. Source vector dan Props jelas editable, tetapi klaim **100% no-code** masih harus diuji.


## Scene 03 — Kontrol tambahan

Source: `src/scenes/Scene03.tsx` (layer SVG/Interactive, bukan MP4 flatten).

Props tambahan dalam `motiongraphic-video.json`/`src/config/props.ts`:
- `scene03ClockShiftX` dan `scene03ClockShiftY`: geser jam (piksel, default 0).
- `scene03ClockScale`: ukuran jam (default 1).
- `scene03CardsShiftX` / `scene03CardsShiftY`: posisi kartu status dan kartu jadwal (default 0).
- `showCaptions`, `subtitleColor`, `subtitleFontSize`, `subtitleBaselineY`, `subtitleShiftX/Y`: subtitle Scene 01–03, **tanpa panel hitam**.
- `textShiftX/Y`: heading/transisi antarscene.

Ubah teks judul, angka digital, keterangan dan subtitle di layer bernama `S03 — ...` jika editor native mengenali teks langsungnya, atau melalui source JSX. Animasi jam dari `useCurrentFrame` deterministik.

Catatan: source-editable terbukti; drag di GUI, Save-to-code, dan reload harus diuji pada Remotion Studio lokal.


## Scene 05 (file legacy Scene04.tsx) — Soft Depth v21 ACC

Komposisi **Videos → Shutdown Otomatis → Scenes → `S05RunKlikOK`**, bukan `S04RunKlikOK`.

1. **Typography di tengah:** `S05 / Heading / Centered typography group` untuk seluruh judul; `S05 / Heading / Buka Run` dan `S05 / Heading / Lalu jalankan perintah` untuk masing-masing teks.
2. **Windows + R:** `S05 / Keyboard / Shortcut whole group` untuk bersama, atau `S05 / Keyboard / Windows key independent` dan `S05 / Keyboard / R key independent` untuk masing-masing. Elemen permukaan, simbol, dan bayangan memiliki layer tersendiri. Tombol bereaksi coral saat ditekan, tanpa garis/arc dekoratif.
3. **Jendela Run:** `S05 / Run / Whole window — drag and resize` untuk posisi seluruh jendela; titlebar, input, teks panduan, perintah, tombol OK/Cancel/Browse punya layer tersendiri.
4. **Kursor:** `S05 / Cursor / Pointer hotspot editable` dan `S05 / Cursor / Click indicator`; posisi kursor mengikuti lintasan frame. Bila menggeser tombol Run, sesuaikan offset kursor.
5. **Penutup:** `S05 / Outro / 3600 seconds matched to Scene 06` untuk angka *3600 DETIK* yang muncul menjelang Scene 06.

Props bisa diedit di Studio: `scene04HeadlineLine1`, `scene04HeadlineLine2`, `scene04RunCommand`, `scene04KeysScale`, `scene04SoftDepth`, `scene04WindowShiftX/Y/Scale`, `scene04KeysShiftX/Y`, `scene04CursorShiftX/Y`. Frame timewriter/klik tetap terprogram (`useCurrentFrame`), bukan keyframe GUI no-code. Setelah edit, lakukan Save → reload → render uji untuk membuktikan persistensi perubahan.

## Scene 05 — Swiss Motion 02 (21 Nov 2026)
Buka komposisi `S05PenjelasanTimer` dari sidebar. Setiap angka, unit, panah, kartu timer, laptop, dan tiga cue subtitle memiliki layer `Interactive` dengan nama `S05 — ...`.
`defaultProps.scene05MainShiftX/Y/Scale` mengubah komposisi utama, `scene05LaptopShiftX/Y` mengatur laptop, `scene05CountdownSeconds` mengatur nilai awal timer (default 3600). Timer berupa text dinamis **Props-editable**, bukan ketik langsung di Studio. Teks lain menggunakan `Interactive.Text` literal. Gerak progresif berasal dari `useCurrentFrame`, sehingga timing perlu disesuaikan di `src/scenes/Scene05.tsx` jika tidak ada kontrol no-code untuk frame spesifik. Subtitle navy polos, tanpa blok hitam.

Status: validasi statis perlu dijalankan; drag/Save/reload GUI Windows dan render Remotion final belum teruji. Jangan klaim 100% no-code editable sampai diverifikasi.


## Update 22 Nov 2026 — 9 scene (Question Motion v6)

1. Ekstrak ZIP master. Jalankan `npm install` jika dependency belum ada.
2. `npm run sync`, lalu `npm run dev`.
3. Di `Videos → Shutdown Otomatis ... → Scenes`, pilih Scene 01 sampai Scene 09 untuk meninjau/mengedit tiap bagian.
4. Source scene pertanyaan: `src/scenes/SceneQuestion.tsx`. Pilih layer `S03-B — Center typography...` atau `QUESTION — Tanda tanya ...`. Jam berada pada `src/components/EditorialClock.tsx`.
5. File JSX scene berikutnya masih bernama `Scene03.tsx` untuk solusi; **nomor tampilan** adalah Scene 04. Lihat `STORYBOARD.md` untuk mapping lengkap.
6. Perbarui VO guide di `src/config/narration.json`, subtitle frame cue di `src/config/subtitle-cues.json`, dan `production/SUBTITLE-VO-GUIDE.srt` jika ingin mengubah kata/durasi.
7. Periksa setiap scene; ubah satu per satu setelah visual disetujui. Jangan memindah jam sendirian pada hanya satu scene karena transisi jam memakai komponen bersama.

**Klarifikasi editable:** teks serta grup vector `Interactive` native tersedia dan sudah lulus validasi struktur statis. Perpindahan animasi dihitung dari `useCurrentFrame` di source, sehingga penyesuaian kurva/detail gerak membutuhkan perubahan source. Uji drag/Save/reload pada Remotion Studio lokal belum dilakukan.
