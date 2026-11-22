# Patch Scene Layers & Sound — 21 November 2026

Scope disetujui: perbaikan editing per objek dan penataan SFX. **Tidak mengubah naskah/teks utama, koordinat, rasio, durasi, atau source data frame animasi ACC.**

### Layer
- `Scene01Problem.tsx`, `Scene02Solution.tsx`, `Scene02To03MatchMove.tsx`: pindahkan `Interactive.G` dari pembungkus bersama ke JSX call-site individual. Renderer presentasional menyimpan transform/opacity serta nilai Props seperti semula.
- `Scene04CopyIso.tsx`, `Scene05Boot.tsx`: layer statis diberi Interactive terpisah; repeated UI atau fallback Props masih memiliki batasan.
- `NativeSceneLayers.tsx`, `src/config/frames/*.ts`, data frame Scene 03/06 serta approval lock tidak diedit.

### Sound
- 32 cue pendek original/sintetis, onset sesuai aksi penting. Status `review`: perlu review pendengaran real dalam Studio dan mixing dengan VO.
- Scene 03 mempunyai *time remap*, sehingga track menyesuaikan perubahan durasi pengantar/hold dari Props.
- Tidak membuang WAV SFX lama; tersedia untuk rollback.
- `showSfx=false` menonaktifkan seluruh track cue baru. Untuk memeriksa sound asli lama, pulihkan `Video.tsx`/`SegmentVideo.tsx` dari backup bila diperlukan, jangan menyalakan kedua versi bersamaan.

### Validasi dan batas
- Diuji: syntax TSX, unit test sistem, `qa:sound --strict`, manifest/aset, dan instalasi patch pada ekstraksi ZIP.
- Belum diuji: Remotion GUI Windows, Save/reload, render MP4 dan pendengaran mix/VO final. Selalu bandingkan frame visual scene ACC dengan hasil render baru.
