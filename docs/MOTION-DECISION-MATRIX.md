# Motion Decision Matrix v1.0

Untuk semua topik, pilih teknik berdasarkan fungsi narasi dan state visual. Matrix bukan daftar efek yang harus dihabiskan. Jika informasi sudah jelas, `hold` lebih baik daripada animasi baru. Teknik kategori Living Screencast/SOP/Data/Mechanism/Swiss Motion tetap berlaku.

| Intent (ID) | Kondisi / pertanyaan | Primary motion (ID) | Pendukung / batasan |
|---|---|---|---|
| introduce | Objek/konteks belum dikenali | establish | Fit utuh, reveal sederhana; jangan mulai terlalu dekat |
| detail | Informasi terlalu kecil atau butuh pemeriksaan | focus-zoom | Fit target dan konteks penting, jangan zoom subtitle |
| point | Menunjuk bagian yang sudah terlihat | selective-emphasis | Kontras/warna/hold; tidak perlu zoom jika terbaca |
| shift-focus | Target lain di world yang sama | focus-handoff | Pan/target tracking bila perlu; jangan reset |
| click | Ada tindakan klik yang sah | cursor-action | Target terlihat → arrive → hover bila relevan → click → respons asli |
| drag | Aset dipindah dengan cursor | drag-tracking | Hotspot dan objek terikat; release menghasilkan state benar |
| type | Mengisi input | natural-typing | Fokus input, urutan ketik realistis; hold nilai lengkap |
| change | Kondisi berubah | state-transform | Morph hanya bila bentuk bermakna; bukan selalu animasi bentuk |
| flow | Transfer/aliran/arah | path-motion | Jalur nyata, state asal dan tujuan, label terbaca |
| sequence | Proses bertahap | progressive-build | Tampilkan aksi satu per satu; tidak semua layer masuk serentak |
| compare | Membandingkan data/objek | spatial-reflow | Skala jujur, beri ruang, satu dimensi perhatian |
| result | Menunjukkan outcome | result-hold | Respons setelah aksi, hasil bertahan, cursor park |
| recap | Kembali ke konteks atau cover | context-zoom-out | Hanya bila dibutuhkan; hero frame/mini-demo tetap utuh |
| bridge | Menyambung konteks berikutnya | shared-element | Carry/match move atau motivated cut jika dunia berbeda |
| pause | Tidak ada informasi visual baru | hold | Stabil, tanpa efek tambahan |

## Aturan keputusan
1. Tentukan target fokus dan apakah penonton sudah punya konteks. Bila target sudah besar, pilih selective-emphasis/hold, bukan zoom berulang.
2. Bedakan fokus narasi (objek yang dibahas) dengan pointer (alat tindakan). Kamera mengikuti fokus, bukan setiap pixel cursor. Pan pada world yang sama; reframe ketika dialog mengubah ukuran target.
3. Rencanakan exit/entry: `carry` (world dan pose sama), `match` (focal point match; world boleh berubah), `cut` (perubahan konteks beralasan), `start` (beat pertama saja). Jangan menyembunyikan discontinuity dengan fade.
4. Jika aset lama menghalangi, reflow/exit lebih dahulu. Satu target aktif; overlap asli UI diizinkan hanya jika tidak menghalangi informasi yang sedang dijelaskan.
5. Selaraskan aksi dengan frasa VO, bukan seluruh scene. Draft timing di awal; setelah rekaman sinkronkan ke ucapan aktual, termasuk jeda. Jangan memaksa audio dipercepat.
6. Pilih primary motion dari vocabulary; matrix adalah rekomendasi default, boleh berbeda dengan alasan tercatat. Sound cue/omit mengikuti Sound Direction v2.2. Jangan menganggap motion plan sebagai bukti render atau ACC.

## Contoh netral: File Explorer
- “Buka lokasi folder” → establish; tampilan landscape fit di viewport portrait.
- “Perhatikan nama folder” → focus-zoom bila label kecil, atau selective-emphasis jika sudah terbaca.
- “Lihat informasi ukuran” → focus-handoff/pan ke panel; kamera menunggu target stabil, lalu reading hold.
- “Sekarang kembali ke daftar” → context-zoom-out bila perlu konteks; jangan reset jika beat berikutnya masih pada panel yang sama.

**Auto SFX v2.2:** wajib implementasi sejak build pertama; `planned` bukan status delivery. Ikuti cue-track-v1 dan gate produksi pada `docs/SOUND-DIRECTION-RULES.md`.
