import type {Scene05Point} from '../config/scene05';
export const s05clamp=(x:number)=>Math.max(0,Math.min(1,x));
export const s05smooth=(x:number)=>{const t=s05clamp(x);return t*t*(3-2*t);};
export const s05ramp=(s:number,a:number,b:number)=>s05smooth((s-a)/(b-a));
export const s05between=(s:number,a:number,b:number,fade=.24)=>s05ramp(s,a,a+fade)*(1-s05ramp(s,b-fade,b));
export const s05cursor=(s:number,pts:Scene05Point[])=>{
  if(s<=pts[0].s)return {x:pts[0].x,y:pts[0].y};
  for(let i=1;i<pts.length;i++){
    if(s<=pts[i].s){
      const a=pts[i-1],b=pts[i],u=s05smooth((s-a.s)/(b.s-a.s));
      return {x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u};
    }
  }
  return {x:pts[pts.length-1].x,y:pts[pts.length-1].y};
};
