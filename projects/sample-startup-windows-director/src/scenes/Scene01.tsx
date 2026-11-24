import React from 'react';
import {AbsoluteFill,Audio,Interactive,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {VoGuide} from '../components/SceneBase';
import {VideoProps} from '../config/props';
import {AppPreviewCards,WorkDesktop} from '../components/WorkWindows';

// Frame-based S01; 0–17s approved Living Windows visuals remain unchanged.
// 17–26s Clean Motion v3: connected typography, single coral accent, no badges/icons.
// Timing and VO are unchanged; scene remains 855 frames at 30 fps.
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(x:number)=>{const v=clamp(x);return v*v*(3-2*v)};
const ramp=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const hold=(t:number,a:number,b:number)=>ramp(t,a,a+.4)*(1-ramp(t,b-.36,b));
const lift=(t:number,a:number)=>`${Math.round(24*(1-ramp(t,a,a+.44)))}px`;

export const Scene01:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const proof=hold(t,9.25,17.2);
 const signedIn=ramp(t,10.6,11.05);
 const excel=ramp(t,11.68,12.36),gmail=ramp(t,12.9,13.58),erp=ramp(t,14.14,14.88);
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor??'#F7F7F5',color:'#202020',fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
  <Interactive.Div name="S01 Teks — Pernah nggak sih kepikiran" style={{position:'absolute',left:94,top:607,width:892,textAlign:'center',fontSize:91,fontWeight:750,letterSpacing:-2.8,lineHeight:1.09,opacity:hold(t,0,3.25),translate:`0 ${lift(t,0)}`}}>
    Pernah nggak sih<br/><span style={{color:'#DF805F'}}>kepikiran?</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Gimana kalau mulai kerja" style={{position:'absolute',left:98,top:570,width:884,textAlign:'center',fontSize:86,fontWeight:750,letterSpacing:-3.1,lineHeight:1.12,opacity:hold(t,2.86,6.08),translate:`0 ${lift(t,2.86)}`}}>
    <span style={{color:'#555'}}>Gimana kalau</span><br/>setiap mulai kerja...
  </Interactive.Div>
  <AppPreviewCards progress={ramp(t,3.45,5.45)} opacity={hold(t,3.08,9.3)}/>
  <Interactive.Div name="S01 Teks — Aplikasi otomatis" style={{position:'absolute',left:105,top:498,width:870,textAlign:'center',fontSize:81,fontWeight:760,letterSpacing:-2.5,lineHeight:1.14,opacity:hold(t,5.76,9.46),translate:`0 ${lift(t,5.76)}`}}>
    semua aplikasi<br/><span style={{color:'#DF805F'}}>langsung kebuka sendiri</span>
  </Interactive.Div>
  <WorkDesktop desktopOpacity={proof} signIn={1-signedIn} excel={excel} gmail={gmail} erp={erp}/>
  <Interactive.Div name="S01 Teks — Tanpa buka satu satu" style={{position:'absolute',left:110,top:1250,width:860,textAlign:'center',fontSize:65,fontWeight:780,letterSpacing:-1.8,lineHeight:1.1,opacity:proof*ramp(t,13.4,14.4),translate:`0 ${Math.round((1-ramp(t,13.4,14.4))*16)}px`}}>
    Tanpa harus<br/><span style={{color:'#DF805F'}}>buka satu-satu?</span>
  </Interactive.Div>
  {/* S01 Clean Motion v3: connected typography from proof to answer to tutorial.
      All prominent elements remain individual named Studio targets. */}
  <Interactive.Div name="S01 Teks — Kayaknya praktis banget" style={{position:'absolute',left:95,top:797,width:890,textAlign:'center',fontSize:99,fontWeight:760,letterSpacing:-4,lineHeight:1.115,opacity:ramp(t,17.44,17.97)*(1-ramp(t,19.32,19.85)),translate:`0 ${Math.round(26*(1-ramp(t,17.44,17.97))-23*ramp(t,19.32,19.85))}px`,scale:1-.022*ramp(t,19.32,19.85)}}>
    Kayaknya <span style={{color:'#DF805F'}}>praktis</span><span style={{display:'block',marginTop:11}}>banget, kan?</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Emang bisa" style={{position:'absolute',left:70,top:791,width:940,display:'flex',justifyContent:'center',alignItems:'baseline',gap:27,whiteSpace:'nowrap',textAlign:'center',fontSize:118,fontWeight:790,letterSpacing:-4.4,lineHeight:1.2,opacity:ramp(t,19.74,20.19)*(1-ramp(t,22.7,23.18)),translate:`0 ${Math.round(28*(1-ramp(t,19.74,20.19))-130*ramp(t,21.12,21.67))}px`,scale:1-.22*ramp(t,21.12,21.67)}}>
    Emang <span>bisa<span style={{color:'#DF805F'}}>?</span></span>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Jawabannya bisa" style={{position:'absolute',left:100,top:918,width:880,textAlign:'center',fontSize:68,fontWeight:700,letterSpacing:-2.4,color:'#444',lineHeight:1.06,opacity:ramp(t,21.29,21.79)*(1-ramp(t,23.22,23.78)),translate:`0 ${Math.round(26*(1-ramp(t,21.29,21.79))-24*ramp(t,23.22,23.78))}px`,scale:.95+.05*ramp(t,21.29,21.79)}}>
    Jawabannya<span style={{display:'block',fontWeight:830,letterSpacing:-5.2,fontSize:153,color:'#DF805F',marginTop:13}}>BISA!</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Visual — Aksen coral menyambung ke tutorial" style={{position:'absolute',left:540-(250+220*ramp(t,23.34,24.05))/2,top:1172-107*ramp(t,23.34,24.05),width:250+220*ramp(t,23.34,24.05),height:26-24*ramp(t,23.34,24.05),borderRadius:99,backgroundColor:'#F2DBD0',opacity:ramp(t,21.62,22.14)*(1-ramp(t,25.6,25.98))*(1-.18*ramp(t,23.34,24.05))}} />
  <Interactive.Div name="S01 Teks — Masuk ke cara" style={{position:'absolute',left:80,top:822,width:920,textAlign:'center',fontSize:94,fontWeight:775,letterSpacing:-3.65,lineHeight:1.09,opacity:ramp(t,23.52,24.04)*(1-ramp(t,25.83,26.32)),translate:`0 ${Math.round(29*(1-ramp(t,23.52,24.04)))}px`}}>
    <span style={{color:'#646464',fontWeight:680}}>Oke, sekarang</span><br/>kita coba caranya.
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Masuk ke langkah pertama" style={{position:'absolute',left:60,top:1128,width:960,textAlign:'center',fontSize:35,fontWeight:420,letterSpacing:-.3,color:'#626262',opacity:ramp(t,24.23,24.73)*(1-ramp(t,25.83,26.3)),translate:`0 ${Math.round(18*(1-ramp(t,24.23,24.73)))}px`}}>
    Masuk ke langkah pertama
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Siapkan shortcut" style={{position:'absolute',left:90,top:432,width:900,textAlign:'center',fontSize:77,fontWeight:770,letterSpacing:-2.2,lineHeight:1.12,opacity:hold(t,26.0,28.5),translate:`0 ${lift(t,26)}`}}>
    Siapkan <span style={{color:'#DF805F'}}>shortcut</span><br/>aplikasi atau file.
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Nama contoh file" style={{position:'absolute',left:140,top:665,width:800,textAlign:'center',fontSize:35,color:'#666',fontWeight:500,opacity:hold(t,26,28.5)*ramp(t,26.5,26.9)}}>Contoh: Laporan Kerja.xlsx</Interactive.Div>
  <Interactive.Div name="S01 Visual — File explorer pengantar" style={{position:'absolute',left:130,top:850,width:820,height:382,borderRadius:13,backgroundColor:'#fff',boxShadow:'0 18px 48px #152E4933',border:'1px solid #DEE3E5',overflow:'hidden',opacity:hold(t,26,28.5)*ramp(t,26.4,26.85),translate:`0 ${Math.round((1-ramp(t,26.4,26.85))*20)}px`}}>
   <div style={{height:61,background:'#F7F9FA',padding:'15px 21px',fontSize:25,color:'#404952'}}>📁　Dokumen <span style={{float:'right',fontSize:22,color:'#667'}}>─　□　×</span></div>
   <div style={{height:58,borderTop:'1px solid #E9ECEE',borderBottom:'1px solid #E9ECEE',padding:'13px 25px',fontSize:21,color:'#6B747C'}}>‹　›　 ⌂　 ›　 Dokumen　 ›　 Kerja</div>
   <div style={{padding:'18px 26px',color:'#777',fontSize:20}}>Nama　　　　　　　　　　　　 Jenis</div>
   <div style={{margin:'0 24px',padding:'14px 18px',background:'#E8F3FA',border:'1px solid #CBE3F2',borderRadius:5,fontSize:22,color:'#27333C'}}>🟩　Laporan Kerja.xlsx <span style={{fontSize:17,float:'right'}}>Microsoft Excel</span></div>
  </Interactive.Div>
  <Sequence name="S01 SFX — Jawaban tegas" from={643} durationInFrames={13} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/soft_editorial_tick.wav')} volume={0.20}/></Sequence>
  <Sequence name="S01 SFX — Pengantar tutorial" from={712} durationInFrames={13} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/soft_editorial_tick.wav')} volume={0.15}/></Sequence>
  <VoGuide scene="S01" props={p}/>
 </AbsoluteFill>;
};
