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
7. Pastikan safe-zone Design System v2.1 (280/350/120/160 px untuk project baru), tidak overlapping, UI/kursor tepat, teks terbaca pada ukuran telepon.

## Kategori hasil QA
- `PASS`: diuji benar pada PC di versi Remotion yang dipakai.
- `WARN`: editable via kode/Props, tetapi interaksi tertentu belum diuji atau belum didukung.
- `FAIL`: mengklaim editable tetapi elemen penting di-bake, tidak memiliki prop, atau Save/reload hilang.

Tidak semua component JSX otomatis draggable. Jangan memaksa refaktor video yang sudah ACC hanya agar memenuhi standar baru; kontrak ini terutama untuk add-on yang akan dibuat berikutnya.

## Guardrails Studio v4 dan pembedaan klaim

- `studio-direct-v4` harus mengikuti **teks literal langsung** pada JSX Interactive untuk editing teks via Studio, dan style objek inline. Teks dari `result.elements[...]`, `DOMParser`, SVG frame bake, atau ekspresi dinamis **hanya editable via source/Props** sampai terbukti lain.
- Gate gabungan `check-direct-studio-text.mjs` mengecek inline style v2/v3/v4 serta teks langsung v3/v4. `qa-native-editable.mjs` mengecek blueprint dan call-site; `npm run editcheck` adalah diagnostik legacy/manifest terpisah. Output PASS statis tidak menggantikan uji edit → Save → reload → render.
- Lihat [Studio Editing & Recovery](STUDIO-EDITABILITY-AND-RECOVERY.md) untuk pesan `Deleted <Interactive.G>`, snapshot source dan folder video tidak terdaftar.


## Aturan wajib subtitle/caption native untuk add-on baru

- Bila user diminta mengklik teks subtitle pada canvas, buat **satu node langsung**
  `<Interactive.Text>` (SVG) atau `<Interactive.Div>` (HTML) per baris/cue yang harus
  dapat dipilih. `name` harus unik dan menunjukkan scene + urutan cue.
- Jangan memakai loop `.map()` yang memanggil satu komponen `Caption` berisi
  satu callsite `Interactive.Text` untuk banyak cue: Studio bisa mengelompokkan
  semua instance menjadi `+N`, bukan pilihan per baris. Jangan bungkus teks
  di `<text>` biasa lalu mengklaim editable dengan klik.
- Gunakan **teks literal JSX** untuk native Save-to-code, beserta style langsung
  dan posisi deterministik; versi dari Props/JSON harus dinyatakan sebagai
  **Props-editable**, bukan otomatis native text-editable.
- Cue subtitle final dihasilkan **setelah VO direkam**; caption draft untuk
  review motion boleh berbeda dari subtitle final dan harus diberi label jelas.
- QA wajib klik teks pada frame aktif → ubah teks → Save → reload → cek render.
  Jangan mengklaim lulus sebelum uji aktual di Studio Windows.

## Native Editable First — kontrak preventif untuk semua add-on baru

- Source baru dengan `editableContract: "studio-direct-v4"` wajib menyertakan `production/editable-blueprint.json`. Metadata ini mendeklarasikan tiap objek yang **dijanjikan** editable via Studio: `nativeTextTargets`, `nativeVisualTargets`, dan `propsTextTargets` (kontrol berbeda).
- Setiap target native harus mempunyai **satu callsite JSX** `Interactive.Text`, `Interactive.Div` dll dengan `name` **literal unik**, `style={{...}}` langsung tanpa spread, dan child teks berupa JSX literal (bukan `{value}` dari data `.map()`).
- Jangan menyebut semua objek editable bila label hanya melalui `SVG <text>` biasa, `frameSvg`, `DOMParser`, atau pembungkus `Interactive` dengan instance berulang. Gunakan blueprint dan beri status `Props-editable` untuk desain data-driven.
- Text Hierarchy & Subtitle Lock v2.0: subtitle draft wajib aktif secara default pada preview bernarasi (`showSubtitles: true`); satu track pada satu waktu, terpisah dari supporting text dan VO Guide. Subtitle draft saat motion review berbeda dari **subtitle final** setelah rekaman VO. VO Guide sementara satu baris tanpa blok, OFF final; jika subtitle akhir diminta dan perlu edit langsung di Studio, deklarasikan satu node per cue; source teks final ada pada JSX, data timing di config. Perbarui keduanya saat sinkronisasi VO; jangan munculkan dua track sekaligus.
- Jalankan `npm run addon:validate -- <folder> --strict` dan `npm run qa:native`; QA ini hanya AST statis, bukan pembuktian native Save/reload. Untuk ACC wajib test manual: pilih subtitle, ubah teks, drag, ubah keyframe yang tersedia, Save, reload Studio, sync, render frame/MP4.
- Scene lama yang `studio-inline-v2` **tidak otomatis dinaikkan statusnya** ke v4, karena masih ada animasi/teks bake; jangan mengubah scene/visual terkunci untuk mengejar skor semu.
- Remotion 4.0.538: `Interactive` sejak 4.0.475, `Interactive.childrenSchema` sejak 4.0.535. Ikuti dokumentasi `studio/interactivity-best-practices` dan `interactive` sesuai versi.

## Kamera dan continuity v3.0

World/UI/cursor dan screen-space subtitle/background dipisah. Pada carry gunakan pose global/offset scene yang sama pada full dan segment; sumber state awal tidak di-reset. Kamera yang computed bukan otomatis native-draggable; deklarasikan source/Props/native secara jujur, jaga one-callsite `Interactive` untuk tiap target. Uji edit target, camera framing, Save/reload dan render pada frame yang sama. Lihat `docs/PORTRAIT-CAMERA-STANDARD.md`. Motion plan hanya metadata, tidak menggantikan blueprint maupun source.
