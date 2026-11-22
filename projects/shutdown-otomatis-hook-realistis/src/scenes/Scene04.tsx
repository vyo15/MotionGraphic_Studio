import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';
import {Matched3600} from '../components/Matched3600';

/**
 * User-approved Scene 05 (file Scene04.tsx) — Soft Depth v21.
 * Timeline 300 frames @30fps, 1080x1920; uses real native Remotion/React SVG.
 * No raster/video layers, no decorative grid/top divider, no orange arcs.
 * Interactive.G & Interactive.Text handles are exposed for Studio editing.
 * The typewriter and all movement are frame deterministic; title/command and
 * scale/offset are additionally adjustable from video Props.
 */
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(v:number)=>{const t=clamp(v);return t*t*(3-2*t);};
const op=(f:number,a:number,b:number)=>ease((f-a)/(b-a));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;

const RunWindow:React.FC<{f:number;p:Required<VideoProps>}>=({f,p})=>{
 const appear=op(f,130,151);
 const leave=op(f,282,297);
 const alpha=appear*(1-leave);
 if(alpha<=0)return null;
 const intro=op(f,130,154);
 const s=lerp(1.042,1.082,intro)*p.scene04WindowScale;
 // V21 reference panel: around x=74..458, y=370..635 on 540x960 preview.
 const tx=540-540*s+p.scene04WindowShiftX;
 const ty=738-636*s+p.scene04WindowShiftY+24*(1-intro);
 const cmd=p.scene04RunCommand;
 // Deterministic key-by-key typing: one actual character added each 4.5 frames.
 const shownCount=Math.max(0,Math.min(cmd.length,Math.floor((f-155)/4.5)));
 const shown=cmd.slice(0,shownCount);
 const caret=f>=155&&f<258&&Math.floor(f/11)%2===0;
 const click=op(f,263,267)*(1-op(f,277,282));
 const inputFocus=f>=148&&f<264;
 return <g opacity={alpha} transform={`translate(${tx} ${ty}) scale(${s})`}>
  <Interactive.G name="S05 / Run / Whole window — drag and resize" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
   <Interactive.G name="S05 / Run / Body soft shadow and white surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <rect x={191} y={644} width={704} height={470} rx={18} fill="#A9B6B5" opacity={p.scene04SoftDepth*.55}/>
    <rect x={187} y={636} width={706} height={470} rx={18} fill="#FFFFFF" stroke="#D5DEDD" strokeWidth={2}/>
   </Interactive.G>
   <Interactive.G name="S05 / Run / Titlebar surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <path d="M205 636H875Q893 636 893 654V701H187V654Q187 636 205 636Z" fill="#F8FAF9"/>
    <path d="M187 701H893" stroke="#E2E9E8" strokeWidth={2}/>
    <rect x={210} y={657} width={29} height={28} rx={5} fill="#2D789F"/>
    <path d="M218 665H232V677H218Z" fill="none" stroke="#FFFFFF" strokeWidth={2}/>
   </Interactive.G>
   <Interactive.Text name="S05 / Run / Title text" x={250} y={681} fontSize={29} fontWeight={720} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Run</Interactive.Text>
   <Interactive.Text name="S05 / Run / Close symbol" x={861} y={681} fontSize={34} textAnchor="middle" fill="#778589" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>×</Interactive.Text>
   <Interactive.G name="S05 / Run / Information icon" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <circle cx={256} cy={772} r={25} fill="#ECF4F7"/>
    <path d="M246 763H265V782H246Z" stroke="#4387B4" strokeWidth={3} fill="none"/>
   </Interactive.G>
   <Interactive.Text name="S05 / Run / Help line 1" x={298} y={750} fontSize={24} fill="#354047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Type the name of a program, folder,</Interactive.Text>
   <Interactive.Text name="S05 / Run / Help line 2" x={298} y={780} fontSize={24} fill="#354047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>document, or Internet resource, and</Interactive.Text>
   <Interactive.Text name="S05 / Run / Help line 3" x={298} y={810} fontSize={24} fill="#354047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows will open it for you.</Interactive.Text>
   <Interactive.Text name="S05 / Run / Open label" x={221} y={902} fontSize={27} fontWeight={650} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Open:</Interactive.Text>
   <Interactive.G name="S05 / Run / Open input surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <rect x={316} y={850} width={539} height={66} rx={6} fill="#FFFFFF" stroke={inputFocus&&f>248?p.coralColor:'#A4B7BF'} strokeWidth={inputFocus&&f>248?2.8:2}/>
   </Interactive.G>
   {/* Type actual characters rather than reveal-clipping a fully written command. */}
   <Interactive.Text name="S05 / Run / Command text editable" x={334} y={897} fontSize={30} fontWeight={610} fontFamily="Consolas, DejaVu Sans Mono, monospace" fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{shown}</Interactive.Text>
   {caret&&<rect x={334+shown.length*18.05} y={869} width={2.5} height={34} fill={p.navyColor}/>}
   <Interactive.G name="S05 / Run / Action separator" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <path d="M189 964H891" stroke="#E8EDEC" strokeWidth={2}/>
   </Interactive.G>
   <Interactive.G name="S05 / Run / OK button surface and press" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <rect x={485} y={998} width={112} height={64} rx={7} fill={click>.06?'#FBE7E0':'#FAFCFC'} stroke={click>.06?p.coralColor:'#C6D4D7'} strokeWidth={click>.06?3:2}/>
   </Interactive.G>
   <Interactive.Text name="S05 / Run / OK button label" x={541} y={1041} textAnchor="middle" fontSize={27} fontWeight={720} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OK</Interactive.Text>
   <Interactive.G name="S05 / Run / Cancel button surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={609} y={998} width={122} height={64} rx={7} fill="#FAFCFC" stroke="#CFD9DA" strokeWidth={2}/></Interactive.G>
   <Interactive.Text name="S05 / Run / Cancel button label" x={670} y={1040} fontSize={24} fontWeight={560} textAnchor="middle" fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Cancel</Interactive.Text>
   <Interactive.G name="S05 / Run / Browse button surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={744} y={998} width={130} height={64} rx={7} fill="#FAFCFC" stroke="#CFD9DA" strokeWidth={2}/></Interactive.G>
   <Interactive.Text name="S05 / Run / Browse button label" x={809} y={1040} fontSize={22} fontWeight={560} textAnchor="middle" fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Browse...</Interactive.Text>
  </Interactive.G>
 </g>;
};

export const Scene04:React.FC<VideoProps>=(input)=>{
 const p={...DEFAULT_PROPS,...input};
 const f=useCurrentFrame();
 const tKey=op(f,20,65);
 const keyAlpha=op(f,24,47)*(1-op(f,123,145));
 const keyPressW=op(f,75,81)*(1-op(f,88,96));
 const keyPressR=op(f,87,94)*(1-op(f,103,113));
 const winX=lerp(130,246,tKey), rX=lerp(694,582,tKey);
 const winY=lerp(820,777,op(f,20,60)),rY=lerp(825,792,op(f,27,68));
 const titleAlpha=op(f,0,20)*(1-op(f,277,291));
 const titleY= p.textShiftY-24*(1-op(f,0,22));
 const pointerAlpha=op(f,226,237)*(1-op(f,285,298));
 const pointerMove=op(f,231,261);
 const cx=lerp(683,541,pointerMove)+p.scene04CursorShiftX+p.scene04WindowShiftX;
 const cy=lerp(1081,1165,pointerMove)+p.scene04CursorShiftY+p.scene04WindowShiftY;
 const pressed=op(f,265,268)*(1-op(f,275,279));
 const digits=op(f,285,298);
 const subtitleAlpha=(a:number,b:number)=>op(f,a,a+8)*(1-op(f,b-9,b));
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" style={{overflow:'hidden',fontFamily:'Inter, Arial, sans-serif'}}>
   {/* There is deliberately NO background grid, top rule or decorative orange arc. */}
   <g opacity={titleAlpha} transform={`translate(${p.textShiftX} ${titleY})`}>
    <Interactive.G name="S05 / Heading / Centered typography group" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     {p.scene04HeadlineLine1==='Buka Run,'?<Interactive.Text
      name="S05 / Heading / Buka Run"
      x={540}
      y={322}
      textAnchor="middle"
      fontSize={64}
      fontWeight={800}
      fill={p.inkColor}
      style={{
       translate: '0px 40.9px',
       scale: 1,
       rotate: '0deg',
       opacity: 1
      }}
     >Buka Run,</Interactive.Text>:
     <text x={540} y={322} textAnchor="middle" fontSize={64} fontWeight={800} fill={p.inkColor}>{p.scene04HeadlineLine1}</text>}
     {p.scene04HeadlineLine2==='lalu jalankan perintah.'?<Interactive.Text name="S05 / Heading / Lalu jalankan perintah" x={540} y={440} textAnchor="middle" fontSize={48} fontWeight={750} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>lalu jalankan perintah.</Interactive.Text>:
     <text x={540} y={440} textAnchor="middle" fontSize={48} fontWeight={750} fill={p.inkColor}>{p.scene04HeadlineLine2}</text>}
    </Interactive.G>
   </g>
   <g opacity={keyAlpha} transform={`translate(${p.scene04KeysShiftX} ${p.scene04KeysShiftY}) translate(540 890) scale(${p.scene04KeysScale}) translate(-540 -890)`}>
    <Interactive.G name="S05 / Keyboard / Shortcut whole group" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <Interactive.G name="S05 / Keyboard / Windows key independent" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
      <g transform={`translate(${winX} ${winY+5*keyPressW})`}>
       <Interactive.G name="S05 / Windows / Soft underlay and shadow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
        <rect x={4} y={8-5*keyPressW} width={230} height={210} rx={27} fill="#9DAFB1" opacity={p.scene04SoftDepth*0.11}/>
        <rect x={1} y={6-5*keyPressW} width={232} height={204} rx={27} fill="#E3E9E7" opacity={.78}/>
       </Interactive.G>
       <Interactive.G name="S05 / Windows / Key surface, press changes color" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
        <rect width={234} height={204} rx={28} fill={keyPressW>.06?'#FCEAE4':'#FFFFFF'} stroke={keyPressW>.06?p.coralColor:'#DDE5E2'} strokeWidth={keyPressW>.06?2.8:2}/>
       </Interactive.G>
       <Interactive.G name="S05 / Windows / Key symbol" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
        <g fill={keyPressW>.06?p.coralColor:p.navyColor}>
         <rect x={80} y={73} width={32} height={28} rx={2}/><rect x={119} y={73} width={32} height={28} rx={2}/>
         <rect x={80} y={108} width={32} height={28} rx={2}/><rect x={119} y={108} width={32} height={28} rx={2}/>
        </g>
       </Interactive.G>
      </g>
     </Interactive.G>
     <Interactive.Text name="S05 / Keyboard / Plus symbol" x={539} y={904} fontSize={58} fontWeight={400} textAnchor="middle" fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>+</Interactive.Text>
     <Interactive.G name="S05 / Keyboard / R key independent" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
      <g transform={`translate(${rX} ${rY+5*keyPressR})`}>
       <Interactive.G name="S05 / R / Soft underlay and shadow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
        <rect x={4} y={8-5*keyPressR} width={230} height={210} rx={27} fill="#9DAFB1" opacity={p.scene04SoftDepth*0.11}/>
        <rect x={1} y={6-5*keyPressR} width={232} height={204} rx={27} fill="#E3E9E7" opacity={.78}/>
       </Interactive.G>
       <Interactive.G name="S05 / R / Key surface, press changes color" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
        <rect width={234} height={204} rx={28} fill={keyPressR>.06?'#FCEAE4':'#FFFFFF'} stroke={keyPressR>.06?p.coralColor:'#DDE5E2'} strokeWidth={keyPressR>.06?2.8:2}/>
       </Interactive.G>
       <Interactive.G name="S05 / R / Key symbol" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
        <Interactive.Text name="S05 / R / Letter editable" x={117} y={143} fontFamily="Inter, Arial, sans-serif" fontSize={111} fontWeight={800} textAnchor="middle" fill={Math.round(keyPressR)?p.coralColor:p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>R</Interactive.Text>
       </Interactive.G>
      </g>
     </Interactive.G>
    </Interactive.G>
   </g>
   <RunWindow f={f} p={p}/>
   <g opacity={pointerAlpha} transform={`translate(${cx} ${cy+7*pressed})`}>
    <Interactive.G name="S05 / Cursor / Pointer hotspot editable" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <path d="M0 0V47L13 36L24 57L34 51L23 31L44 30Z" fill="#FFFFFF" stroke="#243E49" strokeWidth={3.5} strokeLinejoin="round"/>
    </Interactive.G>
   </g>
   {pressed>0&&<Interactive.G name="S05 / Cursor / Click indicator" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <circle cx={541+p.scene04CursorShiftX+p.scene04WindowShiftX} cy={1165+p.scene04CursorShiftY+p.scene04WindowShiftY} r={lerp(13,27,op(f,265,280))} fill="none" stroke={p.coralColor} strokeWidth={2} opacity={pressed*.35}/>
   </Interactive.G>}
   <g opacity={digits}>
    <Interactive.G name="S05 / Outro / 3600 seconds matched to Scene 06" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <Matched3600 x={540} y={1040} fontSize={146} unitY={1134} unitFontSize={48} unitAlpha={1} inkColor={p.inkColor} coralColor={p.coralColor}/>
    </Interactive.G>
   </g>
   {p.showCaptions&&<g transform={`translate(${p.subtitleShiftX} ${p.subtitleShiftY})`}>
   </g>}
  </svg>
 </AbsoluteFill>;
};
