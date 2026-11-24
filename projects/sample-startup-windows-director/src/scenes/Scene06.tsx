import React from 'react';
import {Interactive,useCurrentFrame,interpolate} from 'remotion';
import {AppIcon,WinIcon} from '../components/WindowsUI';
import {VoGuide} from '../components/SceneBase';
import {VideoProps} from '../config/props';
export const Scene06:React.FC<VideoProps>=(p)=>{
 const f=useCurrentFrame();return <>
  <div style={{position:'absolute',inset:0,backgroundColor:p.backgroundColor??'#F7F7F5'}}/>
  <Interactive.Div name="S06 — Judul cover" style={{position:'absolute',left:92,top:395,width:896,fontSize:81,lineHeight:1.04,fontWeight:850,color:'#202020',textAlign:'center',opacity:interpolate(f,[47,68],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>BUKA APLIKASI OTOMATIS</Interactive.Div>
  <Interactive.Div name="S06 — Mini demo cover" style={{position:'absolute',left:143,top:760,width:794,height:446,display:'flex',alignItems:'center',justifyContent:'center',gap:33,background:'#fff',borderRadius:26,border:'2px solid #E7E7E5',boxShadow:'0 14px 30px #20202012'}}><div style={{opacity:interpolate(f,[7,24],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),width:130,display:'flex',flexDirection:'column',alignItems:'center',gap:12,fontSize:24,fontWeight:700,color:'#202020'}}><AppIcon kind="file" size={90}/>Shortcut</div><span style={{fontSize:59,color:'#DF805F',fontWeight:800,opacity:interpolate(f,[22,36],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>→</span><div style={{opacity:interpolate(f,[28,44],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),width:145,display:'flex',flexDirection:'column',alignItems:'center',gap:20,fontSize:24,fontWeight:700,color:'#202020'}}><AppIcon kind="folder" size={103}/>Startup</div><span style={{fontSize:59,color:'#DF805F',fontWeight:800,opacity:interpolate(f,[43,57],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>→</span><div style={{opacity:interpolate(f,[52,65],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),width:130,display:'flex',flexDirection:'column',alignItems:'center',gap:12,fontSize:24,fontWeight:700,color:'#202020'}}><AppIcon kind="excel" size={92}/>Terbuka</div></Interactive.Div>
  <Interactive.Div name="S06 — Subjudul cover" style={{position:'absolute',left:172,top:1300,width:736,fontSize:38,textAlign:'center',fontWeight:700,color:'#646464',opacity:interpolate(f,[65,83],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Cukup atur sekali di Windows.</Interactive.Div>
 </>;
};
