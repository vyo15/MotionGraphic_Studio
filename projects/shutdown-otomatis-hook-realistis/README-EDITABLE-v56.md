# Panduan Edit Shutdown Otomatis v56 (11 Scene)

**Project aktif:** `ShutdownOtomatisHookRealistis`. Semua bagian v55 yang disetujui masuk sebagai kode React/SVG. File `.mp4` preview bukan sumber video.

## Komposisi yang diedit
1. S05RunKlikOK — `src/scenes/Scene04.tsx` (nama file lama). Ubah teks command lewat `scene04RunCommand`.
2. S06MatchMove — `src/scenes/Scene06IntroBridge.tsx`, memakai flow bersama `src/scenes/Scene05To06Flow.tsx`.
3. S07CaraKerjanya — `src/scenes/Scene07CommandExplain.tsx`, masih menggunakan flow yang sama.
4. S08KalauNggakJadi — `src/scenes/Scene08CancelQuestion.tsx`, transisi timer kontinu dan judul pemisah.
5. S09BatalkanShutdown — `src/scenes/Scene09CancelRun.tsx`; edit `scene09CancelCommand`, `scene09CancelPlaybackSpeed`, `scene09CancelWindowShiftX/Y`, dan teks hasil.
6. S10CTA / S11CoverReels — source sebelumnya tetap, belum direvisi.

## Kontrol praktis
- **Teks subtitle:** pilih elemen `Interactive.Text` yang bernama `/ Subtitle`; edit langsung bila didukung Studio, atau sunting teks literal di `src/scenes/Scene05To06Flow.tsx`.
- **Jenis dan posisi objek:** pilih grup `Interactive.G` yang sesuai. Semua bentuk utama menggunakan SVG, bukan raster.
- **Judul, command, timer, status pembatalan:** gunakan panel Props untuk nilai string yang berawalan `scene05`, `scene07`, `scene08`, `scene09`.
- **Timing pembatalan:** default `scene09CancelPlaybackSpeed=1.0` sesuai preview v55. Perubahan nilai belum teruji secara visual di GUI; lihat preview setelah mengubahnya.
- **Voice Over:** `src/config/narration.json` adalah panduan teks; belum ada rekaman VO final yang ditambahkan.

Jangan mengganti file `Scene04.tsx` menjadi `Scene05.tsx`: nama sumber legacy dipertahankan untuk menjaga import/registrasi.

## Validasi di PC
Jalankan `npm run sync`, `npm run qa:native`, `npm run check:syntax`, lalu `npm run dev`. Periksa setiap scene, drag/edit layer, Save → reload, dan render pendek sebelum produksi final.
