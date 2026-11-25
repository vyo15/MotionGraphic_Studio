import React from 'react';
import {Interactive} from 'remotion';

// Windows UI built as DOM + independent Interactive targets, NOT a flattened PNG/video.
// Geometry is local to a 960x540 desktop. These are visual mock interfaces for a tutorial.
const ExcelMark:React.FC<{size?:number}>=({size=20})=><svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="2" width="25" height="28" rx="2" fill="#168550"/><path d="M18 3V30 M18 11H30 M18 19H30" stroke="#A8DCC5"/><rect x="1" y="7" width="21" height="19" rx="2" fill="#116B40"/><text x="11" y="21" fontSize="13" fontFamily="Arial" fontWeight="800" fill="white" textAnchor="middle">X</text></svg>;
const ChromeMark:React.FC<{size?:number}>=({size=22})=><svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#F9BD31"/><path d="M20 20L4 10A19 19 0 0 1 38 18H20Z" fill="#E9483D"/><path d="M20 20L11 37A19 19 0 0 1 4 10Z" fill="#36A35A"/><circle cx="20" cy="20" r="10" fill="#fff"/><circle cx="20" cy="20" r="8" fill="#4386F4"/></svg>;
const ERPMark:React.FC<{size?:number}>=({size=24})=><div style={{width:size,height:size,borderRadius:5,background:'#2062A7',display:'grid',placeItems:'center',fontWeight:750,fontSize:size*.40,color:'#fff',letterSpacing:-1}}>ERP</div>;
const Cell:React.FC<{children:React.ReactNode;header?:boolean;status?:'done'|'progress'|'pending'}>=({children,header,status})=><div style={{minWidth:0,borderRight:'1px solid #E0E7E1',borderBottom:'1px solid #E0E7E1',height:24,display:'flex',alignItems:'center',padding:'0 6px',whiteSpace:'nowrap',overflow:'hidden',fontSize:11,background:header?'#E5F0E8':status==='done'?'#EBF7EF':status==='progress'?'#FFF7E6':status==='pending'?'#FEF0E8':'white',fontWeight:header?700:400,color:'#303932'}}>{children}</div>;
const ExcelGrid:React.FC=()=> <div style={{padding:'10px 12px'}}>
  <div style={{fontWeight:800,fontSize:13,color:'#244C33',marginBottom:8}}>LAPORAN KERJA — NOVEMBER</div>
  <div style={{display:'grid',gridTemplateColumns:'76px 1.45fr 83px 76px',borderTop:'1px solid #DDE5DF',borderLeft:'1px solid #DDE5DF'}}>
  <Interactive.Div name="S01 Excel — Header Tanggal" style={{fontSize:11,fontWeight:700,backgroundColor:'#E5F0E8',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF'}}>Tanggal</Interactive.Div>
  <Interactive.Div name="S01 Excel — Header Aktivitas" style={{fontSize:11,fontWeight:700,backgroundColor:'#E5F0E8',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF'}}>Aktivitas</Interactive.Div>
  <Interactive.Div name="S01 Excel — Header Status" style={{fontSize:11,fontWeight:700,backgroundColor:'#E5F0E8',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF'}}>Status</Interactive.Div>
  <Interactive.Div name="S01 Excel — Header PIC" style={{fontSize:11,fontWeight:700,backgroundColor:'#E5F0E8',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF'}}>PIC</Interactive.Div>
  <Cell>23/11</Cell><Interactive.Div name="S01 Excel — Aktivitas laporan" style={{fontSize:11,color:'#202020',backgroundColor:'#FFFFFF',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF',whiteSpace:'nowrap'}}>Laporan harian</Interactive.Div><Cell status="done">Selesai</Cell><Cell>Admin</Cell>
  <Cell>24/11</Cell><Interactive.Div name="S01 Excel — Aktivitas stok" style={{fontSize:11,color:'#202020',backgroundColor:'#FFFFFF',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF',whiteSpace:'nowrap'}}>Input stok</Interactive.Div><Cell status="progress">Proses</Cell><Cell>Gudang</Cell>
  <Cell>25/11</Cell><Interactive.Div name="S01 Excel — Aktivitas meeting" style={{fontSize:11,color:'#202020',backgroundColor:'#FFFFFF',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF',whiteSpace:'nowrap'}}>Meeting tim</Interactive.Div><Cell status="pending">Pending</Cell><Cell>Operasional</Cell>
  <Cell>26/11</Cell><Interactive.Div name="S01 Excel — Aktivitas rekap" style={{fontSize:11,color:'#202020',backgroundColor:'#FFFFFF',height:24,padding:'5px 6px',borderBottom:'1px solid #DDE5DF',borderRight:'1px solid #DDE5DF',whiteSpace:'nowrap'}}>Rekap mingguan</Interactive.Div><Cell status="done">Selesai</Cell><Cell>Admin</Cell>
  </div><div style={{height:12,borderBottom:'1px solid #E6ECE8',background:'repeating-linear-gradient(90deg,#fff 0px,#fff 90px,#E8EEE9 90px,#E8EEE9 91px)'}}/>
 </div>;

const MiniExcelGrid:React.FC=()=> <div style={{padding:'10px 12px'}}><div style={{fontWeight:800,fontSize:13,color:'#244C33',marginBottom:8}}>LAPORAN KERJA — NOVEMBER</div>
 <div style={{display:'grid',gridTemplateColumns:'76px 1.45fr 83px 76px',borderTop:'1px solid #DDE5DF',borderLeft:'1px solid #DDE5DF'}}>
  <Cell header>Tanggal</Cell><Cell header>Aktivitas</Cell><Cell header>Status</Cell><Cell header>PIC</Cell>
  <Cell>23/11</Cell><Cell>Laporan harian</Cell><Cell status="done">Selesai</Cell><Cell>Admin</Cell>
  <Cell>24/11</Cell><Cell>Input stok</Cell><Cell status="progress">Proses</Cell><Cell>Gudang</Cell>
  <Cell>25/11</Cell><Cell>Meeting tim</Cell><Cell status="pending">Pending</Cell><Cell>Operasional</Cell>
  <Cell>26/11</Cell><Cell>Rekap mingguan</Cell><Cell status="done">Selesai</Cell><Cell>Admin</Cell>
 </div></div>;

// Miniature UI cards are story objects. Their position/scale are distinct from the desktop proof windows.
export const AppPreviewCards:React.FC<{progress:number;opacity:number}>=({progress,opacity})=><div style={{position:'absolute',top:1005,left:90,width:900,height:400,opacity,pointerEvents:'none'}}>
  <Interactive.Div name="S01 Mini — Chrome Gmail" style={{position:'absolute',left:400,top:44,width:415,height:235,rotate:'3deg',scale:.96+.04*progress,backgroundColor:'#fff',border:'1px solid #E5E8E8',borderRadius:15,boxShadow:'0 18px 34px #25374722',overflow:'hidden'}}>
   <div style={{height:39,background:'#F5F7F9',display:'flex',alignItems:'center',gap:9,padding:'0 15px',fontSize:15,color:'#4F5358'}}><ChromeMark size={17}/>Gmail — Chrome</div>
   <div style={{margin:'8px 14px 0',padding:6,fontSize:13,color:'#4A5560',borderBottom:'1px solid #ECEFF1'}}>Kotak Masuk　　◉ 3 baru</div>
   <div style={{margin:'8px 14px',fontSize:12,lineHeight:2.4,color:'#535B65'}}>📩 Daily Report — Tim Operasional<hr style={{border:'0',borderTop:'1px solid #EDF0F2',margin:0}}/>📩 Stock Update — Warehouse<hr style={{border:'0',borderTop:'1px solid #EDF0F2',margin:0}}/>📩 Meeting — HRD</div>
  </Interactive.Div>
  <Interactive.Div name="S01 Mini — Excel data laporan" style={{position:'absolute',left:92,top:65,width:475,height:270,rotate:'-2deg',scale:.96+.04*progress,backgroundColor:'#fff',border:'1px solid #DAE1DC',borderRadius:13,boxShadow:'0 20px 38px #25374727',overflow:'hidden'}}>
   <div style={{display:'flex',height:39,padding:'0 14px',alignItems:'center',gap:8,background:'#F5F9F6',fontSize:15,fontWeight:700,color:'#30573B'}}><ExcelMark size={18}/> Laporan Kerja.xlsx</div>
   <MiniExcelGrid/>
  </Interactive.Div>
 </div>;

// The same geometry and Bloom drawing language as Scene02 Windows 11 Familiar.
// Static local positions: Excel, Gmail and ERP never shuffle after they have opened.
const WindowsBloomS01:React.FC=()=> <div style={{position:'absolute',inset:0,overflow:'hidden',background:'linear-gradient(115deg,#A4CDE4 0%,#B2D5E8 28%,#88B5D9 55%,#466EA9 100%)'}}>
 <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}} aria-hidden="true">
  <defs>
   <linearGradient id="s01g1" x1="0" y1="0" x2=".9" y2=".8"><stop offset="0" stopColor="#72C7F8"/><stop offset=".24" stopColor="#1989E4"/><stop offset=".58" stopColor="#0957D0"/><stop offset=".9" stopColor="#08136C"/></linearGradient>
   <linearGradient id="s01g2" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stopColor="#B2EAFF"/><stop offset=".3" stopColor="#53B8F5"/><stop offset=".7" stopColor="#0066D8"/><stop offset="1" stopColor="#091A81"/></linearGradient>
   <linearGradient id="s01g3" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stopColor="#125AD4"/><stop offset=".43" stopColor="#153AE8"/><stop offset="1" stopColor="#020A4C"/></linearGradient>
   <linearGradient id="s01g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D5F3FF"/><stop offset=".31" stopColor="#69CDFD"/><stop offset=".7" stopColor="#166ADA"/><stop offset="1" stopColor="#0B1669"/></linearGradient>
   <filter id="s01blur8"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <ellipse cx="745" cy="155" rx="310" ry="125" fill="#B4EEFF" opacity=".23" filter="url(#s01blur8)"/>
  <path d="M326 473C390 316 480 209 609 141C713 87 854 79 941 132L945 369C867 328 790 322 715 338C566 370 466 428 326 473Z" fill="url(#s01g3)" opacity=".94"/>
  <path d="M238 343C350 221 507 106 657 73C761 47 851 58 917 113C826 99 745 108 669 152C574 207 512 306 431 380C349 450 278 437 238 343Z" fill="url(#s01g1)"/>
  <path d="M272 388C383 312 498 188 615 149C731 108 832 122 903 164C813 155 746 182 682 236C596 308 531 391 439 445C357 491 300 454 272 388Z" fill="url(#s01g2)"/>
  <path d="M358 488C459 371 555 247 664 225C771 202 867 230 914 288C810 255 737 284 658 343C568 411 505 467 419 516Z" fill="url(#s01g4)" opacity=".98"/>
  <path d="M293 375C402 336 508 213 609 184C672 166 743 177 794 199C717 206 671 238 620 291C542 374 488 439 403 471C328 498 274 449 293 375Z" fill="url(#s01g1)" opacity=".96"/>
  <path d="M369 524C460 464 505 392 567 347C633 298 711 284 774 315C703 314 636 342 583 388C508 452 446 502 369 524Z" fill="url(#s01g2)" opacity=".93"/>
  <path d="M449 518C533 438 619 393 705 388C751 386 793 398 833 421C718 411 632 441 546 516Z" fill="url(#s01g3)" opacity=".82"/>
 </svg>
</div>;

export const WorkDesktop:React.FC<{excel:number;gmail:number;erp:number;signIn:number;desktopOpacity:number;enter:number}>=({excel,gmail,erp,signIn,desktopOpacity,enter})=><Interactive.Div name="S01 Desktop — layar Windows 11" style={{position:'absolute',left:60,top:654,width:960,height:540,overflow:'hidden',borderRadius:10,backgroundColor:'#9EC5E0',boxShadow:'0 25px 70px #17364A30',border:'1px solid #CDD9E3',opacity:desktopOpacity,scale:.986+.014*enter,translate:`0 ${Math.round((1-enter)*12)}px`,fontFamily:'Segoe UI, Arial, sans-serif'}}>
  <WindowsBloomS01/>
  <Interactive.Div name="S01 Shortcut — Excel" style={{position:'absolute',top:187,left:19,width:95,height:72,color:'#fff',fontSize:12,textAlign:'center',textShadow:'0 1px 3px #000B'}}><ExcelMark size={31}/><div>Laporan Kerja.xlsx</div></Interactive.Div>
  <Interactive.Div name="S01 Shortcut — Chrome" style={{position:'absolute',top:21,left:19,width:95,height:72,color:'#fff',fontSize:12,textAlign:'center',textShadow:'0 1px 3px #000B'}}><ChromeMark size={33}/><div>Google Chrome</div></Interactive.Div>
  <Interactive.Div name="S01 Shortcut — ERP System" style={{position:'absolute',top:104,left:19,width:95,height:72,color:'#fff',fontSize:12,textAlign:'center',textShadow:'0 1px 3px #000B'}}><ERPMark size={33}/><div>ERP System</div></Interactive.Div>
  <Interactive.Div name="S01 Jendela — Excel data kerja" style={{position:'absolute',left:136,top:21,width:651,height:402,backgroundColor:'#fff',border:'1px solid #A8BFB5',borderRadius:7,boxShadow:'0 12px 30px #0A2A4A66',overflow:'hidden',opacity:excel,translate:`0 ${Math.round((1-excel)*18)}px`,scale:.973+.027*excel}}>
   <div style={{height:39,background:'#187542',display:'flex',alignItems:'center',gap:9,padding:'0 12px',fontSize:15,color:'#fff'}}><ExcelMark size={21}/><Interactive.Div name="S01 Excel — Nama file" style={{color:'#fff',fontSize:15,fontWeight:600}}>Laporan Kerja.xlsx</Interactive.Div><div style={{marginLeft:'auto'}}>─　□　×</div></div>
   <div style={{height:31,padding:'7px 15px',fontSize:13,background:'#F4F7F5',color:'#343D38'}}>File　 Home　 Insert　 Page Layout　 Formulas　 Data　 Review</div>
   <div style={{height:49,borderBottom:'1px solid #E1E7E3',padding:'6px 14px',color:'#5B655F',fontSize:12}}>Paste　　Calibri　 11　 B　 I　 U　　Align　　Number　　Conditional Formatting</div>
   <ExcelGrid/>
   <div style={{position:'absolute',bottom:0,left:0,right:0,height:25,background:'#F7F8F7',padding:'5px 16px',fontSize:11,color:'#56635B'}}>Sheet1　　　　 Ready</div>
  </Interactive.Div>
  <Interactive.Div name="S01 Jendela — Chrome Gmail" style={{position:'absolute',left:296,top:77,width:628,height:359,backgroundColor:'#fff',border:'1px solid #D0D9E3',borderRadius:7,boxShadow:'0 14px 33px #0A2A4A66',overflow:'hidden',opacity:gmail,translate:`0 ${Math.round((1-gmail)*18)}px`,scale:.973+.027*gmail}}>
   <div style={{height:36,background:'#EEF1F7',display:'flex',alignItems:'center',gap:11,padding:'0 12px',fontSize:13,color:'#394551'}}><ChromeMark size={17}/><span style={{background:'#fff',padding:'7px 13px',borderRadius:7,minWidth:205}}>Kotak Masuk (8) — Gmail　×</span><span>＋</span><span style={{marginLeft:'auto'}}>─　□　×</span></div>
   <div style={{height:37,display:'flex',alignItems:'center',gap:12,padding:'0 14px',background:'#FBFCFD',fontSize:12,color:'#596571'}}><span>‹</span><span>›</span><span>⟳</span><div style={{background:'#EFF2F6',borderRadius:14,padding:'7px 13px',flex:1}}>🔒　mail.google.com/mail/u/0/#inbox</div><span>☆　⋮</span></div>
   <div style={{display:'flex',height:285,background:'#fff',color:'#39424B'}}>
    <div style={{width:141,background:'#F6F8FC',padding:'10px 9px',fontSize:11,flexShrink:0}}><div style={{fontSize:17,fontWeight:700,padding:'5px 8px',marginBottom:13}}><span style={{color:'#4285F4'}}>M</span> Gmail</div><div style={{background:'#D8E9FB',borderRadius:15,padding:'9px 9px',marginBottom:11}}>✎　Tulis</div><div style={{background:'#DCE9F9',padding:'7px 6px',borderRadius:13,fontWeight:700}}>▣　Kotak Masuk　8</div><div style={{padding:'8px 6px'}}>☆　Berbintang</div><div style={{padding:'8px 6px'}}>▤　Ditunda</div><div style={{padding:'8px 6px'}}>➤　Terkirim</div><div style={{padding:'8px 6px'}}>▱　Draf</div></div>
    <div style={{flex:1,overflow:'hidden'}}><Interactive.Div name="S01 Gmail — Judul inbox" style={{height:43,fontWeight:700,fontSize:14,padding:'12px 16px',backgroundColor:'#F7F9FC',borderBottom:'1px solid #EAEDF0'}}>Telusuri dalam email</Interactive.Div>
    <div style={{height:29,padding:'6px 10px',fontSize:10,color:'#64717E',borderBottom:'1px solid #E7EBEF'}}>☐　⟳　⋮ <span style={{float:'right'}}>1–8 dari 8</span></div>
    <div style={{height:31,padding:'8px 15px',fontSize:12,color:'#3E7DD9',borderBottom:'1px solid #E8EEF4'}}>▣　Utama　　　 ◉　Promosi　　 ◈　Sosial</div>
    <Interactive.Div name="S01 Gmail — Pesan 1" style={{fontSize:11,height:27,borderBottom:'1px solid #E6EAED',padding:'7px 12px',fontWeight:700,whiteSpace:'nowrap'}}>Tim Operasional　　 Daily report hari ini</Interactive.Div>
    <Interactive.Div name="S01 Gmail — Pesan 2" style={{fontSize:11,height:27,borderBottom:'1px solid #E6EAED',padding:'7px 12px',fontWeight:700,whiteSpace:'nowrap'}}>Warehouse Admin　 Update stok dan GR</Interactive.Div>
    <Interactive.Div name="S01 Gmail — Pesan 3" style={{fontSize:11,height:27,borderBottom:'1px solid #E6EAED',padding:'7px 12px',fontWeight:700,whiteSpace:'nowrap'}}>HR Team　　　　 Agenda meeting pagi</Interactive.Div>
    <Interactive.Div name="S01 Gmail — Pesan 4" style={{fontSize:11,height:27,borderBottom:'1px solid #E6EAED',padding:'7px 12px',whiteSpace:'nowrap'}}>Finance　　　　　 Invoice perlu approval</Interactive.Div>
    <Interactive.Div name="S01 Gmail — Pesan 5" style={{fontSize:11,height:27,borderBottom:'1px solid #E6EAED',padding:'7px 12px',whiteSpace:'nowrap'}}>Manager　　　　 Review laporan mingguan</Interactive.Div>
    <Interactive.Div name="S01 Gmail — Pesan 6" style={{fontSize:11,height:27,borderBottom:'1px solid #E6EAED',padding:'7px 12px',whiteSpace:'nowrap'}}>Logistics　　　　 Jadwal pickup besok</Interactive.Div>
    <Interactive.Div name="S01 Gmail — Pesan 7" style={{fontSize:11,height:27,borderBottom:'1px solid #E6EAED',padding:'7px 12px',whiteSpace:'nowrap'}}>IT Support　　　 Update sistem ERP</Interactive.Div>
    </div>
   </div>
  </Interactive.Div>
  <Interactive.Div name="S01 Jendela — ERP Dashboard" style={{position:'absolute',left:215,top:175,width:683,height:305,backgroundColor:'#fff',border:'1px solid #CFD9E5',borderRadius:7,boxShadow:'0 18px 34px #0623458A',overflow:'hidden',opacity:erp,translate:`0 ${Math.round((1-erp)*18)}px`,scale:.974+.026*erp}}>
   <div style={{height:41,display:'flex',alignItems:'center',padding:'0 13px',gap:10,background:'#165CA6',color:'#fff',fontSize:15,fontWeight:630}}><ERPMark size={23}/><Interactive.Div name="S01 ERP — Judul aplikasi" style={{fontSize:15,color:'#fff',fontWeight:630}}>ERP System — Dashboard</Interactive.Div><div style={{marginLeft:'auto'}}>─　□　×</div></div>
   <div style={{display:'flex',height:264}}><div style={{background:'#EDF3F9',width:155,padding:'16px 12px',color:'#426580',fontSize:13,lineHeight:3}}>⌂ Dashboard<br/>▣ Sales Order<br/>▤ Inventory<br/>↗ Reports</div><div style={{padding:'14px 19px',flex:1}}><div style={{fontWeight:750,fontSize:17,color:'#253F55',marginBottom:14}}>Ringkasan Operasional</div>
   <div style={{display:'flex',gap:13}}><Interactive.Div name="S01 ERP — Orders" style={{border:'1px solid #E3E9F0',backgroundColor:'#F7FAFD',borderRadius:7,padding:'13px 19px',fontSize:13,color:'#426580',width:150}}>Orders<div style={{fontWeight:800,fontSize:27,color:'#15569C',marginTop:5}}>128</div></Interactive.Div><Interactive.Div name="S01 ERP — Stock" style={{border:'1px solid #E3E9F0',backgroundColor:'#F7FAFD',borderRadius:7,padding:'13px 19px',fontSize:13,color:'#426580',width:150}}>Stock SKU<div style={{fontWeight:800,fontSize:27,color:'#15569C',marginTop:5}}>248</div></Interactive.Div><Interactive.Div name="S01 ERP — Pending" style={{border:'1px solid #E3E9F0',backgroundColor:'#F7FAFD',borderRadius:7,padding:'13px 19px',fontSize:13,color:'#426580',width:132}}>Pending<div style={{fontWeight:800,fontSize:27,color:'#D18A32',marginTop:5}}>06</div></Interactive.Div></div>
   <div style={{marginTop:16,background:'#F0F5F9',height:26,borderRadius:5,color:'#5C6F80',fontSize:12,padding:'6px 11px'}}>Aktivitas terbaru • Data operasional contoh</div></div></div>
  </Interactive.Div>
  <div style={{position:'absolute',bottom:0,left:0,right:0,height:49,background:'#F1F5F9DD',borderTop:'1px solid #E5EFF6',display:'flex',alignItems:'center',justifyContent:'center',gap:16,fontSize:13,color:'#46515C',zIndex:18}}><div style={{width:27,height:27,display:'grid',gridTemplateColumns:'1fr 1fr',gap:2}}><span style={{background:'#0078D4'}}/><span style={{background:'#0078D4'}}/><span style={{background:'#0078D4'}}/><span style={{background:'#0078D4'}}/></div><div style={{width:138,borderRadius:16,padding:'6px 12px',background:'#fff',fontSize:12}}>⌕　Search</div><span style={{fontSize:20}}>📁</span><ChromeMark size={23}/><ExcelMark size={23}/><ERPMark size={23}/><div style={{position:'absolute',right:16,fontSize:11}}>10:24<br/>24/11/2026</div></div>
  <Interactive.Div name="S01 Cursor — Tidak bergerak / tidak klik" style={{position:'absolute',left:162,top:460,width:35,height:44,opacity:excel,filter:'drop-shadow(0 1px 2px #0005)',zIndex:40}}><svg width="35" height="44" viewBox="0 0 32 42" aria-hidden="true"><path d="M2 2L2 36L11 28L16 39L23 36L18 26L30 26Z" fill="#202020" stroke="#FFFFFF" strokeWidth="3.2" strokeLinejoin="round"/></svg></Interactive.Div>
  <Interactive.Div name="S01 Windows — Welcome" style={{position:'absolute',inset:0,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:17,opacity:signIn,color:'#fff',zIndex:50,backgroundColor:'#386BA6',overflow:'hidden'}}>
   <div style={{position:'absolute',inset:-30,filter:'blur(14px)',opacity:.9}}><WindowsBloomS01/></div>
   <div style={{position:'absolute',inset:0,backgroundColor:'#204D8744'}}/>
   <div style={{position:'relative',width:75,height:75,borderRadius:'50%',backgroundColor:'#D7E5F0',display:'flex',justifyContent:'center',alignItems:'center',fontSize:43,color:'#697C8D'}}>●</div>
   <Interactive.Div name="S01 Windows — Pengguna" style={{position:'relative',color:'#fff',fontSize:25,fontWeight:650}}>Pengguna</Interactive.Div>
   <div style={{position:'relative',display:'flex',alignItems:'center',gap:10,fontSize:16,color:'#FDFEFF'}}>◌　Welcome</div>
  </Interactive.Div>
 </Interactive.Div>;
