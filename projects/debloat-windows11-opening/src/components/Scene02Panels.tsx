import React from 'react';
import {Interactive} from 'remotion';
import {AppIcon} from './AppIcons';
import {DESIGN} from '../config/design';


/** Tiap jendela dibuat dengan DOM / CSS, bukan screenshot yang di-flatten. */
export const XboxPanel: React.FC = () => <div style={{position:'relative',width:936,height:684}}>
  <Interactive.Div name="S02 — Xbox UI Background" style={{position:'absolute',inset:0,background:'#15191B',borderRadius:32,
    border:'2px solid #34393C',boxShadow:DESIGN.shadow,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Xbox Sidebar" style={{position:'absolute',left:12,top:12,width:238,height:660,
    borderRadius:25,background:'#202627',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Icon Xbox Panel" style={{position:'absolute',left:36,top:37,width:63,height:63,translate:'0px 0px',scale:1,rotate:'0deg'}}><AppIcon app="Xbox" size={63}/></Interactive.Div>
  <Interactive.Div name="S02 — Xbox Label Header" style={{position:'absolute',left:110,top:51,fontSize:38,color:'#FFFFFF',fontWeight:700,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Xbox</Interactive.Div>
  <Interactive.Div name="S02 — Xbox Home Indicator" style={{position:'absolute',left:25,top:173,width:196,height:62,
    borderRadius:15,background:'#335540',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Xbox Menu Home" style={{position:'absolute',left:79,top:188,fontSize:27,color:'#F4FFF2',fontWeight:600,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Home</Interactive.Div>
  <Interactive.Div name="S02 — Xbox Menu Game Pass" style={{position:'absolute',left:79,top:280,fontSize:24,color:'#B2BDB8',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Game Pass</Interactive.Div>
  <Interactive.Div name="S02 — Xbox Menu My Library" style={{position:'absolute',left:79,top:377,fontSize:24,color:'#B2BDB8',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>My Library</Interactive.Div>
  <Interactive.Div name="S02 — Xbox Menu Store" style={{position:'absolute',left:79,top:473,fontSize:24,color:'#B2BDB8',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Store</Interactive.Div>
  <Interactive.Div name="S02 — Xbox Search Bar" style={{position:'absolute',left:285,top:32,width:606,height:72,
    borderRadius:22,background:'#2E3436',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Xbox Search Placeholder" style={{position:'absolute',left:323,top:52,fontSize:25,color:'#B9C0C0',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Search games</Interactive.Div>
  <Interactive.Div name="S02 — Xbox Heading" style={{position:'absolute',left:290,top:154,fontSize:47,color:'#FFFFFF',fontWeight:750,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Discover games</Interactive.Div>
  <Interactive.Div name="S02 — Xbox Description" style={{position:'absolute',left:290,top:216,fontSize:22,color:'#B8C0C0',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Explore PC games and your library</Interactive.Div>
  {(['#225443','#38365D','#62404B'] as const).map((color,i)=><div key={i} style={{position:'absolute',left:295+i*204,top:300,width:170,height:221,
    borderRadius:20,background:color,overflow:'hidden'}}>
    <div style={{position:'absolute',left:52,top:45,width:70,height:70,borderRadius:'50%',background:'#8AC29D',opacity:.6}}/>
    <div style={{position:'absolute',left:22,top:162,width:125,height:11,borderRadius:8,background:'#B3BBB8',opacity:.75}}/>
    <div style={{position:'absolute',left:22,top:186,width:88,height:9,borderRadius:8,background:'#7A918B',opacity:.65}}/>
  </div>)}
  <Interactive.Div name="S02 — Xbox Library Label" style={{position:'absolute',left:293,top:573,fontSize:30,color:'#F9F9F9',fontWeight:650,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>My Library</Interactive.Div>
  {['#437652','#5A7C9B','#7C668C','#7A7551'].map((c,i)=><div key={i} style={{position:'absolute',left:550+i*81,top:573,width:64,height:60,borderRadius:12,background:c}}/>)}
</div>;

export const BingPanel: React.FC = () => <div style={{position:'relative',width:936,height:684}}>
  <Interactive.Div name="S02 — Windows Search Panel" style={{position:'absolute',inset:0,borderRadius:30,
    background:'#FFFFFF',border:'2px solid #E8EAF0',boxShadow:DESIGN.shadow,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Search Field" style={{position:'absolute',left:32,top:32,width:872,height:95,
    borderRadius:34,background:'#F2F5F9',border:'1px solid #E2E5E9',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <svg viewBox="0 0 44 44" style={{position:'absolute',left:59,top:59,width:43,height:43}}>
    <circle cx="18" cy="18" r="10" fill="none" stroke="#647182" strokeWidth="3.5"/>
    <path d="M25 25l12 12" stroke="#647182" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
  <Interactive.Div name="S02 — Search Placeholder" style={{position:'absolute',left:131,top:67,fontSize:30,color:'#707A84',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Search the web and Windows</Interactive.Div>
  <Interactive.Div name="S02 — Windows Search Tab All" style={{position:'absolute',left:58,top:149,width:112,height:53,
    borderRadius:26,background:'#DCEBFD',fontSize:25,textAlign:'center',paddingTop:8,color:'#32485B',translate:'0px 0px',scale:1,rotate:'0deg'}}>All</Interactive.Div>
  <Interactive.Div name="S02 — Tab Apps" style={{position:'absolute',left:203,top:160,fontSize:26,color:'#45505A',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Apps</Interactive.Div>
  <Interactive.Div name="S02 — Tab Documents" style={{position:'absolute',left:325,top:160,fontSize:26,color:'#45505A',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Documents</Interactive.Div>
  <Interactive.Div name="S02 — Tab Web" style={{position:'absolute',left:580,top:160,fontSize:26,color:'#45505A',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Web</Interactive.Div>
  <div style={{position:'absolute',left:38,top:236,right:38,borderTop:'2px solid #E9EBEF'}}/>
  <Interactive.Div name="S02 — Icon Bing Search Panel" style={{position:'absolute',left:54,top:270,width:97,height:97,translate:'0px 0px',scale:1,rotate:'0deg'}}><AppIcon app="Bing Search" size={97}/></Interactive.Div>
  <Interactive.Div name="S02 — Search Title Bing Search" style={{position:'absolute',left:172,top:283,fontSize:45,color:'#222B30',fontWeight:720,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Bing Search</Interactive.Div>
  <Interactive.Div name="S02 — Search Description" style={{position:'absolute',left:172,top:347,fontSize:26,color:'#818993',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Search the web from Windows</Interactive.Div>
  <Interactive.Div name="S02 — Web Suggestions Panel" style={{position:'absolute',left:50,top:452,width:837,height:192,borderRadius:20,
    background:'#F9FAFC',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Web Suggestions" style={{position:'absolute',left:83,top:475,fontSize:26,color:'#6C7781',fontWeight:620,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Web suggestions</Interactive.Div>
  <Interactive.Div name="S02 — Search Suggestion 1" style={{position:'absolute',left:83,top:535,width:342,height:71,
    borderRadius:15,background:'#FFFFFF',border:'1px solid #E8EAF0',fontSize:23,color:'#505C67',padding:'20px 24px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Search in browser</Interactive.Div>
  <Interactive.Div name="S02 — Search Suggestion 2" style={{position:'absolute',left:465,top:535,width:342,height:71,
    borderRadius:15,background:'#FFFFFF',border:'1px solid #E8EAF0',fontSize:23,color:'#505C67',padding:'20px 24px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Search settings</Interactive.Div>
</div>;

export const CopilotPanel: React.FC = () => <div style={{position:'relative',width:936,height:684}}>
  <Interactive.Div name="S02 — Copilot Window Background" style={{position:'absolute',inset:0,borderRadius:30,
    border:'2px solid #E3E7EE',background:'#FAFBFF',boxShadow:DESIGN.shadow,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Copilot Header Background" style={{position:'absolute',left:16,top:16,width:904,height:139,
    borderRadius:25,background:'#E8F1FB',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Icon Copilot Panel" style={{position:'absolute',left:47,top:47,width:89,height:89,translate:'0px 0px',scale:1,rotate:'0deg'}}><AppIcon app="Copilot" size={89}/></Interactive.Div>
  <Interactive.Div name="S02 — Copilot Name" style={{position:'absolute',left:161,top:71,fontSize:38,color:'#232A37',fontWeight:710,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Copilot</Interactive.Div>
  <Interactive.Div name="S02 — Copilot Heading Apa Yang Bisa Kubantu" style={{position:'absolute',left:142,top:218,fontSize:43,color:'#252C39',fontWeight:710,lineHeight:1.22,whiteSpace:'nowrap',width:650,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>
    Apa yang bisa kubantu?
  </Interactive.Div>
  <Interactive.Div name="S02 — Copilot Description" style={{position:'absolute',left:163,top:289,fontSize:25,color:'#7C8492',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',width:610,textAlign:'center',translate:'0px 0px',scale:1,rotate:'0deg'}}>
    Tanya, cari ide, atau ringkas sesuatu.
  </Interactive.Div>
  <Interactive.Div name="S02 — Copilot Aksi Buat Ide" style={{position:'absolute',left:72,top:380,height:102,width:244,
    border:'1px solid #EDF0F4',borderRadius:22,background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',color:'#687385',fontSize:23,translate:'0px 0px',scale:1,rotate:'0deg'}}>Buat ide</Interactive.Div>
  <Interactive.Div name="S02 — Copilot Aksi Tulis Sesuatu" style={{position:'absolute',left:351,top:380,height:102,width:244,
    border:'1px solid #EDF0F4',borderRadius:22,background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',color:'#687385',fontSize:23,translate:'0px 0px',scale:1,rotate:'0deg'}}>Tulis sesuatu</Interactive.Div>
  <Interactive.Div name="S02 — Copilot Aksi Cari Informasi" style={{position:'absolute',left:630,top:380,height:102,width:244,
    border:'1px solid #EDF0F4',borderRadius:22,background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',color:'#687385',fontSize:23,translate:'0px 0px',scale:1,rotate:'0deg'}}>Cari informasi</Interactive.Div>
  <Interactive.Div name="S02 — Copilot Input" style={{position:'absolute',left:65,top:540,width:809,height:108,
    borderRadius:38,background:'#FFFFFF',border:'2px solid #E0E5EE',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S02 — Copilot Input Placeholder" style={{position:'absolute',left:110,top:575,fontSize:29,color:'#8F98A8',fontWeight:500,lineHeight:1.22,whiteSpace:'nowrap',translate:'0px 0px',scale:1,rotate:'0deg'}}>Tanya apa saja</Interactive.Div>
  <div style={{position:'absolute',left:784,top:568,width:58,height:58,borderRadius:'50%',background:'#E1E7F5'}}/>
</div>;
