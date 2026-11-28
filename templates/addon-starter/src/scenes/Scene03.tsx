import React from 'react';
import {AbsoluteFill,Interactive,interpolate,useCurrentFrame} from 'remotion';
import {CLAMP} from '../animations/interaction';
export const Scene03:React.FC<{showSubtitles?:boolean}> = ({showSubtitles=true}) => {
 const frame=useCurrentFrame();
 return <AbsoluteFill>
    <Interactive.Div name="S03 — Judul" data-qa-track="S03 — Judul" style={{position:'absolute',left:120,top:570,width:800,height:310,fontFamily:'MG Poppins, Poppins, Arial, sans-serif',fontSize:64,fontWeight:700,color:'#202020',textAlign:'center',lineHeight:1.1,opacity: interpolate(frame,[0,10],[0,1],CLAMP),translate:'0px 0px',scale:1,rotate:'0deg',letterSpacing:'-0.02em'}}>Shortcut apa yang kamu pakai?</Interactive.Div>
    {showSubtitles && frame>=0 && frame<90 ? <Interactive.Div name="S03 — Subtitle 01" data-qa-track="S03 — Subtitle 01" style={{position:'absolute',left:120,top:1483.4,width:800,height:43.2,fontFamily:'MG Inter, Inter, Arial, sans-serif',fontSize:36,fontWeight:500,color:'#646464',textAlign:'center',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg',whiteSpace:'nowrap',letterSpacing:0}}>Coba tulis di komentar.</Interactive.Div> : null}
 </AbsoluteFill>;
};
