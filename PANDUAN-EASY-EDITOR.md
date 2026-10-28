# MotionGraphic Studio v1.7 — Easy Editor (lokal)

**Tujuan:** memudahkan pengeditan konten tanpa membuka VS Code untuk setiap perubahan. Remotion tetap digunakan untuk preview, animasi visual yang didukung, dan render MP4.

## Membuka

Di folder `MotionGraphic-Studio`, jalankan `npm run dev`. Perintah ini menjalankan **dua layanan lokal**:

- Remotion Studio: `http://localhost:3000`
- Easy Editor: `http://localhost:4077`

Keduanya berjalan selama terminal `npm run dev` hidup; tutup dengan `Ctrl+C`. Apabila ingin menjalankan Easy Editor sendiri, gunakan `npm run edit`.

## Mengedit seri 5 Shortcut

1. Buka `http://localhost:4077` di browser.
2. Pilih video **Windows Hacks — 5 Shortcut**.
3. Pilih scene seperti `CTRL_SHIFT_ESC`, `WIN_E`, `HOOK`, atau `CTA`.
4. Gunakan bagian **Teks** untuk mengisi override teks (`kosong` berarti teks original). Bagian **Layer** memuat offset X/Y, scale, rotation, opacity, enable, start/end frame, dan preset animasi. Gunakan pencarian agar daftar layer tidak terlalu panjang.
5. Klik **Simpan Perubahan**, lalu refresh tab Remotion Studio untuk melihat hasilnya. Konten otomatis disimpan ke `projects/<slug>/motiongraphic-video.json`, kemudian `src/Root.tsx`/katalog dibuat ulang via sync.
6. Jika hasil kurang cocok, klik **Batalkan simpan terakhir** di Easy Editor.
7. Render tetap melalui `npm run render`.

## Apakah bisa drag-and-drop langsung?

- **IP Address:** komponen-komponennya sudah memakai `Interactive.Div` dengan atribut yang dapat dianalisis Remotion, sehingga banyak layer dapat dipilih/digeser di canvas.
- **5 Shortcut:** beberapa komponen memang sudah memakai `Interactive.Div`, tetapi banyak posisi dan efek berasal dari CSS, `layerStyle()`, dan perhitungan dinamis. Remotion tidak otomatis mengizinkan drag pada semua item. **Easy Editor menyediakan edit angka dan teks yang berfungsi** tanpa menulis kode; ini bukan pengganti drag canvas.
- Untuk proyek video baru, bangun layer berproperti inline statis atau `interpolate` yang bisa dianalisis Remotion. Lihat `STANDAR-EDITABLE-STUDIO.md`.

## Keamanan & persistensi

- Editor hanya mendengarkan alamat `127.0.0.1` (tidak diekspos ke jaringan).
- Hanya properti layer/teks/audio yang sudah terdaftar boleh diperbarui; editor tidak menerima perubahan file/path melalui API.
- Sebelum setiap simpan dibuat backup `library/backups/easy-editor/<slug>.previous.json`; tidak menimpa project lain.
- Jika sinkronisasi gagal, manifest otomatis dikembalikan ke versi sebelumnya.
- GitHub: perubahan isi manifest `projects/<slug>/motiongraphic-video.json` dapat di-commit; backup Easy Editor tetap di `.gitignore`.

## Batasan

- Perubahan tidak selalu live selama mengetik; klik **Simpan Perubahan** lalu refresh Studio.
- `x` dan `y` merupakan **offset** posisi asli, bukan posisi absolut dalam pixel untuk semua project.
- Proyek tanpa `sceneEditor` memakai Remotion Studio langsung. Easy Editor tidak menawarkan field yang tidak didukung struktur project.
- Jangan mengedit source yang sama dari dua editor pada waktu bersamaan; simpan dan refresh sebelum mengubah dari tempat lain.

Gunakan `npm run editcheck` sebagai pemeriksaan awal scene yang masih memakai `style` spread.

**Perhatian khusus Props Remotion:** karena `src/Root.tsx` dihasilkan ulang dari manifest, mengubah `defaultProps` langsung pada komposisi yang terdaftar di Root mungkin akan tertimpa saat `npm run sync`. Untuk seri 5 Shortcut gunakan Easy Editor (yang menulis manifest utama) sebagai jalur resmi pengaturan props. Perubahan pada source layer `Interactive` yang berhasil disimpan Remotion tetap berada di folder project.
