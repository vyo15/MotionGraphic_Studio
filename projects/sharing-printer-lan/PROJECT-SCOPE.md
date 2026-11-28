# Scope

- Master 2.0.0; sharing-printer-lan / SharingPrinterLan.
- 1080×1920 / 30fps / 3383 frame, 10 segmen (S01-Question, S01-Response, S01–08).
- S06–08 terdaftar. Rekaman/sinkronisasi dan final QA masih menunggu.
- Pertahankan VO dan referensi preview ACC. Windows 10, trusted private network. IP contoh; tidak perlu mengganti IP bila sudah satu LAN.
- Semua bentuk asli direkonstruksi vector JSX; kesamaan dengan MP4 referensi dan UI Windows asli belum teruji native. Tidak ada perubahan engine.

- Keputusan user 2026-11-28: durasi mengikuti VO, demonstrasi, ruang baca, intonasi dan hold; tidak mempercepat scene hanya untuk mengejar durasi sebelumnya.

- Review design v2.1 atas permintaan user: Poppins editorial, Inter 36/500 guide screen-space, komposisi scale 0.8 (center X520); ID/timing/VO/ACC asli dipertahankan. Dua opening merupakan teks VO itu sendiri (tanpa guide duplikat). Legacy designContract dipertahankan karena gate compact mengharuskan guide terpisah di semua beat spoken; exception opening ACC. Font lokal dari library/fonts/official milik Master, jangan unduh ulang atau timpa aset. Layout opening V10 ACC referensi; scene lain tidak diberi ACC baru.


## V10 — ACC referensi 2026-11-28
Opening 560f: Question 198f, Response 84f, Demo 278f; full 3395f (113,17s), 10 segmen. +78f untuk seluruh segmen/cue/guide setelah question; local timing, VO dan WAV tetap. Demo source asli +112px screen, headline mengikuti objek (gap referensi ~95px), S02 mengikuti V10 selama 36f (+112→+80px), lalu settle ke posisi asli sampai 78f. Silent hold demo frame 526–559, cover thumbnail lokal 179/global 3394. Native parity/GUI/listening pending. Lima teks baru (tiga tanda tanya, dua headline) + satu coral target; tidak ada raster bake.

**Timing aktif terbaru — Continuous VO ACC:** 3383f (112,77s); question 186f (6,2s), response 84f, demo 278f; opening 548f. Full VO kontinu mulai 212f, batas demo 270f, akhir sequence 382f; cover hero terakhir 3382f (lokal 179). Catatan angka lama adalah riwayat. Hold akhir Wi-Fi dipangkas 12f, tanpa mengubah waveform, reveal/resolve, scene lain atau local cue. Native/listening final belum diuji.
