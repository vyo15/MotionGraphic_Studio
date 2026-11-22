# Tiga alat dalam video referensi — router, bukan dependensi wajib

Referensi yang diperiksa: video pengguna `Download (2)(2).mp4` (33,63 detik, 576×1024, 30 fps); menampilkan **Openverse**, **Real SFX**, dan **earshot**. Jangan mengklaim video menyediakan file instalasi Skill, API key, atau sampel audio yang boleh disalin.

| Alat | Kegunaan | Kapan pilih | Risiko & batasan |
|---|---|---|---|
| Openverse (https://openverse.org/) | Cari rekaman nyata/open-licensed | SFX realistis: click, switch, keyboard, gesek, langkah | Openverse mengindeks karya pihak ketiga. Periksa license URL, penggunaan komersial, kredit dan landing page tiap aset. API online tidak dijamin tersedia atau tanpa batas. |
| Real SFX (https://github.com/Clipwing/skills/tree/main/skills/real-sfx) | Penempatan SFX nyata tepat di frame, menjaga VO/musik | Motion sudah ACC; sound cue dan preview sudah ada | Skill asli dirancang untuk Claude Code. Kita memakai *prinsip kerja*, tidak mengklaim skill tersebut sudah aktif/diinstal pada ChatGPT. Hak pakai audio bergantung perpustakaan sumber. |
| earshot (https://github.com/Leonxlnx/earshot) | SFX berbasis kode dan analisis audio | Tidak ada rekaman yang pas, diperlukan pop/whoosh/klik yang unik | Opsional; menggunakan Python/CLI tersendiri. Master Remotion tidak otomatis memasangnya. Lisensi kode tidak menjamin lisensi musik/sampel pihak ketiga. |

**Pilihan default:** cari efek realistis dulu bila visual menggambarkan tindakan nyata, susun sound cue tepat frame dengan pendekatan Real SFX, lalu gunakan earshot bila butuh desain bunyi abstrak. Jangan membunyikan semua transisi. Hindari whoosh/impact keras sebagai pengganti cerita visual.

## Protokol lisensi Openverse
Simpan `title`, `creator`, `sourceUrl`, `license`, `licenseUrl`, `attribution` pada cue. Lisensi CC0 bisa digunakan tanpa kredit hukum tetapi kredit tetap baik. CC BY membutuhkan atribusi. CC BY-SA membawa syarat lisensi terkait, cek kewajiban distribusi. CC BY-NC tidak otomatis aman untuk konten komersial/monetisasi; perlu izin tambahan. Track yang hanya terindeks tidak otomatis bebas hak cipta. Jika metadata tidak lengkap, status = planned.

## Protokol earshot
Bila tool memang tersedia dan pengguna mengizinkan, uji CLI di environment terpisah, buat WAV final ke `<slug>/public/audio/sfx/`, catat preset dan parameter, simpan `.wav` hasil sehingga video tidak bergantung pada earshot saat render. Jangan membuat `node_modules` baru atau mengunduh model di Master.

## Protokol kualitas
Satu *sound event* bermakna = satu cue yang dapat diaudit, kecuali layer ambience yang memang berulang. Hit at the action; untuk whoosh letakkan onset sebelum perubahan dan puncak di frame puncak gerak. Jika tidak ada VO, jangan mengklaim final audio telah di-mix terhadap suara pengguna. Evaluasi setelah rekaman dan render.
