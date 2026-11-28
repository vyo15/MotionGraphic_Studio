import React from 'react';import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';import {Topology02} from '../components/Topology02';import {Captions02} from '../components/Captions02';import {ramp} from '../animations/motion';import type {VideoProps} from '../config/props';
export const Scene02:React.FC<VideoProps>=({showSubtitles})=>{const f=useCurrentFrame(),t=f/30;return <AbsoluteFill><div style={{position:'absolute',inset:0,transform:`translateY(${140-40*ramp(t,0,1.2)-100*ramp(t,1.2,2.6)}px)`}}><Topology02 t={t}/></div>{/* ACC V13: one contextual headline per topic, in scene space above diagram. Outer layout scales 0.8. */}
 <div style={{position:'absolute',inset:0,opacity:ramp(f,78,88)*(1-ramp(f,164,168)),transform:`translateY(${10*(1-ramp(f,78,88))}px)`,pointerEvents:'none'}}>
  <Interactive.Div name="S02 — Highlight Printer Sharing" style={{position:'absolute',left:40,top:280,width:1000,height:92,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:80,fontWeight:700,lineHeight:1.1,color:'#202020',textAlign:'center'}}>PRINTER SHARING</Interactive.Div>
 </div>
 <div style={{position:'absolute',inset:0,opacity:ramp(f,168,180)*(1-ramp(f,318,329)),transform:`translateY(${10*(1-ramp(f,168,180))}px)`,pointerEvents:'none'}}>
  <Interactive.Div name="S02 — Highlight jaringan yang sama" style={{position:'absolute',left:40,top:280,width:1000,height:92,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'MG Poppins, sans-serif',fontSize:70,fontWeight:700,lineHeight:1.1,color:'#202020',textAlign:'center'}}>JARINGAN YANG SAMA</Interactive.Div>
 </div>
 <Captions02 showSubtitles={showSubtitles}/></AbsoluteFill>};
