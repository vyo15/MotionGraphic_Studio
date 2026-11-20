/** Pure frame-driven curves; no timers, no randomness. */
export const clamp01=(n:number)=>Math.max(0,Math.min(1,n));
export const smooth01=(v:number)=>{const t=clamp01(v);return t*t*(3-2*t)};
export const outCubic=(v:number)=>{const t=clamp01(v);return 1-Math.pow(1-t,3)};
export const outBack=(v:number)=>{const t=clamp01(v);return 1+2.70158*Math.pow(t-1,3)+1.70158*Math.pow(t-1,2)};
export const fade=(f:number,start:number,end:number)=>smooth01((f-start)/(end-start));
export const between=(f:number,a:number,b:number,c:number,d:number)=>fade(f,a,b)*(1-fade(f,c,d));
export const lerp=(a:number,b:number,v:number)=>a+(b-a)*v;
