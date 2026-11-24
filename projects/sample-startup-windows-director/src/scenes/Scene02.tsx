import React from 'react';
import {Audio,Interactive,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {SceneBase,VoGuide} from '../components/SceneBase';
import {Scene02Windows11} from '../components/Scene02Windows11';
import {VideoProps} from '../config/props';

// Selected S02 preview: Windows11 Familiar v4, 480 frames at 30 FPS.
// All steps are native JSX/React UI layers, not an MP4 flattened under a cursor.
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const rise=(t:number,a:number,b:number)=>{const p=clamp((t-a)/(b-a));return p*p*(3-2*p)};
const hold=(t:number,a:number,b:number,c:number,d:number)=>rise(t,a,b)*(1-rise(t,c,d));

export const Scene02:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 return <SceneBase backgroundColor={p.backgroundColor}>
  <Interactive.Div name="S02 Teks — Siapkan shortcut" style={{position:'absolute',top:339+93*(1-rise(t,0,.65)),left:90,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:780,letterSpacing:-2.75,lineHeight:1.12,color:'#202020',fontSize:75,opacity:hold(t,0,.35,2.6,3.1),transform:`translateY(${(1-hold(t,0,.35,2.6,3.1))*21}px)`}}>Siapkan <span style={{color:'#DF805F'}}>shortcut</span><br/>aplikasi atau file.</Interactive.Div>
  <Interactive.Div name="S02 Teks — Pilih file" style={{position:'absolute',top:339,left:90,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:780,letterSpacing:-2.75,lineHeight:1.12,color:'#202020',fontSize:72,opacity:hold(t,2.9,3.3,4.6,5.0),transform:`translateY(${(1-hold(t,2.9,3.3,4.6,5.0))*21}px)`}}>Pilih file yang mau<br/><span style={{color:'#DF805F'}}>dibuka otomatis.</span></Interactive.Div>
  <Interactive.Div name="S02 Teks — Klik kanan" style={{position:'absolute',top:339,left:90,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:780,letterSpacing:-2.75,lineHeight:1.12,color:'#202020',fontSize:72,opacity:hold(t,5.1,5.4,8.5,8.9),transform:`translateY(${(1-hold(t,5.1,5.4,8.5,8.9))*21}px)`}}>Klik kanan →<br/><span style={{color:'#DF805F'}}>Show more options.</span></Interactive.Div>
  <Interactive.Div name="S02 Teks — Send to Desktop" style={{position:'absolute',top:339,left:90,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:780,letterSpacing:-2.75,lineHeight:1.12,color:'#202020',fontSize:74,opacity:hold(t,8.9,9.2,12.65,13.1),transform:`translateY(${(1-hold(t,8.9,9.2,12.65,13.1))*21}px)`}}>Pilih <span style={{color:'#DF805F'}}>Send to</span> → Desktop.</Interactive.Div>
  <Interactive.Div name="S02 Teks — Shortcut siap" style={{position:'absolute',top:339,left:90,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:780,letterSpacing:-2.75,lineHeight:1.12,color:'#202020',fontSize:79,opacity:hold(t,13.6,13.95,16.1,16.5),transform:`translateY(${(1-hold(t,13.6,13.95,16.1,16.5))*21}px)`}}>Shortcut <span style={{color:'#DF805F'}}>sudah siap.</span></Interactive.Div>
  <Scene02Windows11 frame={f}/>
  <Interactive.Div name="S02 Teks — Hasil shortcut" style={{position:'absolute',left:90,right:90,top:1262,textAlign:'center',fontSize:36,fontWeight:650,color:'#56636A',opacity:hold(t,14.4,14.8,16.3,16.6)}}>Shortcut <span style={{color:'#DF805F'}}>berhasil dibuat.</span></Interactive.Div>
  <Sequence name="S02 SFX — klik kanan pada file" from={129} durationInFrames={4} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/single_click_realistic.wav')} volume={0.18}/></Sequence>
  <Sequence name="S02 SFX — Show more options" from={214} durationInFrames={4} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/single_click_realistic.wav')} volume={0.16}/></Sequence>
  <Sequence name="S02 SFX — Desktop shortcut" from={353} durationInFrames={4} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/single_click_realistic.wav')} volume={0.18}/></Sequence>
  <Sequence name="S02 SFX — minimize Explorer" from={410} durationInFrames={4} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/single_click_realistic.wav')} volume={0.15}/></Sequence>
  <VoGuide scene="S02" props={p}/>
 </SceneBase>;
};
