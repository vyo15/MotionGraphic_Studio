import React from 'react';
import {SCENE04} from '../config/scene04';
import {ramp} from '../animations/scene04';
import {Scene05WinUtil} from './Scene05WinUtil';
/** Menggunakan komponen WinUtil yang SAMA dengan Scene 05.
 * Posisi/ukuran/tabs tidak meloncat saat S04 -> S05; jangan duplikasikan UI.
 */
export const Scene04WinUtil:React.FC<{seconds:number}>=({seconds:s})=>{
  const {timing:t}=SCENE04;
  const appear=ramp(s,t.winutilReveal,t.winutilEnd);
  return <div style={{position:'absolute',inset:0,opacity:appear,
    transform:`translateY(${(1-appear)*22}px)`,pointerEvents:'none'}}>
    <Scene05WinUtil seconds={0}/>
  </div>;
};
