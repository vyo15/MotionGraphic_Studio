# Starter project — DRAFT, Win + R
Contoh 20 detik: hook, demonstrasi tombol → Run, CTA, cover silent. Ini source reusable yang sudah memiliki manifest/segment, narration, motion/spatial, sound dan blueprint; bukan konten ACC. Copy sebagai `projects/<slug>/` dalam FILE CHANGE ONLY. Ubah identity/segment IDs dan prefix literal aset; scene/story/timing/metadata wajib disesuaikan. Jangan mengubah stage menjadi review sebelum production gate dan pemeriksaan visual. Glyph reusable berada di src/components/VisualGlyphs.tsx, helper hotspot/timing di src/animations/interaction.ts; wrapper Interactive tetap literal per callsite. Untuk kamera kompleks copy production-toolkit lokal. Tidak ada import antar project.

Glyph kit: Windows, cursor (tip 2/34 × 2/44), folder, PC, switch, router, firewall, Ethernet plug, packet. These are small reusable vector building blocks, not a complete Windows or networking UI engine. The Win+R dialog is a copyable scene recipe; write new native layer names per scene. Pure timing/position helpers are source/Props-editable; use literal inline keyframes for native editing.

## Typography/layout
`designContract: compact-balanced-v1`: Poppins lokal, Inter VO Guide 36 px satu baris transparan, visual zone 120–920 / 280–1360 dan guide center 520/1505, min gap 80 px. `showSubtitles` toggle preview; `showSafeZone` overlay Studio-only. Font library resmi dipasang sekali di PC (lihat `library/fonts/README.md`), scaffold/startup memprovision LocalFonts placeholder. Tanpa font lokal masih DRAFT; review gate tidak lolos. Jangan menyalin layout contoh tanpa menyesuaikan cerita. Final High/CapCut mematikan guide.

### Spatial QA (draft)
Pertahankan penanda `data-qa-track` pada target native dan pasangan `nativeName` di spatial-plan. Sesuaikan offset segment, keyframe, hiddenFrames, role dan pengecualian dengan scene baru. Jalankan capture opt-in setelah sync; lihat `docs/PRODUCTION-TOOLKIT.md` di Master. Tidak ada jaminan PASS visual dari source saja.
