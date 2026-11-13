# PANDUAN EDIT ASSET — Scene 01

## Peta komponen

| Apa yang ingin diubah | Letak | Cara edit |
|---|---|---|
| Kalimat hook/subtitle | `src/components/SceneCaptions.tsx` | Klik langsung layer Interactive pada frame subtitle tampak jika didukung di Studio; alternatif edit literal text di TSX |
| Durasi masing-masing subtitle | `src/config/scene01.ts` → `captions` | Ubah from/to (detik). Jangan ubah urutan tanpa memeriksa VO |
| Posisi seluruh subtitle | `Props.sceneEditor.subtitle` | x, y, scale, rotation, opacity; save props dari Studio |
| Jendela File Explorer | `src/components/ExplorerWindow.tsx` | Interactive.Div: latar, title bar, sidebar, address bar, bar C/D, indikator fokus |
| Posisi/ukuran seluruh Explorer | `Props.sceneEditor.explorer` | x/y/scale/rotation/opacity; transform posisi editor tidak tertimpa animasi |
| Nilai C/D, bar merah/biru | `src/components/ExplorerWindow.tsx` | Edit tulisan dan lebar fill bar pada dua `Interactive.Div` |
| Kartu dan warna diagram disk | `src/components/DiskDiagram.tsx` | Setiap partisi/label berupa layer Interactive tersendiri |
| Posisi keseluruhan diagram | `Props.sceneEditor.disk` | x/y/scale/rotation/opacity |
| Jalur dan waktu kursor | `src/config/scene01.ts` → `cursor` | Keyframes berupa `t` (detik), `x`,`y` pixel |
| Bentuk mouse | `src/components/WindowsCursor.tsx` | SVG bisa diubah; posisinya lewat keyframe + Props |
| Header `WINDOWS / STORAGE` | `src/components/SceneHeader.tsx` | Interactive.Div; posisi grup via `Props.sceneEditor.header` |
| Background/grid | `src/components/Background.tsx` | `showGrid` di Props; detail grid di TSX |
| Timing peralihan Explorer → Disk | `src/config/scene01.ts` → `moments` | Periksa `Scene01Hook.tsx` jika mengubah jadwal animasi |
| Animasi easing | `src/animations/presets.ts` | easeOut/smooth/hold/xyAt |
| Voice-over | `public/audio/voiceover-scene01.wav` | **Ganti placeholder silent** dengan WAV sendiri, sync, aktifkan `voiceEnabled=true` |

## Transform tidak saling mengganggu

`MotionLayer` memisahkan:
1. **basePosition** — posisi desain awal, dalam `src/config/scene01.ts`.
2. **userTransform** — nilai yang dapat dikontrol via Props `sceneEditor.*` dan disimpan ke manifest.
3. **animationTransform** — gerakan berbasis frame yang tidak mengubah nilai posisi user.

Menggeser `sceneEditor.explorer.x` 20 px, misalnya, membuat Explorer dan isinya pindah sebagai grup tanpa mengubah jalur gerakan masuk/keluarnya. Kursor adalah layer terpisah, sehingga sesuaikan `sceneEditor.cursor` juga jika target mouse dipindahkan.

## Audio / subtitle

Durasi scene adalah 447 frame @60fps. Subtitle merupakan 4 *beat* visual sebagai placeholder timing berbasis naskah. Tidak ada rekaman VO asli yang disertakan. Setelah mengimpor VO, sesuaikan `captions.from/to`, durasi komposisi jika perlu, dan setel `voiceEnabled` agar teks tidak mendahului suara.

## Realisme dan batas edit langsung

`Interactive.Div` pada banyak node memungkinkan select/drag/update style atau text **bergantung fitur Remotion Studio yang terpasang**. SVG mouse/kumpulan komponen yang dihitung otomatis tidak otomatis dapat diubah titik-per-titik melalui drag. Untuk keyframe kursor dan perhitungan geometri, gunakan file konfigurasi, bukan tombol editor palsu. Simpan perubahan lewat mekanisme native Remotion dan cek ulang setelah refresh / `npm run sync`.
