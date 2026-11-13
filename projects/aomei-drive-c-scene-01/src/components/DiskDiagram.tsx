import React from 'react';
import {Interactive} from 'remotion';
import {show} from '../animations/presets';
import {SCENE01} from '../config/scene01';

/** Disk 0 and partitions are HTML layers, not a screenshot. */
export const DiskDiagram:React.FC<{seconds:number}>=({seconds:s})=>{
 const question=show(s,SCENE01.moments.question.in,SCENE01.moments.question.fullyVisible-SCENE01.moments.question.in);
 return <div style={{position:'relative',width:822,height:620}}>
  <Interactive.Div name="S01 — Kartu diagram disk / ukuran" style={{position:'absolute',left:0,top:0,width:822,height:620,background:'#FFFFFF',borderRadius:28,border:'1px solid #E5E5E4',boxShadow:'0 24px 58px rgba(38,45,43,.10)',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S01 — Kapsul Disk 0" style={{position:'absolute',left:38,top:39,width:124,height:44,borderRadius:24,background:'#EDF2F1',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
  <Interactive.Div name="S01 — Label Disk 0" style={{position:'absolute',left:64,top:49,fontSize:19,fontWeight:560,color:'#66827C',fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>Disk 0</Interactive.Div>
  <Interactive.Div name="S01 — Label total disk 480 GB" style={{position:'absolute',right:43,top:45,fontSize:23,color:'#9A9FA0',fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>480 GB</Interactive.Div>
  <Interactive.Div name="S01 — Label SATA SSD / HDD" style={{position:'absolute',left:42,top:133,fontSize:20,color:'#888F90',fontFamily:'Inter, Segoe UI, Arial, sans-serif',letterSpacing:'.1px',translate:'0px 0px',scale:1,rotate:'0deg'}}>SATU SSD / HDD</Interactive.Div>
  <div style={{position:'absolute',left:40,top:226,width:744,height:190,display:'flex',borderRadius:14,overflow:'hidden'}}>
   <div style={{position:'relative',width:186,height:'100%'}}>
     <Interactive.Div name="S01 — Partisi C (coral)" style={{position:'absolute',inset:0,background:'#DF805F',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
     <Interactive.Div name="S01 — Diagram teks C" style={{position:'absolute',left:72,top:60,color:'#FFFFFF',fontSize:31,fontWeight:690,fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>C:</Interactive.Div>
     <Interactive.Div name="S01 — Diagram 120 GB" style={{position:'absolute',left:61,top:103,color:'#FFF8F5',fontSize:18,fontWeight:510,fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>120 GB</Interactive.Div>
   </div>
   <div style={{position:'relative',flex:1}}>
     <Interactive.Div name="S01 — Partisi D (teal)" style={{position:'absolute',inset:0,background:'#83ABA2',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
     <Interactive.Div name="S01 — Diagram teks D" style={{position:'absolute',left:254,top:60,color:'#25453F',fontSize:31,fontWeight:690,fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>D:</Interactive.Div>
     <Interactive.Div name="S01 — Diagram 360 GB" style={{position:'absolute',left:237,top:103,color:'#355850',fontSize:18,fontWeight:510,fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>360 GB</Interactive.Div>
   </div>
  </div>
  <div style={{position:'absolute',left:225,top:225,height:192,opacity:question,transform:`scaleX(${.82+.18*question})`,transformOrigin:'left center'}}>
    <Interactive.Div name="S01 — Panel ruang D dipertanyakan" style={{position:'absolute',left:0,top:0,width:69,height:190,border:'2px solid #D6AE97',background:'#F1EAE2',boxShadow:'0 0 0 5px rgba(238,231,220,.23)',translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    <Interactive.Div name="S01 — Tanda tanya pada ruang D" style={{position:'absolute',left:20,top:66,color:'#B57D68',fontSize:42,fontWeight:700,translate:'0px 0px',scale:1,rotate:'0deg'}}>?</Interactive.Div>
  </div>
  <Interactive.Div name="S01 — Footer C masih penuh" style={{position:'absolute',left:45,top:480,fontSize:21,color:'#A67E6D',fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>C masih penuh</Interactive.Div>
  <Interactive.Div name="S01 — Footer D masih lega" style={{position:'absolute',right:44,top:480,fontSize:21,color:'#76948C',fontFamily:'Inter, Segoe UI, Arial, sans-serif',translate:'0px 0px',scale:1,rotate:'0deg'}}>D masih lega</Interactive.Div>
  <div style={{position:'absolute',left:0,right:0,top:546,opacity:question}}>
   <Interactive.Div name="S01 — Pertanyaan ruang D bisa dialihkan" style={{fontSize:21,fontWeight:550,textAlign:'center',fontFamily:'Inter, Segoe UI, Arial, sans-serif',color:'#898C8B',translate:'0px 0px',scale:1,rotate:'0deg'}}>Ruang D bisa dialihkan?</Interactive.Div>
  </div>
 </div>;
};
