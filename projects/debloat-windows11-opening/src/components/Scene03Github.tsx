import React from 'react';
import {Interactive, Img, staticFile} from 'remotion';
import {SCENE03} from '../config/scene03';
import {DESIGN} from '../config/design';
import {rise} from '../animations/presets';

/** One persistent Github surface; reveal files, badge and star/number independently, no camera zoom. */
export const Scene03Github: React.FC<{seconds:number}> = ({seconds}) => {
  const t=SCENE03.timing;
  const ghFiles=['.github','docs','scripts','README.md'];
  return <>
    <Interactive.Div name="S03 — Browser GitHub / Kartu Putih" style={{pointerEvents:'auto',position:'absolute',left:80,top:514,width:920,height:932,background:'#FFFFFF',
      border:'2px solid #E7E6E4',borderRadius:44,boxShadow:DESIGN.shadow,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    <Interactive.Div name="S03 — Browser Toolbar" style={{pointerEvents:'auto',position:'absolute',left:112,top:549,width:856,height:92,background:'#F7F7F6',borderRadius:20,translate:'0px 0px',scale:1,rotate:'0deg'}}/>
    <Interactive.Div name="S03 — Tab Repository" style={{pointerEvents:'auto',position:'absolute',left:138,top:561,width:326,height:65,background:'#FFFFFF',borderRadius:16,display:'flex',alignItems:'center',paddingLeft:24,
      fontSize:23,fontWeight:530,color:'#424850',translate:'0px 0px',scale:1,rotate:'0deg'}}>ChrisTitusTech / winutil</Interactive.Div>
    <Interactive.Div name="S03 — GitHub URL" style={{pointerEvents:'auto',position:'absolute',left:474,top:563,width:455,height:62,borderRadius:16,background:'#EEEFF0',fontSize:25,color:'#60666C',
      display:'flex',alignItems:'center',paddingLeft:30,translate:'0px 0px',scale:1,rotate:'0deg'}}>github.com</Interactive.Div>
    <Interactive.Div name="S03 — GitHub Logo" style={{pointerEvents:'auto',position:'absolute',left:149,top:665,width:106,height:106,translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Img src={staticFile('videos/debloat-windows11-opening/icons/github.svg')} style={{width:106,height:106}}/>
    </Interactive.Div>
    <Interactive.Div name="S03 — Pemilik Repository" style={{pointerEvents:'auto',position:'absolute',left:302,top:676,fontSize:38,fontWeight:650,color:'#252B34',translate:'0px 0px',scale:1,rotate:'0deg'}}>ChrisTitusTech</Interactive.Div>
    <Interactive.Div name="S03 — Nama Repository" style={{pointerEvents:'auto',position:'absolute',left:302,top:748,fontSize:53,fontWeight:780,color:'#252B34',translate:'0px 0px',scale:1,rotate:'0deg'}}>winutil</Interactive.Div>
    <Interactive.Div name="S03 — Label Public" style={{pointerEvents:'auto',position:'absolute',left:790,top:754,fontSize:23,fontWeight:670,color:'#277752',
      background:'#EDF8F1',borderRadius:25,padding:'10px 20px',translate:'0px 0px',scale:1,rotate:'0deg'}}>Public</Interactive.Div>
    <div style={{position:'absolute',left:145,top:848,width:785,height:2,background:'#E7E9E8'}}/>
    {ghFiles.map((fname,i)=>{
      const a=rise(seconds,t.repoFilesStart+i*.23,t.repoFilesStart+.5+i*.23);
      return <div key={fname} style={{position:'absolute',left:145,top:894+i*88,width:785,height:74,opacity:a,
        transform:`translateY(${(1-a)*17}px)`,borderRadius:14,background:'#FAFAFA',display:'flex',alignItems:'center',gap:27,padding:'0 27px'}}>
        <div style={{width:33,height:33,background:'#D4DCE7',borderRadius:7,flexShrink:0}}/>
        {i===0?<Interactive.Div name="S03 — File .github" style={{pointerEvents:'auto',fontSize:27,color:'#47505B',fontWeight:540,translate:'0px 0px',scale:1,rotate:'0deg'}}>.github</Interactive.Div>
         :i===1?<Interactive.Div name="S03 — File docs" style={{pointerEvents:'auto',fontSize:27,color:'#47505B',fontWeight:540,translate:'0px 0px',scale:1,rotate:'0deg'}}>docs</Interactive.Div>
         :i===2?<Interactive.Div name="S03 — File scripts" style={{pointerEvents:'auto',fontSize:27,color:'#47505B',fontWeight:540,translate:'0px 0px',scale:1,rotate:'0deg'}}>scripts</Interactive.Div>
         :<Interactive.Div name="S03 — File README.md" style={{pointerEvents:'auto',fontSize:27,color:'#47505B',fontWeight:540,translate:'0px 0px',scale:1,rotate:'0deg'}}>README.md</Interactive.Div>}
      </div>;
    })}
    <div style={{position:'absolute',left:145,top:1255,opacity:rise(seconds,t.openSourceStart,t.openSourceStart+.6)}}>
      <Interactive.Div name="S03 — Badge Open Source" style={{pointerEvents:'auto',width:785,height:83,borderRadius:21,background:'#F0F8F3',fontSize:32,fontWeight:720,color:'#306A51',
        display:'flex',alignItems:'center',gap:26,padding:'0 35px',translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <span style={{width:25,height:25,borderRadius:'50%',background:'#22996F'}}/>OPEN SOURCE
      </Interactive.Div>
    </div>
    <Interactive.Div name="S03 — Background Panel GitHub Stars" style={{pointerEvents:'auto',position:'absolute',left:145,top:1344,width:785,height:118,borderRadius:24,
      border:'2px solid #F2DFB6',background:'#FFFAF0',translate:'0px 0px',scale:1,rotate:'0deg',opacity:rise(seconds,t.starIconStart,t.starIconStart+.5)}}/>
    <div style={{position:'absolute',left:195,top:1366,opacity:rise(seconds,t.starIconStart,t.starIconStart+.55),width:86,height:83}}>
      <Interactive.Div name="S03 — Icon Star GitHub SVG" style={{pointerEvents:'auto',position:'absolute',inset:0,translate:'0px 0px',scale:1,rotate:'0deg'}}>
        <svg viewBox="0 0 100 100" width="86" height="86" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L62 36 L96 37 L69 58 L78 91 L50 72 L21 91 L31 58 L4 37 L38 36Z" fill="#E5A62F"/></svg>
      </Interactive.Div>
    </div>
    <div style={{position:'absolute',left:332,top:1358,opacity:rise(seconds,t.starNumberStart,t.starNumberStart+.75)}}>
      <Interactive.Div name="S03 — Angka 65K+ GitHub Stars" style={{pointerEvents:'auto',fontSize:72,fontWeight:800,color:'#252B34',letterSpacing:-2,translate:'0px 0px',scale:1,rotate:'0deg'}}>65K+</Interactive.Div>
    </div>
    <div style={{position:'absolute',left:334,top:1432,opacity:rise(seconds,t.starLabelStart,t.starLabelStart+.55)}}>
      <Interactive.Div name="S03 — Label GITHUB STARS" style={{pointerEvents:'auto',fontSize:21,fontWeight:710,color:'#857147',letterSpacing:1.1,translate:'0px 0px',scale:1,rotate:'0deg'}}>GITHUB STARS</Interactive.Div>
    </div>
  </>;
};
