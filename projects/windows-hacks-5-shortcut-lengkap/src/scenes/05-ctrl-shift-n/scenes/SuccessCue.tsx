import {layerStyle} from '../../../editor/LayerStyling';
import React from 'react';
import {Interactive} from 'remotion';
const e=(x:number)=>{const a=Math.min(1,Math.max(0,x));return a*a*(3-2*a)};
export const SuccessCue:React.FC<{t:number}>=({t})=>{
 const show=e((t-9.78)/.28)*(1-e((t-11.25)/.38));
 const afterKey=e((t-9.75)/.22)*(1-e((t-10.68)/.32));
 return <>
 <Interactive.Div name="05 · Enter to confirm folder name" className="whnEnterKey" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:615,top:1591,fontSize:21,color:"#a9def3",opacity:afterKey,transform:`translateY(${(1-afterKey)*18}px)`}}>↵ <b>ENTER</b> <span>untuk simpan</span></Interactive.Div>
 <Interactive.Div name="05 · Folder created success badge" className="whnSuccessBadge" style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',left:95,top:1569,fontSize:21,fontWeight:800,color:"#d8ffeb",opacity:show,transform:`scale(${.94+.06*show})`}}>✓ &nbsp; Folder “Konten Baru” tersimpan!</Interactive.Div>
 </>;
};
