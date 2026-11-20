# Naskah VO Easy2Boot — Panduan Rekaman (Draft)

**Satu-satunya sumber naskah dan estimasi waktunya:** `src/config/narration.json`.

- Durasi video visual: **2641 frame / 30 fps = 88,03 detik**.
- Timing di JSON adalah **draft dari visual**, bukan klaim telah sinkron dengan voice-over asli.
- Untuk melihat teks VO mengikuti gerakan, buka komposisi `Easy2BootMultibootReelsVOGuide` di Remotion Studio.
- Kamu juga bisa merender komposisi panduan ke MP4. Komposisi `Easy2BootMultibootReels` tetap bersih dan tidak mendapatkan overlay panduan.
- Teks dibagi menjadi beat pendek agar cukup dibaca di layar ponsel saat latihan rekaman.
- Setelah VO direkam, letakkan audio di `public/audio/`, sesuaikan batas beat di JSON, dan perbarui subtitle final secara independen.
- `src/config/subtitles.ts` masih **caption draft**, tidak boleh dianggap hasil sinkronisasi audio final.

**Workflow tetap:** motion + revisi → VO Guide → rekam → sinkronkan → QA → final.

## Catatan revisi Scene 03 dan Scene 04

Teks VO bawah Scene 03 dan Scene 04 sekarang ditampilkan otomatis sebagai layer teks mandiri (`SceneTextVO`) saat `scene03ShowTextVO` / `scene04ShowTextVO` bernilai true dan global `showSubtitles` bernilai false. Teks dan timing masih **draft tanpa rekaman VO**. Tidak ada label atau kotak subtitle. Jika menggunakan track VO final, sinkronkan subtitle berdasarkan audio asli.
