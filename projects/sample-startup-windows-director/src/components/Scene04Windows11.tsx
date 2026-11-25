import React from 'react';
import {Interactive} from 'remotion';
import './Scene03Windows11.css';

// S04 uses the exact wallpaper and desktop styling of the APPROVED S03.
// Each important object is native React + Interactive; no flattened desktop asset.
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(x:number)=>{const t=clamp(x);return t*t*(3-2*t)};
const r=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
const band=(t:number,a:number,b:number,c:number,d:number)=>r(t,a,b)*(1-r(t,c,d));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const S04Bloom:React.FC=()=> <Interactive.Div name="S04 Background — Windows 11 Bloom style" className="wall" style={{position:'absolute',inset:0}}>
 <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
   <linearGradient id="s04g1" x1="0" y1="0" x2=".9" y2=".8"><stop offset="0" stopColor="#72C7F8"/><stop offset=".24" stopColor="#1989E4"/><stop offset=".58" stopColor="#0957D0"/><stop offset=".9" stopColor="#08136C"/></linearGradient>
   <linearGradient id="s04g2" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stopColor="#B2EAFF"/><stop offset=".3" stopColor="#53B8F5"/><stop offset=".7" stopColor="#0066D8"/><stop offset="1" stopColor="#091A81"/></linearGradient>
   <linearGradient id="s04g3" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stopColor="#125AD4"/><stop offset=".43" stopColor="#153AE8"/><stop offset="1" stopColor="#020A4C"/></linearGradient>
   <linearGradient id="s04g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D5F3FF"/><stop offset=".31" stopColor="#69CDFD"/><stop offset=".7" stopColor="#166ADA"/><stop offset="1" stopColor="#0B1669"/></linearGradient>
   <filter id="s04blur8"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <ellipse cx="745" cy="155" rx="310" ry="125" fill="#B4EEFF" opacity=".23" filter="url(#s04blur8)"/>
  <path d="M326 473C390 316 480 209 609 141C713 87 854 79 941 132L945 369C867 328 790 322 715 338C566 370 466 428 326 473Z" fill="url(#s04g3)" opacity=".94"/>
  <path d="M238 343C350 221 507 106 657 73C761 47 851 58 917 113C826 99 745 108 669 152C574 207 512 306 431 380C349 450 278 437 238 343Z" fill="url(#s04g1)"/>
  <path d="M272 388C383 312 498 188 615 149C731 108 832 122 903 164C813 155 746 182 682 236C596 308 531 391 439 445C357 491 300 454 272 388Z" fill="url(#s04g2)"/>
  <path d="M358 488C459 371 555 247 664 225C771 202 867 230 914 288C810 255 737 284 658 343C568 411 505 467 419 516Z" fill="url(#s04g4)" opacity=".98"/>
  <path d="M293 375C402 336 508 213 609 184C672 166 743 177 794 199C717 206 671 238 620 291C542 374 488 439 403 471C328 498 274 449 293 375Z" fill="url(#s04g1)" opacity=".96"/>
  <path d="M369 524C460 464 505 392 567 347C633 298 711 284 774 315C703 314 636 342 583 388C508 452 446 502 369 524Z" fill="url(#s04g2)" opacity=".93"/>
  <path d="M449 518C533 438 619 393 705 388C751 386 793 398 833 421C718 411 632 441 546 516Z" fill="url(#s04g3)" opacity=".82"/>
 </svg>
</Interactive.Div>;

const FolderIcon:React.FC=()=> <div className="folder" style={{transform:'scale(.57)',marginRight:-6}}/>;
const ChromeIcon:React.FC=()=> <div className="chrome"/>;
const ExcelIcon:React.FC<{mini?:boolean}>=({mini=false})=> <div className="excel" style={mini?{transform:'scale(.58)',transformOrigin:'left center',width:25,height:25,marginRight:-5}:{}}/>;
const ErpIcon:React.FC=()=> <div className="erpicon">ERP</div>;
const Taskbar:React.FC=()=> <Interactive.Div name="S04 Windows — taskbar" className="taskbar" style={{position:'absolute',left:0,right:0,bottom:0,height:49,zIndex:3}}>
 <div className="win-logo"><span/><span/><span/><span/></div>
 <div className="search"><div className="mag"/>Search</div>
 <div className="task-item active"><FolderIcon/></div><div className="task-item"><ChromeIcon/></div><div className="task-item"><ExcelIcon/></div><div className="task-item"><ErpIcon/></div>
 <div className="system-tray">⌃　◖　▴　<div>10:24<br/>24/11/2026</div></div>
 </Interactive.Div>;

const DesktopShortcut:React.FC<{kind:'chrome'|'erp'|'excel';top:number;selected?:boolean}>=({kind,top,selected})=>
 <div className="desktop-icon" style={{position:'absolute',left:19,top,width:95,color:'#FFFFFF',textAlign:'center',padding:4,backgroundColor:selected?'#3C83BF66':'transparent',outline:selected?'1px solid #B7E1FF88':'none',borderRadius:4}}>
  <div className="ico" style={{height:42,width:42,display:'grid',placeItems:'center',position:'relative'}}>{kind==='excel'?<ExcelIcon/>:kind==='chrome'?<ChromeIcon/>:<ErpIcon/>}<span className="small-arrow">↗</span></div>
  <div className="label">{kind==='excel'?'Laporan Kerja.xlsx':kind==='chrome'?'Google Chrome':'ERP System'}</div>
 </div>;

const StartupExplorer:React.FC<{t:number}>=({t})=>{
 const pasted=r(t,6.25,6.75);
 return <Interactive.Div name="S04 Explorer — folder Startup" className="s03-startup" style={{position:'absolute',left:103,top:40,width:764,height:444,opacity:1,zIndex:10}}>
  <div className="s03-startup-title"><div className="s03-startup-tab"><FolderIcon/><Interactive.Div name="S04 Explorer — nama folder" style={{fontSize:13,color:'#3B4955'}}>Startup</Interactive.Div><span style={{marginLeft:'auto'}}>×</span></div><span style={{fontSize:19}}>＋</span><span className="s03-controls">─　□　×</span></div>
  <div className="s03-startup-address">‹　›　⌃　↻　<div className="s03-startup-crumb"><FolderIcon/>Startup</div><div className="s03-startup-search">⌕　Search Startup</div></div>
  <div className="s03-startup-toolbar">＋ New　　▤ Sort　　☷ View <span style={{marginLeft:'auto'}}>•••</span></div>
  <div className="s03-startup-main"><div className="s03-startup-nav">⌂　Home<br/>▤　Desktop<br/>▤　Documents<br/>▤　Downloads<br/><span style={{background:'#E7F3FB',color:'#30556F'}}>▣　Startup</span></div>
   <div className="s03-startup-files">
    <div className="s03-startup-cols">Name <span>Date modified　 Type</span></div>
    <Interactive.Div name="S04 Explorer — Folder awal kosong" style={{position:'absolute',left:160,top:190,width:400,textAlign:'center',fontSize:13,color:'#767D85',opacity:1-r(t,6.1,6.52)}}>This folder is empty.</Interactive.Div>
    <Interactive.Div name="S04 Explorer — Shortcut hasil paste" style={{position:'absolute',left:14,top:48,width:565,height:35,opacity:pasted,transform:`translateY(${(1-pasted)*6}px)`,display:'flex',alignItems:'center',gap:10,fontSize:12,backgroundColor:'#E7F4FC',border:'1px solid #B3D8F4',borderRadius:4,padding:'0 10px',color:'#243B4C'}}><ExcelIcon mini/><Interactive.Div name="S04 Explorer — nama shortcut" style={{fontSize:12,color:'#243B4C',flex:1}}>Laporan Kerja.xlsx - Shortcut</Interactive.Div><span style={{fontSize:10,color:'#536E83'}}>Shortcut</span></Interactive.Div>
   </div>
  </div>
  <div className="s03-startup-status" style={{fontSize:10,color:'#65727B'}}>
   {t<6.6?<Interactive.Div name="S04 Explorer — 0 items" style={{fontSize:10,color:'#65727B'}}>0 items</Interactive.Div>:<Interactive.Div name="S04 Explorer — 1 item" style={{fontSize:10,color:'#65727B'}}>1 item</Interactive.Div>}
  </div>
 </Interactive.Div>;
};

const Cursor:React.FC<{t:number}>=({t})=>{
 const points:[number,number,number][]=[[0,805,430],[1.05,805,430],[1.9,55,207],[2.75,55,207],[3.9,55,207],[4.6,500,300],[5.35,522,309],[6.05,522,309],[9,730,418]];
 let x=730,y=418;
 for(let i=1;i<points.length;i++){if(t<=points[i][0]){const [a,ax,ay]=points[i-1];const [b,bx,by]=points[i];const k=ease((t-a)/(b-a));x=lerp(ax,bx,k);y=lerp(ay,by,k);break;}}
 const show=band(t,.6,1,8.3,8.7);
 const impact=[1.85,4.58,5.78].map(v=>Math.max(0,1-Math.abs(t-v)/.13)).reduce((m,n)=>Math.max(m,n),0);
 return <><Interactive.Div name="S04 Cursor — hotspot" style={{position:'absolute',left:x,top:y,width:31,height:38,zIndex:40,opacity:show,filter:'drop-shadow(0 1px 2px #0008)',pointerEvents:'none'}}>
  <svg viewBox="0 0 40 47" width="31" height="38"><path d="M2 1 L2 39 L12.6 30.5 L19.7 44 L27.1 40.7 L20.2 28 H34 Z" fill="white" stroke="#171717" strokeWidth="2.6" strokeLinejoin="round"/></svg>
 </Interactive.Div><div style={{position:'absolute',left:x-15,top:y-15,width:35,height:35,zIndex:41,border:'2px solid #DF805F',borderRadius:'50%',opacity:impact*.7,pointerEvents:'none'}}/></>;
};

export const Scene04Windows11:React.FC<{frame:number}>=({frame})=>{
 const t=frame/30;
 return <Interactive.Div name="S04 Desktop — Windows 11 familiar" className="s03w11" style={{position:'absolute',left:60,top:654,width:960,height:540,overflow:'hidden',borderRadius:10}}>
  <S04Bloom/>
  <Interactive.Div name="S04 Desktop — shortcut Chrome" style={{position:'absolute',inset:0,pointerEvents:'none'}}><DesktopShortcut kind="chrome" top={21}/></Interactive.Div>
  <Interactive.Div name="S04 Desktop — shortcut ERP" style={{position:'absolute',inset:0,pointerEvents:'none'}}><DesktopShortcut kind="erp" top={103}/></Interactive.Div>
  <Interactive.Div name="S04 Desktop — shortcut Excel" style={{position:'absolute',inset:0,pointerEvents:'none'}}><DesktopShortcut kind="excel" top={187} selected={t>=1.72&&t<4.33}/></Interactive.Div>
  <Taskbar/><StartupExplorer t={t}/><Cursor t={t}/>
 </Interactive.Div>;
};
