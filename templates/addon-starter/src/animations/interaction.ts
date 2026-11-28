/** Pure frame helpers; use inline literal geometry and named native layers for Studio. */
export const CLAMP={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const cursorHotspot=(x:number,y:number,width=34,height=44)=>({left:x-width*2/34,top:y-height*2/44});
export const activeAt=(frame:number,start:number,end:number)=>frame>=start&&frame<end;
// Pure deterministic geometry; use only for source/Props motion, not as proof of native keyframe editing.
export const clamp01=(v:number)=>Math.max(0,Math.min(1,v));
export const smoothProgress=(frame:number,start:number,end:number)=>{if(end<=start)throw Error('Motion interval must be positive');const t=clamp01((frame-start)/(end-start));return t*t*(3-2*t)};
export const pointBetween=(a:{x:number;y:number},b:{x:number;y:number},progress:number)=>{const t=clamp01(progress);return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}};
