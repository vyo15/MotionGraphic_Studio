import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {START} from '../config/series';
import {smooth} from '../animations/presets';
const boundaries=[START.CTRL_SHIFT_T,START.CTRL_SHIFT_ESC,START.WIN_SHIFT_S,START.WIN_E,START.CTRL_SHIFT_N,START.CTA];
/** Soft dim near the cuts (0.3s out / 0.3s in), not a slow-motion or timeline shift. */
export const SceneTransition:React.FC<{settings:{enabled:boolean;fadeFrames:number;opacity:number;color:string}}>=({settings})=>{
 const frame=useCurrentFrame();
 if(!settings.enabled)return null;
 const spread=Math.max(2,Math.round(settings.fadeFrames));
 let opacity=0;
 for(const cut of boundaries){
  const fadeIn=smooth(frame,cut-spread,cut);
  const fadeOut=1-smooth(frame,cut,cut+spread);
  opacity=Math.max(opacity,Math.min(fadeIn,fadeOut)*settings.opacity);
 }
 return <AbsoluteFill style={{pointerEvents:'none',background:settings.color,opacity}}/>;
};
