import React from 'react';
import {Img, Interactive, staticFile} from 'remotion';
import {SCENE04} from '../config/scene04';
import {ramp, between} from '../animations/scene04';

const FONT='Inter, Segoe UI, Arial, sans-serif';
const ink='#26313C';
const editBase={translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const layer=(extra:React.CSSProperties):React.CSSProperties=>({...extra,...editBase});

/** Independent SVG Windows glyph — not flattened into wallpaper. */
export const WinMark:React.FC<{size?:number,color?:string}>=({size=35,color='#1179D4'})=><svg width={size} height={size} viewBox="0 0 40 40" aria-label="Windows logo">
  <rect x="2" y="2" width="16" height="16" rx="1" fill={color}/><rect x="22" y="2" width="16" height="16" rx="1" fill={color}/>
  <rect x="2" y="22" width="16" height="16" rx="1" fill={color}/><rect x="22" y="22" width="16" height="16" rx="1" fill={color}/>
</svg>;
export const PsMark:React.FC<{size?:number}>=({size=58})=><svg width={size} height={size} viewBox="0 0 60 60" aria-label="PowerShell icon">
  <rect x="2" y="2" width="56" height="56" rx="12" fill="#1683B5"/>
  <path d="M14 17L31 29L14 43" stroke="#fff" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  <path d="M32 44H47" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
</svg>;
const SearchMark=({color='#616C7A'}:{color?:string})=><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="10" r="7" stroke={color} strokeWidth="2.3"/><path d="m15.5 15.5 6 6" stroke={color} strokeWidth="2.3" strokeLinecap="round"/></svg>;

/** Wallpaper only is an image. Search, apps, taskbar, and pointers are real independent HTML/SVG layers. */
export const Scene04Desktop:React.FC<{seconds:number}> = ({seconds:s})=>{
  const t=SCENE04.timing;
  const appear=ramp(s,0,t.introEnd);
  return <div style={{position:'absolute',left:SCENE04.position.desktop.x,top:SCENE04.position.desktop.y,width:920,height:1064,
    borderRadius:38,overflow:'hidden',background:'#093F91',border:'1px solid #D7DBDF',boxShadow:'0 28px 74px rgba(25,41,72,.18)',opacity:appear}}>
    <Interactive.Div name="S04 — Wallpaper Windows 11 Bloom (aset bisa diganti)" style={{position:'absolute',inset:0,width:920,height:1064,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Img src={staticFile('videos/debloat-windows11-opening/images/windows11-bloom-scene04.png')} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
    </Interactive.Div>
    <div style={{position:'absolute',top:37,left:33,display:'flex',flexDirection:'column',gap:24,color:'white',alignItems:'center'}}>
      <Interactive.Div name="S04 — Recycle Bin Desktop" style={{width:86,height:82,display:'flex',flexDirection:'column',alignItems:'center',gap:8,translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <svg width="49" height="48" viewBox="0 0 50 50"><rect x="10" y="13" width="30" height="31" rx="4" fill="#F6F8FD" opacity=".91"/><path d="M8 12H42M18 7H32M20 20V36M30 20V36" stroke="#5D9CBC" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <span style={{fontSize:18,textShadow:'0 1px 4px #223'}}>Recycle Bin</span>
      </Interactive.Div>
      <Interactive.Div name="S04 — Edge Desktop" style={{width:88,height:86,display:'flex',flexDirection:'column',alignItems:'center',gap:6,translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <div style={{width:49,height:49,borderRadius:'50%',background:'conic-gradient(#2FC5C4 0deg,#148EC8 145deg,#376FE7 245deg,#1EBEAC 315deg,#2FC5C4 360deg)',display:'grid',placeItems:'center'}}><span style={{fontSize:34,color:'white',fontWeight:700}}>e</span></div>
        <span style={{fontSize:18,textShadow:'0 1px 4px #223'}}>Edge</span>
      </Interactive.Div>
    </div>
    <Interactive.Div name="S04 — Taskbar Windows 11" style={{position:'absolute',left:0,right:0,bottom:0,height:88,background:'rgba(248,250,254,.92)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(255,255,255,.65)',display:'flex',alignItems:'center',justifyContent:'center',gap:25,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <WinMark size={37}/><SearchMark/>
      <div style={{display:'flex',gap:5}}><span style={{width:18,height:22,background:'#6688B3',borderRadius:3}}/><span style={{width:18,height:22,background:'#A4B8D4',borderRadius:3}}/></div>
      <div style={{width:40,height:31,borderRadius:6,background:'#F1BB48',position:'relative'}}><div style={{position:'absolute',top:-6,left:0,width:24,height:9,background:'#E9AC31',borderRadius:3}}/></div>
      <div style={{width:37,height:37,borderRadius:'50%',background:'conic-gradient(#30C4C5,#236AF0,#2DCFAD,#30C4C5)'}}/>
    </Interactive.Div>
    <Scene04SearchPanel seconds={s}/>
    <Scene04UAC seconds={s}/>
  </div>;
};

const Scene04SearchPanel:React.FC<{seconds:number}>=({seconds:s})=>{
  const t=SCENE04.timing;
  const opacity=between(s,t.searchOpen,t.searchClose,.28);
  const count=Math.floor(ramp(s,t.searchTypeStart,t.searchTypeEnd)*'PowerShell'.length);
  return <div style={{position:'absolute',left:45,top:112,width:830,height:832,borderRadius:26,background:'rgba(249,250,252,.98)',boxShadow:'0 22px 55px rgba(7,20,50,.23)',border:'1px solid #DDE4ED',opacity,
    transform:`translateY(${(1-opacity)*23}px)`,pointerEvents:'none',fontFamily:FONT,color:ink,overflow:'hidden'}}>
    <div style={{position:'absolute',top:26,left:35,width:755,height:83,border:'2px solid #B9CDE8',borderRadius:14,background:'white',display:'flex',alignItems:'center',paddingLeft:22,gap:16}}>
      <SearchMark/>
      <div style={{width:`${count}ch`,overflow:'hidden',whiteSpace:'nowrap',flex:'0 0 auto'}}>
        <Interactive.Div name="S04 — Teks Search PowerShell" style={{fontSize:30,fontWeight:600,color:ink,whiteSpace:'nowrap',width:'max-content',translate:'0px 0px',scale:1,rotate:'0deg'}}>PowerShell</Interactive.Div>
      </div>
      <span style={{width:3,height:34,background:'#2488D4',opacity:s<3.25&&Math.floor(s*3)%2===0?1:0}}/>
    </div>
    <Interactive.Div name="S04 — Label Best match" style={{position:'absolute',left:37,top:150,fontSize:25,fontWeight:700,translate:'0px 0px',scale:1,rotate:'0deg'}}>Best match</Interactive.Div>
    <Interactive.Div name="S04 — Hasil Windows PowerShell" style={{position:'absolute',left:33,top:202,width:335,height:142,borderRadius:17,background:'#EAF1FB',display:'flex',gap:18,alignItems:'center',padding:20,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <PsMark size={70}/><div><span style={{display:'block',fontSize:26,fontWeight:680}}>Windows</span><span style={{display:'block',fontSize:26,fontWeight:680}}>PowerShell</span><span style={{display:'block',fontSize:18,color:'#6C7A8B'}}>App</span></div>
    </Interactive.Div>
    <div style={{position:'absolute',left:408,top:152,width:378,height:575,borderRadius:21,background:'#FFFFFF',border:'1px solid #E6EAF0',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{marginTop:40}}><PsMark size={91}/></div>
      <Interactive.Div name="S04 — Hasil Nama Windows PowerShell" style={{fontSize:28,fontWeight:680,marginTop:14,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Windows PowerShell</Interactive.Div>
      <Interactive.Div name="S04 — Hasil Tipe App" style={{fontSize:19,color:'#7B8796',marginTop:7,translate:'0px 0px',scale:1,rotate:'0deg'}}>App</Interactive.Div>
      <div style={{height:1,width:332,background:'#E5EBF0',marginTop:23}}/>
      <Interactive.Div name="S04 — Action Open" style={{fontSize:23,width:326,padding:'19px 10px',color:'#4A5260',translate:'0px 0px',scale:1,rotate:'0deg'}}>Open</Interactive.Div>
      <Interactive.Div name="S04 — Tombol Run as administrator" style={{fontSize:23,width:340,background:s>=t.adminHighlight?'#FCEDE5':'#fff',color:'#3C4652',padding:'20px 12px',borderRadius:13,border:s>=t.adminHighlight&&s<t.searchClose?'2px solid #D8876D':'2px solid transparent',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Run as administrator</Interactive.Div>
      <Interactive.Div name="S04 — Action Open file location" style={{fontSize:21,width:326,padding:'19px 10px',color:'#4A5260',whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Open file location</Interactive.Div>
    </div>
  </div>;
};

const Scene04UAC:React.FC<{seconds:number}>=({seconds:s})=>{
  const t=SCENE04.timing;
  const alpha=between(s,t.uacOpen,t.uacClose,.16);
  return <div style={{position:'absolute',inset:0,opacity:alpha,pointerEvents:'none',fontFamily:FONT}}>
    <div style={{position:'absolute',inset:0,background:'rgba(9,22,50,.53)'}}/>
    <Interactive.Div name="S04 — Dialog User Account Control" style={{position:'absolute',left:98,top:234,width:724,height:577,borderRadius:17,background:'#F7F9FC',boxShadow:'0 26px 72px rgba(4,12,40,.3)',overflow:'hidden',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Interactive.Div name="S04 — Judul User Account Control" style={{height:59,background:'#E1EBF7',padding:'15px 25px',fontSize:24,fontWeight:700,color:'#344C67',translate:'0px 0px',scale:1,rotate:'0deg'}}>User Account Control</Interactive.Div>
      <Interactive.Div name="S04 — Teks Pertanyaan UAC 1" style={{margin:'30px 35px 0',fontSize:26,fontWeight:650,color:'#354052',translate:'0px 0px',scale:1,rotate:'0deg'}}>Do you want to allow this app</Interactive.Div>
      <Interactive.Div name="S04 — Teks Pertanyaan UAC 2" style={{margin:'3px 35px',fontSize:26,fontWeight:650,color:'#354052',translate:'0px 0px',scale:1,rotate:'0deg'}}>to make changes to your device?</Interactive.Div>
      <div style={{margin:'26px 38px',display:'flex',alignItems:'center',gap:24}}><PsMark size={60}/><div>
        <Interactive.Div name="S04 — UAC Nama PowerShell" style={{fontSize:25,fontWeight:700,color:'#33465B',translate:'0px 0px',scale:1,rotate:'0deg'}}>Windows PowerShell</Interactive.Div>
        <Interactive.Div name="S04 — UAC Verified Publisher" style={{fontSize:17,color:'#617286',marginTop:6,translate:'0px 0px',scale:1,rotate:'0deg'}}>Verified publisher: Microsoft Windows</Interactive.Div>
        <Interactive.Div name="S04 — UAC File Origin" style={{fontSize:17,color:'#617286',marginTop:5,translate:'0px 0px',scale:1,rotate:'0deg'}}>File origin: Hard drive on this computer</Interactive.Div>
      </div></div>
      <Interactive.Div name="S04 — UAC Show more details" style={{margin:'0 35px',fontSize:19,color:'#3F87B8',translate:'0px 0px',scale:1,rotate:'0deg'}}>Show more details</Interactive.Div>
      <Interactive.Div name="S04 — UAC Tombol Yes" style={{position:'absolute',bottom:28,right:195,width:139,height:68,border:'2px solid #8FB5DD',borderRadius:9,background:s>=t.uacYesClick?'#C9E0FA':'#EAF3FE',display:'grid',placeItems:'center',fontSize:25,color:'#38495C',fontWeight:600,translate:'0px 0px',scale:1,rotate:'0deg'}}>Yes</Interactive.Div>
      <Interactive.Div name="S04 — UAC Tombol No" style={{position:'absolute',bottom:28,right:33,width:139,height:68,border:'1px solid #B8C4D1',borderRadius:9,background:'#FFFFFF',display:'grid',placeItems:'center',fontSize:25,color:'#38495C',fontWeight:600,translate:'0px 0px',scale:1,rotate:'0deg'}}>No</Interactive.Div>
    </Interactive.Div>
  </div>;
};
