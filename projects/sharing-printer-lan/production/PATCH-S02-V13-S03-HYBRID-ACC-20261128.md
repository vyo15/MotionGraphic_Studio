# FILE CHANGE ONLY — S02 V13 / S03 Hybrid ACC

Baseline: `MotionGraphic-Studio-FULL-v2.0.0-20261128-063214.zip` + `Sharing-Printer-V10-ACC-Master-Rules-FILE-CHANGE-ONLY.zip` sudah diterapkan. Master v2.0.0.

- SHA-256 ZIP baseline: `ecd06289e18cd5e6894768d19d70b727e6f6d4ef9e79c9dfd72c7e2ce1e50e51`
- SHA-256 patch V10: `5e7879e79a970dc8468acaf743f9d5c24dd2c15f7b12bda4efb544578d0d4f78`
- Cek hash file sebelum Replace; jika berbeda karena edit Studio lokal, jangan timpa, merge manual. Backup folder `projects/sharing-printer-lan` dan tutup Studio. Ekstrak ZIP di luar Master, copy folder `projects` ke root. Jalankan `npm run sync`, lalu `npm run dev`. Tidak ada penghapusan.

## Scope ACC
- S02: PRINTER SHARING 64px → JARINGAN YANG SAMA 56px, Poppins Bold, soft reveal/hold per konteks. S02 asli, topology, guide dan handoff V10 utuh.
- S03: KOMPUTER UTAMA, WIN + R; enam outline coral pada target UI, di world yang sama dengan kamera. Offset grup world + cursor: host hingga +96px output, Run +80px, Control Panel +128px, akhir local 696–719f settle ke posisi lama. Timing reveal/layout disusun dari pengukuran frame referensi MP4 dan koordinat source; native pixel parity pending.
- Durasi tetap 3395f (113.1667s), 10 segmen. S02 560–890f, S03 890–1610f, S04 mulai 1610f. Seluruh 34 beat narasi, guide, SFX 46 cue, manifest, keyframe asli, source scene lain, asset dan rule Master tidak diubah.
- ACC visual referensi baru dicatat di PRODUCTION-STATE; VO teks (termasuk S02 kalimat jaringan ACC sebagian dan bridge draft) tidak diubah. Board generated tidak dibawa; hasil `npm run sync` telah diperiksa pada salinan.

## QA aktual

## S02 V13 / S03 Hybrid ACC — 2026-11-28
- Baseline: ZIP Master 063214 + patch V10 ACC; native source dari dua MP4 referensi ACC, bukan file video raster.
- `addon:validate --production --syntax`: 0 FAIL / 0 WARN. `qa:native`: 723 target, 0 FAIL / WARN. `qa:layers`: 0 FAIL / WARN. `qa:motion`: PASS (metadata). `qa:spatial`: PASS 3395 frame (declared geometry). `qa:sound`: PASS 46 cue. `sync`: 6 video / 63 komposisi / 51 segmen / 71 referensi aset / 0 masalah sumber.
- 10 layer baru (4 teks + 6 outline). Manifest, VO, guide, SFX, source UI dan Topology, kamera/cursor timing, opening V10 dan S04–S08 identik terhadap baseline. S03 menggeser parent world/cursor bersama dan settle di akhir.
- Native render, pixel parity, edit/Save/reload, actual spatial trace, listening dan rekaman VO belum diuji. Remotion/React runtime tidak terpasang pada sandbox. Spatial plan legacy menggunakan envelope/sampel fokus, termasuk whitespace dan viewport shift; tidak membuktikan overlap aktual.

## Daftar file dan checksum
Path relatif folder `projects/sharing-printer-lan/`. Semua file yang berubah dibawa utuh. Dokumen patch ini adalah file baru (tanpa base hash).

| Path | Base SHA-256 | New SHA-256 |
|---|---|---|
| `EDITABLE-LAYER-MAP.md` | `32682a16d8cad6fddb4637b799acd8e0dc767fb8ce46818be4e9b15ddf79a4ac` | `be731b3ee4cc4ca5e81dc818c2836bcf37884fc2a7f6d42a0215f1e7f81a687d` |
| `PANDUAN-EDIT-ASSET.md` | `57306edd3a9a678273fe21ea41af21de1177904b3d75c3fd96b817afca369377` | `048875c1b809c2053aff9ef9a93d75e1b519b4a4815d6f6e9c32653547fad8e3` |
| `PRODUCTION-STATE.json` | `9d0303b8af1b2d35eadef53660fffea63b546973ada93d6aa802b4a63ccaa442` | `7a3d1d43c13db98a96d723d86816de81f57737757503835246e900dc1d1f0412` |
| `QA-REPORT.md` | `1f52ef7d224a7829e525bcf4fa973e2a054f0d8b7fc0a53e96a18cbc2b4a08c8` | `310662809837008de95b9e1f5299340d616e282691620627dc6ffd6c50896e86` |
| `STORYBOARD.md` | `6e408dc0580dc3653c5fc518dca869b021a3b267104fc50477da09eb7b19cd1d` | `dedd59670476b424d7785da2ae380859307311ff6683a82cdcbd97e62aab4abc` |
| `production/MOTION-PLAN.md` | `a0d51e091b2cb7112438602e3ed1f0e3740301b792b91da6ed2e4eee584d95da` | `b596c7e375a2d8cd6ed72e418fc0e3c3c00646edee926b73af6eacc52640c4b3` |
| `production/editable-blueprint.json` | `833fcfa22d615ea47caf0583420140a18e41e246e6c03fc59bd5f3985fa75900` | `7fe8f1da0d963c77b990e580b700fb9da2c0069e0bb38b8e7f437a0c930d6d56` |
| `production/motion-plan.json` | `9b90db3acbfaec49163543a9ae45381d4850937c31aaf161296b31c6ef73f0e4` | `f4cea3fe7fb530fe2c4aab045e0bec6a81fb12a38bc74418cf75664e1de3fe8f` |
| `production/spatial-plan.json` | `7142387f455861e95d14efb91741aeecb06bbdb7c9138767a12b798a01e693b2` | `4c67dc6a2aee0b47cf019e22ef19477c3db38641f6c850c590291a20b534ce8d` |
| `src/scenes/Scene02.tsx` | `3f05a9f836bcdae17553478442de11554d412f6754f345049a9f7128932930a4` | `3d42291ee84b3540bae0f7bfa5efd7fc0e03306180d28c53250d22783d9ce2c5` |
| `src/scenes/Scene03.tsx` | `e71f9c568affe1c45fc2ca242c6169ffde2a6464fec497652686add9ca69ad6b` | `39526c40a61c9df4a761b71be01de6537849053963251873090b0af2622c2f3f` |
