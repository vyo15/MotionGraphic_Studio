import React from 'react';
import {Interactive} from 'remotion';
import './Scene03Windows11.css';

// Scene03 Windows 11 desktop matches the approved Scene02 Familiar visual system.
// Main UI objects remain native React elements, not a flattened screenshot.
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const smooth=(x:number)=>{const t=clamp(x);return t*t*(3-2*t)};
const ramp=(t:number,a:number,b:number)=>smooth((t-a)/(b-a));
const band=(t:number,a:number,b:number,c:number,d:number)=>ramp(t,a,b)*(1-ramp(t,c,d));
const S03Bloom:React.FC=()=> <Interactive.Div name="S03 Background — Windows 11 Bloom style" className="wall" style={{position:'absolute',inset:0}}>
 <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
   <linearGradient id="s03g1" x1="0" y1="0" x2=".9" y2=".8"><stop offset="0" stopColor="#72C7F8"/><stop offset=".24" stopColor="#1989E4"/><stop offset=".58" stopColor="#0957D0"/><stop offset=".9" stopColor="#08136C"/></linearGradient>
   <linearGradient id="s03g2" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stopColor="#B2EAFF"/><stop offset=".3" stopColor="#53B8F5"/><stop offset=".7" stopColor="#0066D8"/><stop offset="1" stopColor="#091A81"/></linearGradient>
   <linearGradient id="s03g3" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stopColor="#125AD4"/><stop offset=".43" stopColor="#153AE8"/><stop offset="1" stopColor="#020A4C"/></linearGradient>
   <linearGradient id="s03g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D5F3FF"/><stop offset=".31" stopColor="#69CDFD"/><stop offset=".7" stopColor="#166ADA"/><stop offset="1" stopColor="#0B1669"/></linearGradient>
   <filter id="s03blur8"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <ellipse cx="745" cy="155" rx="310" ry="125" fill="#B4EEFF" opacity=".23" filter="url(#s03blur8)"/>
  <path d="M326 473C390 316 480 209 609 141C713 87 854 79 941 132L945 369C867 328 790 322 715 338C566 370 466 428 326 473Z" fill="url(#s03g3)" opacity=".94"/>
  <path d="M238 343C350 221 507 106 657 73C761 47 851 58 917 113C826 99 745 108 669 152C574 207 512 306 431 380C349 450 278 437 238 343Z" fill="url(#s03g1)"/>
  <path d="M272 388C383 312 498 188 615 149C731 108 832 122 903 164C813 155 746 182 682 236C596 308 531 391 439 445C357 491 300 454 272 388Z" fill="url(#s03g2)"/>
  <path d="M358 488C459 371 555 247 664 225C771 202 867 230 914 288C810 255 737 284 658 343C568 411 505 467 419 516Z" fill="url(#s03g4)" opacity=".98"/>
  <path d="M293 375C402 336 508 213 609 184C672 166 743 177 794 199C717 206 671 238 620 291C542 374 488 439 403 471C328 498 274 449 293 375Z" fill="url(#s03g1)" opacity=".96"/>
  <path d="M369 524C460 464 505 392 567 347C633 298 711 284 774 315C703 314 636 342 583 388C508 452 446 502 369 524Z" fill="url(#s03g2)" opacity=".93"/>
  <path d="M449 518C533 438 619 393 705 388C751 386 793 398 833 421C718 411 632 441 546 516Z" fill="url(#s03g3)" opacity=".82"/>
 </svg>
</Interactive.Div>;


const FolderIcon:React.FC<{scale?:number}>=({scale=1})=><div className="folder" style={{transform:`scale(${scale})`}}/>;
const ChromeIcon:React.FC=()=> <div className="chrome"/>;
const ExcelIcon:React.FC=()=> <div className="excel"/>;
const ErpIcon:React.FC=()=> <div className="erpicon">ERP</div>;

const S03Taskbar:React.FC=()=> <Interactive.Div name="S03 Windows — taskbar" className="taskbar" style={{position:'absolute',left:0,right:0,bottom:0,height:49}}>
 <div className="win-logo"><span/><span/><span/><span/></div><div className="search"><div className="mag"/>Search</div>
 <div className="task-item active"><FolderIcon scale={.7}/></div>
 <div className="task-item"><ChromeIcon/></div><div className="task-item"><ExcelIcon/></div><div className="task-item"><ErpIcon/></div>
 <div className="system-tray">⌃　◖　▴　<div>10:24<br/>24/11/2026</div></div>
</Interactive.Div>;

const S03Run:React.FC<{t:number}>=({t})=>{
 const o=band(t,2.52,2.92,7.08,7.42);
 const chars=Math.floor(ramp(t,3.9,6.4)*'shell:startup'.length);
 const word=t<3.9?'':'shell:startup'.slice(0,chars);
 return <Interactive.Div name="S03 Dialog — Run Windows" className="s03-run" style={{position:'absolute',left:235,top:133,width:505,height:272,opacity:o,transform:`translateY(${Math.round((1-ramp(t,2.52,2.92))*14-ramp(t,7.08,7.42)*8)}px) scale(${.98+.02*ramp(t,2.52,2.92)})`}}>
  <div className="s03-run-title"><div className="s03-run-icon">▤</div><span>Run</span><span style={{marginLeft:'auto'}}>×</span></div>
  <div className="s03-run-body">
   <div className="s03-run-description">Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</div>
   <div className="s03-run-fieldrow"><span>Open:</span><div className="s03-run-field"><span>{word}</span><span style={{opacity:t>=3.65&&t<6.86&&Math.floor(t*2.5)%2===0?1:0}}>|</span></div></div>
   <div className="s03-run-buttons"><div style={{backgroundColor:t>=6.85?'#D7EBFC':'#EFF7FF'}}>OK</div><div>Cancel</div><div>Browse...</div></div>
  </div>
 </Interactive.Div>;
};

const S03StartupExplorer:React.FC<{t:number}>=({t})=>{
 const o=ramp(t,7.45,8.07);
 return <Interactive.Div name="S03 Explorer — folder Startup" className="s03-startup" style={{position:'absolute',left:103,top:40,width:764,height:444,opacity:o,transform:`translateY(${Math.round(12*(1-o))}px) scale(${.98+.02*o})`}}>
  <div className="s03-startup-title"><div className="s03-startup-tab"><FolderIcon scale={.56}/><Interactive.Div name="S03 Explorer — Nama Startup" style={{fontSize:13,color:'#3B4955'}}>Startup</Interactive.Div><span style={{marginLeft:'auto'}}>×</span></div><span style={{fontSize:19}}>＋</span><span className="s03-controls">─　□　×</span></div>
  <div className="s03-startup-address">‹　›　⌃　↻　<div className="s03-startup-crumb"><FolderIcon scale={.56}/>Startup</div><div className="s03-startup-search">⌕　Search Startup</div></div>
  <div className="s03-startup-toolbar">＋ New　　▤ Sort　　☷ View <span style={{marginLeft:'auto'}}>•••</span></div>
  <div className="s03-startup-main"><div className="s03-startup-nav">⌂　Home<br/>▤　Desktop<br/>▤　Documents<br/>▤　Downloads<br/>▣　Startup</div><div className="s03-startup-files"><div className="s03-startup-cols">Name <span>Date modified　 Type</span></div><Interactive.Div name="S03 Explorer — Folder kosong" style={{position:'absolute',left:170,top:190,width:400,textAlign:'center',fontSize:13,color:'#767D85'}}>This folder is empty.</Interactive.Div></div></div>
  <div className="s03-startup-status">0 items</div>
 </Interactive.Div>;
};

export const Scene03Windows11:React.FC<{frame:number}>=({frame})=>{
 const t=frame/30;
 return <Interactive.Div name="S03 Desktop — layar Windows 11" className="s03w11" style={{position:'absolute',left:60,top:654,width:960,height:540,borderRadius:10,overflow:'hidden'}}>
  <S03Bloom/>
  <Interactive.Div name="S03 Desktop — shortcut Chrome" className="desktop-icon" style={{position:'absolute',left:19,top:21,width:95,color:'#fff',textAlign:'center'}}><div className="ico"><ChromeIcon/><span className="small-arrow">↗</span></div>Google Chrome</Interactive.Div>
  <Interactive.Div name="S03 Desktop — shortcut ERP" className="desktop-icon" style={{position:'absolute',left:19,top:103,width:95,color:'#fff',textAlign:'center'}}><div className="ico"><ErpIcon/><span className="small-arrow">↗</span></div>ERP System</Interactive.Div>
  <Interactive.Div name="S03 Desktop — shortcut Excel" className="desktop-icon" style={{position:'absolute',left:19,top:187,width:95,color:'#fff',textAlign:'center'}}><div className="ico"><ExcelIcon/><span className="small-arrow">↗</span></div>Laporan Kerja.xlsx</Interactive.Div>
  <S03Taskbar/>
  <S03Run t={t}/>
  <S03StartupExplorer t={t}/>
 </Interactive.Div>;
};
