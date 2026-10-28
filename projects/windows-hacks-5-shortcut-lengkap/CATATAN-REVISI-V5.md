# REVISI V5 — BERDASARKAN TEMUAN PENGGUNA

## Masalah yang diperbaiki

1. Efek lingkaran klik di Ctrl+Shift+T sebelumnya di `left:455, top:620` sementara kursor mengikuti `(cx,cy)`. Sekarang efek berada di dalam kursor sebagai anak JSX, dan keduanya bisa dipindah sebagai satu unit.
2. Kursor dalam zoom Task Manager mendapat `layerStyle('cursor-zoom')` dan layer yang jelas di manifest.
3. Disediakan lintasan kursor pengganti dengan koordinat global agar pengguna dapat mengubah posisi klik tanpa edit source TSX.
4. Editor visual pendamping menyimpan data proyek secara persisten. Tidak mengubah `src/Root.tsx`, `src/index.ts`, `package.json`, atau `library/catalog.json` Master.
5. Seluruh scene lama, voice-over, serta file proyek lain dipertahankan. Durasi tetap 2205 frame (73,5 s) supaya narasi/timing tidak berubah tanpa persetujuan.

## Yang tidak diklaim

- Editor V5 **bukan** CapCut penuh.
- 195 layer lama **bukan** 195 draggable layer; sebagian masih berupa gaya CSS dan komponen gabungan.
- Belum diuji screenshot dari renderer Windows dan belum dirender ulang MP4.
