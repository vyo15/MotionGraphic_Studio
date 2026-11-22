import React from 'react';
import {Interactive} from 'remotion';
import type {VideoProps} from '../config/props';

/** Clock geometry shared by question bridge and the approved shutdown solution.
 * The same body, bezel, tick geometry and dimensions are used in both scenes.
 */
export const EditorialClock:React.FC<{
 p:Required<VideoProps>;
 x:number;y:number;scale?:number;opacity?:number;
 analogOut?:number;digitIn?:number;handAngle?:number;
}> = ({p,x,y,scale=1,opacity=1,analogOut=0,digitIn=0,handAngle=-32})=>{
 const marks=Array.from({length:12},(_,i)=>{
  const a=i*Math.PI/6-Math.PI/2;
  return {x1:540+141*Math.cos(a),y1:856+141*Math.sin(a),x2:540+(i%3===0?119:129)*Math.cos(a),y2:856+(i%3===0?119:129)*Math.sin(a),major:i%3===0};
 });
 return <g opacity={opacity} transform={`translate(${x} ${y}) scale(${scale}) translate(-540 -856)`}>
  <Interactive.G name="TRANSISI — Jam yang sama: badan dan bingkai" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <circle cx={540} cy={856} r={165} fill="#FFFFFF" stroke="#E1E6E5" strokeWidth={5}/>
   <circle cx={540} cy={856} r={153} fill="#FAFCFB" stroke="#D3DDDD" strokeWidth={2}/>
   <circle cx={540} cy={856} r={144} fill="none" stroke="#ECF0EE" strokeWidth={4}/>
  </Interactive.G>
  <g opacity={1-analogOut}>
   <Interactive.G name="TRANSISI — Jam: 12 penanda" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    {marks.map((v,i)=><line key={i} x1={v.x1} y1={v.y1} x2={v.x2} y2={v.y2} stroke={v.major?'#617880':'#98ABB0'} strokeWidth={v.major?4:2} strokeLinecap="round"/>)}
   </Interactive.G>
   <g transform={`rotate(${handAngle} 540 856)`}><path d="M540 859L540 752" fill="none" stroke="#263F49" strokeWidth={7} strokeLinecap="round"/></g>
   <g transform={`rotate(${handAngle/13} 540 856)`}><path d="M540 859L540 790" fill="none" stroke="#DF805F" strokeWidth={8} strokeLinecap="round"/></g>
   <circle cx={540} cy={856} r={11} fill="#223E4A"/>
  </g>
  <g opacity={digitIn}>
   <circle cx={540} cy={856} r={133} fill="none" stroke="#EDF0EE" strokeWidth={8}/>
   <circle cx={540} cy={856} r={133} fill="none" stroke={p.coralColor} strokeWidth={8} strokeDasharray="140 836" strokeLinecap="round" transform="rotate(-90 540 856)"/>
   <Interactive.Text name="TRANSISI — Jam: 01:00:00" x={540} y={872} textAnchor="middle" fill={p.navyColor} fontSize={65} fontWeight={800} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>01:00:00</Interactive.Text>
  </g>
 </g>;
};
