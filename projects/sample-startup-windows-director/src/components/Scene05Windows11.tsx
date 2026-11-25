import React from 'react';
import {Interactive} from 'remotion';
import {Scene04Windows11} from './Scene04Windows11';
import './Scene03Windows11.css';

/**
 * Windows 11 continuation from the approved S04: existing shortcut -> next sign in -> auto-open.
 * All UI is native DOM / SVG. No fake clicking or cursor needed to launch the shortcut.
 * The lock screen and desktop are an illustrative next-login sequence (VO guide is still draft).
 */
const cl=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(v:number)=>{const t=cl(v);return t*t*(3-2*t)};
const r=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const band=(t:number,a:number,b:number,c:number,d:number)=>r(t,a,b)*(1-r(t,c,d));

const Wallpaper:React.FC=()=> <Interactive.Div name="S05 Windows — Windows 11 wallpaper" className="wall" style={{position:'absolute',inset:0}}>
 <svg width="960" height="540" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
 <defs>
  <linearGradient id="s05g1" x1="0" y1="0" x2=".9" y2=".8"><stop offset="0" stopColor="#72C7F8"/><stop offset=".24" stopColor="#1989E4"/><stop offset=".58" stopColor="#0957D0"/><stop offset=".9" stopColor="#08136C"/></linearGradient>
  <linearGradient id="s05g2" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stopColor="#B2EAFF"/><stop offset=".3" stopColor="#53B8F5"/><stop offset=".7" stopColor="#0066D8"/><stop offset="1" stopColor="#091A81"/></linearGradient>
  <linearGradient id="s05g3" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stopColor="#125AD4"/><stop offset=".43" stopColor="#153AE8"/><stop offset="1" stopColor="#020A4C"/></linearGradient>
  <linearGradient id="s05g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D5F3FF"/><stop offset=".31" stopColor="#69CDFD"/><stop offset=".7" stopColor="#166ADA"/><stop offset="1" stopColor="#0B1669"/></linearGradient>
  <filter id="s05blur8"><feGaussianBlur stdDeviation="8"/></filter>
 </defs>
 <ellipse cx="745" cy="155" rx="310" ry="125" fill="#B4EEFF" opacity=".23" filter="url(#s05blur8)"/>
 <path d="M326 473C390 316 480 209 609 141C713 87 854 79 941 132L945 369C867 328 790 322 715 338C566 370 466 428 326 473Z" fill="url(#s05g3)" opacity=".94"/>
 <path d="M238 343C350 221 507 106 657 73C761 47 851 58 917 113C826 99 745 108 669 152C574 207 512 306 431 380C349 450 278 437 238 343Z" fill="url(#s05g1)"/>
 <path d="M272 388C383 312 498 188 615 149C731 108 832 122 903 164C813 155 746 182 682 236C596 308 531 391 439 445C357 491 300 454 272 388Z" fill="url(#s05g2)"/>
 <path d="M358 488C459 371 555 247 664 225C771 202 867 230 914 288C810 255 737 284 658 343C568 411 505 467 419 516Z" fill="url(#s05g4)" opacity=".98"/>
 <path d="M293 375C402 336 508 213 609 184C672 166 743 177 794 199C717 206 671 238 620 291C542 374 488 439 403 471C328 498 274 449 293 375Z" fill="url(#s05g1)" opacity=".96"/>
 <path d="M369 524C460 464 505 392 567 347C633 298 711 284 774 315C703 314 636 342 583 388C508 452 446 502 369 524Z" fill="url(#s05g2)" opacity=".93"/>
 <path d="M449 518C533 438 619 393 705 388C751 386 793 398 833 421C718 411 632 441 546 516Z" fill="url(#s05g3)" opacity=".82"/>
 </svg>
 </Interactive.Div>;

const ExcelIcon:React.FC=()=> <div className="excel"/>;
const ChromeIcon:React.FC=()=> <div className="chrome"/>;
const ErpIcon:React.FC=()=> <div className="erpicon">ERP</div>;
const FolderIcon:React.FC=()=> <div className="folder" style={{scale:.57}}/>;
const DesktopShortcut:React.FC<{type:'excel'|'chrome'|'erp';top:number}>=({type,top})=>
 <div className="desktop-icon" style={{position:'absolute',left:19,top,width:95,color:'#fff',textAlign:'center'}}>
 <div className="ico">{type==='excel'?<ExcelIcon/>:type==='chrome'?<ChromeIcon/>:<ErpIcon/>}<span className="small-arrow">↗</span></div>
 <div className="label">{type==='excel'?'Laporan Kerja.xlsx':type==='chrome'?'Google Chrome':'ERP System'}</div>
 </div>;
const WindowsTaskbar:React.FC<{excelOpen:boolean}>=({excelOpen})=>
 <Interactive.Div name="S05 Windows — Taskbar" className="taskbar" style={{position:'absolute',left:0,right:0,bottom:0,height:49,zIndex:3}}>
  <div className="win-logo"><span/><span/><span/><span/></div>
  <div className="search"><div className="mag"/>Search</div>
  <div className="task-item"><FolderIcon/></div><div className="task-item"><ChromeIcon/></div><div className={'task-item'+(excelOpen?' active':'')}><ExcelIcon/></div><div className="task-item"><ErpIcon/></div>
  <div className="system-tray">⌃　◖　▴　<div>10:24<br/>24/11/2026</div></div>
 </Interactive.Div>;

const ExcelWorkbook:React.FC<{t:number}>=({t})=>{
 const enter=r(t,3.15,3.6),ready=r(t,3.70,4.14);
 return <Interactive.Div name="S05 Excel — window opens after sign in" style={{position:'absolute',left:126,top:34,width:715,height:451,zIndex:12,opacity:enter,scale:0.963+0.037*enter,transformOrigin:'center',boxShadow:'0 16px 46px #06243B60',border:'1px solid #AABAC8',borderRadius:9,background:'#FFFFFF',overflow:'hidden',fontFamily:'Segoe UI, Arial, sans-serif',color:'#202020'}}>
  <Interactive.Div name="S05 Excel — title bar" style={{height:39,background:'#F7F8F8',display:'flex',alignItems:'center',gap:10,padding:'0 13px',fontSize:12}}>
   <ExcelIcon/><Interactive.Div name="S05 Excel — nama file" style={{position:'relative',fontWeight:600}}>Laporan Kerja.xlsx — Excel</Interactive.Div><span style={{marginLeft:'auto',fontSize:18,color:'#66737E'}}>−　□　×</span>
  </Interactive.Div>
  <Interactive.Div name="S05 Excel — ribbon" style={{height:40,background:'#137E4A',color:'#fff',display:'flex',alignItems:'center',gap:23,padding:'0 20px',fontSize:13}}><span>File</span><span>Home</span><span>Insert</span><span>Page Layout</span><span>Formulas</span><span>Data</span></Interactive.Div>
  <div style={{height:43,background:'#FCFCFC',display:'flex',alignItems:'center',gap:11,padding:'0 14px',fontSize:12,borderBottom:'1px solid #E1E5E6'}}><span style={{background:'#F2F4F4',border:'1px solid #DFE3E3',padding:'6px 15px'}}>A1</span><span>fx</span><span style={{marginLeft:13,fontWeight:700}}>LAPORAN KERJA</span></div>
  <Interactive.Div name="S05 Excel — sample workbook table" style={{padding:'9px 14px',opacity:ready}}>
   <div style={{display:'grid',gridTemplateColumns:'52px 120px 200px 130px 140px',fontSize:13,color:'#405048'}}>
    {['','A','B','C','D','1','Tanggal','Tugas','Status','PIC','2','25/11','Laporan','Selesai','Tim','3','26/11','Review','Proses','Admin','4','','','',''].map((v,i)=><div key={i} style={{height:40,border:'1px solid #E4E9E6',background:i<5||i%5===0?'#F4F6F5':'#FFF',display:'flex',justifyContent:'center',alignItems:'center'}}>{v}</div>)}
   </div>
  </Interactive.Div>
  <div style={{height:25,borderTop:'1px solid #E5E8E7',position:'absolute',bottom:0,left:0,right:0,fontSize:10,color:'#57736B',padding:'5px 16px'}}>Sheet1　 +</div>
 </Interactive.Div>;
};

const SignIn:React.FC<{t:number}>=({t})=>{
 const visible=band(t,.9,1.27,2.65,3.18);
 return <Interactive.Div name="S05 Windows — next sign-in (no clicks)" style={{position:'absolute',inset:0,zIndex:24,background:'linear-gradient(125deg,#0A4382,#1F72B1 60%,#193A8C)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',opacity:visible,color:'#fff',fontFamily:'Segoe UI, Arial, sans-serif'}}>
  <div style={{position:'absolute',width:600,height:540,border:'115px solid #62BFF6',borderRadius:'50%',right:-240,top:-150,rotate:'-25deg',filter:'blur(18px)',opacity:.3}}/>
  <div style={{width:97,height:97,borderRadius:'50%',background:'#E3EAF1',border:'1px solid #FFFFFF99',display:'flex',alignItems:'center',justifyContent:'center',color:'#637A91',fontSize:51,fontWeight:300,marginTop:-15}}>●</div>
  <Interactive.Div name="S05 Windows — sign-in username" style={{marginTop:21,fontSize:28,fontWeight:500}}>Vio</Interactive.Div>
  <Interactive.Div name="S05 Windows — welcome state" style={{fontSize:18,marginTop:15,display:'flex',alignItems:'center',gap:13,opacity:r(t,1.58,1.85)}}>
   <span style={{width:18,height:18,border:'3px dotted #FFFFFFCC',borderRadius:'50%',rotate:`${t*160}deg`}}/>Welcome
  </Interactive.Div>
 </Interactive.Div>;
};

export const Scene05Windows11:React.FC<{seconds:number;showHandoff?:boolean}>=({seconds:t,showHandoff=true})=>{
 const excelOpen=t>=3.15;
 return <>
  <Interactive.Div name="S05 Desktop — Windows 11 continuation" className="s03w11" style={{position:'absolute',left:60,top:654,width:960,height:540,overflow:'hidden',borderRadius:10,background:'#1766B9',boxShadow:'0 12px 24px #20202016',opacity:1}}>
   <Wallpaper/>
   <Interactive.Div name="S05 Desktop — shortcut Chrome" style={{position:'absolute',inset:0,pointerEvents:'none'}}><DesktopShortcut type="chrome" top={21}/></Interactive.Div>
   <Interactive.Div name="S05 Desktop — shortcut ERP" style={{position:'absolute',inset:0,pointerEvents:'none'}}><DesktopShortcut type="erp" top={103}/></Interactive.Div>
   <Interactive.Div name="S05 Desktop — shortcut Excel" style={{position:'absolute',inset:0,pointerEvents:'none'}}><DesktopShortcut type="excel" top={187}/></Interactive.Div>
   <WindowsTaskbar excelOpen={excelOpen}/>
   <ExcelWorkbook t={t}/>
   <SignIn t={t}/>
  </Interactive.Div>
  {showHandoff&&t<1.12?<Interactive.Div name="S05 Bridge — carry S04 final Windows frame" style={{position:'absolute',inset:0,opacity:1-r(t,.64,1.08),pointerEvents:'none'}}><Scene04Windows11 frame={269}/></Interactive.Div>:null}
 </>;
};
