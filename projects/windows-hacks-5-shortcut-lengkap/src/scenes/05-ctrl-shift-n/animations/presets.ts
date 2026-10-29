/** Deterministic frame-based animation helpers used by the scenes. */
export const clamp01=(x:number)=>Math.min(1,Math.max(0,x));
export const smooth=(x:number)=>{const t=clamp01(x);return t*t*(3-2*t)};
export const fade=(time:number,start:number,end:number)=>smooth((time-start)/(end-start));
export const slide=(time:number,start:number,end:number,px=32)=>px*(1-fade(time,start,end));
export const pop=(time:number,start:number,end:number)=>0.92+0.08*fade(time,start,end);
