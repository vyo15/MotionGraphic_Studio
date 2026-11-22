# QA & Handoff — Shutdown Otomatis Native Editable v56

**Sumber:** Master unggahan pengguna `MotionGraphic-Studio-FULL-v1.8.1-20261122-170154.zip`. Semua scene yang telah ACC dan library personal dipertahankan, perubahan dibatasi ke proyek Shutdown dan registrasi komposisi.

## Scene dan frame
- S01 Ketiduran: 0–239, 8,0 s (lama dipertahankan)
- S02 Download: 240–404, 5,5 s (lama dipertahankan)
- S03 Pertanyaan: 405–539, 4,5 s (lama dipertahankan)
- S04 Solusi: 540–779, 8,0 s (lama dipertahankan)
- S05 Windows + R: 780–1079, 10,0 s (v54 natural typing / native)
- S06 Match Move: 1080–1169, 3,0 s (native 3600)
- S07 Cara Kerjanya: 1170–1544, 12,5 s (/s → /t → 3600 → timer)
- S08 Kalau Nggak Jadi?: 1545–1694, 5,0 s (separator v54)
- S09 Batalkan Shutdown: 1695–1994, 10,0 s (v55 retimed via `mapCancellationFrame`)
- S10 CTA: 1995–2234, 8,0 s (source lama)
- S11 Cover: 2235–2384, 5,0 s (source lama)

**Total:** 2385 frames / 79,5 s pada 30 FPS. Rekaman VO final belum tersedia.

## Editabilitas
- Dibuat dengan komponen React/SVG: bukan embed preview MP4.
- Jendela Run, tombol, ikon, pesan hasil, command, subtitle, elemen 3600 dan timer memiliki nama layer `Interactive`.
- Teks dinamis typewriter dan angka timer diedit lewat `Props` komposisi, bukan teks literal pada frame tunggal.
- `scene04RunCommand` mengubah command S05; `scene09CancelCommand` mengubah command S09.
- `scene09CancelPlaybackSpeed` (default 1.0) mempercepat/memperlambat bagian pembatalan; nilai 1.0 tepat mengikuti v55 ACC.
- `scene09CancelWindowShiftX/Y` menggeser jendela Run S09; warna/ukuran/posisi global dan judul pemisah dapat diedit lewat Props.
- Subtitle tetap merupakan `Interactive.Text` literal untuk edit langsung, dan VO Guide disimpan di `src/config/narration.json`.
- Group SVG semantik tidak berarti tiap garis/shape primitif adalah target drag independen. Keyframe animasi tingkat lanjut tetap dikendalikan oleh kode dan belum seluruhnya merupakan kontrol timeline no-code.

## Validasi
- 27 frame sampel output SVG native v56 dibandingkan dengan frame dari preview v55 yang ACC: **MAE 0,000000; 0 piksel berbeda** pada default props; frame mencakup S05, handoff, penjelasan, pemisah, pembatalan.
- Validator source syntax: **0 error**. Kontrak native editable: **0 FAIL** (209 target native; 1 WARN legacy pada proyek Easy2Boot yang tidak disentuh). Direct Studio text contract: **0 pelanggaran**.
- Master sync: 2 video, 11 scene Shutdown + 6 scene Easy2Boot, 21 komposisi total. Semua Easy2Boot project source identik dengan ZIP unggahan.
- QA sound-cues: **15 cue valid**; 4 cue pembatalan diretime khusus S09, file WAV identik.
- Belum menjalankan render resmi Remotion CLI, drag/double-click, Save/reload dan playback audio/VO di GUI Windows karena dependensi Remotion lengkap dan GUI Windows tidak tersedia di sesi ini. Klaim editable adalah pada tingkat source dan target editor; **bukan** hasil uji GUI end-to-end.

## Instalasi
Ekstrak ZIP master, buka terminal di `MotionGraphic-Studio`, jalankan `npm install` (bila perlu), `npm run sync`, lalu `npm run dev`. Pilih video `ShutdownOtomatisHookRealistis`, atau segmen **S05RunKlikOK**, **S06MatchMove**, **S07CaraKerjanya**, **S08KalauNggakJadi**, **S09BatalkanShutdown**.

Jika memakai PATCH change-only, **terapkan hanya ke ZIP master yang namanya sama dengan sumber di atas**, bukan master v53; patch tidak memuat file yang tidak berubah. Cadangkan master lokal sebelum replace.
