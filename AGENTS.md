# Agent rules — MotionGraphic Studio Master (authoritative entry point)

1. **BACA DULU** `PRODUCTION-RULES.md`. Jika sedang mengerjakan video tertentu, baca juga `projects/<slug>/AGENTS.md`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json`, manifest dan source Remotion yang aktual.
2. **SATU MASTER / REMOTION STUDIO SAJA**. Proyek baru add-on utuh di `projects/<slug>/`; jangan membuat Studio baru, jangan edit manual `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, atau `package.json` untuk membuat video. `npm run dev` / `npm run sync` mengurus registrasi.
3. **GATE PRODUKSI**: brief → script full approved → storyboard full approved → **bangun dan minta approval SCENE PERTAMA** → lanjut scene lain → VO sync → full QA → render. Keputusan yang disetujui harus dicatat di file project. Tanpa approval scene pertama, jangan bulk-build video baru.
4. **REVISI TERBATAS**. Pertahankan ID/slug/project lain, layer names, aset dan archive. Scope revisi hanya elemen/scene yang diminta; jangan mengubah bagian locked secara diam-diam.
5. **REMOTION-NATIVE**. Full video = preview/render ringkas; segment = editing detail via `src/SegmentVideo.tsx` dengan komponen scene yang sama. React JSX biasa tidak otomatis drag/drop. Gunakan `Interactive` bila didukung, dan uji edit → save/reload/sync.
6. **VISUAL NARATION-DRIVEN**. Narasi menjelaskan, visual mendemonstrasikan, typography hanya menekankan. Tempo natural dan UI realistis; voice-over placeholder bukan audio final.
7. **DELIVERY**. Revisi/master fix = **FILE CHANGE ONLY, copy-paste Replace**, tanpa installer/BAT/patcher. Video baru = ZIP add-on utuh. Jangan mengklaim pengujian yang belum berjalan.
8. **AUTO PROJECT SCOPE**. `npm run sync` menambahkan file kontrol produksi hanya jika belum ada. File keputusan yang ada tidak pernah direset atau ditimpa saat sync. Untuk memeriksa gunakan `node tools/production-scope.mjs --check`.

**Precedence:** permintaan user terbaru yang eksplisit → kondisi source render aktual → keputusan kreatif approved/locked di file scope → aturan teknis di atas → catatan lama. Jika source dan tujuan berbeda, laporkan mismatch; jangan mengarang kesesuaian.
