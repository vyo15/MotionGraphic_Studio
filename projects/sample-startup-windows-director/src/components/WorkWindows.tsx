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

export const WorkDesktop:React.FC<{excel:number;gmail:number;erp:number;signIn:number;desktopOpacity:number}>=({excel,gmail,erp,signIn,desktopOpacity})=><Interactive.Div name="S01 Desktop — layar Windows 11" style={{position:'absolute',left:60,top:622,width:960,height:540,overflow:'hidden',borderRadius:10,backgroundColor:'#0B4F9C',boxShadow:'0 28px 64px #1C39613D',opacity:desktopOpacity}}>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 80% 30%,#51CAF2 0%,#157FCC 35%,#124CAA 67%,#082B7B 100%)'}}>
   <svg viewBox="0 0 960 540" style={{height:'100%',width:'100%',position:'absolute'}}><path d="M270 445C460 170 712 85 851 170C933 219 905 329 766 359C638 382 526 288 418 363Z" fill="#6DD4F4" opacity=".67"/><path d="M375 493C486 278 657 219 786 260C882 291 870 380 777 387C691 394 606 335 540 377Z" fill="#094CAD" opacity=".75"/></svg>
  </div>
  <Interactive.Div name="S01 Shortcut — Excel" style={{position:'absolute',top:24,left:26,width:100,height:91,color:'#fff',fontSize:13,textAlign:'center',textShadow:'0 1px 3px #0008'}}><ExcelMark size={38}/><div>Laporan Kerja.xlsx</div></Interactive.Div>
  <Interactive.Div name="S01 Shortcut — Chrome" style={{position:'absolute',top:129,left:26,width:100,height:83,color:'#fff',fontSize:13,textAlign:'center',textShadow:'0 1px 3px #0008'}}><ChromeMark size={38}/><div>Google Chrome</div></Interactive.Div>
  <Interactive.Div name="S01 Shortcut — ERP System" style={{position:'absolute',top:231,left:26,width:100,height:83,color:'#fff',fontSize:13,textAlign:'center',textShadow:'0 1px 3px #0008'}}><ERPMark size={38}/><div>ERP System</div></Interactive.Div>
  <Interactive.Div name="S01 Jendela — Excel data kerja" style={{position:'absolute',left:122,top:18,width:637,height:380,backgroundColor:'#fff',border:'1px solid #A8BFB5',borderRadius:7,boxShadow:'0 12px 30px #0A2A4A66',overflow:'hidden',opacity:excel,translate:`0 ${Math.round((1-excel)*11)}px`,scale:.987+.013*excel}}>
   <div style={{height:39,background:'#187542',display:'flex',alignItems:'center',gap:9,padding:'0 12px',fontSize:15,color:'#fff'}}><ExcelMark size={21}/><Interactive.Div name="S01 Excel — Nama file" style={{color:'#fff',fontSize:15,fontWeight:600}}>Laporan Kerja.xlsx</Interactive.Div><div style={{marginLeft:'auto'}}>─　□　×</div></div>
   <div style={{height:31,padding:'7px 15px',fontSize:13,background:'#F4F7F5',color:'#343D38'}}>File　 Home　 Insert　 Page Layout　 Formulas　 Data　 Review</div>
   <div style={{height:49,borderBottom:'1px solid #E1E7E3',padding:'6px 14px',color:'#5B655F',fontSize:12}}>Paste　　Calibri　 11　 B　 I　 U　　Align　　Number　　Conditional Formatting</div>
   <ExcelGrid/>
   <div style={{position:'absolute',bottom:0,left:0,right:0,height:25,background:'#F7F8F7',padding:'5px 16px',fontSize:11,color:'#56635B'}}>Sheet1　　　　 Ready</div>
  </Interactive.Div>
  <Interactive.Div name="S01 Jendela — Chrome Gmail" style={{position:'absolute',left:300,top:71,width:617,height:358,backgroundColor:'#fff',border:'1px solid #D0D9E3',borderRadius:7,boxShadow:'0 14px 33px #0A2A4A66',overflow:'hidden',opacity:gmail,translate:`0 ${Math.round((1-gmail)*10)}px`,scale:.988+.012*gmail}}>
   <div style={{height:35,background:'#ECEFF5',display:'flex',alignItems:'center',gap:10,padding:'0 12px',fontSize:13}}><ChromeMark size={19}/> Inbox (3) — Gmail <div style={{marginLeft:'auto'}}>─　□　×</div></div>
   <div style={{height:40,display:'flex',alignItems:'center',gap:14,padding:'0 15px',background:'#FAFBFC',fontSize:13}}>‹　›　↻　 <div style={{background:'#EFF1F4',borderRadius:15,padding:'8px 14px',flex:1,color:'#60676D'}}>mail.google.com/mail/u/0/#inbox</div>☆</div>
   <div style={{display:'flex',height:282,background:'#fff',fontSize:13,color:'#39424B'}}><div style={{width:138,background:'#F7F9FC',padding:'18px 14px',lineHeight:3}}>✉ Gmail<br/>✎ Tulis<br/>📥 Inbox　3<br/>☆ Berbintang</div><div style={{flex:1,padding:'15px 13px'}}><Interactive.Div name="S01 Gmail — Judul inbox" style={{fontWeight:730,fontSize:17,marginBottom:11}}>Kotak Masuk</Interactive.Div>
   <Interactive.Div name="S01 Gmail — Pesan 1" style={{fontSize:13,borderBottom:'1px solid #E6EAED',padding:'12px 4px',fontWeight:620}}>Tim Operasional　 Daily Report</Interactive.Div>
   <Interactive.Div name="S01 Gmail — Pesan 2" style={{fontSize:13,borderBottom:'1px solid #E6EAED',padding:'12px 4px'}}>Warehouse　 Stock Update</Interactive.Div>
   <Interactive.Div name="S01 Gmail — Pesan 3" style={{fontSize:13,borderBottom:'1px solid #E6EAED',padding:'12px 4px'}}>HRD　 Meeting Reminder</Interactive.Div></div></div>
  </Interactive.Div>
  <Interactive.Div name="S01 Jendela — ERP Dashboard" style={{position:'absolute',left:212,top:191,width:688,height:307,backgroundColor:'#fff',border:'1px solid #CFD9E5',borderRadius:7,boxShadow:'0 18px 34px #0623458A',overflow:'hidden',opacity:erp,translate:`0 ${Math.round((1-erp)*10)}px`,scale:.988+.012*erp}}>
   <div style={{height:41,display:'flex',alignItems:'center',padding:'0 13px',gap:10,background:'#165CA6',color:'#fff',fontSize:15,fontWeight:630}}><ERPMark size={23}/><Interactive.Div name="S01 ERP — Judul aplikasi" style={{fontSize:15,color:'#fff',fontWeight:630}}>ERP System — Dashboard</Interactive.Div><div style={{marginLeft:'auto'}}>─　□　×</div></div>
   <div style={{display:'flex',height:266}}><div style={{background:'#EDF3F9',width:155,padding:'16px 12px',color:'#426580',fontSize:13,lineHeight:3.1}}>⌂ Dashboard<br/>▣ Sales Order<br/>▤ Inventory<br/>↗ Reports</div><div style={{padding:'14px 19px',flex:1}}><div style={{fontWeight:750,fontSize:17,color:'#253F55',marginBottom:14}}>Ringkasan Operasional</div>
   <div style={{display:'flex',gap:13}}><Interactive.Div name="S01 ERP — Orders" style={{border:'1px solid #E3E9F0',backgroundColor:'#F7FAFD',borderRadius:7,padding:'13px 19px',fontSize:13,color:'#426580',width:150}}>Orders<div style={{fontWeight:800,fontSize:27,color:'#15569C',marginTop:5}}>128</div></Interactive.Div><Interactive.Div name="S01 ERP — Stock" style={{border:'1px solid #E3E9F0',backgroundColor:'#F7FAFD',borderRadius:7,padding:'13px 19px',fontSize:13,color:'#426580',width:150}}>Stock SKU<div style={{fontWeight:800,fontSize:27,color:'#15569C',marginTop:5}}>248</div></Interactive.Div><Interactive.Div name="S01 ERP — Pending" style={{border:'1px solid #E3E9F0',backgroundColor:'#F7FAFD',borderRadius:7,padding:'13px 19px',fontSize:13,color:'#426580',width:132}}>Pending<div style={{fontWeight:800,fontSize:27,color:'#D18A32',marginTop:5}}>06</div></Interactive.Div></div>
   <div style={{marginTop:16,background:'#F0F5F9',height:26,borderRadius:5,color:'#5C6F80',fontSize:12,padding:'6px 11px'}}>Aktivitas terbaru • Data operasional contoh</div></div></div>
  </Interactive.Div>
  <div style={{position:'absolute',bottom:0,left:0,right:0,height:43,background:'#EFF3F6EB',borderTop:'1px solid #DFE5EB',display:'flex',alignItems:'center',justifyContent:'center',gap:20,fontSize:16,color:'#46515C'}}><div style={{color:'#0675CC'}}>⊞</div><div style={{width:136,borderRadius:15,padding:'5px 12px',background:'#fff',fontSize:12}}>⌕　Search</div><ExcelMark size={21}/><ChromeMark size={21}/><ERPMark size={22}/><div style={{position:'absolute',right:16,fontSize:12}}>10:24　◴</div></div>
  <Interactive.Div name="S01 Windows — Welcome" style={{position:'absolute',inset:0,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:17,backgroundColor:'#1769B9',opacity:signIn,color:'#fff'}}><div style={{width:85,height:85,background:'#E5EDF5',borderRadius:'50%',display:'grid',placeItems:'center',color:'#6B879F',fontSize:42}}>●</div><Interactive.Div name="S01 Windows — Pengguna" style={{color:'#fff',fontSize:25,fontWeight:600}}>Pengguna</Interactive.Div><div style={{fontSize:17}}>Welcome</div></Interactive.Div>
 </Interactive.Div>;
