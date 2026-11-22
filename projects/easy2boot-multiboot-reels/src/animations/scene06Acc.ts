/** Scene 06 ACC 2026-11-21 — motion matches the approved 13 s CTA Mix / Match Move.
 * All values are deterministic, based on the Remotion frame. No CSS animation,
 * DOMParser, setInterval, random numbers or pre-rendered video layers.
 */
export const S06_FPS = 30;
export const S06_FRAMES = 390;
export const clamp01 = (v:number) => Math.max(0,Math.min(1,v));
export const easeS06 = (v:number) => { const t=clamp01(v);return t*t*(3-2*t); };
export const progressS06=(t:number,a:number,b:number)=>easeS06((t-a)/Math.max(.0001,b-a));
export const lerpS06=(a:number,b:number,p:number)=>a+(b-a)*p;
export const fadeWindowS06=(t:number,enterA:number,enterB:number,leaveA:number,leaveB:number)=>
  progressS06(t,enterA,enterB)*(1-progressS06(t,leaveA,leaveB));

export const S06_APPROVED_TIMING = {
  durationInFrames:390,
  oldTitle:{in:[.7,1.35],out:[3.94,4.32]},
  multiTitle:{in:[4.18,4.74],out:[7.23,7.58]},
  question:{in:[7.68,8.2],out:[10.12,10.7]},
  oldUsb:{in:[1.05,1.65],out:[10.28,10.82]},
  multiUsb:{in:[4.22,5.04]},
  cta:{in:[8.02,8.6],out:[10.13,10.86]},
  coverMove:{from:10.14,to:11.22},
  cover:{titles:[11.13,11.92],hold:[12,13]},
} as const;
