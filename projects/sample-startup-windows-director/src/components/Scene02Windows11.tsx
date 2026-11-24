import React from 'react';
import {Interactive} from 'remotion';
import './Scene02Windows11.css';

// Scene02 v4 source is native DOM/SVG, not a flattened screenshot.
// Coordinates are measured in the local 960x540 desktop.
const clamp=(v:number)=>Math.min(1,Math.max(0,v));
const smooth=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)};
const rise=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const band=(t:number,a:number,b:number,c:number,d:number)=>rise(t,a,b)*(1-rise(t,c,d));
const mix=(a:number,b:number,p:number)=>a+(b-a)*p;

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
 const intro=rise(t,0,.85),minimize=rise(t,13.65,14.1);
 return <Interactive.Div name="S02 Explorer — jendela Kerja" className="explorer" style={{opacity:intro*(1-minimize),transform:`translate(${minimize*135}px,${minimize*140}px) scale(${(.97+.03*intro)*(1-.82*minimize)})`}}>
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
 const o=band(t,4.25,4.4,7.13,7.23);
 return <Interactive.Div name="S02 Menu — klik kanan modern" className="context-menu" style={{opacity:o,display:o>.001?'block':'none'}}>
  <div className="context-tools"><span>✂</span><span>▤</span><span>▣</span><span>↗</span><span>▥</span></div>
  <div className="item">⌂　Open</div><div className="item">▤　Open with</div><div className="item">↗　Share</div><div className="line"/>
  <div className="item">Copy as path</div><div className="item">Properties</div><div className="line"/>
  <Interactive.Div name="S02 Menu — Show more options" style={{height:34,color:'#303B44'}} className={`item ${t>=6.36&&t<7.2?'highlighted':''}`}>⋯　Show more options</Interactive.Div>
 </Interactive.Div>;
};

const LegacyMenu:React.FC<{t:number}>=({t})=>{
 const o=band(t,7.16,7.30,11.8,11.96);
 return <Interactive.Div name="S02 Menu — klasik Windows" className="legacy-menu" style={{opacity:o,display:o>.001?'block':'none'}}>
  <div className="item">Open</div><div className="item">Edit</div><div className="item">Print</div><div className="item">Open with　 ›</div><div className="item">Share</div><div className="item">Cut</div><div className="item">Copy</div><div className="item">Create shortcut</div>
  <Interactive.Div name="S02 Menu — Send to" style={{height:30,color:'#303B44'}} className={`item ${t>=9.0&&t<11.95?'highlighted':''}`}>Send to <span style={{marginLeft:'auto'}}>›</span></Interactive.Div>
  <div className="item">Properties</div>
 </Interactive.Div>;
};

const SendToMenu:React.FC<{t:number}>=({t})=>{
 const o=band(t,9.52,9.72,11.75,11.96);
 return <Interactive.Div name="S02 Menu — pilihan Send to" className="sub-menu" style={{opacity:o,display:o>.001?'block':'none'}}>
  <div className="item">Bluetooth device</div>
  <Interactive.Div name="S02 Menu — Desktop create shortcut" style={{height:30,color:'#303B44'}} className={`item ${t>=10.65&&t<11.95?'highlighted':''}`}>Desktop (create shortcut)</Interactive.Div>
  <div className="item">Documents</div><div className="item">Compressed (zipped) folder</div>
 </Interactive.Div>;
};

const Cursor:React.FC<{t:number;zoom:number}>=({t,zoom})=>{
 // The hotspot tracks the actual menu row center as the full desktop zooms.
 const keypoints:[number,number,number][]=[
  [0,950,570],[2.7,950,570],[3.9,350,245],[4.8,350,245],
  [6.5,600,413],[7.15,600,413],[8.9,562,392],[9.65,562,392],
  [10.7,818,365],[11.75,818,365],[12.35,818,365],
  [13.3,797,62],[13.62,797,62],[14.2,855,575],[16,855,575],
 ];
 let px=950,py=570;
 for(let i=1;i<keypoints.length;i++){
  if(t<keypoints[i][0]){
   const [a,ax,ay]=keypoints[i-1], [b,bx,by]=keypoints[i];const s=smooth((t-a)/(b-a));
   px=mix(ax,bx,s);py=mix(ay,by,s);break;
  }
 }
 const x=60+480+(px-480)*zoom;
 const y=654+270+(py-270)*zoom;
 const show=band(t,2.1,2.6,14.0,14.3);
 const hits=[4.3,7.13,11.78,13.65];
 const hit=hits.find(v=>Math.abs(t-v)<.10);
 const flash=hit?(.3+.4*(1-Math.abs(t-hit)/.10)):0;
 return <>
  <Interactive.Div name="S02 Cursor — posisi dan gerakan" className="s02w11-cursor" style={{position:'absolute',left:x,top:y,zIndex:65,opacity:show,width:40,height:47,pointerEvents:'none',filter:'drop-shadow(0 1px 2px #0006)'}}><svg viewBox="0 0 40 47" width="40" height="47"><path d="M2 1L2 39L12.6 30.5L19.7 44L27.1 40.7L20.2 28H34Z" fill="#FFF" stroke="#141414" strokeWidth="2.7" strokeLinejoin="round"/></svg></Interactive.Div>
  <div style={{position:'absolute',left:x-14,top:y-14,zIndex:66,border:'2px solid #DF805F',borderRadius:'50%',width:30,height:30,opacity:flash,pointerEvents:'none'}}/>
 </>;
};

export const Scene02Windows11:React.FC<{frame:number}>=({frame})=>{
 const t=frame/30;
 const zoom=band(t,6.2,7.15,12.2,13.2);
 // Bridge from the small Explorer at the end of S01 without changing locked S01.
 const connectedIntro=rise(t,0,.65);
 const iconOpacity=rise(t,14.07,14.45);
 return <>
  <Interactive.Div name="S02 Desktop — simulasi Windows 11" className="s02w11" style={{position:'absolute',left:60,top:654,opacity:connectedIntro,transform:`translateY(${(1-connectedIntro)*26}px) scale(${.96+.04*connectedIntro+.08*zoom})`,transformOrigin:'50% 50%'}}>
   <Bloom/>
   <Interactive.Div name="S02 Desktop — shortcut Chrome" className="desktop-icon" style={{top:21}}><div className="ico"><ChromeIcon/><span className="small-arrow">↗</span></div><div className="label">Google Chrome</div></Interactive.Div>
   <Interactive.Div name="S02 Desktop — shortcut ERP" className="desktop-icon" style={{top:103}}><div className="ico"><ErpIcon/><span className="small-arrow">↗</span></div><div className="label">ERP System</div></Interactive.Div>
   <Interactive.Div name="S02 Desktop — shortcut baru Excel" className="desktop-icon" style={{top:187,opacity:iconOpacity,transform:`translateY(${(1-iconOpacity)*9}px)`}}><div className="ico"><ExcelIcon/><span className="small-arrow">↗</span></div><div className="label">Laporan Kerja.xlsx</div></Interactive.Div>
   <Taskbar/>
   <Explorer t={t}/>
   <ModernMenu t={t}/>
   <LegacyMenu t={t}/>
   <SendToMenu t={t}/>
  </Interactive.Div>
  <Cursor t={t} zoom={1+.08*zoom}/>
 </>;
};
