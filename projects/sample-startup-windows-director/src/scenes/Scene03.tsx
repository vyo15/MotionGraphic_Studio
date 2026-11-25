import React from 'react';
import {Audio, Interactive, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {SceneBase} from '../components/SceneBase';
import {Scene03Windows11} from '../components/Scene03Windows11';
import {VideoProps} from '../config/props';

// Visual ACC 2026-11-24: 10 s, Windows 11 Familiar, VO subtitle TEXT ONLY.
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(v:number)=>{const t=clamp(v);return t*t*(3-2*t)};
const ramp=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
const show=(t:number,a:number,b:number,c:number,d:number)=>ramp(t,a,b)*(1-ramp(t,c,d));
export const Scene03:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const guide=p.showVoGuide===true && (p as VideoProps&{showSubtitles?:boolean}).showSubtitles!==false;
 return <SceneBase backgroundColor={p.backgroundColor}>
  <Interactive.Div name="S03 Teks — Buka folder Startup" style={{position:'absolute',top:335,left:95,width:890,textAlign:'center',color:'#202020',fontSize:75,fontWeight:770,letterSpacing:-2.7,lineHeight:1.1,opacity:show(t,.18,.55,.80,1.05),transform:`translateY(${22*(1-ramp(t,.18,.55))}px)`}}>Buka folder <span style={{color:'#DF805F'}}>Startup</span></Interactive.Div>
  <Interactive.Div name="S03 Teks — Tekan Windows R" style={{position:'absolute',top:335,left:95,width:890,textAlign:'center',color:'#202020',fontSize:75,fontWeight:770,letterSpacing:-2.7,lineHeight:1.1,opacity:show(t,1.12,1.46,2.68,3.03),transform:`translateY(${22*(1-ramp(t,1.12,1.46))}px)`}}>Tekan <span style={{color:'#DF805F'}}>Windows + R</span></Interactive.Div>
  <Interactive.Div name="S03 Teks — Ketik perintah" style={{position:'absolute',top:335,left:95,width:890,textAlign:'center',color:'#202020',fontSize:75,fontWeight:770,letterSpacing:-2.7,lineHeight:1.1,opacity:show(t,3.1,3.52,6.0,6.31),transform:`translateY(${22*(1-ramp(t,3.1,3.52))}px)`}}>Ketik perintah ini.</Interactive.Div>
  <Interactive.Div name="S03 Teks — Lalu Enter" style={{position:'absolute',top:335,left:95,width:890,textAlign:'center',color:'#202020',fontSize:75,fontWeight:770,letterSpacing:-2.7,lineHeight:1.1,opacity:show(t,6.34,6.64,7.17,7.45),transform:`translateY(${22*(1-ramp(t,6.34,6.64))}px)`}}>Lalu tekan <span style={{color:'#DF805F'}}>Enter.</span></Interactive.Div>
  <Interactive.Div name="S03 Teks — Folder terbuka" style={{position:'absolute',top:335,left:95,width:890,textAlign:'center',color:'#202020',fontSize:75,fontWeight:770,letterSpacing:-2.7,lineHeight:1.1,opacity:show(t,7.55,7.95,10.1,10.45),transform:`translateY(${22*(1-ramp(t,7.55,7.95))}px)`}}>Folder <span style={{color:'#DF805F'}}>Startup</span> terbuka.</Interactive.Div>
  <Interactive.Div name="S03 Visual — Tombol Windows R" style={{position:'absolute',top:464,left:0,width:1080,display:'flex',alignItems:'center',justifyContent:'center',gap:20,opacity:show(t,1.07,1.40,2.55,2.88),transform:`translateY(${18*(1-ramp(t,1.07,1.40))}px)`}}><div style={{padding:'12px 20px',background:'#fff',border:'2px solid #D9D9D5',borderBottomWidth:7,borderRadius:13,fontSize:42,fontWeight:760}}>⊞ Win</div><span style={{fontSize:38,color:'#929292'}}>+</span><div style={{padding:'12px 30px',background:'#fff',border:'2px solid #D9D9D5',borderBottomWidth:7,borderRadius:13,fontSize:42,fontWeight:760}}>R</div></Interactive.Div>
  <Scene03Windows11 frame={f}/>
  <Sequence name="S03 SFX — keyboard Run dan Enter" from={0} durationInFrames={300} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/scene03-preview-cues.wav')} volume={0.9}/></Sequence>
  {/* Three independent native editable subtitle targets; no box/background. */}
  {guide?<>
   <Interactive.Div name="S03 VO — Selanjutnya tekan Windows R" style={{position:'absolute',left:90,top:1377,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontSize:39,fontWeight:590,lineHeight:1.25,color:'#343434',opacity:show(t,.12,.4,2.68,2.82)}}>Selanjutnya, tekan Windows + R</Interactive.Div>
   <Interactive.Div name="S03 VO — Ketik shell titik dua startup" style={{position:'absolute',left:90,top:1377,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontSize:39,fontWeight:590,lineHeight:1.25,color:'#343434',opacity:show(t,2.82,2.95,6.55,6.7)}}>ketik shell titik dua startup</Interactive.Div>
   <Interactive.Div name="S03 VO — Lalu Enter" style={{position:'absolute',left:90,top:1377,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontSize:39,fontWeight:590,lineHeight:1.25,color:'#343434',opacity:show(t,6.7,6.85,9.65,10)}}>lalu Enter.</Interactive.Div>
  </>:null}
 </SceneBase>;
};
