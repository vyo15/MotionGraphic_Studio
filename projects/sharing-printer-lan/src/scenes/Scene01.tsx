import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {Topology01} from '../components/Topology01';
import {Captions01} from '../components/Captions01';
import {ramp} from '../animations/motion';
import type {VideoProps} from '../config/props';
export const Scene01:React.FC<VideoProps>=({showSubtitles})=>{
 const f=useCurrentFrame();
 // V4 demo: old topology begins at frame 89, slowed 1.3x, then holds.
 const t=Math.min(275,89+f/1.3)/30;
 const exit=1-ramp(f,260,277);
 // Separate visual anchor: +112 screen pixels after outer 0.8 scale.
 return <AbsoluteFill style={{opacity:ramp(f,0,12)}}>
  <div style={{position:'absolute',inset:0,transform:'translateY(140px)'}}><Topology01 t={t}/></div>
  <div style={{position:'absolute',inset:0,opacity:ramp(f,20,33)*exit}}>
    <Interactive.Div name="S01 — Headline 1 printer" style={{position:'absolute',left:40,top:306.25,width:1000,height:100,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:80,fontWeight:700,lineHeight:1.1,color:'#202020',textAlign:'center'}}>1 PRINTER</Interactive.Div>
  </div>
  <div style={{position:'absolute',inset:0,opacity:ramp(f,125,143)*exit}}>
    <Interactive.Div name="S01 — Headline banyak komputer" style={{position:'absolute',left:40,top:420,width:1000,height:72,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:60,fontWeight:700,lineHeight:1.1,color:'#202020',textAlign:'center'}}>BANYAK KOMPUTER</Interactive.Div>
  </div>
  <Captions01 showSubtitles={showSubtitles}/>
 </AbsoluteFill>;
};
