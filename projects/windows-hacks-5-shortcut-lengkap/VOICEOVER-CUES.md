# CUE VOICE-OVER — WINDOWS HACKS EDITABLE V2

**Durasi:** 69,5 detik (2085 frame @30 fps). Narasi mempertahankan teks original yang dikunci. Tidak ada efek slow motion: gerakan tetap normal, diselingi jeda pendek setelah aksi.

| Adegan | Timecode | Alokasi VO | Aksi dan napas |
|---|---|---:|---|
| Hook | 00:00.0–00:08.0 | 8,0 dtk | Mulai langsung. Beri jeda kecil sesudah pertanyaan pertama |
| 01 · Ctrl + Shift + T | 00:08.0–00:17.5 | 9,5 dtk | Sebut masalah dahulu, lalu shortcut; tahan tab kembali 0,5 dtk |
| 02 · Ctrl + Shift + Esc | 00:17.5–00:28.5 | 11,0 dtk | Sebut aplikasi hang, Task Manager terbuka, zoom End task; tahan akhir 1 dtk |
| 03 · Win + Shift + S | 00:28.5–00:39.5 | 11,0 dtk | Zoom saat drag area, tahan hasil clipboard 1 dtk |
| 04 · Win + E | 00:39.5–00:50.5 | 11,0 dtk | Jendela lama tetap hidup, Explorer baru muncul; tahan bukti 1 dtk |
| 05 · Ctrl + Shift + N | 00:50.5–01:05.5 | 15,0 dtk | Folder baru → rename → bonus InPrivate; narasi diselingi jeda singkat |
| CTA | 01:05.5–01:09.5 | 4,0 dtk | “Simpan videonya, biar nggak lupa!” dan tahan ikon bookmark |

## Naskah persis

- **HOOK:** “Ngapain klik sana-sini, kalau ada cara lebih cepat? Kamu pengguna Windows? Wajib tahu 5 shortcut ini!”
- **01:** “Tab browser nggak sengaja ketutup? Jangan panik! Tekan Ctrl Shift T, tab-nya langsung balik!”
- **02:** “Lagi kerja, aplikasi malah nge-hang? Tekan Ctrl Shift Escape, buka Task Manager, lalu pilih aplikasi yang macet!”
- **03:** “Butuh screenshot cuma sebagian layar? Tekan Windows Shift S, lalu pilih area yang mau diambil!”
- **04:** “Mau cari file tanpa ribet buka menu? Tekan Windows E, File Explorer langsung kebuka!”
- **05:** “Bikin folder baru masih lewat klik kanan? Di File Explorer, tekan Ctrl Shift N. Bonusnya, di Chrome atau Edge, shortcut yang sama bisa buka mode privat!”
- **CTA:** “Simpan videonya, biar nggak lupa!”

## Rekam dan sinkronkan dengan mudah

Rekam **7 file WAV terpisah** sebagai berikut dan taruh pada `public/audio/`:

```
00-hook.wav
01-ctrl-shift-t.wav
02-ctrl-shift-esc.wav
03-win-shift-s.wav
04-win-e.wav
05-ctrl-shift-n.wav
06-cta.wav
```

Rekomendasi WAV 48 kHz, mono, suara tanpa musik. Panjang file sebaiknya 0,3–0,6 detik di bawah alokasi scene, agar pergantian tidak memotong kata. Jalankan `npm run sync`, aktifkan `voice.enabled=true` di Props. Tujuh WAV yang disertakan hanya placeholder hening dan **harus diganti** oleh rekamanmu. Karena SFX lama punya layer sendiri, volumenya dapat diturunkan per scene di `sceneEditor.X.sfxVolume` bila bertabrakan dengan narasi. **Biarkan `voice.enabled=false` sampai placeholder hening diganti dengan rekamanmu**.

**Kesesuaian:** Visual Win + E menggunakan dua Explorer, tetapi naskah lama tetap dipertahankan sebagaimana dikunci. Versi naskah lain hanya dibuat dengan persetujuan pengguna.
