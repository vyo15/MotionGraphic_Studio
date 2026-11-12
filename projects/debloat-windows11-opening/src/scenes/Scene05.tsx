import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame,useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Scene05WinUtil} from '../components/Scene05WinUtil';
import {Scene04Desktop} from '../components/Scene04Windows';
import {Scene05Cursor} from '../components/Scene05Cursor';
import {SCENE05} from '../config/scene05';
import {DESIGN} from '../config/design';
import {s05between,s05ramp} from '../animations/scene05';

const h=(s:number,a:number,b:number):React.CSSProperties=>({
  position:'absolute',left:SCENE05.heading.x,top:SCENE05.heading.y,width:SCENE05.heading.width,
  textAlign:'center',opacity:s05between(s,a,b,.20),
  transform:`translateY(${(1-s05ramp(s,a,a+.23))*18}px)`,pointerEvents:'none',
});
// Teks utama menggunakan style literal langsung sesuai kontrak studio-direct-v3.
// Animasi opacity/posisi tetap pada wrapper h() dan captionWrap().

const Titles:React.FC<{s:number}>=({s})=><>
  <div style={h(s,0,3)}>
    <Interactive.Div name="S05 — Judul 01 BUKA TAB TWEAKS" style={{fontSize:49,fontWeight:790,color:'#232322',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>BUKA TAB TWEAKS</Interactive.Div>
  </div>
  <div style={h(s,3,8.05)}>
    <Interactive.Div name="S05 — Judul 02 BUAT RESTORE POINT" style={{fontSize:49,fontWeight:790,color:'#232322',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>BUAT RESTORE POINT</Interactive.Div>
  </div>
  <div style={h(s,8.05,10.65)}>
    <Interactive.Div name="S05 — Judul 03 APPX REMOVAL" style={{fontSize:49,fontWeight:790,color:'#232322',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>APPX REMOVAL</Interactive.Div>
  </div>
  <div style={h(s,10.65,15.4)}>
    <Interactive.Div name="S05 — Judul 04 PILIH APLIKASI" style={{fontSize:49,fontWeight:790,color:'#232322',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>PILIH APLIKASI</Interactive.Div>
  </div>
  <div style={h(s,15.4,21)}>
    <Interactive.Div name="S05 — Judul 05 REMOVE SELECTED" style={{fontSize:49,fontWeight:790,color:'#232322',pointerEvents:'auto',translate:'0px 0px',scale:1,rotate:'0deg'}}>REMOVE SELECTED</Interactive.Div>
  </div>
</>;
/** Subtitle terpisah per beat dan bisa diedit langsung di Studio. */
const Subtitles:React.FC<{s:number}>=({s})=>{
  const i=s<3?0:s<8.05?1:s<10.65?2:s<12.65?3:s<15.4?4:5;
  return <div style={{position:'absolute',left:SCENE05.subtitle.x,top:SCENE05.subtitle.y,
    width:SCENE05.subtitle.width,height:SCENE05.subtitle.height,
    display:'grid',placeItems:'center',background:'transparent',
    zIndex:12,padding:'10px 22px',boxSizing:'border-box',pointerEvents:'none'}}>
    {i===0?null
    :i===1?null
    :i===2?null
    :i===3?null
    :i===4?null
    :null}
  </div>;
};

/** Simulasi edukasi 21 detik: tidak melakukan penghapusan Windows sungguhan. */
export const Scene05:React.FC<{showSubtitles:boolean;showGrid:boolean}>=({showSubtitles,showGrid})=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const s=frame/fps;
  return <AbsoluteFill style={{fontFamily:DESIGN.font,color:DESIGN.ink,overflow:'hidden'}}>
    <Background showGrid={showGrid}/>
    <Titles s={s}/>
    <Scene04Desktop seconds={14.99}/>
    {/* Move this shared group instead of dragging the WinUtil window alone.
        The simulated cursor remains aligned with every click target. */}
    <Interactive.Div name="S05 — Grup WinUtil dan Kursor (geser bersama)" style={{position:'absolute',inset:0,
      pointerEvents:'none',translate:'0px 0px',scale:1,rotate:'0deg'}}>
      <Scene05WinUtil seconds={s}/>
      <Scene05Cursor seconds={s}/>
    </Interactive.Div>
    {showSubtitles?<Subtitles s={s}/>:null}
  </AbsoluteFill>;
};
