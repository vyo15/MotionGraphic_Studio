import React from 'react';
import {Interactive,useCurrentFrame,interpolate} from 'remotion';
import {SceneBase,VoGuide} from '../components/SceneBase';
import {Desktop,Sheet} from '../components/WindowsUI';
import {VideoProps} from '../config/props';
const fade=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const Scene05:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const login=f<104,cta=f>=187;
 return <SceneBase section="05 / HASIL & KOMENTAR" backgroundColor={p.backgroundColor}>
  <Interactive.Div name="S05 — Judul hasil" style={{position:'absolute',left:86,top:348,width:920,fontSize:70,color:'#202020',fontWeight:800,opacity:interpolate(f,[0,15,82,108],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Buka otomatis!</Interactive.Div>
  <Interactive.Div name="S05 — Login dan hasil" style={{position:'absolute',left:100,top:552,width:880,height:690,opacity:fade(f,0,14)}}>
   <Desktop>
    {login?<div style={{position:'absolute',inset:0,zIndex:30,background:'linear-gradient(145deg,#0F6DAB,#0B2857)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12,color:'white'}}><div style={{fontSize:76,fontWeight:300}}>09:41</div><div style={{fontSize:34}}>Vio</div><div style={{fontSize:24}}>Welcome</div></div>:null}
    {!login?<div style={{position:'absolute',left:105,top:82,transform:'scale(.72)',transformOrigin:'top left',opacity:fade(f,105,133)}}><Sheet/></div>:null}
   </Desktop>
  </Interactive.Div>
  {f>=138&&!cta?<Interactive.Div name="S05 — Label tanpa klik" style={{position:'absolute',left:330,top:1287,width:420,fontSize:42,background:'#E8F7EC',borderRadius:17,padding:17,textAlign:'center',color:'#166B3C',fontWeight:800}}>✓ Tanpa klik</Interactive.Div>:null}
  {cta?<Interactive.Div name="S05 — CTA komentar" style={{position:'absolute',left:101,top:1328,width:878,fontSize:47,lineHeight:1.15,textAlign:'center',fontWeight:800,color:'#202020',opacity:fade(f,187,202)}}>Aplikasi apa yang paling sering kamu buka?</Interactive.Div>:null}
  {cta?<Interactive.Div name="S05 — CTA ajakan" style={{position:'absolute',left:212,top:1460,width:656,fontSize:32,lineHeight:1.1,textAlign:'center',fontWeight:700,color:'#DF805F',opacity:fade(f,211,226)}}>Coba tulis di komentar!</Interactive.Div>:null}
  <VoGuide props={p} scene="S05"/>
 </SceneBase>;
};
