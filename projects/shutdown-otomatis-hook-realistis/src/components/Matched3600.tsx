import React from 'react';
import {Interactive} from 'remotion';
/**
 * Canonical editable 3600 + DETIK art. Both the approved S05 outro and S06/S07
 * handoff call THIS SAME component: one source for font, weight, anchor and text.
 * Baseline/size props are controlled by the shared Remotion frame timeline.
 */
type Matched3600Props={
 x:number; y:number; fontSize:number;
 unitY:number; unitFontSize:number; unitAlpha:number;
 inkColor:string; coralColor:string;
};
export const Matched3600:React.FC<Matched3600Props>=({x,y,fontSize,unitY,unitFontSize,unitAlpha,inkColor,coralColor})=><g>
 <Interactive.Text name="MATCH / 3600 — same native source S05 to S06" x={x} y={y} textAnchor="middle" fontSize={fontSize} fontWeight={850} fill={inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>3600</Interactive.Text>
 <g opacity={unitAlpha}>
  <Interactive.Text name="MATCH / DETIK — same native source S05 to S06" x={x} y={unitY} textAnchor="middle" fontSize={unitFontSize} fontWeight={700} fill={coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>DETIK</Interactive.Text>
 </g>
</g>;
