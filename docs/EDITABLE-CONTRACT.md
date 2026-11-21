# Kontrak Native Editable — Video dari ChatGPT ke Remotion Studio

**Klaim yang diperbolehkan:** `editable via Props/source` jika konfigurasi tersedia dan diuji. Sebutan **100% visually editable** hanya setelah setiap elemen yang diklaim lulus edit → Save → reload → render pada Remotion Studio yang benar-benar dipakai.

## Pisah layer
- Background, judul/teks, UI windows, tombol, ikon, kursor + hotspot, diagram, highlight, subtitle, SFX/VO sebagai komponen bernama yang memiliki prop sendiri. Jangan flatten seluruh scene, jangan menyimpan satu SVG HTML besar yang menyembunyikan teks penting.
- Properti elemen utama: teks/asset, X/Y, width/height, scale, rotation, opacity, z-index, color, font, start/end frame, delay, easing dan animasi sesuai kebutuhan (jangan menambahkan kontrol palsu).
- Pisahkan `basePosition`, `userTransform`, `animationTransform` agar memindahkan layer tidak merusak jalur gerak. Pastikan pointer klik mengikuti hotspot ketika layer bergerak.
- Gunakan `useCurrentFrame`, `useVideoConfig`, `AbsoluteFill`, `Sequence`, `interpolate`, `spring`; evaluasi deterministik berdasarkan frame. Hindari CSS animation/transition untuk gerak kritis, `Date.now()`, `Math.random()` tanpa seed, dan mutasi `setAttribute` yang menyembunyikan animasi dari Studio.
- Remotion `Interactive` hanya jika kompatibel; style inline dan props yang bisa dipersist lebih disukai. Setiap project wajib tetap dapat dirender bila editor visual tidak mendukung sebagian kontrol.

## QA wajib untuk proyek baru
1. Jalankan validator add-on ketat dan `npm run check` setelah sync.
2. Dalam Studio pilih scene key; pilih **teks**, ganti kalimat dan pastikan berubah di canvas.
3. Pilih **layer**, drag X/Y, ukuran bila didukung, dan periksa posisinya tidak melompat ketika animasi berjalan.
4. Ubah timing/keyframe/easing yang diklaim editable; pastikan perubahan juga tampak saat preview.
5. Simpan; tutup/reload Studio dan pastikan perubahan tetap ada di project source/Props.
6. Render frame awal, tengah, dan akhir; periksa kesamaan posisi dan teks dengan preview.
7. Pastikan safe-zone 250/350/50 px, tidak overlapping, UI/kursor tepat, teks terbaca pada ukuran telepon.

## Kategori hasil QA
- `PASS`: diuji benar pada PC di versi Remotion yang dipakai.
- `WARN`: editable via kode/Props, tetapi interaksi tertentu belum diuji atau belum didukung.
- `FAIL`: mengklaim editable tetapi elemen penting di-bake, tidak memiliki prop, atau Save/reload hilang.

Tidak semua component JSX otomatis draggable. Jangan memaksa refaktor video yang sudah ACC hanya agar memenuhi standar baru; kontrak ini terutama untuk add-on yang akan dibuat berikutnya.

## Guardrails Studio v4 dan pembedaan klaim

- `studio-direct-v4` harus mengikuti **teks literal langsung** pada JSX Interactive untuk editing teks via Studio, dan style objek inline. Teks dari `result.elements[...]`, `DOMParser`, SVG frame bake, atau ekspresi dinamis **hanya editable via source/Props** sampai terbukti lain.
- Gate `check-direct-studio-text.mjs` dan `audit-inline-editing.mjs` kini mengecek `studio-direct-v4` selain kontrak terdahulu. Output PASS statis tidak menggantikan uji edit → Save → reload → render.
- Lihat [Studio Editing & Recovery](STUDIO-EDITABILITY-AND-RECOVERY.md) untuk pesan `Deleted <Interactive.G>`, snapshot source dan folder video tidak terdaftar.
