import type {LayerOverride} from '../config/props';
/** Deterministic non-destructive layer controls for additional nested native SVG layers. */
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(n:number)=>{const t=clamp(n);return t*t*(3-2*t)};
const interpolate=(a:number,b:number,t:number)=>a+(b-a)*t;
const finite=(n:unknown,fallback:number)=>typeof n==='number'&&Number.isFinite(n)?n:fallback;
export const getEditableTransform=(p:LayerOverride,frame:number)=>{
 const keys=(p.keyframes??[]).slice().sort((a,b)=>a.frame-b.frame);
 const at=(key:'x'|'y'|'scale'|'rotation'|'opacity',fallback:number)=>{
  const defaultValue=finite(p[key],fallback);
  if(!keys.length)return defaultValue;
  let left=keys[0],right=keys[keys.length-1],t=0;
  if(frame<keys[0].frame){left=right=keys[0];}
  else if(frame>=keys[keys.length-1].frame){left=right=keys[keys.length-1];}
  else for(let i=0;i<keys.length-1;i++)if(frame>=keys[i].frame&&frame<keys[i+1].frame){
    left=keys[i];right=keys[i+1];t=(frame-left.frame)/(right.frame-left.frame);break;
  }
  return interpolate(finite(left[key],defaultValue),finite(right[key],defaultValue),p.easing==='linear'?t:smooth(t));
 };
 const start=(p.animationStartFrame??0)+(p.delayFrames??0);
 const duration=Math.max(1,p.durationFrames??15);
 const raw=clamp((frame-start)/duration);
 const progress=p.easing==='linear'?raw:smooth(raw);
 const fade=p.animation==='fade'||p.animation==='pop'||p.animation==='slide-up'?progress:1;
 const yFromAnimation=p.animation==='slide-up'?36*(1-progress):0;
 const zoom=p.animation==='pop'?0.87+0.13*progress:1;
 const x=at('x',0),y=at('y',0)+yFromAnimation;
 const rotation=at('rotation',0),scale=at('scale',1)*zoom;
 const visible=p.visible!==false && (p.startFrame===undefined||frame>=p.startFrame) &&
  (p.endFrame===undefined||frame<p.endFrame);
 const opacity=clamp(at('opacity',1)*fade*(visible?1:0));
 return {visible,transform:`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`,opacity};
};
