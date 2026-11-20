import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
import {EditableSvgLayer} from '../components/EditableSvgLayer';
import {SceneTextVO} from '../components/SceneTextVO';
import {S04_DESIGN as C,S04_LAYOUT as L,S04_TIMING as T,S04_OS_KEYS} from '../config/scene04Clean';
import {clamp01,transition,lerp} from '../animations/scene04Clean';

/** OS icons are editable SVG paths, not screenshots. */
const WindowsMark:React.FC<{size?:number}>=({size=53})=>{
 const w=size*.43,gap=size*.07;
 return <g fill={C.blue}>{[0,1].flatMap(y=>[0,1].map(x=><rect key={`${x}-${y}`}
   x={-(w+gap)/2+x*(w+gap)} y={-(w+gap)/2+y*(w+gap)}
   width={w} height={w} rx={2}/>))}</g>;
};
const PenguinMark:React.FC=()=> <g>
 <ellipse cx={0} cy={0} rx={21} ry={29} fill="#212B31"/>
 <ellipse cx={0} cy={9} rx={15} ry={19} fill="#F7F7F5"/>
 <ellipse cx={-7} cy={-13} rx={3} ry={4} fill="white"/><ellipse cx={7} cy={-13} rx={3} ry={4} fill="white"/>
 <circle cx={-7} cy={-13} r={1.6} fill="#192229"/><circle cx={7} cy={-13} r={1.6} fill="#192229"/>
 <path d="M-6 -6L0 1L6 -6Z" fill="#E7A245"/>
 <ellipse cx={-17} cy={27} rx={12} ry={6} fill="#EDB04B"/><ellipse cx={17} cy={27} rx={12} ry={6} fill="#EDB04B"/>
 </g>;
const Check:React.FC<{size?:number}>=({size=23})=><g>
 <circle cx={0} cy={0} r={size} fill="#E3F6EC"/>
 <path d={`M${-size*.5} 0L${-size*.12} ${size*.37}L${size*.59} ${-size*.46}`}
 fill="none" stroke={C.success} strokeWidth={size*.19} strokeLinecap="round" strokeLinejoin="round"/>
 </g>;
const FileMark:React.FC=()=> <g>
 <path d="M-29 -38H11L29 -20V39H-29Z" fill="#E9EFF0" stroke="#D9DFDF" strokeWidth={2}/>
 <path d="M11 -38V-20H29" fill="#D0D9DC"/>
 <circle cx={0} cy={1} r={13} fill="#AEB8BA"/><circle cx={0} cy={1} r={6.2} fill="#F9FAFA"/>
 <text x={0} y={55} textAnchor="middle" fontSize={23} fontWeight={700} fill="#A0A9AA">ISO</text>
 </g>;

/** Each text is a separate, named editable layer with direct Props overrides. */
const SceneText:React.FC<{
 id:string;name:string;props:Easy2BootScene03Props;value:string;
 x:number;y:number;size:number;color?:string;weight?:number;anchor?:'start'|'middle'|'end';
 opacity?:number;
}>=({id,name,props,value,x,y,size,color=C.ink,weight=780,anchor='start',opacity=1})=>{
 const user:LayerOverride=props.layerOverrides?.[`S04:${id}`]??{};
 return <EditableSvgLayer id={id} name={name} props={props} basePosition={{x,y}} opacity={opacity}>
   <text x={0} y={0} fontFamily={user.fontFamily??props.fontFamily} fontSize={user.fontSize??size}
     letterSpacing={user.letterSpacing??0} fontWeight={user.fontWeight??weight}
     textAnchor={anchor} dominantBaseline="middle" fill={user.fill??color}>{user.text??value}</text>
 </EditableSvgLayer>;
};

const UsbHero:React.FC<{label:string}>=({label})=><g>
  <rect x={-69} y={-203} width={138} height={94} rx={12} fill="#A7B6BE"/>
  <rect x={-39} y={-180} width={12} height={26} rx={3} fill="#708A94"/>
  <rect x={27} y={-180} width={12} height={26} rx={3} fill="#708A94"/>
  <rect x={-119} y={-116} width={238} height={356} rx={29} fill="#293943" stroke="#15242B" strokeWidth={8}/>
  <rect x={-107} y={-103} width={214} height={330} rx={23} fill="#32434C"/>
  <rect x={-81} y={-68} width={162} height={91} rx={16} fill={C.accent}/>
  <text x={0} y={-17} fill="#FFFFFF" fontSize={49} fontWeight={840} textAnchor="middle">{label}</text>
  {[-1,1].flatMap((yy,yi)=>[-1,1].map((xx,xi)=><g key={`${xi}-${yi}`} transform={`translate(${xx*48} ${yy*47+123})`}>
   <rect x={-37} y={-35} width={74} height={70} rx={12} fill="#F5FAFB"/>
   {yi===1&&xi===1?<g transform="scale(.58)"><PenguinMark/></g>:<g transform="scale(.86)"><WindowsMark size={48}/></g>}
  </g>))}
  <rect x={-19} y={211} width={38} height={9} rx={5} fill="#738E9B"/>
 </g>;

/**
 * S04 — SOURCE-EDITABLE: independent file cards, folder cards, routes, flying copies,
 * OS logos, checks, USB hero, result label and VO text. No rasterized scene.
 * The copy is a compressed explanatory simulation; Windows does not auto-sort ISO files.
 */
export const Scene04CopyIso:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const rowAppear=transition(frame,T.rowsStart,T.rowsEnd);
 const copying=transition(frame,T.transferStart,T.transferEnd);
 const completed=transition(frame,T.successStart,T.successEnd);
 const endFade=1-transition(frame,T.toUsbStart,T.toUsbExitEnd);
 const heroEnter=transition(frame,T.toUsbEnterStart,T.toUsbEnd);
 const rowsAlpha=rowAppear*endFade;
 const badgeAlpha=completed*endFade;
 const copyIconOpacity=rowAppear*(1-transition(frame,T.transferEnd-18,T.transferEnd+3))*
   transition(frame,T.transferStart,T.transferStart+9);
 const handoff=1-transition(frame,T.entryStart+10,T.entryEnd+15);
 const keys=S04_OS_KEYS;
 const rows=keys.map((key,i)=>({key,i,y:L.rowTop+i*L.rowGap,
   filename:props.scene04IsoFiles[i]??'',name:props.scene04InstallerLabels[i]??'',folder:props.scene04FolderPaths[i]??''}));
 const transitionX=lerp(0,305,copying);
 const rootColor=props.backgroundColor;
 return <AbsoluteFill style={{backgroundColor:rootColor}}>
  <svg viewBox="0 0 1080 1920" width="1080" height="1920"
     style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',overflow:'hidden'}}>
   <defs>
    <pattern id="s04-grid" width={54} height={54} patternUnits="userSpaceOnUse">
     <path d="M54 0H0V54" fill="none" stroke={C.grid} strokeWidth={1.25} opacity={.28}/>
    </pattern>
    <filter id="s04-shadow" x="-20%" y="-50%" width="150%" height="210%">
     <feDropShadow dx={0} dy={12} stdDeviation={14} floodColor="#55656B" floodOpacity={.09}/>
    </filter>
   </defs>
   <EditableSvgLayer id="bg" name="Latar off-white" props={props}>
    <rect width={1080} height={1920} fill={rootColor}/>
   </EditableSvgLayer>
   <EditableSvgLayer id="grid" name="Grid sangat samar" props={props} opacity={props.scene04CleanLayout?.7:1}>
    <rect width={1080} height={1920} fill="url(#s04-grid)"/>
   </EditableSvgLayer>
   <EditableSvgLayer id="background-accent" name="Aksen latar coral tipis" props={props}>
    <circle cx={1060} cy={650} r={430} fill="#F1D9CB" opacity={.27}/>
    <circle cx={-165} cy={1530} r={380} fill="#E9F0EC" opacity={.19}/>
   </EditableSvgLayer>
   {/* The one _ISO folder is handed directly from Scene 03; no repeated 'USB SIAP' slide. */}
   <EditableSvgLayer id="handoff-folder" name="Penghubung folder _ISO dari S03" props={props}
      basePosition={{x:772,y:1350}} opacity={handoff}
      animationTransform={`translate(${-120*transition(frame,10,50)} ${-300*transition(frame,10,50)}) scale(${1+.25*transition(frame,10,50)})`}>
      <rect x={-205} y={-70} width={410} height={137} rx={25} fill="#293941"/>
      <path d="M-155 -12V-35Q-155 -49 -138 -49H-82L-66 -35H-29Q-14 -35 -14 -18V29Q-14 48 -33 48H-136Q-155 48 -155 29Z" fill="#E9B47D"/>
      <text x={45} y={24} textAnchor="middle" fontFamily={props.fontFamily} fontSize={43} fontWeight={850} fill="white">_ISO</text>
   </EditableSvgLayer>
   {rows.map(r=>{
     const cy=r.y+L.rowHeight/2;
     const srcCenter=L.sourceX+L.sourceWidth/2;
     const dstCenter=L.folderX+L.folderWidth/2;
     const cardLeft=-L.sourceWidth/2,cardTop=-L.rowHeight/2;
     const folderLeft=-L.folderWidth/2,folderTop=-L.folderHeight/2;
     return <React.Fragment key={r.key}>
       <EditableSvgLayer id={`source-card-${r.key}`} name={`${r.name} — kartu ISO`} props={props}
          basePosition={{x:srcCenter,y:cy}} opacity={rowsAlpha} animationTransform={`translate(0 ${34*(1-rowAppear)})`} assetSize={{w:L.sourceWidth,h:L.rowHeight}}>
         <rect x={cardLeft} y={cardTop} width={L.sourceWidth} height={L.rowHeight} rx={24} fill={C.surface}
           stroke="#DBE2E1" strokeWidth={2} filter="url(#s04-shadow)"/>
         <g transform="translate(-145 -16) scale(.74)"><FileMark/></g>
       </EditableSvgLayer>
       <SceneText id={`filename-${r.key}`} name={`${r.name} — nama file ISO`} props={props}
         value={r.filename} x={L.sourceX+108} y={cy+6} size={30} weight={760} opacity={rowsAlpha}/>
       <EditableSvgLayer id={`path-${r.key}`} name={`${r.name} — jalur transfer`} props={props}
          opacity={rowsAlpha}>
         <path d={`M${L.sourceX+L.sourceWidth+8} ${cy}H${L.folderX-8}`} stroke={C.accent}
          strokeWidth={3} opacity={.57} fill="none" strokeLinecap="round"/>
         <path d={`M${L.folderX-16} ${cy-9}L${L.folderX+2} ${cy}L${L.folderX-16} ${cy+9}Z`} fill={C.accent} opacity={.65}/>
       </EditableSvgLayer>
       <EditableSvgLayer id={`folder-card-${r.key}`} name={`${r.name} — kartu folder tujuan`} props={props}
          basePosition={{x:dstCenter,y:cy}} opacity={rowsAlpha}
          animationTransform={`translate(0 ${32*(1-rowAppear)})`} assetSize={{w:L.folderWidth,h:L.folderHeight}}>
         <rect x={folderLeft} y={folderTop} width={L.folderWidth} height={L.folderHeight} rx={24} fill={C.surface}
           stroke="#E8D6CB" strokeWidth={2} filter="url(#s04-shadow)"/>
         <g transform="translate(-161 1)">
           <path d="M-45 -36V-49Q-45 -61 -29 -61H4L18 -46H42Q56 -46 56 -30V44Q56 59 41 59H-30Q-45 59 -45 43Z" fill="#EBB479"/>
         </g>
       </EditableSvgLayer>
       <EditableSvgLayer id={`os-logo-${r.key}`} name={`${r.name} — logo OS`} props={props}
         basePosition={{x:L.folderX+82,y:cy+7}} opacity={rowsAlpha} assetSize={{w:60,h:60}}>
          {r.key==='linux'?<g transform="scale(.9)"><PenguinMark/></g>:<WindowsMark size={63}/>}
       </EditableSvgLayer>
       <SceneText id={`os-label-${r.key}`} name={`${r.name} — nama sistem operasi`} props={props}
         value={r.name} x={L.folderX+164} y={cy-17} size={36} weight={860} opacity={rowsAlpha}/>
       <SceneText id={`destination-${r.key}`} name={`${r.name} — path folder`} props={props}
         value={r.folder} x={L.folderX+164} y={cy+31} size={25} color={C.muted} weight={520} opacity={rowsAlpha}/>
       {/* Four matching file copies travel AT ONCE, not staggered one by one. */}
       <EditableSvgLayer id={`flying-iso-${r.key}`} name={`${r.name} — file ISO sedang disalin`} props={props}
           basePosition={{x:L.sourceX+L.sourceWidth-30,y:cy}} opacity={copyIconOpacity}
           animationTransform={`translate(${transitionX} ${-24*Math.sin(Math.PI*copying)}) scale(${1-.45*copying})`} assetSize={{w:86,h:92}}>
           <rect x={-45} y={-49} width={90} height={98} rx={13} fill="#FCFEFD" stroke="#C9D2D4" strokeWidth={2}/>
           <g transform="scale(.72)"><FileMark/></g>
       </EditableSvgLayer>
       <EditableSvgLayer id={`success-${r.key}`} name={`${r.name} — status tersalin`} props={props}
          basePosition={{x:L.folderX+L.folderWidth-39,y:r.y+34}} opacity={badgeAlpha}
          animationTransform={`scale(${.76+.24*completed})`} assetSize={{w:55,h:55}}>
          <Check size={25}/>
       </EditableSvgLayer>
     </React.Fragment>;
   })}
   <EditableSvgLayer id="success-banner" name="Status empat ISO tersimpan" props={props}
      basePosition={{x:L.statusX+L.statusWidth/2,y:L.statusY+L.statusHeight/2}}
      opacity={badgeAlpha} animationTransform={`translate(0 ${25*(1-completed)})`}>
      <rect x={-L.statusWidth/2} y={-L.statusHeight/2} width={L.statusWidth} height={L.statusHeight}
        rx={L.statusHeight/2} fill="#E2F6EB"/>
      <g transform="translate(-205 1)"><Check size={21}/></g>
   </EditableSvgLayer>
   <SceneText id="success-text" name="Status 4 file ISO" props={props}
      value={props.scene04SuccessLabel} x={L.statusX+L.statusWidth/2+28} y={L.statusY+L.statusHeight/2}
      anchor="middle" size={36} color="#217E56" weight={860} opacity={badgeAlpha}/>
   {/* Hero is a true editable vector, not a screenshot of the cards. */}
   <SceneText id="hero-title" name="Headline empat installer" props={props}
      value={props.scene04HeroTitle} x={540} y={L.heroTitleY} size={56} weight={870}
      anchor="middle" opacity={heroEnter}/>
   <SceneText id="hero-support" name="Headline satu flashdisk" props={props}
      value={props.scene04HeroSupport} x={540} y={L.heroSupportY} size={36} weight={820}
      anchor="middle" color={C.accent} opacity={heroEnter}/>
   <EditableSvgLayer id="usb-hero" name="USB dengan logo empat installer" props={props}
      basePosition={{x:L.heroX,y:L.heroY}} opacity={heroEnter}
      animationTransform={`translate(0 ${52*(1-heroEnter)}) scale(${.88+.12*heroEnter})`}
      assetSize={{w:260,h:460}}>
      <UsbHero label={props.scene04UsbLabel}/>
   </EditableSvgLayer>
   <EditableSvgLayer id="usb-ready" name="USB siap untuk booting" props={props}
      basePosition={{x:540,y:1348}} opacity={heroEnter}
      animationTransform={`translate(0 ${23*(1-heroEnter)})`}>
      <rect x={-265} y={-36} width={530} height={72} rx={36} fill="#DEF4E7"/>
      <g transform="translate(-192 -1)"><Check size={22}/></g>
      <text x={22} y={7} textAnchor="middle" fontFamily={props.fontFamily}
        fontSize={31} fontWeight={800} fill="#26875A">SIAP UNTUK BOOTING</text>
   </EditableSvgLayer>
  </svg>
  {props.scene04ShowTextVO && !props.showSubtitles ? <SceneTextVO scene={4} props={props}/> : null}
 </AbsoluteFill>;
};
