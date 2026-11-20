import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {SCENE03_CUES,SCENE04_CUES,TEXT_VO_STYLE} from '../config/sceneTextVO';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
const clamp=(t:number)=>Math.max(0,Math.min(1,t));
const smooth=(t:number)=>{const v=clamp(t);return v*v*(3-2*v)};
/** Text-only caption matching S01: no box, no header or timing badge. */
export const SceneTextVO:React.FC<{scene:3|4;props:Easy2BootScene03Props}>=({scene,props})=>{
 const frame=useCurrentFrame();
 const cues=scene===3?SCENE03_CUES:SCENE04_CUES;
 const values=scene===3?props.scene03SubtitleLines:props.scene04SubtitleLines;
 const cue=cues.find(c=>frame>=c.from && frame<c.to);
 if(!cue)return null;
 const id=`S0${scene}:vo-${cue.index}` as keyof typeof props.layerOverrides;
 const user:LayerOverride=props.layerOverrides?.[id]??{};
 if(user.visible===false || (user.startFrame!==undefined&&frame<user.startFrame) || (user.endFrame!==undefined&&frame>=user.endFrame))return null;
 const style=TEXT_VO_STYLE;
 const appearance=Math.min(smooth((frame-cue.from)/style.enterFrames),smooth((cue.to-frame)/style.exitFrames));
 const label=user.text??values[cue.index]??'';
 const cx=style.x+(user.x??0), cy=style.y+(user.y??0);
 return <AbsoluteFill style={{pointerEvents:'none'}}>
  <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
   <Interactive.G name={`S0${scene} — VO teks ${cue.index+1}`} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <g transform={`translate(${cx} ${cy}) rotate(${user.rotation??0}) scale(${user.scale??1})`} opacity={appearance*(user.opacity??1)}>
     <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fill={user.fill??style.fill}
       stroke={style.stroke} strokeWidth={style.strokeWidth} paintOrder="stroke"
       fontSize={user.fontSize??style.fontSize} fontWeight={user.fontWeight??style.fontWeight}
       fontFamily={user.fontFamily??props.fontFamily??style.fontFamily}>
       {label}
     </text>
    </g>
   </Interactive.G>
  </svg>
 </AbsoluteFill>;
};
