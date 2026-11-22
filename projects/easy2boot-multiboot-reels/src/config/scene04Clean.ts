/** Scene04 ACC: 240 frames at 30FPS (8s), one Explorer window. */
export const S04_DESIGN={
 background:'#F7F7F5',ink:'#202628',muted:'#81898B',accent:'#DF805F',
 border:'#E7E7E5',surface:'#FFFFFF',success:'#299C78',blue:'#438ABA',
} as const;
export const S04_OS_KEYS=['win8','win10','win11','linux'] as const;
export type S04OsKey=typeof S04_OS_KEYS[number];
export const S04_TIMING={
 durationInFrames:240,
 handoffFadeStart:3,handoffEnd:19,
 explorerEnterStart:16,explorerEnterEnd:29,
 copyStart:[47,70,93,115] as readonly number[],
 copyEnd:[67,90,113,135] as readonly number[],
 explorerExitStart:138,explorerExitEnd:149,
 heroStart:149,heroEnd:161,
} as const;
