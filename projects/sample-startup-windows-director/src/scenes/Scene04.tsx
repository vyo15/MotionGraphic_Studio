import React from 'react';
import {Audio,Interactive,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {SceneBase} from '../components/SceneBase';
import {Scene04Windows11} from '../components/Scene04Windows11';
import {VideoProps} from '../config/props';
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(x:number)=>{const t=clamp(x);return t*t*(3-2*t)};
const r=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
const band=(t:number,a:number,b:number,c:number,d:number)=>r(t,a,b)*(1-r(t,c,d));
// ACC Scene 04 preview 9 seconds: copy desktop shortcut, paste into Startup.
// Retains S01-S03 assets, colors and Windows 11 visual language.
export const Scene04:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const a=band(t,.1,.55,3.2,3.65),b=band(t,3.52,3.9,5.03,5.37),c=band(t,5.2,5.65,8.63,8.97);
 const keyC=band(t,2.25,2.55,3.4,3.75),keyV=band(t,5.25,5.5,6.2,6.5),key=Math.max(keyC,keyV);
 const guide=p.showVoGuide===true&&p.showSubtitles!==false;
 return <SceneBase backgroundColor={p.backgroundColor}>
  <Interactive.Div name="S04 Teks — Copy shortcut tadi" style={{position:'absolute',left:90,top:335,width:900,textAlign:'center',fontSize:77,fontWeight:780,letterSpacing:-2.7,lineHeight:1.08,color:'#202020',opacity:a,transform:`translateY(${(1-a)*18}px)`}}>Copy <span style={{color:'#DF805F'}}>shortcut</span> tadi.</Interactive.Div>
  <Interactive.Div name="S04 Teks — Buka folder Startup" style={{position:'absolute',left:90,top:335,width:900,textAlign:'center',fontSize:77,fontWeight:780,letterSpacing:-2.7,lineHeight:1.08,color:'#202020',opacity:b,transform:`translateY(${(1-b)*18}px)`}}>Buka folder <span style={{color:'#DF805F'}}>Startup.</span></Interactive.Div>
  <Interactive.Div name="S04 Teks — Paste shortcut" style={{position:'absolute',left:90,top:335,width:900,textAlign:'center',fontSize:77,fontWeight:780,letterSpacing:-2.7,lineHeight:1.08,color:'#202020',opacity:c,transform:`translateY(${(1-c)*18}px)`}}>Paste <span style={{color:'#DF805F'}}>shortcut</span>-nya.</Interactive.Div>
  <Interactive.Div name="S04 Keyboard — Ctrl C atau Ctrl V" style={{position:'absolute',top:505,left:0,width:1080,display:'flex',alignItems:'center',justifyContent:'center',gap:12,opacity:key,transform:`translateY(${(1-key)*12}px)`}}><div style={{background:'#fff',border:'1px solid #D1D5D9',borderBottomWidth:5,padding:'7px 18px',borderRadius:10,fontSize:30,fontWeight:720}}>Ctrl</div><span style={{fontSize:27,color:'#8A8A8A'}}>+</span><div style={{background:'#fff',border:'1px solid #D1D5D9',borderBottomWidth:5,padding:'7px 18px',borderRadius:10,fontSize:30,fontWeight:720}}>{keyC>=keyV?'C':'V'}</div></Interactive.Div>
  <Scene04Windows11 frame={f}/>
  <Interactive.Div name="S04 Teks — Hasil shortcut berhasil" style={{position:'absolute',top:1265,left:100,width:880,textAlign:'center',fontSize:36,fontWeight:690,color:'#455D6E',opacity:band(t,6.8,7.2,9.1,9.4)}}>Shortcut <span style={{color:'#DF805F'}}>berhasil ditempel.</span></Interactive.Div>
  <Sequence name="S04 SFX — copy dan paste" from={0} durationInFrames={270} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/scene04-preview-cues.wav')} volume={0.8}/></Sequence>
  {guide?<>
   <Interactive.Div name="S04 VO — Nah tinggal copy shortcut tadi" style={{position:'absolute',left:90,top:1377,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontSize:39,fontWeight:590,lineHeight:1.25,color:'#343434',opacity:band(t,.1,.34,3.05,3.22)}}>Nah, tinggal copy shortcut tadi,</Interactive.Div>
   <Interactive.Div name="S04 VO — lalu paste ke folder Startup" style={{position:'absolute',left:90,top:1377,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontSize:39,fontWeight:590,lineHeight:1.25,color:'#343434',opacity:band(t,3.22,3.42,6.2,6.4)}}>lalu paste ke folder Startup</Interactive.Div>
   <Interactive.Div name="S04 VO — yang terbuka" style={{position:'absolute',left:90,top:1377,width:900,textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif',fontSize:39,fontWeight:590,lineHeight:1.25,color:'#343434',opacity:band(t,6.4,6.55,8.7,9)}}>yang terbuka.</Interactive.Div>
  </>:null}
 </SceneBase>;
};
