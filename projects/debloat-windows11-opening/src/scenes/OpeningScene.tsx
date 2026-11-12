import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {StartMenu} from '../components/StartMenu';
import {FocusCards} from '../components/FocusCards';
import {BASE_POSITION, DESIGN} from '../config/design';
import {TIMING} from '../config/timing';
import {fadeOut, mix, rise} from '../animations/presets';

const WindowsLogo: React.FC = () => {
  const f=useCurrentFrame(),{fps}=useVideoConfig(),s=f/fps;
  const inP=rise(s,...TIMING.logoIn),out=fadeOut(s,...TIMING.logoOut);
  return <div style={{position:'absolute',left:BASE_POSITION.windowLogo.x,top:BASE_POSITION.windowLogo.y,
      width:200,height:200,opacity:inP*out,
      transform:`translateY(${mix(42,0,inP)-65*(1-out)}px) scale(${mix(.86,1,inP)*mix(1,.8,1-out)})`}}>
    <Interactive.Div name="S01 — Logo Windows" style={{pointerEvents:'auto',
      position:'absolute',left:0,top:0,width:200,height:200,translate:'0px 0px',scale:1,rotate:'0deg',
    }}>
      <svg viewBox="0 0 200 200" width="200" height="200" aria-label="Windows 11 logo">
        <rect x="3" y="3" width="93" height="93" fill="#1089D7"/>
        <rect x="104" y="3" width="93" height="93" fill="#1089D7"/>
        <rect x="3" y="104" width="93" height="93" fill="#1089D7"/>
        <rect x="104" y="104" width="93" height="93" fill="#1089D7"/>
      </svg>
    </Interactive.Div>
  </div>;
};

export const OpeningScene: React.FC<{showSubtitles:boolean;showGrid:boolean}> = ({showGrid}) => {
  const f=useCurrentFrame(),{fps}=useVideoConfig(),s=f/fps;
  const heading=rise(s,...TIMING.headingIn);
  const question=rise(s,...TIMING.questionIn);
  return <AbsoluteFill style={{fontFamily:DESIGN.font,color:DESIGN.ink,overflow:'hidden'}}>
    <Background showGrid={showGrid}/>

    <div style={{position:'absolute',top:230,left:90,opacity:heading,transform:`translateY(${mix(16,0,heading)}px)`}}>
      <Interactive.Div name="S01 — Label Seri" style={{pointerEvents:'auto',
        position:'relative',fontSize:22,fontWeight:500,letterSpacing:1.5,color:'#777875',
        translate:'0px 0px',scale:1,rotate:'0deg',
      }}>WINDOWS 11</Interactive.Div>
      <div style={{position:'absolute',width:52,height:4,background:DESIGN.coral,left:184,top:11,borderRadius:3}}/>
    </div>

    <div style={{position:'absolute',left:90,top:285,opacity:heading,
      transform:`translateY(${mix(28,0,heading)}px)`}}>
      <Interactive.Div name="S01 — Judul FITUR BAWAAN" style={{pointerEvents:'auto',
        position:'relative',fontSize:65,fontWeight:780,letterSpacing:-1.9,color:'#252525',
        translate:'0px 0px',scale:1,rotate:'0deg',
      }}>FITUR BAWAAN</Interactive.Div>
    </div>

    <WindowsLogo/>
    <StartMenu/>

    <div style={{position:'absolute',left:150,top:525,width:780,textAlign:'center',opacity:question,
      transform:`translateY(${mix(23,0,question)}px)`}}>
      <Interactive.Div name="S01 — Teks Pertanyaan" style={{pointerEvents:'auto',
        position:'relative',fontWeight:790,fontSize:45,letterSpacing:-.65,color:'#222222',
        translate:'0px 0px',scale:1,rotate:'0deg',
      }}>SEMUANYA DIPAKAI?</Interactive.Div>
    </div>

    <FocusCards/>

  </AbsoluteFill>;
};
