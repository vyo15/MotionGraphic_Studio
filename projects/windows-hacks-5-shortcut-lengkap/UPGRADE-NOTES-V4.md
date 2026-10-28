# Windows Hacks — Upgrade V4 (2026-10-28)

- Memperbaiki error fatal `Interactive` dari `./Icons` dan memisahkan import `remotion` dengan benar.
- Menginisialisasi `useCopy()` yang hilang pada Explorer Window.
- Mempertahankan slug dan composition ID agar sinkron dengan Master.
- Nama Props per scene sekarang berbahasa Indonesia dan mendeskripsikan fungsi visual, menyimpan `id` teknis.
- Progress/loading bawah: track, isi animasi, dan label dapat diatur terpisah.
- Progress pada Hook, tahapan Ctrl+Shift+N, dan dashboard Snipping Tool diberi kontrol individual.
- Transisi antar scene dapat disetel dari `transitionEditor` di Props.
- Detail UI Windows dibuat dari HTML/CSS/SVG, bukan hasil flatten.
- Pemotongan waktu voice-over: setiap demo berisi lima beat + satu hold; tiap rekaman audio terpisah.

**Catatan pengujian:** tidak mengklaim setiap SVG primitive punya fitur drag-and-drop di Remotion Studio. Kontrol layer melalui Props dan file config, sementara elemen inline internal yang belum diekspos perlu perubahan source.
