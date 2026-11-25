# PATCH FILE CHANGE ONLY — Sambungan Scene 02 → Scene 03 (ACC v5)

**Untuk Master:** MotionGraphic-Studio-FULL-v1.8.1-20261125-062014.zip
**Prasyarat:** Patch `Scene02-NaturalCursor-ShortcutHighlight-v7-FILE-CHANGE-ONLY-20261125.zip` sudah terpasang di folder proyek. Jangan pasang patch ini di atas Scene 02 versi lama karena akan mengganti source Scene 02 dengan versi v7 yang ACC.

## Isi perubahan (3 source saja)
- `src/scenes/Scene02.tsx`: fade-out judul `Shortcut sudah siap.` dan teks hasil berakhir sebelum durasi scene 16 detik (sekitar detik 15,9). TIDAK mengubah kursor/menu/shortcut/SFX.
- `src/scenes/Scene03.tsx`: judul `Buka folder Startup` masuk dan keluar sendiri, lalu `Tekan Windows + R` masuk setelahnya; keyboard cue dipindah selaras; menjaga naskah, dialog Run, Explorer, subtitle.
- `src/components/Scene03Windows11.tsx`: posisi desktop Y=654 disamakan dengan Scene 02 (sebelumnya Y=656).

**Tidak berubah:** `src/Video.tsx`, manifest, file inti Master, Scene 01/04/05/06, subtitle SRT, semua aset. Durasi Scene 02=480 frame/16 s dan Scene 03=300 frame/10 s @ 30 FPS tetap.

## Instalasi
1. Tutup Studio. Backup `projects/sample-startup-windows-director/`, terutama jika pernah diedit lokal.
2. Ekstrak ZIP ini ke root `MotionGraphic_Studio/` (folder berisi `package.json`), **Merge/Replace hanya tiga file ini**.
3. Jalankan `npm run dev`. Cek transisi gabungan di detik video lengkap 44,2–46,0 (Scene 02 berakhir pada detik 44,5).
4. Jika ada perubahan lokal, bandingkan diff dahulu; jangan overwrite manual.

## QA lingkungan ini
- `node tools/validate-addon.mjs projects/sample-startup-windows-director`: 0 FAIL / 0 WARN.
- Kontrak native editable: 144 target Scene Project, 0 FAIL, 0 WARN.
- `npm run sync`: 4 proyek, 43 komposisi, 0 masalah sumber.
- GUI Windows / Save-reload / render native Remotion: belum diuji.

**Catatan:** Perubahan Scene 03 di luar pembukaan (misalnya overlap teks `Ketik perintah ini` → `Lalu tekan Enter` dan transisi Run → Explorer pada detik 6–8) BELUM diubah; itu untuk review terpisah berikutnya.
