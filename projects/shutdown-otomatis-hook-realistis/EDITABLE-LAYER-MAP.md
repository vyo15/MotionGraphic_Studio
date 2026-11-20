# Daftar layer editable V35

| Segmen | Nama grup di Studio | Pengaturan |
|---|---|---|
| S01 | Latar statis, Headline, Kursi, Badan stickman, Meja dan permukaan, Laptop dari belakang, Lengan dan tangan, Kepala dan ekspresi, Status film animasi, Kesimpulan | `sceneEditor.scene01.layers`; `textOverrides`; V29 SVG vector rig |
| S02 | Background, Headline, UI download utama, Kursi, Badan stickman, Meja, Laptop properti, Lengan dan tangan, Kepala dan mata, Kesimpulan | `sceneEditor.scene02.layers`; `downloadPercent`; `downloadFileLabel` |
| S03 | Background, Header, Footer, Judul waktu, Kartu menonton, Kartu download, Jam dasar dan angka, Jarum jam bergerak, Keterangan waktu, Panel timer, Status jadwal | `sceneEditor.scene03.layers`; `textOverrides`; `DEFAULT_BEATS.scene03` |
| S04 | Background, Header, Footer, Judul tutorial, Keyboard shortcut Win+R, Run Jendela dan header, Run Input perintah, Run Tombol OK/Cancel, Highlight angka detik, Kursor klik OK, Panel hasil ilustratif | `sceneEditor.scene04.layers`; `command`; `textOverrides`; `DEFAULT_BEATS.scene04` |
| Full + segment | VO · Subtitle (9 cue) | `textOverrides.caption*`, `designOverrides.subtitle*`, `src/config/voice.ts` |

Semua nama tetap; elemen tidak digabung menjadi video. Scene01/02 adalah grup vektor asli yang dapat dipilih dan di-transform; subbagian mata/mulut berasal dari algoritma per-frame di generator dan masih perlu edit source untuk perubahan rig mendalam. Tidak diklaim sebagai drag/drop per anggota tubuh.
