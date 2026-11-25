import React from 'react';
import {Interactive} from 'remotion';
import './Scene02Windows11.css';

// Scene02 v7 approved: continuous pointer, stable Windows desktop, and shortcut-result focus.
// Elements stay native DOM/SVG layers (not a flattened MP4). The desktop is 960x540 at stage (60,654).
const clamp=(v:number)=>Math.min(1,Math.max(0,v));
const smooth=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)};
const rise=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const band=(t:number,a:number,b:number,c:number,d:number)=>rise(t,a,b)*(1-rise(t,c,d));
const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
// Cursor control points are in 1080x1920 composition coordinates. They NEVER depend on hidden DOM menus.
// Edit the points to refine the cursor trajectory without editing the other layers.
const cursorMoves=[
 {start:2.62,end:3.49,from:[750,943],c1:[693,930],c2:[505,893],to:[448,900]},
 {start:4.70,end:6.24,from:[448,900],c1:[468,945],c2:[546,1060],to:[650,1077]},
 {start:7.51,end:8.28,from:[650,1077],c1:[643,1068],c2:[601,1055],to:[606,1048]},
 {start:9.84,end:10.72,from:[606,1048],c1:[679,1047],c2:[801,1019],to:[861,1021]},
 {start:12.30,end:13.53,from:[861,1021],c1:[855,940],c2:[864,787],to:[857,718]},
] as const;
const cubic=(a:number,b:number,c:number,d:number,p:number)=>{
 const q=1-p;return q*q*q*a+3*q*q*p*b+3*q*p*p*c+p*p*p*d;
};
const cursorPosition=(t:number):[number,number]=>{
 let last:[number,number]=[750,943];
 for(const m of cursorMoves){
  if(t<m.start)return last;
  if(t<=m.end){
   const p=clamp((t-m.start)/(m.end-m.start));
   return [cubic(m.from[0],m.c1[0],m.c2[0],m.to[0],p),cubic(m.from[1],m.c1[1],m.c2[1],m.to[1],p)];
  }
  last=[m.to[0],m.to[1]];
 }
 return last;
};

const FolderIcon:React.FC<{scale?:number}>=({scale=1})=><div className="folder" style={{transform:`scale(${scale})`}}/>;
const ChromeIcon:React.FC<{scale?:number}>=({scale=1})=><div className="chrome" style={{transform:`scale(${scale})`}}/>;
const ExcelIcon:React.FC<{scale?:number}>=({scale=1})=><div className="excel" style={{transform:`scale(${scale})`}}/>;
const ErpIcon:React.FC<{scale?:number}>=({scale=1})=><div className="erpicon" style={{transform:`scale(${scale})`}}>ERP</div>;

const Bloom:React.FC=()=> <Interactive.Div name="S02 Background — Windows 11 Bloom style" className="wall" style={{position:'absolute',inset:0}}>
 <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
   <linearGradient id="s02g1" x1="0" y1="0" x2=".9" y2=".8"><stop offset="0" stopColor="#72C7F8"/><stop offset=".24" stopColor="#1989E4"/><stop offset=".58" stopColor="#0957D0"/><stop offset=".9" stopColor="#08136C"/></linearGradient>
   <linearGradient id="s02g2" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stopColor="#B2EAFF"/><stop offset=".3" stopColor="#53B8F5"/><stop offset=".7" stopColor="#0066D8"/><stop offset="1" stopColor="#091A81"/></linearGradient>
   <linearGradient id="s02g3" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stopColor="#125AD4"/><stop offset=".43" stopColor="#153AE8"/><stop offset="1" stopColor="#020A4C"/></linearGradient>
   <linearGradient id="s02g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D5F3FF"/><stop offset=".31" stopColor="#69CDFD"/><stop offset=".7" stopColor="#166ADA"/><stop offset="1" stopColor="#0B1669"/></linearGradient>
   <filter id="s02blur8"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <ellipse cx="745" cy="155" rx="310" ry="125" fill="#B4EEFF" opacity=".23" filter="url(#s02blur8)"/>
  <path d="M326 473C390 316 480 209 609 141C713 87 854 79 941 132L945 369C867 328 790 322 715 338C566 370 466 428 326 473Z" fill="url(#s02g3)" opacity=".94"/>
  <path d="M238 343C350 221 507 106 657 73C761 47 851 58 917 113C826 99 745 108 669 152C574 207 512 306 431 380C349 450 278 437 238 343Z" fill="url(#s02g1)"/>
  <path d="M272 388C383 312 498 188 615 149C731 108 832 122 903 164C813 155 746 182 682 236C596 308 531 391 439 445C357 491 300 454 272 388Z" fill="url(#s02g2)"/>
  <path d="M358 488C459 371 555 247 664 225C771 202 867 230 914 288C810 255 737 284 658 343C568 411 505 467 419 516Z" fill="url(#s02g4)" opacity=".98"/>
  <path d="M293 375C402 336 508 213 609 184C672 166 743 177 794 199C717 206 671 238 620 291C542 374 488 439 403 471C328 498 274 449 293 375Z" fill="url(#s02g1)" opacity=".96"/>
  <path d="M369 524C460 464 505 392 567 347C633 298 711 284 774 315C703 314 636 342 583 388C508 452 446 502 369 524Z" fill="url(#s02g2)" opacity=".93"/>
  <path d="M449 518C533 438 619 393 705 388C751 386 793 398 833 421C718 411 632 441 546 516Z" fill="url(#s02g3)" opacity=".82"/>
 </svg>
</Interactive.Div>;

const Taskbar:React.FC=()=> <Interactive.Div name="S02 Windows — taskbar Windows 11" className="taskbar" style={{position:'absolute',bottom:0,left:0,right:0,height:49}}>
 <div className="win-logo"><span/><span/><span/><span/></div>
 <div className="search"><span className="mag"/>Search</div>
 <div className="task-item active"><FolderIcon scale={.7}/></div>
 <div className="task-item"><ChromeIcon scale={.78}/></div>
 <div className="task-item"><ExcelIcon scale={.77}/></div>
 <div className="task-item"><ErpIcon scale={.75}/></div>
 <div className="system-tray"><span>⌃</span><span>◖</span><span>▴</span><div>10:24<br/>24/11/2026</div></div>
</Interactive.Div>;

const Explorer:React.FC<{t:number}>=({t})=>{
 const minimize=rise(t,13.78,14.42);
 return <Interactive.Div name="S02 Explorer — jendela Kerja" className="explorer" style={{opacity:1-rise(t,14.16,14.42),translate:`${-13*minimize}px ${237*minimize}px`,scale:1-.96*minimize,transformOrigin:'center center'}}>
  <div className="explorer-title"><div className="tab"><FolderIcon scale={.58}/> Kerja <span style={{marginLeft:'auto'}}>×</span></div><span style={{fontSize:21,fontWeight:300,marginLeft:5}}>＋</span><div className="window-controls"><div className="window-control">─</div><div className="window-control">□</div><div className="window-control">×</div></div></div>
  <div className="explorer-address"><span>‹</span><span>›</span><span style={{fontSize:15}}>↻</span><Interactive.Div name="S02 Explorer — alamat folder" className="crumb" style={{fontSize:12,backgroundColor:'#FFFFFF'}}>⌂　›　Documents　›　Kerja</Interactive.Div><div className="explorer-search">⌕　Search Kerja</div></div>
  <div className="command-bar"><div className="command"><b style={{fontSize:16}}>＋</b> New</div><div className="command">✂</div><div className="command">▤</div><div className="command">▣</div><div className="command">↗</div><div className="command">▥</div><div className="command">Sort ▾</div><div className="command">View ▾</div><div className="command">⋯</div></div>
  <div className="explorer-main"><div className="nav"><div className="nav-item">⌂　Home</div><div className="nav-item">▤　Desktop</div><div className="nav-item">↓　Downloads</div><div className="nav-item selected">▣　Documents</div><div className="nav-item">▥　Pictures</div><div className="nav-item">▨　This PC</div></div>
   <div className="file-area"><div className="cols"><span>Name</span><span>Date modified</span><span>Type</span></div>
    <Interactive.Div name="S02 Explorer — Laporan Kerja.xlsx" className="file-row" style={{backgroundColor:t>=3.45?'#E6F3FD':'#fff',borderColor:t>=3.45?'#BCDDF7':'transparent'}}><span className="file-name"><ExcelIcon scale={.58}/>Laporan Kerja.xlsx</span><span>23/11/2026</span><span>Excel Worksheet</span></Interactive.Div>
    <div className="file-row"><span className="file-name"><FolderIcon scale={.55}/>Rekap</span><span>20/11/2026</span><span>File folder</span></div>
    <div className="file-row"><span className="file-name"><FolderIcon scale={.55}/>Template</span><span>18/11/2026</span><span>File folder</span></div>
   </div>
  </div>
 </Interactive.Div>;
};

const ModernMenu:React.FC<{t:number}>=({t})=>{
 const o=band(t,4.36,4.56,7.17,7.33);
 return <Interactive.Div name="S02 Menu — klik kanan modern" className="context-menu" style={{opacity:o,display:o>.001?'block':'none',translate:`0px ${(1-o)*5}px`,scale:.986+.014*o,transformOrigin:'top left'}}>
  <div className="context-tools"><span>✂</span><span>▤</span><span>▣</span><span>↗</span><span>▥</span></div>
  <div className="item">⌂　Open</div><div className="item">▤　Open with</div><div className="item">↗　Share</div><div className="line"/>
  <div className="item">Copy as path</div><div className="item">Properties</div><div className="line"/>
  <Interactive.Div name="S02 Menu — Show more options" style={{height:34,color:'#303B44'}} className={`item ${t>=6.44&&t<7.32?'highlighted':''}`}>⋯　Show more options</Interactive.Div>
 </Interactive.Div>;
};

const LegacyMenu:React.FC<{t:number}>=({t})=>{
 const o=band(t,7.26,7.49,12.04,12.24);
 return <Interactive.Div name="S02 Menu — klasik Windows" className="legacy-menu" style={{opacity:o,display:o>.001?'block':'none',translate:`0px ${(1-o)*5}px`,scale:.986+.014*o,transformOrigin:'top left'}}>
  <div className="item">Open</div><div className="item">Edit</div><div className="item">Print</div><div className="item">Open with　 ›</div><div className="item">Share</div><div className="item">Cut</div><div className="item">Copy</div><div className="item">Create shortcut</div>
  <Interactive.Div name="S02 Menu — Send to" style={{height:30,color:'#303B44'}} className={`item ${t>=8.80&&t<12.22?'highlighted':''}`}>Send to <span style={{marginLeft:'auto'}}>›</span></Interactive.Div>
  <div className="item">Properties</div>
 </Interactive.Div>;
};

const SendToMenu:React.FC<{t:number}>=({t})=>{
 const o=band(t,9.64,9.85,12.04,12.24);
 return <Interactive.Div name="S02 Menu — pilihan Send to" className="sub-menu" style={{opacity:o,display:o>.001?'block':'none',translate:`0px ${(1-o)*5}px`,scale:.986+.014*o,transformOrigin:'top left'}}>
  <div className="item">Bluetooth device</div>
  <Interactive.Div name="S02 Menu — Desktop create shortcut" style={{height:30,color:'#303B44'}} className={`item ${t>=10.98&&t<12.23?'highlighted':''}`}>Desktop (create shortcut)</Interactive.Div>
  <div className="item">Documents</div><div className="item">Compressed (zipped) folder</div>
 </Interactive.Div>;
};

const Cursor:React.FC<{t:number}>=({t})=>{
 const [x,y]=cursorPosition(t);
 const opacity=band(t,2.38,2.72,14.22,14.55);
 const clicks=[4.33,7.20,11.84,13.76];
 const hit=clicks.find(k=>Math.abs(t-k)<.13);
 const clickOpacity=hit ? .30*(1-Math.abs(t-hit)/.13) : 0;
 return <>
  <Interactive.Div name="S02 Cursor — posisi dan gerakan" style={{position:'absolute',left:x,top:y,zIndex:65,opacity,width:29,height:34,pointerEvents:'none',filter:'drop-shadow(0 1px 2px #0006)'}}>
   <svg viewBox="0 0 40 47" width="29" height="34"><path d="M2 1L2 39L12.6 30.5L19.7 44L27.1 40.7L20.2 28H34Z" fill="#FFF" stroke="#141414" strokeWidth="2.7" strokeLinejoin="round"/></svg>
  </Interactive.Div>
  <Interactive.Div name="S02 Cursor — efek klik halus" style={{position:'absolute',left:x-13,top:y-13,width:30,height:30,zIndex:66,border:'2px solid #DF805F',borderRadius:'50%',pointerEvents:'none',opacity:clickOpacity}}/>
 </>;
};

export const Scene02Windows11:React.FC<{frame:number;fps?:number}>=({frame,fps=30})=>{
 const t=frame/fps;
 const iconOpacity=rise(t,12.10,12.56);
 const focusIn=rise(t,14.46,14.77), focusOut=rise(t,15.63,15.96);
 const focusOpacity=focusIn*(1-focusOut);
 const labelOpacity=rise(t,14.61,14.88)*(1-focusOut);
 const checkIn=rise(t,14.67,14.92);
 return <>
  <Interactive.Div name="S02 Desktop — simulasi Windows 11" className="s02w11" style={{position:'absolute',left:60,top:654,width:960,height:540,opacity:1,scale:1,translate:'0px 0px',transformOrigin:'center center'}}>
   <Bloom/>
   <Interactive.Div name="S02 Desktop — shortcut Chrome" className="desktop-icon" style={{top:21,left:19,width:95}}><div className="ico"><ChromeIcon/><span className="small-arrow">↗</span></div><div className="label">Google Chrome</div></Interactive.Div>
   <Interactive.Div name="S02 Desktop — shortcut ERP" className="desktop-icon" style={{top:103,left:19,width:95}}><div className="ico"><ErpIcon/><span className="small-arrow">↗</span></div><div className="label">ERP System</div></Interactive.Div>
   <Interactive.Div name="S02 Desktop — shortcut baru Excel" className="desktop-icon" style={{top:187,left:19,width:95,opacity:iconOpacity,translate:`0px ${(1-iconOpacity)*9}px`}}><div className="ico"><ExcelIcon/><span className="small-arrow">↗</span></div><div className="label">Laporan Kerja.xlsx</div></Interactive.Div>

   {/* Focus overlays appear ONLY after Explorer has finished minimizing; no artificial icon flight. */}
   <Interactive.Div name="S02 Fokus — bingkai shortcut baru" style={{position:'absolute',left:11,top:180,width:119,height:103,zIndex:16,border:'2.5px solid #DF805F',backgroundColor:'rgba(223,128,95,0.065)',borderRadius:12,boxShadow:'0 0 0 5px rgba(223,128,95,.10), 0 0 23px rgba(223,128,95,.17)',pointerEvents:'none',opacity:focusOpacity,scale:.955+.045*focusIn,transformOrigin:'center center'}}/>
   <Interactive.Div name="S02 Fokus — garis penghubung" style={{position:'absolute',left:132,top:228,width:13,height:2,zIndex:16,backgroundColor:'#DF805F',pointerEvents:'none',opacity:focusOpacity*.9}}/>
   <Interactive.Div name="S02 Fokus — label Shortcut baru" style={{position:'absolute',left:146,top:212,zIndex:17,fontFamily:'Segoe UI, Arial, sans-serif',fontSize:19,fontWeight:720,letterSpacing:-.25,color:'#AF5B40',whiteSpace:'nowrap',textShadow:'0 1px 2px rgba(255,255,255,.8)',pointerEvents:'none',opacity:labelOpacity,translate:`${7*(1-focusIn)}px 0px`}}>Shortcut baru</Interactive.Div>
   <Interactive.Div name="S02 Fokus — centang shortcut" style={{position:'absolute',left:115,top:175,width:23,height:23,zIndex:18,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',backgroundColor:'#DF805F',color:'#FFFFFF',fontSize:13,fontWeight:800,border:'2px solid #FFFFFF',boxShadow:'0 3px 9px rgba(0,0,0,.18)',pointerEvents:'none',opacity:checkIn*(1-focusOut),scale:.6+.4*checkIn,transformOrigin:'center center'}}>✓</Interactive.Div>
   <Taskbar/>
   <Explorer t={t}/>
   <ModernMenu t={t}/>
   <LegacyMenu t={t}/>
   <SendToMenu t={t}/>
  </Interactive.Div>
  <Cursor t={t}/>
 </>;
};
