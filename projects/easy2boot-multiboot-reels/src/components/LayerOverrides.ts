import type {LayerOverrides,LayerOverride} from '../config/props';

const easeInOut=(t:number)=>t*t*(3-2*t);
const clamp=(x:number)=>Math.max(0,Math.min(1,x));

/**
 * Non-destructive layer adjustments (coordinates independent from animation):
 * basePosition: original SVG object geometry
 * userTransform: layerOverrides (X/Y/scale/rotate/width/height)
 * animationTransform: frame-driven preset defined by scene animation
 * Extra per-layer animation, when requested, is composed over both.
 */
export const applyLayerOverrides=(root:Element,scene:string,overrides:LayerOverrides,frame:number):void=>{
  for(const [key,value] of Object.entries(overrides)){
    if(!key.startsWith(`${scene}:`) || !value)continue;
    const id=key.slice(scene.length+1);
    const target=Array.from(root.querySelectorAll<SVGElement>('[id]')).find((e)=>e.id===id);
    if(!target) continue;
    const p=value as LayerOverride;
    const animationTransform=target.getAttribute('transform')??'';
    let x=p.x??0,y=p.y??0,sx=p.scale??1,sy=p.scale??1;
    const r=p.rotation??0;
    let cx=0,cy=0;
    if((p.width||p.height)&&'getBBox' in target){
      try {
        const b=(target as SVGGraphicsElement).getBBox();
        cx=b.x+b.width/2;cy=b.y+b.height/2;
        if(p.width&&b.width>0)sx*=p.width/b.width;
        if(p.height&&b.height>0)sy*=p.height/b.height;
      }catch{ /* Some SVG nodes have no bounding box; keep natural size. */ }
    }
    const duration=Math.max(1,p.durationFrames??15);
    const start=(p.animationStartFrame??0)+(p.delayFrames??0);
    const raw=clamp((frame-start)/duration);
    const progress=p.easing==='linear'?raw:easeInOut(raw);
    let fadeFactor=1;
    if(p.animation==='slide-up'){y+=42*(1-progress);fadeFactor=progress;}
    if(p.animation==='fade'){fadeFactor=progress;}
    if(p.animation==='pop'){sx*=0.84+0.16*progress;sy*=0.84+0.16*progress;fadeFactor=progress;}
    if(p.animation==='wipe'){fadeFactor=progress;}
    const userTransform=`translate(${x} ${y}) translate(${cx} ${cy}) rotate(${r}) scale(${sx} ${sy}) translate(${-cx} ${-cy})`;
    target.setAttribute('transform',`${userTransform} ${animationTransform}`.trim());
    const animationOpacity=Number(target.getAttribute('opacity')??1);
    const frameVisible=(p.startFrame===undefined||frame>=p.startFrame)&&(p.endFrame===undefined||frame<p.endFrame);
    const userOpacity=frameVisible&&p.visible!==false?(p.opacity??1):0;
    target.setAttribute('opacity',String(clamp(animationOpacity*userOpacity*fadeFactor)));
    if(p.fill)target.setAttribute('fill',p.fill);
    if(p.stroke)target.setAttribute('stroke',p.stroke);
    if(p.zIndex!==undefined&&target.parentNode){
      // Painter order in SVG determines stacking. Moved only on explicit opt-in.
      const siblings=Array.from(target.parentNode.children);
      const pos=Math.max(0,Math.min(siblings.length-1,Math.trunc(p.zIndex)));
      const others=siblings.filter((v)=>v!==target);
      target.parentNode.insertBefore(target,others[pos]??null);
    }
  }
};
