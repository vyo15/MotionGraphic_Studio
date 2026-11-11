import React from 'react';
import {Interactive, staticFile} from 'remotion';
import {SCENE06} from '../config/scene06';
import {reveal, visible} from '../animations/scene06';

const ed = {translate:'0px 0px',scale:1,rotate:'0deg'} as const;
const font = 'Inter, Segoe UI, Arial, sans-serif';
const C = SCENE06.colors;

const WinLogo:React.FC<{size?:number}> = ({size=25}) => <svg width={size} height={size} viewBox="0 0 34 34" aria-label="Windows">
  <path fill="#168AE1" d="M2 4 15.2 2.3v13H2zm15.7-2L32 0v15.3H17.7zM2 18H15.2v13.8L2 30zm15.7 0H32v16l-14.3-2z"/>
</svg>;

const DesktopIcon:React.FC<{name:string;type:'bin'|'edge';top:number}> = ({name,type,top}) => <div style={{position:'absolute',left:31,top,width:103,textAlign:'center',color:'#FDFEFF',fontSize:18,textShadow:'0px 1px 3px #23365E',display:'grid',justifyItems:'center',gap:7}}>
  <Interactive.Div name={`S06 — Desktop Icon ${name}`} style={{width:60,height:58,display:'grid',placeItems:'center',background:'rgba(255,255,255,.76)',borderRadius:12,translate:'0px 0px',scale:1,rotate:'0deg'}}>
    {type==='bin'?<svg width="40" height="43" viewBox="0 0 40 43"><rect x="10" y="11" width="21" height="28" rx="3" stroke="#8995A1" strokeWidth="2" fill="#D6E0E5"/><path d="M7 10h27M14 6h13" stroke="#5D7A90" strokeWidth="3" strokeLinecap="round"/><path d="M16 17v16M25 17v16" stroke="#7897A5" strokeWidth="2"/></svg>:
    <svg width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="18" fill="#1598BF"/><path d="M2 25c7 9 16 10 33 1-9 16-31 15-33-1z" fill="#34C4BD"/><path d="M15 3C27-1 38 9 39 22 29 12 21 14 15 21c-5 7-3 17 6 19C6 39-1 21 6 11c2-4 5-7 9-8z" fill="#246BD0"/></svg>}
  </Interactive.Div>
  <Interactive.Div name={`S06 — Label desktop ${name}`} style={{fontSize:17,color:'#fff',textShadow:'0 1px 4px #2E4364',translate:'0px 0px',scale:1,rotate:'0deg'}}>{name}</Interactive.Div>
</div>;

/** Wallpaper is an asset; Start Menu, taskbar, Restart and pointer remain JSX/SVG layers. */
export const Scene06Windows:React.FC<{seconds:number}> = ({seconds:s}) => {
  const {desktop}=SCENE06.canvas;
  const menu=reveal(s,SCENE06.timing.restart.start,.38);
  const uiFade=s<SCENE06.timing.desktop.start?1:1-reveal(s,5.8,.25);
  const restart=SCENE06.timing.restart.highlight;
  return <Interactive.Div name="S06 — Desktop Windows 11 / posisi / ukuran" style={{position:'absolute',left:desktop.x,top:desktop.y,width:desktop.width,height:desktop.height,overflow:'hidden',border:'2px solid rgba(255,255,255,.87)',borderRadius:14,boxShadow:'0 19px 48px rgba(43,63,90,.11)',background:'#173DBA',fontFamily:font,translate:'0px 0px',scale:1,rotate:'0deg'}}>
    <Interactive.Div name="S06 — Wallpaper Bloom / ganti aset di config/scene06.ts" style={{position:'absolute',inset:0,backgroundImage:`url("${staticFile(SCENE06.assets.bloom)}")`,backgroundSize:'cover',backgroundPosition:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    <DesktopIcon name="Recycle Bin" type="bin" top={31}/>
    <DesktopIcon name="Microsoft Edge" type="edge" top={148}/>
    <Interactive.Div name="S06 — Taskbar Windows 11" style={{position:'absolute',left:0,right:0,bottom:0,height:69,background:'rgba(246,249,254,.94)',display:'flex',alignItems:'center',justifyContent:'center',gap:20,boxShadow:'0 -2px 10px #26304A22',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <WinLogo size={31}/>
      <div style={{width:26,height:26,border:'3px solid #63778C',borderRadius:'50%',position:'relative'}}><div style={{position:'absolute',width:14,height:3,background:'#63778C',transform:'rotate(45deg)',left:19,top:20}}/></div>
      <div style={{width:27,height:25,borderRadius:6,background:'#F4C53B'}}/>
      <div style={{width:28,height:27,borderRadius:7,background:'#3D8CE7'}}/>
      <div style={{width:29,height:27,borderRadius:7,background:'linear-gradient(130deg,#1381C5,#45D3B9)'}}/>
    </Interactive.Div>
    {s>=SCENE06.timing.desktop.start?<div style={{position:'absolute',inset:0,background:'rgba(10,16,27,.07)',opacity:menu,pointerEvents:'none'}}/>:null}
    {s>=SCENE06.timing.desktop.start?<Interactive.Div name="S06 — Start Menu Windows 11" style={{position:'absolute',left:238,top:235,width:471,height:615,borderRadius:22,border:'1px solid #E0E4E9',boxShadow:'0 22px 55px rgba(17,30,60,.25)',background:'rgba(250,252,255,.98)',opacity:menu,transform:`translateY(${(1-menu)*20}px)`,padding:'30px 28px',boxSizing:'border-box',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Interactive.Div name="S06 — Search apps, settings" style={{height:52,borderRadius:24,background:'#F3F5F8',color:'#8E98A6',fontSize:17,padding:'14px 20px',boxSizing:'border-box',translate:'0px 0px',scale:1,rotate:'0deg'}}>Search for apps, settings...</Interactive.Div>
      <Interactive.Div name="S06 — Pinned" style={{fontWeight:700,color:'#5A6B7C',fontSize:20,marginTop:32,marginBottom:18,translate:'0px 0px',scale:1,rotate:'0deg'}}>Pinned</Interactive.Div>
      <div style={{display:'flex',justifyContent:'space-between',padding:'0 14px'}}>
        {['Edge','Photos','Store','Explorer'].map((name,i)=><Interactive.Div key={name} name={`S06 — App pinned ${name}`} style={{width:76,display:'flex',alignItems:'center',flexDirection:'column',gap:11,fontSize:16,color:'#5C6772',translate:'0px 0px',scale:1,rotate:'0deg'}}><div style={{width:39,height:39,borderRadius:12,background:['#3CB7B3','#4084DC','#1976C8','#EFC757'][i],boxShadow:'inset 0 -7px 12px #0001'}}/>{name}</Interactive.Div>)}
      </div>
      <Interactive.Div name="S06 — Recommended" style={{fontWeight:700,color:'#5A6B7C',fontSize:20,marginTop:38,translate:'0px 0px',scale:1,rotate:'0deg'}}>Recommended</Interactive.Div>
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:80,borderTop:'1px solid #E5E8EC',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 35px',color:'#596878',fontSize:19}}>
        <Interactive.Div name="S06 — User Windows" style={{display:'flex',gap:11,alignItems:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}><div style={{width:30,height:30,borderRadius:99,background:'#AFC5EB'}}/>User</Interactive.Div>
        <Interactive.Div name="S06 — Power button" style={{fontSize:29,color:'#667482',translate:'0px 0px',scale:1,rotate:'0deg'}}>⏻</Interactive.Div>
      </div>
      <Interactive.Div name="S06 — Menu Power / Restart" style={{position:'absolute',right:28,bottom:81,width:230,padding:7,background:'white',border:'1px solid #E0E6EC',borderRadius:12,boxShadow:'0 12px 35px #0002',opacity:reveal(s,6.95,.35),translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <Interactive.Div name="S06 — Sleep" style={{fontSize:19,color:'#6A7480',padding:'11px 23px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Sleep</Interactive.Div>
        <Interactive.Div name="S06 — Shut down" style={{fontSize:19,color:'#6A7480',padding:'11px 23px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Shut down</Interactive.Div>
        <Interactive.Div name="S06 — Restart (contoh, tidak diklik)" style={{fontSize:19,fontWeight:700,padding:'11px 23px',color:s>=restart?'#3C5F83':'#6A7480',background:s>=restart?'#DBEAF9':'transparent',borderRadius:7,translate:'0px 0px',scale:1,rotate:'0deg'}}>Restart</Interactive.Div>
      </Interactive.Div>
    </Interactive.Div>:null}
  </Interactive.Div>;
};
