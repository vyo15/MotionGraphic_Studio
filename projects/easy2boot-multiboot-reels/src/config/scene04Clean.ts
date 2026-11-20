/** Source of truth for editable Scene 04. Coordinates are in full 1080 x 1920. */
export const S04_DESIGN={
 background:'#F7F7F5',ink:'#202628',muted:'#80888A',accent:'#DF805F',
 border:'#E7E7E5',surface:'#FFFFFF',success:'#31A878',blue:'#178BD5',
 grid:'#DCE0DD',
} as const;

export const S04_LAYOUT={
 rowTop:480,rowGap:211,rowHeight:175,sourceX:65,sourceWidth:390,
 folderX:535,folderWidth:475,folderHeight:175,isoIconX:88,
 statusX:250,statusY:1392,statusWidth:580,statusHeight:63,
 heroX:540,heroY:905,heroTitleY:493,heroSupportY:553,
 subtitleY:1540,
} as const;

export const S04_TIMING={
 entryStart:0,entryEnd:35,rowsStart:24,rowsEnd:92,
 transferStart:138,transferEnd:218,successStart:215,successEnd:235,
 resultHoldEnd:343,toUsbStart:345,toUsbExitEnd:375,toUsbEnterStart:371,toUsbEnd:407,heroHoldEnd:480,
} as const;

/** All four ISO copies use exactly the same start and end to illustrate simultaneous copy. */
export const S04_OS_KEYS=['win8','win10','win11','linux'] as const;
export type S04OsKey=typeof S04_OS_KEYS[number];
