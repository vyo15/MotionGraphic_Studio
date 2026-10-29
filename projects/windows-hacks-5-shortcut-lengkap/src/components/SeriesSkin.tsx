import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {layerStyle} from '../editor/LayerStyling';
import {useCopy} from '../editor/TextOverrides';
/** Reusable brand skin. Screen-safe and consistent for all five Windows demos. */
export const SeriesSkin:React.FC<{index:number;shortcut:string;duration:number}>=({index,shortcut,duration})=>{
 const copy=useCopy();
 const frame=useCurrentFrame();
 const progress=Math.min(1,Math.max(0,frame/Math.max(1,duration)));
 return <AbsoluteFill style={{pointerEvents:'none',fontFamily:'Inter, Segoe UI, Arial,sans-serif'}}>
  <Interactive.Div name="Identitas Seri · Header" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',left:70,top:164,right:70,display:'flex',justifyContent:'space-between',alignItems:'center',color:'#d7f1ff',fontWeight:900,letterSpacing:2.8,fontSize:19,background:'rgba(8,27,44,.70)',border:'1px solid rgba(111,215,249,.16)',padding:'12px 20px',borderRadius:15,pointerEvents:'auto'}}>
    <span style={{color:'#67E8F9'}}>● WINDOWS HACKS</span><span style={{fontSize:17,color:'#9bbbd5'}}>TIPS {String(index).padStart(2,'0')} / 05</span>
  </Interactive.Div>
  <Interactive.Div name="Identitas Seri · Footer" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',position:'absolute',left:68,right:68,bottom:175,height:70,borderTop:'1px solid #6dcce73b',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:20,color:'#b5cddd',letterSpacing:1.3,pointerEvents:'auto'}}>
    <Interactive.Div name="Footer · Label Seri" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}>WINDOWS 11 · SHORTCUT SERIES</Interactive.Div>
    <strong style={{color:'#9FF6C7',fontSize:23}}>{copy("footer-shortcut",shortcut)}</strong>
  </Interactive.Div>
 </AbsoluteFill>;
};
