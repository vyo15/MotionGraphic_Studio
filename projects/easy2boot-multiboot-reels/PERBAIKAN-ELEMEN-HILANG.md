# Mengapa source dulu kehilangan elemen?

Versi lama bergantung pada React `useLayoutEffect` untuk menjalankan mutasi SVG sesudah komponen dirender. Sebagian grup SVG disimpan dengan opacity 0 di sumber sehingga saat efek belum berjalan, elemen tidak terlihat.

Sekarang gerak diprekomputasi menjadi data transform, opacity, fill, width, dan textContent per frame dalam `src/config/frames/sceneXX.ts`. `src/components/FrameSvgRenderer.ts` langsung menghasilkan SVG untuk frame yang diminta, independen dari urutan seek dan tidak memerlukan efek DOM.

**Pengujian dilakukan**: 6 cuplikan cross-scene dibandingkan dengan video preview, 36 sampel SVG berhasil diparse; sintaks TS/TSX diverifikasi. Belum ada Master Remotion pengguna untuk menjalankan `npm run check` atau render Remotion secara langsung.

**Catatan CapCut**: Paket terpisah untuk video dasar tanpa headline, SRT typography editable dan WAV SFX. Tidak semua objek dan animasi Remotion menjadi layer native CapCut. Lihat README pada paket CapCut.
