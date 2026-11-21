import React from 'react';
import {Interactive,useCurrentFrame,staticFile} from 'remotion';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
import {clamp01,ease5,lerp} from '../animations/scene04Clean';

export type SvgLayerProps={
  id:string;name:string;props:Easy2BootScene03Props;scene?:'S03'|'S04'|'S05';
  basePosition?:{x:number;y:number};animationTransform?:string;
  opacity?:number;fill?:string;children:React.ReactNode;
  assetSize?:{w:number;h:number};
};

const readFrame=(p:LayerOverride,frame:number,key:'x'|'y'|'scale'|'rotation'|'opacity',fallback:number)=>{
 const points=(p.keyframes??[]).filter(k=>k[key]!==undefined).sort((a,b)=>a.frame-b.frame);
 if(!points.length)return fallback;
 if(frame<=points[0].frame)return points[0][key]??fallback;
 if(frame>=points[points.length-1].frame)return points[points.length-1][key]??fallback;
 for(let i=0;i<points.length-1;i++){
  const a=points[i],b=points[i+1];
  if(frame>=a.frame&&frame<=b.frame){
   const t=(frame-a.frame)/(b.frame-a.frame);
   return lerp(a[key]??fallback,b[key]??fallback,p.easing==='linear'?t:ease5(t));
  }
 }
 return fallback;
};

/** basePosition -> userTransform -> animationTransform, independently editable. */
export const EditableSvgLayer:React.FC<SvgLayerProps>=({
 id,name,props,scene='S04',basePosition={x:0,y:0},animationTransform='',opacity=1,fill,children,assetSize
})=>{
 const frame=useCurrentFrame();
 const user:LayerOverride=props.layerOverrides?.[`${scene}:${id}`]??{};
 const visible=user.visible!==false && (user.startFrame===undefined||frame>=user.startFrame) &&
 (user.endFrame===undefined||frame<user.endFrame);
 if(!visible)return null;
 const x=readFrame(user,frame,'x',user.x??0);
 const y=readFrame(user,frame,'y',user.y??0);
 const scale=readFrame(user,frame,'scale',user.scale??1);
 const rotation=readFrame(user,frame,'rotation',user.rotation??0);
 const alpha=clamp01(opacity*readFrame(user,frame,'opacity',user.opacity??1));
 const inFrame=(user.animationStartFrame??0)+(user.delayFrames??0);
 const progress=clamp01((frame-inFrame)/Math.max(1,user.durationFrames??15));
 const rate=user.animation ? (user.easing==='linear'?progress:ease5(progress)):1;
 const animationOpacity=user.animation==='fade'||user.animation==='slide-up'||user.animation==='pop'?rate:1;
 const animationOffset=user.animation==='slide-up'?36*(1-rate):0;
 const animationScale=user.animation==='pop'?.87+.13*rate:1;
 const sx=scale*animationScale*(assetSize?.w&&user.width?user.width/assetSize.w:1);
 const sy=scale*animationScale*(assetSize?.h&&user.height?user.height/assetSize.h:1);
 const effectiveFill=user.fill??fill;
 const localAsset=user.asset?staticFile(`videos/easy2boot-multiboot-reels/images/${user.asset}`):null;
 return <Interactive.G name={`${scene} — ${name}`} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <g id={`${scene}-${id}`} transform={`translate(${basePosition.x} ${basePosition.y})`}>
    <g data-user-transform={`${id}`} transform={`translate(${x} ${y}) rotate(${rotation}) scale(${sx} ${sy})`}
      opacity={clamp01(alpha*animationOpacity)} fill={effectiveFill}>
      <g data-animation-transform={`${id}`} transform={`translate(0 ${animationOffset}) ${animationTransform}`}>
        {localAsset&&assetSize ? <image x={-assetSize.w/2} y={-assetSize.h/2} width={assetSize.w} height={assetSize.h} href={localAsset} preserveAspectRatio="xMidYMid meet"/> : children}
      </g>
    </g>
   </g>
 </Interactive.G>;
};
