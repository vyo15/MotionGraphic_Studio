import React from 'react';
import {AbsoluteFill, Img, Interactive, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {SeriesBackground} from '../components/SeriesBackground';

// CTA V10 — setiap teks, portrait dan elemen visual utama adalah layer independen.
// Animasi di wrapper; properti layout editable tetap berupa angka literal dalam JSX.
const inOut=(f:number,start:number,end:number)=>interpolate(f,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const CTA:React.FC=()=>{
 const frame=useCurrentFrame();
 const {fps,durationInFrames}=useVideoConfig();
 const enter=spring({frame:frame-6,fps,config:{damping:20,stiffness:125,mass:.83}});
 const photo=spring({frame:frame-30,fps,config:{damping:20,stiffness:135,mass:.8}});
 const end=Math.min(1,Math.max(0,(durationInFrames-frame-1)/10));
 const reveal=inOut(frame,8,21)*end;
 const photoReveal=Math.max(0,photo)*end;
 return <AbsoluteFill style={{fontFamily:'Inter, Segoe UI, Arial,sans-serif',color:'#FFFFFF',overflow:'hidden'}}>
  <SeriesBackground/>
  <div style={{position:'absolute',left:74,top:268,display:'flex',alignItems:'center',gap:12}}>
    <div style={{width:10,height:10,borderRadius:10,background:'#74E8E4',boxShadow:'0 0 18px #74E8E490'}}/>
    <Interactive.Div name="06 · Label · WINDOWS HACKS" style={{position:'relative',translate:'0px 0px',scale:1,rotate:'0deg',fontSize:22,letterSpacing:3.5,color:'#83E7F0',fontWeight:850}}>WINDOWS HACKS · 05 / 05</Interactive.Div>
  </div>
  <div style={{position:'absolute',left:72,top:380,opacity:reveal,transform:`translateY(${(1-enter)*38}px)`}}>
   <Interactive.Div name="06 · Judul · SIMPAN VIDEONYA" style={{position:'relative',translate:'0px 0px',scale:1,rotate:'0deg',fontSize:82,fontWeight:950,letterSpacing:-2.8,color:'#F7FBFF',lineHeight:1.08}}>SIMPAN VIDEONYA,</Interactive.Div>
   <Interactive.Div name="06 · Judul · BIAR NGGAK LUPA" style={{position:'relative',translate:'0px 0px',scale:1,rotate:'0deg',fontSize:86,fontWeight:950,letterSpacing:-3,color:'#9FF6C7',lineHeight:1.14}}>BIAR NGGAK LUPA!</Interactive.Div>
  </div>
  <Interactive.Div name="06 · Subtitle · Simpan untuk nanti" style={{position:'absolute',left:75,top:617,width:920,translate:'0px 0px',scale:1,rotate:'0deg',fontSize:30,color:'#B9D1E5',fontWeight:600,opacity:inOut(frame,21,36)*end}}>Lima shortcut yang bikin kerja lebih cepat.</Interactive.Div>
  <div style={{position:'absolute',left:73,top:754,width:932,height:195,borderRadius:30,background:'linear-gradient(120deg,#123651,#09243C)',border:'2px solid #45748C',boxShadow:'0 28px 70px #02132280',opacity:inOut(frame,23,36)*end}}>
   <Interactive.Div name="06 · Ikon Bookmark" style={{position:'absolute',left:44,top:34,width:123,height:123,translate:'0px 0px',scale:1,rotate:'0deg',borderRadius:24,background:'#194D5D',display:'grid',placeItems:'center'}}>
     <svg width="80" height="90" viewBox="0 0 80 90" fill="none"><path d="M18 10h44v69L40 64 18 79V10Z" stroke="#9FF6C7" strokeWidth="6" strokeLinejoin="round"/><path d="m28 38 9 9 17-19" stroke="#9FF6C7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
   </Interactive.Div>
   <Interactive.Div name="06 · Ajakan · SAVE VIDEO" style={{position:'absolute',top:52,left:202,translate:'0px 0px',scale:1,rotate:'0deg',fontSize:44,fontWeight:900,color:'#F7FBFF',letterSpacing:-1}}>SIMPAN SEKARANG</Interactive.Div>
   <Interactive.Div name="06 · Keterangan · Praktikkan nanti" style={{position:'absolute',top:116,left:204,translate:'0px 0px',scale:1,rotate:'0deg',fontSize:24,color:'#A9D7E0',fontWeight:600}}>Praktikkan shortcut-nya kapan saja</Interactive.Div>
  </div>
  <div style={{position:'absolute',left:75,top:1043,width:930,height:365,borderRadius:29,background:'#0D2439E8',border:'1px solid #3D6583',boxShadow:'0 26px 55px #03121D66',opacity:photoReveal}}>
    <Interactive.Div name="06 · Bingkai Foto Kreator" style={{position:'absolute',left:32,top:50,width:249,height:249,translate:'0px 0px',scale:1,rotate:'0deg',borderRadius:'50%',border:'5px solid #79E4DE',boxShadow:'0 0 0 9px #79E4DE17,0 12px 28px #0009',background:'#DADFE4',overflow:'hidden'}}>
      <Img name="06 · Foto Vio Yusup Iskandar" src={staticFile('videos/windows-hacks-5-shortcut-lengkap/images/vio-yusup-iskandar.png')} style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',objectFit:'cover'}} />
    </Interactive.Div>
    <Interactive.Div name="06 · Kredit · Dibuat oleh" style={{position:'absolute',top:67,left:322,translate:'0px 0px',scale:1,rotate:'0deg',fontSize:22,fontWeight:850,letterSpacing:3.2,color:'#74E8E4'}}>DIBUAT OLEH</Interactive.Div>
    <Interactive.Div name="06 · Kredit · Nama Vio Yusup" style={{position:'absolute',top:119,left:321,translate:'0px 0px',scale:1,rotate:'0deg',fontSize:51,fontWeight:900,letterSpacing:-1.3,color:'#FFFFFF'}}>Vio Yusup</Interactive.Div>
    <Interactive.Div name="06 · Kredit · Nama Iskandar" style={{position:'absolute',top:178,left:321,translate:'0px 0px',scale:1,rotate:'0deg',fontSize:51,fontWeight:900,letterSpacing:-1.3,color:'#FFFFFF'}}>Iskandar</Interactive.Div>
    <Interactive.Div name="06 · Kredit · Motion Graphic" style={{position:'absolute',top:261,left:322,translate:'0px 0px',scale:1,rotate:'0deg',fontSize:21,fontWeight:650,color:'#A8C7D7'}}>Motion Graphic · Edukasi Teknologi</Interactive.Div>
  </div>
  <Interactive.Div name="06 · Footer · WINDOWS HACKS" style={{position:'absolute',top:1505,left:80,width:920,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg',fontSize:23,letterSpacing:3,fontWeight:800,color:'#9CB8CA',opacity:inOut(frame,44,60)*end}}>WINDOWS HACKS · SHORTCUT SERIES</Interactive.Div>
  <Interactive.Div name="06 · Progress · Jalur" style={{position:'absolute',left:81,top:1621,width:918,height:5,translate:'0px 0px',scale:1,rotate:'0deg',background:'#24485F',borderRadius:8,overflow:'hidden'}}>
    <div style={{width:`${100*Math.min(1,frame/114)}%`,height:'100%',background:'#8BEFD3',borderRadius:8}}/>
  </Interactive.Div>
 </AbsoluteFill>;
};
