import React from 'react';
import {Interactive} from 'remotion';
import type {VideoConfig} from '../config/video';
export const ShortcutKeyboard: React.FC<{seconds:number;opacity:number;translateY:number;config:VideoConfig}> = ({seconds,opacity,translateY,config}) => {
  const active=(index:number)=>seconds>4.72+index*0.2 && seconds<6.05;
  return <Interactive.Div name="S02 — Shortcut Keys" className="keyGuide" style={{left:config.layers.keyboard.x,top:config.layers.keyboard.y,opacity,transform:`translateY(${translateY}px)`}}>
    <div className="keyGuideLabel">COBA TEKAN TOMBOL INI</div>
    <div className="keyRow">
      <div className={`key ${active(0)?'active':''}`} style={{transform:`translateY(${active(0)?6:0}px)`}}>Ctrl</div><span className="keyPlus">+</span>
      <div className={`key ${active(1)?'active':''}`} style={{transform:`translateY(${active(1)?6:0}px)`}}>Shift</div><span className="keyPlus">+</span>
      <div className={`key ${active(2)?'active':''}`} style={{transform:`translateY(${active(2)?6:0}px)`}}>T</div>
    </div>
  </Interactive.Div>
}
