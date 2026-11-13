import React from 'react';
import {Interactive} from 'remotion';
import {hold} from '../animations/presets';
import {SCENE01} from '../config/scene01';

/** File Explorer mock UI: every meaningful row, icon, progress fill, and label is a native layer. */
const DiskGlyph:React.FC<{name:string}>=({name})=><div style={{position:'relative',width:57,height:61}}>
  <Interactive.Div name={`${name} — Ikon latar drive`} style={{position:'absolute',left:0,top:0,width:56,height:60,background:'#F0F3F3',borderRadius:12,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name={`${name} — Ikon disk`} style={{position:'absolute',left:9,top:13,width:39,height:25,background:'#81A9B8',border:'3px solid #7194A1',borderRadius:7,boxShadow:'inset 0 -4px 0 #517A89',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name={`${name} — Lampu disk`} style={{position:'absolute',left:38,top:43,width:6,height:6,background:'#E9FAFA',borderRadius:6,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
</div>;

const DriveRow:React.FC<{kind:'C'|'D';focused:number}>=({kind,focused})=>{
 const isC=kind==='C';
 return <div style={{position:'relative',width:646,height:220}}>
   <div style={{position:'absolute',inset:0,opacity:focused}}>
     {isC?<Interactive.Div name="S01 — Border sorotan Drive C" style={{width:646,height:220,background:'rgba(223,128,95,.045)',border:'2px solid #E4A4AA',borderRadius:20,translate:'0px 0px',scale:1,rotate:'0deg'}}/>:
     <Interactive.Div name="S01 — Border sorotan Drive D" style={{width:646,height:220,background:'rgba(125,174,168,.055)',border:'2px solid #A2C8C7',borderRadius:20,translate:'0px 0px',scale:1,rotate:'0deg'}}/>}
   </div>
   <div style={{position:'absolute',left:18,top:42}}><DiskGlyph name={isC?'S01 — Drive C':'S01 — Drive D'}/></div>
   <div style={{position:'absolute',left:100,top:43,width:520}}>
     {isC?<Interactive.Div name="S01 — Nama Local Disk C" style={{fontFamily:'Segoe UI, Arial, sans-serif',fontSize:27,fontWeight:620,color:'#393E41',width:'100%',translate:'0px 0px',scale:1,rotate:'0deg'}}>Local Disk (C:)</Interactive.Div>:
     <Interactive.Div name="S01 — Nama Local Disk D" style={{fontFamily:'Segoe UI, Arial, sans-serif',fontSize:27,fontWeight:620,color:'#505658',width:'100%',translate:'0px 0px',scale:1,rotate:'0deg'}}>Local Disk (D:)</Interactive.Div>}
     <div style={{position:'relative',marginTop:26,width:512,height:26}}>
       <Interactive.Div name={isC?'S01 — Track bar C':'S01 — Track bar D'} style={{width:512,height:26,background:'#EDEFEF',borderRadius:18,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
       {isC?<Interactive.Div name="S01 — Isi bar C merah (96%)" style={{position:'absolute',left:0,top:0,width:491,height:26,background:'#D95C65',borderRadius:18,translate:'0px 0px',scale:1,rotate:'0deg'}}/>:
       <Interactive.Div name="S01 — Isi bar D teal (18%)" style={{position:'absolute',left:0,top:0,width:92,height:26,background:'#7BB9C9',borderRadius:18,translate:'0px 0px',scale:1,rotate:'0deg'}}/>}
     </div>
     {isC?<Interactive.Div name="S01 — Keterangan kapasitas C" style={{fontFamily:'Segoe UI, Arial, sans-serif',fontSize:24,color:'#8C9193',marginTop:17,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>5 GB free of 120 GB</Interactive.Div>:
     <Interactive.Div name="S01 — Keterangan kapasitas D" style={{fontFamily:'Segoe UI, Arial, sans-serif',fontSize:24,color:'#8C9193',marginTop:17,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>295 GB free of 360 GB</Interactive.Div>}
   </div>
 </div>;
};

export const ExplorerWindow:React.FC<{seconds:number}>=({seconds:s})=>{
 const c=hold(s,SCENE01.moments.c.from,.40,SCENE01.moments.c.to,.48);
 const d=hold(s,SCENE01.moments.d.from,.46,SCENE01.moments.d.to,.42);
 return <div style={{position:'relative',width:920,height:945}}>
   <Interactive.Div name="S01 — Latar File Explorer / resize" style={{position:'absolute',left:0,top:0,width:920,height:945,background:'#FFFFFF',border:'1px solid #E9E9E9',borderRadius:24,boxShadow:'0 24px 55px rgba(42,49,47,.082)',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
   <Interactive.Div name="S01 — Title bar File Explorer" style={{position:'absolute',left:1,top:1,width:918,height:89,background:'#FBFBFB',borderBottom:'1px solid #E7E7E7',borderTopLeftRadius:24,borderTopRightRadius:24,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
   <Interactive.Div name="S01 — Ikon File Explorer title" style={{position:'absolute',left:31,top:29,width:19,height:20,background:'#76B1C9',borderRadius:3,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
   <Interactive.Div name="S01 — Teks File Explorer" style={{position:'absolute',left:66,top:23,fontFamily:'Segoe UI, Arial, sans-serif',fontSize:25,fontWeight:520,color:'#4D5154',translate:'0px 0px',scale:1,rotate:'0deg'}}>File Explorer</Interactive.Div>
   <Interactive.Div name="S01 — Tombol window minimize" style={{position:'absolute',right:112,top:30,fontSize:25,color:'#999EA1',width:26,height:32,translate:'0px 0px',scale:1,rotate:'0deg'}}>−</Interactive.Div>
   <Interactive.Div name="S01 — Tombol window maximize" style={{position:'absolute',right:66,top:32,fontSize:23,color:'#999EA1',width:26,height:32,translate:'0px 0px',scale:1,rotate:'0deg'}}>□</Interactive.Div>
   <Interactive.Div name="S01 — Tombol window close" style={{position:'absolute',right:24,top:31,fontSize:23,color:'#999EA1',width:24,height:32,translate:'0px 0px',scale:1,rotate:'0deg'}}>×</Interactive.Div>
   <div style={{position:'absolute',left:0,right:0,top:90,height:91,display:'flex',alignItems:'center',gap:18,padding:'0px 29px'}}>
     <Interactive.Div name="S01 — Navigasi back" style={{fontSize:36,width:27,color:'#9AA4A7',translate:'0px 0px',scale:1,rotate:'0deg'}}>‹</Interactive.Div>
     <Interactive.Div name="S01 — Navigasi forward" style={{fontSize:36,width:27,color:'#9AA4A7',translate:'0px 0px',scale:1,rotate:'0deg'}}>›</Interactive.Div>
     <Interactive.Div name="S01 — Navigasi refresh" style={{fontSize:29,width:33,color:'#9AA4A7',translate:'0px 0px',scale:1,rotate:'0deg'}}>↻</Interactive.Div>
     <div style={{position:'relative',flex:1,height:60,marginLeft:27}}>
       <Interactive.Div name="S01 — Address bar" style={{position:'absolute',inset:0,border:'1px solid #ECEEEF',background:'#FFFFFF',borderRadius:9,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
       <Interactive.Div name="S01 — Address This PC" style={{position:'absolute',left:24,top:14,fontSize:23,color:'#969C9F',fontFamily:'Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>This PC</Interactive.Div>
     </div>
   </div>
   <Interactive.Div name="S01 — Pemisah sidebar" style={{position:'absolute',left:236,top:181,width:2,height:763,background:'#E7E9E9',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
   <Interactive.Div name="S01 — Background sidebar This PC" style={{position:'absolute',left:24,top:212,width:199,height:66,borderRadius:12,background:'#EAF4F2',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
   <Interactive.Div name="S01 — Sidebar This PC" style={{position:'absolute',left:62,top:228,fontFamily:'Segoe UI, Arial, sans-serif',fontSize:25,fontWeight:600,color:'#586B6C',translate:'0px 0px',scale:1,rotate:'0deg'}}>▮ This PC</Interactive.Div>
   <Interactive.Div name="S01 — Sidebar Desktop" style={{position:'absolute',left:62,top:348,fontFamily:'Segoe UI, Arial, sans-serif',fontSize:23,color:'#A5B0B2',translate:'0px 0px',scale:1,rotate:'0deg'}}>▪  Desktop</Interactive.Div>
   <Interactive.Div name="S01 — Sidebar Downloads" style={{position:'absolute',left:62,top:438,fontFamily:'Segoe UI, Arial, sans-serif',fontSize:23,color:'#A5B0B2',translate:'0px 0px',scale:1,rotate:'0deg'}}>▪  Downloads</Interactive.Div>
   <Interactive.Div name="S01 — Sidebar Documents" style={{position:'absolute',left:62,top:528,fontFamily:'Segoe UI, Arial, sans-serif',fontSize:23,color:'#A5B0B2',translate:'0px 0px',scale:1,rotate:'0deg'}}>▪  Documents</Interactive.Div>
   <Interactive.Div name="S01 — Header Devices and drives (2)" style={{position:'absolute',left:274,top:209,fontFamily:'Segoe UI, Arial, sans-serif',fontSize:23,color:'#737B7D',translate:'0px 0px',scale:1,rotate:'0deg'}}>Devices and drives (2)</Interactive.Div>
   <Interactive.Div name="S01 — Garis pemisah drive list" style={{position:'absolute',left:274,top:259,width:605,height:1,background:'#DDE2E1',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
   <div style={{position:'absolute',left:254,top:290}}><DriveRow kind="C" focused={c}/></div>
   <div style={{position:'absolute',left:254,top:548}}><DriveRow kind="D" focused={d}/></div>
 </div>;
};
