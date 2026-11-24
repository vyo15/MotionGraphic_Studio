# QA REPORT — Scene 02 Windows11 Familiar v4 + VO Guide CapCut

**Basis audit:** ZIP Master `MotionGraphic-Studio-FULL-v1.8.1-20261124-064804.zip`, add-on `sample-startup-windows-director`. Pengerjaan pada salinan terisolasi.

## Scope

- Scene 01 (ACC): source, hook, layout dan naskah tidak diubah. Hanya VO guide global yang bertambah secara opsional.
- Scene 02: source React/Remotion mengikuti preview browser Windows11 Familiar v4: desktop Bloom-style SVG, Explorer bertab, menu klik kanan, `Show more options → Send to → Desktop (create shortcut)`, taskbar, Chrome, ERP, shortcut Excel, pointer dan cue klik ringan. Semua visual utama dipecah menjadi named Interactive layers.
- Scene 03–06: source visual tidak diubah; VO guide tambahan dapat ditampilkan selama review.
- Manifest FPS/durasi 30fps/2445 frame tetap. S02 tetap 480 frame (16 detik).
- Subtitle: 25 cue VO Full, 7 cue S02; pecahan teks dicek **identik** dengan `src/config/narration.json`. SRT lengkap dan SRT S02 terpisah.

## Konsistensi

- **Lolos konsep:** palet off-white/coral/black, judul center, file `Laporan Kerja.xlsx`, Chrome, ERP, UI no loading bar/badge, durasi scene sama.
- **Belum identik:** wallpaper di Scene 01 ACC adalah simulasi blue desktop yang berbeda dari Bloom-style v4 Scene 02. Tampilan Explorer pengantar S01 juga lebih sederhana daripada UI S02. Demi menjaga ACC, S01 tidak disentuh; Scene 02 diberi bridge 0.65s. Membuat desktop/UI pixel-identik lintas scene butuh keputusan revisi S01 terpisah.
- SRT adalah panduan kasar, timing final bergantung rekaman VO.
- Bloom-style adalah SVG rekonstruksi, bukan file wallpaper resmi identik; File Explorer juga HTML/CSS simulasi, bukan screen recording asli.

## Pemeriksaan

- `node tools/validate-addon.mjs projects/sample-startup-windows-director --strict --syntax`: **0 FAIL / 0 WARN**.
- `node tools/qa-native-editable.mjs ... --strict`: **83 target / 0 FAIL / 0 WARN**.
- `node tools/check-layer-instances.mjs ...`: **0 FAIL / 0 WARN**.
- `node tools/qa-sound-cues.mjs ... --strict`: **PASS, 6 cue**.
- `node tools/check-source-syntax.mjs ...`: **0 error sintaks**.
- `npm run sync` pada salinan Master: **3 video terdaftar, 0 masalah sumber**.
- `capcutOverrides(defaultProps)` diverifikasi: `showSubtitles=true` berubah menjadi `false` pada profil CapCut HQ; `VoGuide` membutuhkan keduanya (`showVoGuide && showSubtitles`).
- Preview panduan VO berupa **browser preview v4 + hardsub video review**, bukan native Remotion render.

**BELUM DIUJI:** render MP4 native Remotion 4, kesamaan piksel terhadap browser v4, interaksi GUI drag/Save/reload di Windows, kualitas audio final bersama VO, dan impor SRT ke CapCut pengguna. Tidak ada klaim 100% GUI editable atau final video.
