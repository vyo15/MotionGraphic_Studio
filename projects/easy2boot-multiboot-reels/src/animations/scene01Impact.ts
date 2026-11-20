/** Pure deterministic frame math; no timers, random state or CSS keyframes. */
export const clamp=(x:number,a=0,b=1)=>Math.min(b,Math.max(a,x));
export const smooth=(x:number)=>{const t=clamp(x);return t*t*(3-2*t)};
export const easeOut=(x:number)=>1-Math.pow(1-clamp(x),3);
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export const fadeWindow=(t:number,start:number,end:number,tail:number,off:number)=>smooth((t-start)/(end-start))*(1-smooth((t-tail)/(off-tail)));
export const impactStamp=(frame:number,start:number,shakePower:number,impactScale:number)=>{
  const age=(frame-start)/30;
  if(age<0)return {visible:false,scale:1,dy:0,dx:0,shakeY:0,sparks:0,flash:0};
  const k=easeOut(age/.22);
  let scale:number,dy:number;
  if(age<.22){scale=2.05-1.2*k;dy=-100*(1-k)}
  else if(age<.50){const q=smooth((age-.22)/.28);scale=.85+.15*q+.10*Math.sin(q*Math.PI);dy=3*Math.sin(q*Math.PI)}
  else {scale=1;dy=0}
  let dx=0,shakeY=0;
  if(age>=.20&&age<.52){const s=age-.20;const a=Math.pow(1-s/.32,2)*shakePower;dx=13*a*Math.sin(s*110);shakeY=7*a*Math.cos(s*80)}
  const sparks=age>=.2&&age<.48?Math.pow(1-(age-.2)/.28,2):0;
  const flash=age>.22&&age<.29?.13*(1-Math.abs(age-.255)/.035):0;
  return {visible:true,scale:scale*impactScale,dy,dx,shakeY,sparks,flash:Math.max(0,flash)};
};
