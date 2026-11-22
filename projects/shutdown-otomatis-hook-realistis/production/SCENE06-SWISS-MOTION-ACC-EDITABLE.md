# Scene 06 — Swiss Motion #02 (ACC)

- **Proyek:** `ShutdownOtomatisHookRealistis` / `shutdown-otomatis-hook-realistis`
- **Komposisi Scene 06:** `S06BatalkanShutdown`
- **Timeline lokal:** 255 frame, 30 FPS (8,5 detik). Full video: 1395 frame (46,5 detik).
- **VO terkunci:** “Kalau mau batalin, tinggal buka Run lagi, ketik perintah ini, lalu Enter.”
- **Command yang diperagakan:** `shutdown /a` (hanya dapat membatalkan penundaan sebelum shutdown terjadi).
- **Layout ACC:** jadwal aktif `00:59:42` → jendela Run dan pengetikan → hasil `DIBATALKAN`, centang hijau, “Laptop tetap menyala”.
- **Subtitle:** navy polos tanpa panel/kotak. Durasi cue masih panduan sebelum rekaman VO aktual.

## Edit di Studio

Buka komposisi `S06BatalkanShutdown`. Layer SVG bernama `S06 · ...` dapat dipilih sebagai target native `Interactive`. Posisi grup diatur melalui Props:

- `scene06MainShiftX`, `scene06MainShiftY`, `scene06MainScale`
- `scene06RunShiftX`, `scene06RunShiftY`, `scene06RunScale`
- `scene06CommandText` (default: `shutdown /a`), `scene06ResultTitle` (default: `DIBATALKAN`)
- `subtitleColor`, `subtitleFontSize`, `subtitleBaselineY`, `subtitleShiftX`, `subtitleShiftY`, `showCaptions`

Lapisan statis berupa `Interactive.G` / `Interactive.Text`; sebagian perubahan yang dikendalikan animasi frame mungkin tidak dapat disimpan sebagai drag native sampai diuji di Remotion Studio Windows. **Source-editable terverifikasi secara statis**; GUI drag/Save/reload/Render **belum diuji**.

## Instalasi FILE CHANGE ONLY

1. Cadangkan folder video lama.
2. Extract ZIP, copy folder `shutdown-otomatis-hook-realistis` ke `MotionGraphic-Studio/projects/`.
3. Pilih *Merge* dan *Replace* untuk file yang dikirim saja; **jangan menghapus folder proyek lama**.
4. `npm run dev` (atau `npm run sync`).

**Prasyarat:** Source Scene 05 versi `02 Swiss Motion` harus sudah terpasang; bila belum, pasang paket Scene 05 terlebih dahulu. Master terbaru yang dilampirkan sebelum Scene 05 hanya berisi Scene 01–04.
