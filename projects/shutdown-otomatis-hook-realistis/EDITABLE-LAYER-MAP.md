# Editable Layer Map — Shutdown Scene 01–05 (v22, Soft Depth v21 ACC)

**Komposisi Studio:** `S01Ketiduran`, `S02Download`, `S03Pertanyaan`, `S04Solusi`, `S05RunKlikOK`. Sisa Scene 06–09 tetap terdaftar dalam menu Scenes. Semua scene memakai React/SVG `Interactive.G` dan `Interactive.Text`, bukan potongan MP4 atau screenshot.

## Scene 01: Ketiduran
`src/scenes/Scene01.tsx` + `src/components/SceneSet.tsx`: judul tanpa garis, VO cue A/B, stickman (kepala, mata, mulut, tangan, kaki), kursi, meja, laptop beserta player, adegan film thriller malam beserta subtitle film, jam dinding posisi B, jendela malam/pagi. Ikon kursor di layar film telah dihapus. Bagian-bagian di dalam satu `Interactive.G` adalah satu grup semantik—tidak semuanya merupakan layer satu shape per primitive.

## Scene 02: Download
`src/scenes/Scene02.tsx` + SceneSet: judul dan subtitle sendiri, match move dari Scene01, karakter sayu menunggu, panel download, persentase 75→76 dan bilah unduhan, jam dinding tetap di lokasi. Angka progress berasal dari Props `downloadStartingPercent` / `downloadEndingPercent`, bukan teks statis.

## Scene 03: Pertanyaan 4,5 detik
`src/scenes/SceneQuestion.tsx`, `EditorialClock.tsx`, `QuestionOrnaments.tsx`: judul center *EMANG ADA / SOLUSINYA?* tanpa garis, tanda tanya terpisah, jam analog bergerak sebagai objek match-move ke Scene04.

## Scene 04: Solusi, variasi 05 v15 — 8 detik
`src/scenes/Scene03.tsx` (nama file legacy, urutan scene keempat): dua baris judul center tanpa garis, background grid, clock analog → timer, dua kartu Nonton Film / Download, bilah progress dan LED status terpisah, teks 100% selesai, timeline AKTIF → TIMER → OFF, kartu terakhir LAPTOP MATI / OTOMATIS, VO subtitle.

**Teks native-editable:** judul, label aktivitas, status selesai, label timeline, pemberitahuan OFF, subtitle.
**Grup visual native-editable:** jam dan ornamen, badan kartu, ikon, track/fill bar, indikator, timeline, notifikasi power.
**Nilai dinamis yang diedit lewat Props:** `solution04FilmInitialPercent` (62), `solution04DownloadInitialPercent` (76), `solution04FilmCompletionFrame` (165), `solution04DownloadCompletionFrame` (168), `solution04OffFrame` (205). Countdown angka real-time mengikuti `useCurrentFrame` dan diposisikan melalui grup Interactive; nilai tiap frame tidak berupa teks literal untuk double-click.

## Scene 05: Windows + R — Soft Depth v21 (10 detik)
`src/scenes/Scene04.tsx` (nama file legacy, ini Scene 05 di timeline): desain preview v21 diintegrasikan menjadi layer SVG/React langsung, tanpa gambar atau MP4.

**Layer teks yang dapat dipilih secara native:** `S05 / Heading / Buka Run`, `S05 / Heading / Lalu jalankan perintah`, `S05 / Keyboard / Plus symbol`, `S05 / R / Letter editable`, `S05 / Run / Command text editable`, seluruh teks petunjuk Run/label tombol, `S05 / Outro / 3600 number`, `S05 / Outro / DETIK label`, dan subtitle.

**Layer visual native:** `S05 / Keyboard / Shortcut whole group`, `S05 / Keyboard / Windows key independent`, `S05 / Keyboard / R key independent`, permukaan/bayangan/simbol masing-masing tombol, `S05 / Run / Whole window — drag and resize`, badan/input/tombol Run, kursor, klik, dan grup 3600.

**Props:** `scene04HeadlineLine1`, `scene04HeadlineLine2`, `scene04RunCommand`, `scene04KeysScale`, `scene04SoftDepth`, `scene04WindowShiftX/Y/Scale`, `scene04KeysShiftX/Y`, `scene04CursorShiftX/Y`. Nama Props menggunakan awalan `scene04` karena nama source lama, tetapi muncul dalam Scene 05.

Detail lengkap: `production/SCENE05-ACC-v21-SOFT-DEPTH-EDITABLE.md`.

## Batas validasi
Validator native menemukan nama/lokasi target, bukan bukti GUI drag, double-click, Save/reload atau render Windows. Dalam beberapa area ilustrasi, satu grup semantik memuat sejumlah primitive SVG yang tidak dipisah satu per satu. Uji di Remotion Studio tetap wajib sebelum produksi final.


## Pembaruan v56 (11 scene, rujukan terbaru)

S06–S09 sekarang native flow tunggal pada `src/scenes/Scene05To06Flow.tsx`; match 3600 ada di `src/components/Matched3600.tsx`. S08 pemisah dan S09 pembatalan menggunakan wrapper frameOffset tanpa reset. Angka timer/typewriter dinamis diatur melalui Props; subtitle text adalah native literal. Nama lama yang tercantum di bagian atas dokumen ini hanya histori. Lihat `README-EDITABLE-v56.md` dan `production/QA-SHUTDOWN-v56.md`.
