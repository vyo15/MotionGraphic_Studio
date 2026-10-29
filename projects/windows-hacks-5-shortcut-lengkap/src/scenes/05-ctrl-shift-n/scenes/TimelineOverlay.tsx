import {layerStyle} from '../../../editor/LayerStyling';
import {useCopy} from '../../../editor/TextOverrides';
import React from 'react';
import {Interactive} from 'remotion';
const ease=(v:number)=>{const x=Math.max(0,Math.min(1,v));return x*x*(3-2*x)};
export const TimelineOverlay:React.FC<{t:number}>=({t})=>{
 const copy=useCopy();
 const active=t<3.4?0:t<6.55?1:t<11.5?2:3;
 const opacity=ease(t/.6)*(1-ease((t-17.65)/.35));
 return <Interactive.Div name="05 · Step-by-step navigation" className="whnSteps" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',opacity}}>
 <Interactive.Div name="05 · Tahapan · Jalur" className="whnStepsLine" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:0,top:47}}><Interactive.Div name="05 · Tahapan · Progress Bergerak" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',width:`${Math.min(100,100*t/18)}%`,height:'100%',background:'#67E8F9',borderRadius:9}}/></Interactive.Div>
 <Interactive.Div name="05 · Tahap 1 · Klik Kanan" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'whnStep '+(active===0?'active':'')}>{copy("step-1","01 · KLIK KANAN")}</Interactive.Div>
 <Interactive.Div name="05 · Tahap 2 · Shortcut" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'whnStep '+(active===1?'active':'')}>{copy("step-2","02 · SHORTCUT")}</Interactive.Div>
 <Interactive.Div name="05 · Tahap 3 · Folder Jadi" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'whnStep '+(active===2?'active':'')}>{copy("step-3","03 · FOLDER JADI")}</Interactive.Div>
 <Interactive.Div name="05 · Tahap 4 · Bonus" style={{position:'absolute',translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}} className={'whnStep '+(active===3?'active':'')}>{copy("step-4","04 · BONUS")}</Interactive.Div>
 </Interactive.Div>;
};
