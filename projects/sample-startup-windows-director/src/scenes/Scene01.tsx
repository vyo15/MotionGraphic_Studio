import React from 'react';
import {AbsoluteFill,Audio,Interactive,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {VoGuide} from '../components/SceneBase';
import {VideoProps} from '../config/props';
import {AppPreviewCards,WorkDesktop} from '../components/WorkWindows';

// S01: visual ACC review (2026-11-25). Frame-locked 855 frames, 30 FPS.
// 09–17: Windows 11 login → Excel → Gmail → ERP; windows stay in place.
// 19.90–26.70: question and answer are separate editorial beats.
// 26.70–28.50: handoff to Scene02. VO text and total scene duration unchanged.
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(x:number)=>{const v=clamp(x);return v*v*(3-2*v)};
const ramp=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const hold=(t:number,a:number,b:number)=>ramp(t,a,a+.4)*(1-ramp(t,b-.36,b));
const lift=(t:number,a:number)=>`${Math.round(24*(1-ramp(t,a,a+.44)))}px`;

export const Scene01:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 // The previous app-card beat fully leaves BEFORE the Windows desktop enters.
 const proof=ramp(t,9.03,9.53)*(1-ramp(t,16.88,17.27));
 const signedIn=ramp(t,10.62,11.04);
 const excel=ramp(t,11.58,12.08),gmail=ramp(t,12.68,13.21),erp=ramp(t,14.05,14.54);
 const questionTime=t-19.90;
 // S01 narrow transition fix: previous title exits before the question enters.
 // The question reaches full contrast quickly, while its position settles more slowly.
 const questionIn=ramp(t,19.70,20.23),questionFade=ramp(t,19.70,19.93);
 const questionOut=ramp(questionTime,1.77,2.06);
 const questionOpacity=questionFade*(1-questionOut);
 const answerIn=ramp(questionTime,2.12,2.48),answerOut=ramp(questionTime,3.79,4.13);
 const answerOpacity=answerIn*(1-answerOut);
 const tutorialIn=ramp(questionTime,4.21,4.62),tutorialOut=ramp(questionTime,6.52,6.80);
 const tutorialOpacity=tutorialIn*(1-tutorialOut);
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor??'#F7F7F5',color:'#202020',fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
  <Interactive.Div name="S01 Teks — Pernah nggak sih kepikiran" style={{position:'absolute',left:94,top:607,width:892,textAlign:'center',fontSize:91,fontWeight:750,letterSpacing:-2.8,lineHeight:1.09,opacity:hold(t,0,3.25),translate:`0 ${lift(t,0)}`}}>
    Pernah nggak sih<br/><span style={{color:'#DF805F'}}>kepikiran?</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Gimana kalau mulai kerja" style={{position:'absolute',left:98,top:570,width:884,textAlign:'center',fontSize:86,fontWeight:750,letterSpacing:-3.1,lineHeight:1.12,opacity:hold(t,2.86,6.08),translate:`0 ${lift(t,2.86)}`}}>
    <span style={{color:'#555'}}>Gimana kalau</span><br/>setiap mulai kerja...
  </Interactive.Div>
  <AppPreviewCards progress={ramp(t,3.45,5.45)} opacity={hold(t,3.08,8.99)}/>
  <Interactive.Div name="S01 Teks — Aplikasi otomatis" style={{position:'absolute',left:105,top:498,width:870,textAlign:'center',fontSize:81,fontWeight:760,letterSpacing:-2.5,lineHeight:1.14,opacity:hold(t,5.76,8.98),translate:`0 ${lift(t,5.76)}`}}>
    semua aplikasi<br/><span style={{color:'#DF805F'}}>langsung kebuka sendiri</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Baru login Windows 11" style={{position:'absolute',left:150,top:566,width:780,color:'#5E6061',fontSize:29,fontWeight:450,textAlign:'center',opacity:proof*(1-ramp(t,11.05,11.27))}}>
    Baru login Windows 11
  </Interactive.Div>
  <WorkDesktop desktopOpacity={proof} enter={ramp(t,9.03,9.53)} signIn={1-signedIn} excel={excel} gmail={gmail} erp={erp}/>
  <Interactive.Div name="S01 Teks — Tanpa buka satu satu" style={{position:'absolute',left:110,top:1250,width:860,textAlign:'center',fontSize:65,fontWeight:780,letterSpacing:-1.8,lineHeight:1.1,opacity:proof*ramp(t,12.9,13.30),translate:`0 ${Math.round((1-ramp(t,12.9,13.30))*16)}px`}}>
    Tanpa harus<br/><span style={{color:'#DF805F'}}>buka satu-satu?</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Kursor diam" style={{position:'absolute',left:120,top:1451,width:840,color:'#818181',fontSize:30,fontWeight:450,textAlign:'center',opacity:proof*ramp(t,15.28,15.73)}}>
    Kursor tetap diam. Aplikasinya terbuka sendiri.
  </Interactive.Div>
  {/* Separate question and answer: typography stays in the approved editorial system.
      No fullscreen crossfade; only one message is visible at a time. */}
  <Interactive.Div name="S01 Teks — Kayaknya praktis banget" style={{position:'absolute',left:95,top:797,width:890,textAlign:'center',fontSize:99,fontWeight:760,letterSpacing:-4,lineHeight:1.115,opacity:ramp(t,17.44,17.97)*(1-ramp(t,19.27,19.76)),translate:`0 ${26*(1-ramp(t,17.44,17.97))-19*ramp(t,19.27,19.76)}px`,scale:1-.016*ramp(t,19.27,19.76)}}>
    Kayaknya <span style={{color:'#DF805F'}}>praktis</span><span style={{display:'block',marginTop:11}}>banget, kan?</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Emang bisa" style={{position:'absolute',left:65,top:833,width:950,textAlign:'center',fontSize:126,fontWeight:800,letterSpacing:-6.1,lineHeight:1.13,whiteSpace:'nowrap',opacity:questionOpacity,translate:`0 ${(1-questionIn)*19-questionOut*13}px`,scale:.987+.013*questionIn-.016*questionOut}}>
    Emang bisa<span style={{color:'#DF805F'}}>?</span>
  </Interactive.Div>
  <Interactive.Div name="S01 Aksen — Tanda tanya kiri atas" style={{position:'absolute',left:225,top:656,fontSize:67,fontWeight:650,color:'#B6A7A0',opacity:ramp(questionTime,.11,.53)*(1-ramp(questionTime,1.70,2.03))*.38,translate:`${Math.round(-1*((1-ramp(questionTime,.11,.53))*18+Math.sin((questionTime-.11)*1.5)*7+questionOut*20))}px ${Math.round((1-ramp(questionTime,.11,.53))*13+questionOut*21)}px`,rotate:'10deg'}}>?</Interactive.Div>
  <Interactive.Div name="S01 Aksen — Tanda tanya kanan atas" style={{position:'absolute',left:819,top:700,fontSize:69,fontWeight:650,color:'#DF805F',opacity:ramp(questionTime,.24,.66)*(1-ramp(questionTime,1.70,2.03))*.52,translate:`${Math.round((1-ramp(questionTime,.24,.66))*18+Math.sin((questionTime-.24)*1.5+1)*7+questionOut*20)}px ${Math.round(-((1-ramp(questionTime,.24,.66))*13+questionOut*21))}px`,rotate:'-12deg'}}>?</Interactive.Div>
  <Interactive.Div name="S01 Aksen — Tanda tanya kiri bawah" style={{position:'absolute',left:285,top:1080,fontSize:58,fontWeight:650,color:'#BAACA4',opacity:ramp(questionTime,.35,.77)*(1-ramp(questionTime,1.70,2.03))*.38,translate:`${Math.round((1-ramp(questionTime,.35,.77))*18+Math.sin((questionTime-.35)*1.5+2)*7+questionOut*20)}px ${Math.round((1-ramp(questionTime,.35,.77))*13+questionOut*21)}px`,rotate:'10deg'}}>?</Interactive.Div>
  <Interactive.Div name="S01 Aksen — Tanda tanya kanan bawah" style={{position:'absolute',left:802,top:1121,fontSize:52,fontWeight:650,color:'#DF805F',opacity:ramp(questionTime,.44,.86)*(1-ramp(questionTime,1.70,2.03))*.52,translate:`${Math.round(-((1-ramp(questionTime,.44,.86))*18+Math.sin((questionTime-.44)*1.5+3)*7+questionOut*20))}px ${Math.round(-((1-ramp(questionTime,.44,.86))*13+questionOut*21))}px`,rotate:'-12deg'}}>?</Interactive.Div>
  <Interactive.Div name="S01 Visual — Halo jawaban" style={{position:'absolute',left:293,top:870,width:498,height:225,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(223,128,95,.09) 0%,rgba(223,128,95,0) 70%)',opacity:answerOpacity*ramp(questionTime,2.34,2.87)*.78}}/>
  <Interactive.Div name="S01 Teks — Jawabannya bisa" style={{position:'absolute',left:90,top:780,width:900,textAlign:'center',fontSize:74,fontWeight:710,letterSpacing:-2.9,lineHeight:1.17,color:'#686868',opacity:answerOpacity,translate:`0 ${Math.round((1-answerIn)*20-answerOut*14)}px`}}>
    Jawabannya
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — BISA tegas" style={{position:'absolute',left:90,top:864,width:900,textAlign:'center',fontSize:204,fontWeight:840,letterSpacing:-10,lineHeight:1.15,color:'#DF805F',opacity:answerOpacity*ramp(questionTime,2.30,2.76),translate:`0 ${Math.round((1-ramp(questionTime,2.35,2.83))*31-answerOut*14)}px`,scale:.93+.07*ramp(questionTime,2.35,2.83)}}>
    BISA!
  </Interactive.Div>
  <Interactive.Div name="S01 Visual — Aksen jawaban tegas" style={{position:'absolute',top:909,left:886,width:102,height:88,opacity:answerOpacity*ramp(questionTime,2.68,2.93),scale:.75+.25*ramp(questionTime,2.66,2.97)}}>
    <span style={{position:'absolute',top:3,left:26,width:10,height:33,borderRadius:8,backgroundColor:'#DF805F',rotate:'-27deg',opacity:.82}}/>
    <span style={{position:'absolute',top:0,left:56,width:10,height:30,borderRadius:8,backgroundColor:'#DF805F',rotate:'17deg',opacity:.82}}/>
    <span style={{position:'absolute',top:29,left:79,width:10,height:26,borderRadius:8,backgroundColor:'#DF805F',rotate:'61deg',opacity:.82}}/>
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Masuk ke cara" style={{position:'absolute',top:827,left:100,width:880,textAlign:'center',fontSize:86,fontWeight:770,color:'#666',whiteSpace:'nowrap',lineHeight:1.12,letterSpacing:-3.5,opacity:tutorialOpacity,translate:`0 ${Math.round((1-tutorialIn)*27-tutorialOut*8)}px`}}>
    Oke, sekarang
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Tutorial baris dua" style={{position:'absolute',top:924,left:100,width:880,textAlign:'center',fontSize:91,fontWeight:810,color:'#202020',whiteSpace:'nowrap',lineHeight:1.12,letterSpacing:-3.5,opacity:tutorialOpacity,translate:`0 ${Math.round((1-tutorialIn)*27-tutorialOut*8)}px`}}>
    kita coba caranya.
  </Interactive.Div>
  <Interactive.Div name="S01 Visual — Aksen coral menyambung ke tutorial" style={{position:'absolute',left:248,top:1104,width:584,height:2,backgroundColor:'#E8C7B8',opacity:tutorialOpacity*ramp(questionTime,4.75,5.15),scale:.58+.42*ramp(questionTime,4.75,5.15)}}/>
  <Interactive.Div name="S01 Teks — Masuk ke langkah pertama" style={{position:'absolute',left:138,top:1175,width:804,textAlign:'center',fontSize:33,fontWeight:400,color:'#696969',opacity:tutorialOpacity*ramp(questionTime,5.09,5.47),translate:`0 ${Math.round(15*(1-ramp(questionTime,5.09,5.47)))}px`}}>
    Masuk ke langkah pertama
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Siapkan shortcut" style={{position:'absolute',left:90,top:432,width:900,textAlign:'center',fontSize:77,fontWeight:770,letterSpacing:-2.2,lineHeight:1.12,opacity:hold(t,26.70,28.5),translate:`0 ${lift(t,26.70)}`}}>
    Siapkan <span style={{color:'#DF805F'}}>shortcut</span><br/>aplikasi atau file.
  </Interactive.Div>
  <Interactive.Div name="S01 Teks — Nama contoh file" style={{position:'absolute',left:140,top:665,width:800,textAlign:'center',fontSize:35,color:'#666',fontWeight:500,opacity:hold(t,26.70,28.5)*ramp(t,27.0,27.35)}}>Contoh: Laporan Kerja.xlsx</Interactive.Div>
  <Interactive.Div name="S01 Visual — File explorer pengantar" style={{position:'absolute',left:130,top:850,width:820,height:382,borderRadius:13,backgroundColor:'#fff',boxShadow:'0 18px 48px #152E4933',border:'1px solid #DEE3E5',overflow:'hidden',opacity:hold(t,26.70,28.5)*ramp(t,27.05,27.48),translate:`0 ${Math.round((1-ramp(t,27.05,27.48))*20)}px`}}>
   <div style={{height:61,background:'#F7F9FA',padding:'15px 21px',fontSize:25,color:'#404952'}}>📁　Dokumen <span style={{float:'right',fontSize:22,color:'#667'}}>─　□　×</span></div>
   <div style={{height:58,borderTop:'1px solid #E9ECEE',borderBottom:'1px solid #E9ECEE',padding:'13px 25px',fontSize:21,color:'#6B747C'}}>‹　›　 ⌂　 ›　 Dokumen　 ›　 Kerja</div>
   <div style={{padding:'18px 26px',color:'#777',fontSize:20}}>Nama　　　　　　　　　　　　 Jenis</div>
   <div style={{margin:'0 24px',padding:'14px 18px',background:'#E8F3FA',border:'1px solid #CBE3F2',borderRadius:5,fontSize:22,color:'#27333C'}}>🟩　Laporan Kerja.xlsx <span style={{fontSize:17,float:'right'}}>Microsoft Excel</span></div>
  </Interactive.Div>
  <Sequence name="S01 SFX — Jawaban tegas" from={677} durationInFrames={13} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/soft_editorial_tick.wav')} volume={0.20}/></Sequence>
  <Sequence name="S01 SFX — Pengantar tutorial" from={732} durationInFrames={13} layout="none"><Audio src={staticFile('videos/sample-startup-windows-director/audio/sfx/soft_editorial_tick.wav')} volume={0.15}/></Sequence>
  <VoGuide scene="S01" props={p}/>
 </AbsoluteFill>;
};
