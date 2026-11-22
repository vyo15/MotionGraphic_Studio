import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {SUBTITLE_CUES} from '../config/subtitles';
import {SCENE01,SCENE02,SCENE03,SCENE04,SCENE05} from '../config/timings';

/** Final subtitles are separate from draft scene VO and the recording guide.
 * One literal Interactive.Div callsite per cue permits direct Studio text editing.
 * SUBTITLE_CUES holds ONLY timing; final visible text lives in these JSX literals.
 * New recording -> update timings and these literals together; never auto-show before VO.
 * `sceneIndex` allows local scene composition to render the correct global cue.
 */
const SCENE_STARTS=[0,
  SCENE01.durationInFrames,
  SCENE01.durationInFrames+SCENE02.durationInFrames,
  SCENE01.durationInFrames+SCENE02.durationInFrames+SCENE03.durationInFrames,
  SCENE01.durationInFrames+SCENE02.durationInFrames+SCENE03.durationInFrames+SCENE04.durationInFrames,
  SCENE01.durationInFrames+SCENE02.durationInFrames+SCENE03.durationInFrames+SCENE04.durationInFrames+SCENE05.durationInFrames,
] as const;
export const SubtitleTrack:React.FC<{color:string;sceneIndex?:number}>=({color,sceneIndex})=>{
  const localFrame=useCurrentFrame();
  const frame=localFrame+(sceneIndex===undefined?0:(SCENE_STARTS[sceneIndex]??0));
  const active=(index:number)=>{
    const cue=SUBTITLE_CUES[index];
    return !!cue && frame>=cue.from && frame<cue.to;
  };
  return <AbsoluteFill>
      {active(0) ? <Interactive.Div name="S01 — Subtitle final 01" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Mau instal Windows 11</Interactive.Div> : null}
      {active(1) ? <Interactive.Div name="S01 — Subtitle final 02" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Tapi flashdisknya Windows 10?</Interactive.Div> : null}
      {active(2) ? <Interactive.Div name="S01 — Subtitle final 03" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Masa harus bikin bootable ulang lagi?</Interactive.Div> : null}
      {active(3) ? <Interactive.Div name="S02 — Subtitle final 04" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Ah, ribet banget.</Interactive.Div> : null}
      {active(4) ? <Interactive.Div name="S02 — Subtitle final 05" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Mending pakai Easy2Boot aja.</Interactive.Div> : null}
      {active(5) ? <Interactive.Div name="S02 — Subtitle final 06" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Satu flashdisk bisa nyimpen installer Windows 10, Windows 11, sampai Linux sekaligus.</Interactive.Div> : null}
      {active(6) ? <Interactive.Div name="S03 — Subtitle final 07" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Pertama, backup data flashdisk.</Interactive.Div> : null}
      {active(7) ? <Interactive.Div name="S03 — Subtitle final 08" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Buka Easy2Boot.</Interactive.Div> : null}
      {active(8) ? <Interactive.Div name="S03 — Subtitle final 09" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Pilih USB, lalu buat multiboot.</Interactive.Div> : null}
      {active(9) ? <Interactive.Div name="S04 — Subtitle final 10" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'transparent',padding:0,borderRadius:0,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Salin file ISO installer</Interactive.Div> : null}
      {active(10) ? <Interactive.Div name="S04 — Subtitle final 11" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'transparent',padding:0,borderRadius:0,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>ke folder masing-masing.</Interactive.Div> : null}
      {active(11) ? <Interactive.Div name="S04 — Subtitle final 12" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'transparent',padding:0,borderRadius:0,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Sesuai sistem operasinya.</Interactive.Div> : null}
      {active(12) ? <Interactive.Div name="S05 — Subtitle final 13" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'transparent',padding:0,borderRadius:0,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Sekarang, booting seperti biasa, Pilih booting USB.</Interactive.Div> : null}
      {active(13) ? <Interactive.Div name="S05 — Subtitle final 14" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'transparent',padding:0,borderRadius:0,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Begitu muncul, kamu tinggal pilih ISO yang kamu butuhkan.</Interactive.Div> : null}
      {active(14) ? <Interactive.Div name="S05 — Subtitle final 15" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'transparent',padding:0,borderRadius:0,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Jalankan, dan beberapa saat kemudian, Windows Setup pun terbuka.</Interactive.Div> : null}
      {active(15) ? <Interactive.Div name="S06 — Subtitle final 18" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Bootable ulang atau multiboot?</Interactive.Div> : null}
      {active(16) ? <Interactive.Div name="S06 — Subtitle final 19" style={{
        position:'absolute',left:110,right:110,top:1430,minHeight:70,
        textAlign:'center',fontFamily:'Inter, Arial, sans-serif',fontSize:41,fontWeight:750,
        lineHeight:1.16,color, textShadow:'0 1px 6px #FFFFFF',
        backgroundColor:'rgba(255,255,255,.87)',padding:'10px 20px',borderRadius:18,
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Coba tulis di kolom komentar!</Interactive.Div> : null}
  </AbsoluteFill>;
};
