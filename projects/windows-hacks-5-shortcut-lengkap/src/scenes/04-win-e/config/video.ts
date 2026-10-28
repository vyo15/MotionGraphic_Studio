/** All text, timings, window positions, colors, camera zooms, and narration timings editable from one file. */
export const CONFIG={
 fps:30, durationInFrames:300,
 colors:{bg:'#071321',accent:'#67E8F9',yellow:'#FFCC77',green:'#91F2C9'},
 text:{kicker:'WINDOWS HACKS',episode:'04 / 05',
   problemTop:'FOLDER LAMA',problemBottom:'MASIH DIPAKAI?',problemSub:'Mau cari file lain tanpa menutupnya?',
   hotkeyTop:'NGGAK USAH',hotkeyBottom:'DITUTUP!',hotkeySub:'Cukup tekan Win + E di keyboard.',
   demoTop:'FILE EXPLORER',demoBottom:'BARU TERBUKA!',demoSub:'Jendela pertama tetap terbuka.',
   twoTop:'DUA FOLDER',twoBottom:'SEKALIGUS!',twoSub:'Bisa pindah-pindah tanpa kehilangan folder.',
   endTop:'FOLDER LAMA',endBottom:'TETAP AMAN!',endSub:'Win + E = buka jendela Explorer baru.',
   oldFolder:'Project Kerja',newFolder:'Downloads',
   workFiles:['Desain Konten','Video Reels','Script Video.docx','Timeline.xlsx','Logo Brand.png'],
   downloadFiles:['Materi Training','Video Referensi','Screenshot_2026.png','Presentasi.pptx','Catatan.docx']},
 layout:{kickerX:74,kickerY:268,titleX:68,titleY:332,subtitleX:76,subtitleY:553,
   monitorX:61,monitorY:663,monitorW:958,monitorH:653,keyboardX:248,keyboardY:1415,
   compareX:79,compareY:1365,compareW:922},
 timing:{keyShow:1.60,keyPress:2.27,newExplorerOpen:3.17,arrange:5.00,mouseMove:5.54,downloadsClick:6.77,compareOpen:7.04,success:7.58},
 windows:{oldX:88,oldY:67,newX:171,newY:102,spreadY:171,oldSpreadX:19,newSpreadX:493,
   initialScale:1,spreadScale:.585,width:774,height:468},
 sound:{enabled:true,volume:.48}
} as const;
