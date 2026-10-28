import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {START} from '../config/series';
import {smooth} from '../animations/presets';
const boundaries=[START.CTRL_SHIFT_T,START.CTRL_SHIFT_ESC,START.WIN_SHIFT_S,START.WIN_E,START.CTRL_SHIFT_N,START.CTA];
/** Soft dim near the cuts (0.3s out / 0.3s in), not a slow-motion or timeline shift. */
export const SceneTransition:React.FC=()=>{
 const frame=useCurrentFrame();
 let opacity=0;
 for(const cut of boundaries){
  const fadeIn=smooth(frame,cut-9,cut);
  const fadeOut=1-smooth(frame,cut,cut+9);
  opacity=Math.max(opacity,Math.min(fadeIn,fadeOut)*.72);
 }
 return <AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(ellipse at 65% 45%,#0c3049,#061321)',opacity}}/>;
};
