import type {Scene05Point} from '../config/scene05';
export const s05clamp=(x:number)=>Math.max(0,Math.min(1,x));
export const s05smooth=(x:number)=>{const t=s05clamp(x);return t*t*(3-2*t);};
export const s05ramp=(s:number,a:number,b:number)=>s05smooth((s-a)/Math.max(.00001,b-a));
export const s05between=(s:number,a:number,b:number,fade=.20)=>
  s05ramp(s,a,a+fade)*(1-s05ramp(s,b-fade,b));
/** Kurva pergerakan dengan offset lateral ringan: tidak ada teleport antartarget. */
export const s05cursor=(s:number,pts:Scene05Point[])=>{
  if(s<=pts[0].s)return {x:pts[0].x,y:pts[0].y};
  for(let i=1;i<pts.length;i++){
    const a=pts[i-1],b=pts[i];
    if(s<=b.s){
      const u=s05ramp(s,a.s,b.s);
      const dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy);
      const bend=Math.min(19.5,dist*.025)*Math.sin(Math.PI*u);
      return {x:a.x+dx*u+(dist?dy/dist*bend:0),y:a.y+dy*u-(dist?dx/dist*bend:0)};
    }
  }
  return {x:pts[pts.length-1].x,y:pts[pts.length-1].y};
};
