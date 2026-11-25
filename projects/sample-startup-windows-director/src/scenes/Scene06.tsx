import React from 'react';
import {Interactive,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {Scene05Windows11} from '../components/Scene05Windows11';
import {SceneBase} from '../components/SceneBase';
import {VideoProps} from '../config/props';

const cl=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(v:number)=>{const t=cl(v);return t*t*(3-2*t)};
const r=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
/** Five-second animated cover; no VO. The final 2.5 seconds are a stable thumbnail. */
export const Scene06:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const h=r(t,.05,.57),s=r(t,.25,.74),footer=r(t,.93,1.36);
 return <SceneBase backgroundColor={p.backgroundColor}>
   <Interactive.Div name="S06 Transisi — menerima garis coral" style={{position:'absolute',left:470,top:1240,width:140,height:6,borderRadius:6,background:'#DF805F',opacity:1-r(t,.13,.6)}}/>
   <Interactive.Div name="S06 Cover — label tutorial" style={{position:'absolute',left:110,top:310,width:860,textAlign:'center',fontSize:27,fontWeight:720,letterSpacing:5.1,color:'#767E80',opacity:h}}>TIPS WINDOWS 11</Interactive.Div>
   <Interactive.Div name="S06 Cover — judul BUKA APLIKASI" style={{position:'absolute',left:78,top:391,width:924,textAlign:'center',fontSize:81,fontWeight:800,letterSpacing:-3.2,lineHeight:1.06,color:'#202020',opacity:h,translate:`0 ${Math.round((1-h)*23)}px`}}>BUKA APLIKASI</Interactive.Div>
   <Interactive.Div name="S06 Cover — judul OTOMATIS" style={{position:'absolute',left:78,top:477,width:924,textAlign:'center',fontSize:81,fontWeight:800,letterSpacing:-3.2,lineHeight:1.06,color:'#DF805F',opacity:h,translate:`0 ${Math.round((1-h)*23)}px`}}>OTOMATIS</Interactive.Div>
   <Interactive.Div name="S06 Cover — screen demonstration" style={{position:'absolute',inset:0,opacity:s,scale:.96+.04*s,transformOrigin:'center 900px',pointerEvents:'none'}}><Scene05Windows11 seconds={5.2} showHandoff={false}/></Interactive.Div>
   <Interactive.Div name="S06 Cover — ringkasan yang mudah dibaca" style={{position:'absolute',left:120,top:1280,width:840,textAlign:'center',color:'#56616A',fontSize:38,fontWeight:650,lineHeight:1.18,opacity:interpolate(f,[28,41],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Cukup atur sekali di folder <span style={{color:'#DF805F'}}>Startup.</span></Interactive.Div>
 </SceneBase>;
};
