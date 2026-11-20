/** Reusable deterministic presets; all values depend only on the current frame. */
export const clamp01=(x:number)=>Math.max(0,Math.min(1,x));
export const ease=(x:number)=>{const t=clamp01(x);return t*t*(3-2*t)};
export const ease5=(x:number)=>{const t=clamp01(x);return t*t*t*(t*(6*t-15)+10)};
export const lerp=(from:number,to:number,t:number)=>from+(to-from)*t;
export const transition=(frame:number,start:number,end:number)=>ease5((frame-start)/Math.max(1,end-start));
export const appear=(frame:number,inStart:number,inEnd:number,outStart:number,outEnd:number)=>
 transition(frame,inStart,inEnd)*(1-transition(frame,outStart,outEnd));
/** Natural lift, optional scale in scene objects. */
export const rise=(frame:number,start:number,end:number,dy=36)=>dy*(1-transition(frame,start,end));
