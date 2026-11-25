# QA editable update — baseline 20261125-080447
- Master actual 1.8.1, Remotion 4.0.538, folder-first. ZIP yang diterima tidak berisi `folder-jadi-drive`. Project dipulihkan dari add-on V2 dan empat patch sebelumnya (V3, ACC01–04/Scene05, cover, Project label).
- Master source/package/generated files, project lain, asset asli, VO, approval, durasi, dan timeline tidak disertakan dalam perubahan Master. Scene 01–05 tetap ACC prototype, S06 review.
- ID video utama `FolderJadiDrive` dipertahankan. ID segmen diberi prefix untuk menghindari bentrok dengan `SampleStartupWindowsDirector`; narration hening cover ditambah agar cakupan tepat 1854 frame.
- AST: 88 target Native Editable (44 literal text/44 visual), 24 Props text/appearance targets, 7 kontrol Props tambahan. Validator static strict/syntax lulus, dengan warning heuristik keyframe karena interpolasi berada pada helper motion.ts. Tidak membuktikan typecheck atau GUI.
- Perbandingan baseline dan revised: 54 sample frame, 9/scene, identik piksel pada rasterisasi SVG stub (bukan Remotion native). Default Props Project (Z:) dan file contoh dipertahankan. Override projectName/drive diuji pada output SVG Scene 05. Tidak menjamin per-piksel seluruh timeline atau browser Windows.
- `npm run sync` pada salinan Master dengan folder hasil: 5 video, 41 segmen, 51 komposisi, 0 masalah sumber.
- Native Remotion, typecheck penuh dengan dependency aktual, drag/resize, Save/reload, actual MP4 rendering, audio dan final subtitle sync belum diuji. Tidak ada klaim 100% visually editable. User diminta melakukan tes GUI sebelum final.
