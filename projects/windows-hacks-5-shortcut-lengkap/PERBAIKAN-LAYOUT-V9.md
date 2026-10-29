# Windows Hacks — Layout Fix V9 (File Change Only)

## Yang diperbaiki
- `01 · Browser tabs` dipulihkan ke `position: relative` dengan `translate: 0px 0px`, mengganti posisi hasil drag `337.9px -19.6px` yang memisahkan tab dari browser.
- `01 · Browser navigation` dikembalikan ke alur CSS `relative`, sehingga alamat, bookmark, dan isi halaman tersusun kembali.
- `premountFor={60}` yang tidak diperlukan pada header tab dihapus.
- Baris layout penting pada scene Task Manager dan dua File Explorer diberi `data-layout-role="flow"` agar diperiksa otomatis.
- Master menambah `check-layout-flow.mjs` pada startup. Jika elemen struktur flex/grid yang ditandai berubah menjadi absolute/fixed, startup berhenti dan menunjukkan nama file dan layer.
- Standar untuk proyek baru ditambah pada `PROMPT-PROYEK-CHATGPT.md`.

## Cara pasang
1. Backup folder `projects/windows-hacks-5-shortcut-lengkap/` dan tutup Remotion.
2. Buka ZIP tanpa Extract All, copy `projects`, `tools`, dan `PROMPT-PROYEK-CHATGPT.md` ke folder `MotionGraphic-Studio` tempat `package.json`.
3. Pilih `Replace files in destination`.
4. Jalankan `npm run dev`. Cari `[FLOW LAYOUT] ... 0 invalid ...`.
5. Di Studio pilih **Fit** pada zoom dan klik **Reset zoom** untuk mengembalikan area preview yang mungkin masih di-pan/zoom manual.

## Catatan edit
- Geser **jendela Chrome (outer window)** untuk memindahkan UI secara utuh. Jangan geser container `Browser tabs` dan `Browser navigation` jika ingin tetap mirip Windows asli; edit layer teks/tab anaknya untuk mengubah konten.
- Editability teks, cursor, timing, suara dan scene lain tetap berasal dari proyek saat ini.
- Update ini tidak me-reset seluruh posisi yang pernah kamu atur dalam elemen lain; hanya posisi bar tab yang jelas rusak dari log.
- Jika sebelumnya sudah mengubah sendiri layout dan ingin mempertahankannya, bandingkan dengan backup sebelum menimpa.

## Pengujian aktual
- 41 source TS/TSX pada proyek, 102 import relatif: parse/import 0 error.
- `check-layout-flow.mjs`: 39 layer struktural, 0 layout invalid.
- Tes kegagalan: perubahan sengaja `relative` → `absolute` tertangkap dan menolak startup.
- Integritas ZIP: diperiksa.
- Render Remotion di Windows, semua frame, serta hasil drag di mesin pengguna **belum dapat diverifikasi**.
