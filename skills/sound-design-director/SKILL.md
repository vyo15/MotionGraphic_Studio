---
name: motiongraphic-sound-design-director
description: Pilih dan audit SFX bermakna untuk video Remotion menggunakan sumber audio berlisensi, cue per frame, penataan Real SFX, dan earshot opsional.
---
# MotionGraphic Sound Design Director — Remotion 4.0.538

**Aturan pemilihan cue terbaru:** baca `docs/SOUND-DIRECTION-RULES.md` terlebih dahulu. Tiap beat dan antar-scene punya keputusan SFX/`omit`, onset/impact/tail, ruang VO, pilihan continuity; transisi tidak otomatis memakai whoosh. Perhatikan CTA→Cover, suara tidak ganda, lisensi, mono HP, mix voice-first dan QA mendengar setelah MP4. `production/SOUND-PLAN.md` di starter memandu penulisan awal. Aturan tidak diterapkan otomatis ke video ACC.


**Aktif otomatis saat membuat, merevisi, atau mengaudit motion graphic yang mempunyai aksi visual/SFX, atau saat suara dianggap jelek.** Ini adalah *adapter arahan produksi* untuk ChatGPT dan agent lokal, **bukan** pemasangan resmi Openverse, Real SFX, atau earshot. Gunakan bersama `MotionGraphic Studio Director`; jangan mendirikan renderer lain.

## Routing otomatis — baca `references/PROVIDERS.md`
1. **Openverse**: pencarian rekaman audio dengan lisensi terbuka untuk gerak/fenomena nyata. Bukan AI sound generator dan bukan sebuah Skill tersendiri. Periksa halaman asal, jenis lisensi, kredit dan izin monetisasi sebelum memakai; metadata mesin pencari saja tidak cukup.
2. **Real SFX**: prinsip menempatkan *rekaman nyata* di frame aksi dan menjaga VO/musik. Skill asli untuk Claude Code; di sini dipakai sebagai metode directing, cue sheet, penataan dan mixing. Jangan mengklaim skill Claude Code dijalankan ChatGPT secara otomatis.
3. **earshot**: tool open-source opsional untuk membuat/menilai SFX berbasis kode ketika rekaman asli tidak cocok. Eksekusi hanya jika benar-benar dipasang dan diuji pada environment; tidak menambah dependensi wajib Master.
4. **Tanpa efek**: pilihan benar untuk gesture kecil, jeda narasi, transisi yang tenang, atau jika SFX akan mengganggu.

## Tahap sound (tanpa mengubah workflow motion-first)
- Sejak storyboard: identifikasi *aksi yang memerlukan bunyi* dan rencanakan jenisnya, **bukan menempelkan SFX ke semua gerakan**.
- Setelah **scene motion ACC**: kunci start, impact, end frame untuk cue penting dan pilih asal audio. Simpan rencana di `<slug>/production/sound-cues.json`; simpan aset di `<slug>/public/audio/sfx/`.
- Sebelum rekam VO: boleh preview SFX demonstrasi, tetapi naskah tetap VO Guide berupa teks.
- Setelah VO benar-benar direkam: mixing diprioritaskan pada keterdengaran suara, lakukan ducking musik/SFX di sekitar ucapan dan penyesuaian timing natural.
- Setelah render: dengar ulang pada volume HP, audit loudness/true peak serta clipping dengan `tools/qa-render.mjs`; periksa frame onset/impact dari cue terhadap tindakan di visual.

## Penempatan pada source Remotion
- Master aktual hanya berisi `remotion` 4.0.538; **jangan mengimpor `@remotion/media`, `@remotion/sfx`, atau paket lain tanpa menambah dependensi secara resmi**.
- Untuk aset yang tersedia gunakan `Html5Audio` (atau `<Audio>` yang sudah ada pada source lama) dari `remotion`, `Sequence` dengan frame bernama, dan **path literal** `staticFile('videos/<slug>/audio/sfx/<nama>.wav')` setelah sync. Contoh kode ada dalam `docs/SOUND-DESIGN-WORKFLOW.md`.
- Layer audio *editable*: clip/track memiliki nama bermakna dan file mentah; jangan flatten SFX ke satu MP4 atau menempelkan semua efek dalam satu file tanpa stem. Jika menghasilkan stem gabungan untuk final, pertahankan cue dan aset asli.
- Jangan merekam efek yang sebenarnya belum dibuat atau menyatakan sudah didengar jika belum diputar/diukur.

## Quality gate
- Cue wajib punya ID, scene, aksi, posisi start/impact/end frame, sumber audio dan status siap/direncanakan.
- Hanya status **ready** yang boleh dianggap tersedia untuk render; status planned tetap draft.
- Setiap aset eksternal harus mempunyai bukti hak guna/atribusi. **CC BY-NC tidak otomatis cocok untuk Reels monetisasi**.
- Gunakan `node tools/qa-sound-cues.mjs projects/<slug> --strict` dan audit MP4 aktual jika tersedia.
- Pemilihan otomatis tidak berarti ketiga provider harus dipakai; satu source terbaik atau bahkan tanpa SFX bisa lebih profesional.

## Pembaruan direktur sound (permanen)

Untuk setiap add-on baru: satu daftar cue per scene di `production/sound-cues.json`, one-shot pendek yang mengikuti aksi fisik/virtual; jika ada SFX lama berupa audio sepanjang scene, jangan lapisi dengan one-shot yang sama tanpa menurunkan/mematikan stem lama. Gunakan onset/impact frame, sinkronkan dengan visual, utamakan ruang untuk rekaman VO. Pada project Easy2Boot patch ini memakai one-shot sintetis asli dan tetap mempertahankan WAV legacy untuk pemulihan. Jangan menyatakan mix final lulus sebelum mendengar preview dan memeriksa MP4.
