import React from 'react';
import {AbsoluteFill,Interactive,interpolate,useCurrentFrame} from 'remotion';
import {WindowsMark} from '../components/VisualGlyphs';
import {CLAMP} from '../animations/interaction';
export const Scene04:React.FC<{showSubtitles?:boolean}> = ({showSubtitles=true}) => {
 const frame=useCurrentFrame();
 return <AbsoluteFill>
    {frame<42 ? <Interactive.Div name="S04 — Mini shortcut" data-qa-track="S04 — Mini shortcut" style={{position:'absolute',left:160,top:620,width:720,height:150,fontFamily:'MG Poppins, Poppins, Arial, sans-serif',fontSize:80,fontWeight:700,color:'#202020',textAlign:'center',backgroundColor:frame>=12&&frame<22?'#DF805F':'#FFFFFF',borderRadius:18,lineHeight:'150px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Win + R</Interactive.Div> : null}
    {frame>=22&&frame<42 ? <Interactive.Div name="S04 — Mini Run" data-qa-track="S04 — Mini Run" style={{position:'absolute',left:190,top:850,width:660,height:180,fontFamily:'MG Poppins, Poppins, Arial, sans-serif',fontSize:68,fontWeight:700,color:'#202020',textAlign:'center',backgroundColor:'#FFFFFF',border:'2px solid #E7E7E5',borderRadius:12,lineHeight:'180px',opacity:interpolate(frame,[22,30],[0,1],CLAMP),translate:'0px 0px',scale:1,rotate:'0deg'}}>Run</Interactive.Div> : null}
    {frame>=42 ? <Interactive.Div name="S04 — Judul" data-qa-track="S04 — Judul" style={{position:'absolute',left:120,top:500,width:800,height:96,fontFamily:'MG Poppins, Poppins, Arial, sans-serif',fontSize:80,fontWeight:800,color:'#202020',textAlign:'center',lineHeight:1.05,opacity: interpolate(frame,[42,58],[0,1],CLAMP),translate:'0px 0px',scale:1,rotate:'0deg',letterSpacing:'-0.02em'}}>Win + R</Interactive.Div> : null}
    {frame>=42 ? <Interactive.Div name="S04 — Hero" data-qa-track="S04 — Hero" style={{position:'absolute',left:120,top:608,width:800,height:160,fontFamily:'MG Poppins, Poppins, Arial, sans-serif',fontSize:64,fontWeight:700,color:'#202020',textAlign:'center',lineHeight:1.1,opacity: interpolate(frame,[42,58],[0,1],CLAMP),translate:'0px 0px',scale:1,rotate:'0deg',letterSpacing:'-0.02em'}}>Buka Run dalam sekejap</Interactive.Div> : null}
    {frame>=42 ? <Interactive.Div name="S04 — Windows" data-qa-track="S04 — Windows" style={{position:'absolute',left:420,top:850,width:200,height:200,opacity: interpolate(frame,[42,58],[0,1],CLAMP),translate:'0px 0px',scale:1,rotate:'0deg',}}><WindowsMark/></Interactive.Div> : null}
 </AbsoluteFill>;
};
