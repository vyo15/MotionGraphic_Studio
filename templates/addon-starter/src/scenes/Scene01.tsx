import React from 'react';
import {AbsoluteFill,Interactive,interpolate,useCurrentFrame} from 'remotion';
import {CLAMP} from '../animations/interaction';
export const Scene01:React.FC<{showSubtitles?:boolean}> = ({showSubtitles=true}) => {
 const frame=useCurrentFrame();
 return <AbsoluteFill>
    <Interactive.Div name="S01 — Judul" data-qa-track="S01 — Judul" style={{position:'absolute',left:120,top:565,width:800,height:210,fontFamily:'MG Poppins, Poppins, Arial, sans-serif',fontSize:84,fontWeight:800,color:'#202020',textAlign:'center',lineHeight:1.05,opacity: interpolate(frame,[0,12],[0,1],CLAMP),translate:'0px 0px',scale:1,rotate:'0deg',letterSpacing:'-0.03em'}}>Buka lebih cepat.</Interactive.Div>
    {showSubtitles && frame>=0 && frame<90 ? <Interactive.Div name="S01 — Subtitle 01" data-qa-track="S01 — Subtitle 01" style={{position:'absolute',left:120,top:1483.4,width:800,height:43.2,fontFamily:'MG Inter, Inter, Arial, sans-serif',fontSize:36,fontWeight:500,color:'#646464',textAlign:'center',lineHeight:1.2,translate:'0px 0px',scale:1,rotate:'0deg',whiteSpace:'nowrap',letterSpacing:0}}>Mau buka Run tanpa mencari menu?</Interactive.Div> : null}
 </AbsoluteFill>;
};
