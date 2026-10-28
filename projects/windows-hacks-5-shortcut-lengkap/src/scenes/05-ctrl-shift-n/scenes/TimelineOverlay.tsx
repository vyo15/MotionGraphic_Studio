import {layerStyle} from '../../../editor/LayerStyling';
import React from 'react';
import {Interactive} from 'remotion';
const ease=(v:number)=>{const x=Math.max(0,Math.min(1,v));return x*x*(3-2*x)};
export const TimelineOverlay:React.FC<{t:number}>=({t})=>{
 const active=t<3.4?0:t<6.55?1:t<11.5?2:3;
 const opacity=ease(t/.6)*(1-ease((t-17.65)/.35));
 return <Interactive.Div name="05 — Step-by-step navigation" className="whnSteps" style={{...layerStyle('steps'),opacity}}>
 <div className="whnStepsLine"><i style={{width:`${Math.min(100,100*t/18)}%`}}/></div>
 {['01  KLIK KANAN','02  SHORTCUT','03  FOLDER JADI','04  BONUS'].map((label,i)=><div key={i} className={'whnStep '+(i===active?'active':'')}>{label}</div>)}
 </Interactive.Div>;
};
