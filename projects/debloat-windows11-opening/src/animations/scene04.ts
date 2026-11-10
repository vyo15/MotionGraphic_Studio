/** Pure frame/second driven easings; preview and render use identical values. */
export const clamp01 = (n:number) => Math.max(0,Math.min(1,n));
export const smooth = (n:number) => {const v=clamp01(n);return v*v*(3-2*v);};
export const ramp = (s:number,a:number,b:number) => smooth((s-a)/Math.max(0.0001,b-a));
export const between = (s:number,on:number,off:number,duration=0.25) => ramp(s,on,on+duration)*(1-ramp(s,off,off+duration));
export const mix = (a:number,b:number,v:number)=>a+(b-a)*v;
export type CursorPoint={readonly s:number;readonly x:number;readonly y:number};
export const animatedCursor=(s:number,keys:readonly CursorPoint[])=>{
  if(s<=keys[0].s)return {x:keys[0].x,y:keys[0].y};
  for(let i=0;i<keys.length-1;i++){
    const a=keys[i],b=keys[i+1];
    if(s<=b.s){const k=ramp(s,a.s,b.s);return {x:mix(a.x,b.x,k),y:mix(a.y,b.y,k)};}
  }
  return {x:keys[keys.length-1].x,y:keys[keys.length-1].y};
};
