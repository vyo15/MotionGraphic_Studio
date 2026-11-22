> **UPDATE 22 November 2026:** Scene Question Motion v6 ACC ditambahkan. Total **9 scene, 64 detik, 1920 frame, 30 FPS**. Lihat [STORYBOARD.md](STORYBOARD.md) dan [SCRIPT.md](SCRIPT.md) untuk urutan baru dan teks VO.
> Source edit tetap SVG/React Remotion, bukan frame render.

# Shutdown Otomatis — Scene 01–03, Clean Stickman / Living Screencast

**Master target:** MotionGraphic Studio v1.8.1 (Remotion 4.0.538), satu Master, satu Studio.

Pembaruan subtitle: blok latar caption navy dihapus seluruhnya; subtitle VO tampil sebagai teks navy transparan, frasa mengikuti naskah asli. Gerak karakter, kamera, jendela dan UI tidak diubah.

Ini add-on **tiga scene** dari video yang sedang dibahas, *bukan* tujuh scene lengkap. Durasi 615 frame (20,5 s), 1080×1920, 30 FPS. ID/slug dipertahankan dari proyek Shutdown Otomatis terdahulu: `ShutdownOtomatisHookRealistis` / `shutdown-otomatis-hook-realistis`.

## Sumber ACC
- Scene 01 — Clean Stickman Living Screencast V2 (gerak mengantuk → tertidur) telah disetujui pengguna.
- Sambungan Scene 01→02 V3 (laptop/video → download 75–76%) juga telah disetujui pengguna.
- Video MP4 V3 yang sudah di-ACC dijadikan **referensi visual**, bukan bahan footage untuk output.
- Implementasi baru adalah rekonstruksi vektor editable dari preview V3, belum diklaim identik piksel demi piksel.

## Pemasangan tanpa menimpa project lain
1. Cadangkan folder proyek lama yang mungkin berada di PC terlebih dahulu. ZIP Master terakhir **sudah memuat** proyek Shutdown Otomatis Scene 01–02: gunakan PATCH checksum untuk pembaruan aman, bukan menimpa seluruh folder.
2. Salin **folder** `shutdown-otomatis-hook-realistis` utuh ke `MotionGraphic-Studio/projects/`.
3. Di folder Master jalankan `npm run sync` lalu `npm run dev`. Komposisi penuh dan tiga segmen muncul dari manifest.
4. Periksa `ShutdownOtomatisHookRealistis` dan segmen S01/S02. Untuk proyek lain yang masih ada di PC, jangan overwrite otomatis.
5. VO Guide di `ShutdownOtomatisHookRealistisVOGuide` mengikuti `src/config/narration.json` dari sistem Master.

## Motion / Timeline
- `S01Ketiduran` frame 0–239: VO “Pernah ketiduran pas lagi nonton, tapi laptop masih nyala semalaman?”
- `S02Download` frame 240–404: VO “Atau malah sebaliknya, udah ngantuk, tapi download belum selesai?”
- Penghubung 7,87–8,70 s: komposisi setting sama, kamera bergeser sedikit dan video player pada laptop berganti panel DOWNLOAD tanpa loncatan layar baru.

## Audio
Audio pada preview V3 yang tersedia ternyata **hampir hening** (maksimum sekitar −91 dBFS), sehingga tidak ada VO referensi yang layak untuk disematkan. Paket ini **tidak memuat audio VO**. Panduan naskah ada di `src/config/narration.json` dan komposisi VO Guide akan dibuat Master. SFX sengaja belum ditambahkan sampai rekaman dan motion selesai.

## Kejujuran editable
Tidak ada MP4 atau raster yang digunakan dalam scene render. Shape SVG, teks, UI, progress bar dan gerakan frame berbasis Remotion berada di source. `Interactive` secara statis dideklarasikan per objek. Pengubahan teks literal melalui klik Studio, drag, Save/reload dan render belum diverifikasi pada GUI Windows. Status sementara **native editing candidate; source/Props editable**. Kontrol `Props` dapat digunakan melalui manifest, sedangkan timing/shape terperinci dapat disunting pada file source.

## QA
Periksa `QA-REPORT.md`. Jalankan dari Master: `npm run addon:validate -- projects/shutdown-otomatis-hook-realistis --strict --syntax`, `npm run qa:native`, `npm run qa:layers`, `npm run qa:sound`, `npm run sync`, kemudian preview/render asli pada PC.

## Revisi subtitle (21 November 2026)
- Menghapus seluruh layer panel caption navy/gelap di Scene 01 dan Scene 02.
- Mengganti subtitle menjadi dua frasa per scene yang meliputi **seluruh kalimat VO Guide**.
- Mengatur style subtitle melalui Props: `subtitleColor`, `subtitleFontSize`, `subtitleBaselineY`, `subtitleShiftX`, `subtitleShiftY`.
- Timecode sementara ada di `src/config/subtitle-cues.json` dan `production/SUBTITLE-VO-GUIDE.srt`; belum disinkron dengan VO final yang direkam ulang.
- Intro, akting stickman dan transisi 01→02 tidak diubah.


## Pembaruan Scene 03 — 21 November 2026

Menambah Scene 03 saja ke source Remotion. Total 615 frame (20,5 detik @30 FPS).
ID dan slug tetap. Source Scene 01/02 dan komponen animasi yang sudah ACC dipertahankan; frasa subtitle Scene 01 disesuaikan dengan VO terkunci. Scene 03 diambil dari source preview gabungan yang disetujui, bukan footage video.
Pilih komposisi `ShutdownOtomatisHookRealistis` untuk gabungan, segmen `S03Solusi` untuk Scene03.
Gunakan patch checksum jika folder lama sudah ada; jangan timpa folder secara membabi buta.
Audio belum direkam, subtitle adalah timing panduan. Native GUI Save/reload belum terverifikasi.


## Pembaruan Scene 05 — Swiss Motion 02 (visual ACC)
Video kini berisi 5 scene, 38 detik (1.140 frame) pada 30 FPS. `S05PenjelasanTimer` adalah segmen editable Scene 05; lihat `PANDUAN-EDIT-ASSET.md`. Angka 3600 → 60 → 1, kartu countdown, laptop dan subtitle adalah native layer React/SVG terpisah. Scene 01–04 tidak dibongkar. Rekaman VO belum ada.


Lihat [revisi Scene 01–02 terbaru](REVISI-ACC-01-02-20261122.md) untuk status ACC dan editable 9 scene.
