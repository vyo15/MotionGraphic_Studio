/** Timings match storyboard V35 preview. 1080×1920, 30 fps, total 32s. */
export const VIDEO_INFO = {width:1080,height:1920,fps:30,totalFrames:960} as const;
export const SEGMENTS = [
 {id:'ShutdownOtomatisHookRealistis-S01',key:'scene01',title:'S01 · Ketiduran saat menonton',start:0,duration:240},
 {id:'ShutdownOtomatisHookRealistis-S02',key:'scene02',title:'S02 · Menunggu download',start:240,duration:165},
 {id:'ShutdownOtomatisHookRealistis-S03',key:'scene03',title:'S03 · Jam menjadi timer',start:405,duration:225},
 {id:'ShutdownOtomatisHookRealistis-S04',key:'scene04',title:'S04 · Windows + R dan shutdown',start:630,duration:330},
] as const;
export const DEFAULT_BEATS = {
 scene01:{watch:0,sleepy:65,yawn:107,fall:157,sleep:214},
 scene02:{downloadShow:28,react:90},
 scene03:{cardsStart:0,clockStart:12,mergeStart:35,mergeEnd:74,timerStart:93,timerEnd:128,scheduledStart:134,scheduledEnd:175},
 scene04:{keysStart:16,keysEnd:38,runStart:50,runEnd:80,typingStart:100,typingEnd:200,highlightStart:202,enterStart:235,successStart:267},
} as const;
