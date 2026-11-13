import {Easing,interpolate} from 'remotion';

export const clamp=(n:number,min=0,max=1)=>Math.max(min,Math.min(max,n));
export const smooth=(p:number)=>{const x=clamp(p);return x*x*(3-2*x)};
export const easeOut=(p:number)=>1-Math.pow(1-clamp(p),3);
export const show=(s:number,start:number,duration:number)=>smooth((s-start)/duration);
export const hide=(s:number,start:number,duration:number)=>1-show(s,start,duration);
export const hold=(s:number,inAt:number,inDuration:number,outAt:number,outDuration:number)=>
  show(s,inAt,inDuration)*hide(s,outAt,outDuration);
export const drift=(s:number,start:number,duration:number,y:number)=>y*(1-easeOut((s-start)/duration));
export const lerp=(v:number,a:number,b:number)=>interpolate(v,[0,1],[a,b],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.quad)});
export function xyAt<T extends {t:number;x:number;y:number}>(points:readonly T[],t:number){
 if(t<=points[0].t)return{x:points[0].x,y:points[0].y};
 for(let i=1;i<points.length;i++){
   const b=points[i],a=points[i-1];
   if(t<=b.t){const p=smooth((t-a.t)/(b.t-a.t));return{x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p};}
 }
 const last=points[points.length-1];return{x:last.x,y:last.y};
}
