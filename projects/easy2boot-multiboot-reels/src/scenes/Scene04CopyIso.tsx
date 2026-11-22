import React from 'react';
import {AbsoluteFill,Freeze,Interactive,useCurrentFrame} from 'remotion';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
import {EditableSvgLayer} from '../components/EditableSvgLayer';
import {SceneTextVO} from '../components/SceneTextVO';
import {Scene03Preparation} from './Scene03Preparation';
import {S04_DESIGN as C,S04_TIMING as T,S04_OS_KEYS} from '../config/scene04Clean';
import {clamp01,transition,lerp} from '../animations/scene04Clean';

/**
 * SCENE 04 — VISUAL ACC 2026-11-21.
 * One Explorer window. Each ISO starts IN its own bottom status tile and moves
 * into the corresponding focused folder; no duplicated source row, guide line,
 * or ornamental background circle. Final USB artwork follows the original
 * "4 INSTALLER — SATU FLASHDISK" design, on a plain off-white background.
 *
 * Source-editable vector layers with S04:* Props overrides; deterministic 240f.
 * This is a visual explanation, not a real Windows file-copy recording.
 */
const FONT='Inter, Arial, sans-serif';
const tileNames=['WIN8','WIN10','WIN11','LINUX'] as const;
const folderNames=['WINDOWS 8','WINDOWS 10','WINDOWS 11','LINUX'] as const;
const clamp=clamp01;
const progress=(f:number,start:number,end:number)=>transition(f,start,end);

const MarkWindows:React.FC<{size?:number}>=({size=60})=>{
 const w=size*.43,gap=size*.06;
 return <g fill="#438ABA">{[0,1].flatMap(yy=>[0,1].map(xx=><rect key={`${xx}-${yy}`}
  x={-(w+gap)/2+xx*(w+gap)} y={-(w+gap)/2+yy*(w+gap)} width={w} height={w} rx={1.5}/>))}</g>;
};
/** Tux penguin is a recognizable, fully vector illustration; never the old oval 'eye'. */
const Tux:React.FC=()=><g>
 <ellipse cx={-21} cy={29} rx={19} ry={10} fill="#E6A329"/>
 <ellipse cx={21} cy={29} rx={19} ry={10} fill="#E6A329"/>
 <ellipse cx={0} cy={1} rx={35} ry={43} fill="#161B21"/>
 <ellipse cx={0} cy={14} rx={23} ry={27} fill="#FCFCF8"/>
 <ellipse cx={0} cy={-22} rx={26} ry={29} fill="#161B21"/>
 <ellipse cx={-11} cy={-26} rx={7} ry={11} fill="white"/>
 <ellipse cx={11} cy={-26} rx={7} ry={11} fill="white"/>
 <ellipse cx={-10} cy={-24} rx={2.5} ry={3.4} fill="#131A20"/>
 <ellipse cx={12} cy={-24} rx={2.5} ry={3.4} fill="#131A20"/>
 <path d="M-14 -12L0 -4L15 -12L8 -3L0 3L-8 -3Z" fill="#F1B045"/>
 <ellipse cx={-29} cy={7} rx={10} ry={23} fill="#171C22" transform="rotate(-18 -29 7)"/>
 <ellipse cx={29} cy={7} rx={10} ry={23} fill="#171C22" transform="rotate(18 29 7)"/>
 </g>;
const Folder:React.FC<{linux:boolean}>=({linux})=><g>
 <path d="M-70 -35V-52Q-70 -62 -59 -62H-7L9 -48H52Q67 -48 67 -31V49Q67 62 51 62H-55Q-70 62 -70 48Z" fill="#E9B47D"/>
 <rect x={-70} y={-30} width={137} height={91} rx={13} fill="#E7AF70"/>
 {linux?<g transform="translate(0 10) scale(.84)"><Tux/></g>:<g transform="translate(0 9)"><MarkWindows size={69}/></g>}
 </g>;
const ISOIcon:React.FC=()=><g>
 <path d="M-23 -30H9L24 -13V31H-23Z" fill="#E6EBED" stroke="#C3CFD2" strokeWidth={2}/>
 <path d="M9 -30V-13H24" fill="#D0DADD"/>
 <circle cx={0} cy={3} r={7} fill="#A6B6BD"/>
 <circle cx={0} cy={3} r={3} fill="#E6EBED"/>
 </g>;
const Check:React.FC<{size?:number}>=({size=20})=><g>
 <circle cx={0} cy={0} r={size} fill="#E2F6EB"/>
 <path d={`M${-size*.5} 0L${-size*.12} ${size*.37}L${size*.59} ${-size*.46}`}
  fill="none" stroke="#299C78" strokeWidth={size*.22} strokeLinecap="round" strokeLinejoin="round"/>
 </g>;
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
  {yi===1&&xi===1?<g transform="scale(.60)"><Tux/></g>:<g transform="scale(.86)"><MarkWindows size={48}/></g>}
 </g>))}
 <rect x={-19} y={211} width={38} height={9} rx={5} fill="#738E9B"/>
 </g>;

/** All labels are separately named/overridable; the scene is not flattened. */
const CopyText:React.FC<{
  id:string;name:string;props:Easy2BootScene03Props;value:string;
  x:number;y:number;size:number;weight?:number;color?:string;anchor?:'start'|'middle'|'end';
  opacity?:number;
}>=({id,name,props:p,value,x,y,size,weight=720,color=C.ink,anchor='start',opacity=1})=>{
 const user:LayerOverride=p.layerOverrides?.[`S04:${id}`]??{};
 return <EditableSvgLayer id={id} name={name} props={p} basePosition={{x,y}} opacity={opacity}>
  <text x={0} y={0} fontFamily={user.fontFamily??p.fontFamily??FONT}
   fontSize={user.fontSize??size} fontWeight={user.fontWeight??weight}
   letterSpacing={user.letterSpacing??0} textAnchor={anchor} dominantBaseline="middle"
   fill={user.fill??color}>{user.text??value}</text>
 </EditableSvgLayer>;
};

const movePoint=(i:number,f:number):[number,number,number]=>{
 const a=T.copyStart[i],b=T.copyEnd[i];const p=progress(f,a,b);
 const tileX=76+232*i+100; const tileY=1190+79;
 const laneY=1090,folderX=220,folderY=905;
 if(p<.24)return [tileX,lerp(tileY,laneY,progress(p,.0,.24)),p];
 if(p<.70)return [lerp(tileX,folderX,progress(p,.24,.70)),laneY,p];
 return [folderX,lerp(laneY,folderY,progress(p,.70,1)),p];
};

export const Scene04CopyIso:React.FC<Easy2BootScene03Props>=(p)=>{
 const f=useCurrentFrame();
 const explorerAlpha=progress(f,T.explorerEnterStart,T.explorerEnterEnd)*(1-progress(f,T.explorerExitStart,T.explorerExitEnd));
 const heroAlpha=progress(f,T.heroStart,T.heroEnd);
 const current=Math.max(0,Math.min(3,T.copyStart.reduce((n,s)=>f>=s?n+1:n,0)-1));
 const completed=T.copyEnd.filter(e=>f>=e).length;
 const srcFiles=p.scene04IsoFiles;
 const labels=p.scene04InstallerLabels;
 const folderPaths=p.scene04FolderPaths;
 const selected=labels[current]??folderNames[current];
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  <svg viewBox="0 0 1080 1920" width={1080} height={1920}
   style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'hidden'}}>
   <defs>
    <pattern id="s04-acc-grid" width={64} height={64} patternUnits="userSpaceOnUse">
     <path d="M64 0H0V64" fill="none" stroke="#E6E7E4" strokeWidth={1} opacity={.28}/>
    </pattern>
    <filter id="s04-acc-shadow" x="-25%" y="-35%" width="160%" height="180%">
     <feDropShadow dx={0} dy={11} stdDeviation={12} floodColor="#63716C" floodOpacity={.10}/>
    </filter>
   </defs>
   <EditableSvgLayer id="bg" name="Latar polos" props={p}>
    <rect width={1080} height={1920} fill={p.backgroundColor}/>
   </EditableSvgLayer>
   <EditableSvgLayer id="grid" name="Grid sangat samar" props={p} opacity={p.scene04CleanLayout?.68:0}>
    <rect width={1080} height={1920} fill="url(#s04-acc-grid)"/>
   </EditableSvgLayer>
   {/* No background circle. The subtle grid is the only optional decoration. */}
   <EditableSvgLayer id="step-header" name="LANGKAH 04" props={p} opacity={explorerAlpha}>
    <text x={56} y={176} fontFamily={p.fontFamily} fontWeight={780} fontSize={36} fill="#828A8B">LANGKAH 04</text>
    <text x={56} y={275} fontFamily={p.fontFamily} fontWeight={850} fontSize={76} fill={C.ink}>SALIN</text>
    <text x={340} y={275} fontFamily={p.fontFamily} fontWeight={850} fontSize={76} fill={C.accent}>FILE ISO.</text>
   </EditableSvgLayer>
   {/* Explorer stays in one fixed position for all four transfers. */}
   <EditableSvgLayer id="explorer-window" name="Jendela File Explorer" props={p} opacity={explorerAlpha}
      animationTransform={`translate(0 ${25*(1-progress(f,T.explorerEnterStart,T.explorerEnterEnd))})`}
      assetSize={{w:992,h:1098}}>
    <rect x={44} y={340} width={992} height={1098} rx={34} fill="white" stroke={C.border} strokeWidth={2} filter="url(#s04-acc-shadow)"/>
    <path d="M79 340H1001Q1036 340 1036 376V429H44V376Q44 340 79 340Z" fill="#E9EEEF"/>
    <path d="M75 384V366Q75 356 86 356H107L120 366H133Q143 366 143 377V409H75Z" fill="#E6AE6C"/>
    <text x={160} y={397} fill="#202628" fontSize={36} fontWeight={780} fontFamily={p.fontFamily}>File Explorer</text>
    <text x={952} y={395} fill="#879092" fontSize={36} fontFamily={p.fontFamily}>− ×</text>
    <rect x={75} y={463} width={930} height={80} rx={19} fill="#F7F8F7" stroke={C.border} strokeWidth={2}/>
    <text x={107} y={516} fill="#263942" fontSize={34} fontWeight={750} fontFamily={p.fontFamily}>USB (E:)   ›   _ISO</text>
    <rect x={75} y={572} width={930} height={78} rx={19} fill="#F7F8F7" stroke={C.border} strokeWidth={2}/>
    <rect x={75} y={680} width={930} height={295} rx={32} fill="#FFFAF7" stroke={C.accent} strokeWidth={3} filter="url(#s04-acc-shadow)"/>
    <text x={80} y={1130} fill="#8A9395" fontSize={26} fontWeight={770} fontFamily={p.fontFamily}>FILE DALAM FLASHDISK</text>
   </EditableSvgLayer>
   <CopyText id="folder-breadcrumb" name="Path folder aktif" props={p} x={107} y={613} size={30}
    value={`_ISO  /  ${folderPaths[current]??''}`} color="#263942" weight={740} opacity={explorerAlpha}/>
   <EditableSvgLayer id={`focus-folder-${S04_OS_KEYS[current]}`} name={`Folder aktif ${selected}`} props={p}
     basePosition={{x:200,y:825}} opacity={explorerAlpha} assetSize={{w:143,h:129}}>
    <Folder linux={current===3}/>
   </EditableSvgLayer>
   <CopyText id={`folder-name-${S04_OS_KEYS[current]}`} name={`Nama ${selected}`} props={p}
    value={selected} x={359} y={789} size={51} weight={850} opacity={explorerAlpha}/>
   <CopyText id={`folder-path-${S04_OS_KEYS[current]}`} name={`Folder ${selected}`} props={p}
    value={folderPaths[current]??''} x={359} y={868} size={28} weight={630} color={C.muted} opacity={explorerAlpha}/>
   {S04_OS_KEYS.map((key,i)=>{
    const x=76+232*i; const y=1190;const start=T.copyStart[i],end=T.copyEnd[i];
    const done=f>=end,moving=f>=start&&f<end;
    const boxAlpha=explorerAlpha;
    const [mx,my,pct]=movePoint(i,f);
    const tileFill=done?'#E8F6EF':moving?'#FFF4ED':'#F7F8F7';
    const tileStroke=done?'#299C78':moving?C.accent:'#D9DFDF';
    return <React.Fragment key={key}>
     <EditableSvgLayer id={`source-tile-${key}`} name={`Kotak asal ISO ${key}`} props={p}
      opacity={boxAlpha} basePosition={{x,y}} assetSize={{w:200,h:158}}>
      <rect width={200} height={158} rx={20} fill={tileFill} stroke={tileStroke} strokeWidth={2}/>
     </EditableSvgLayer>
     <CopyText id={`source-title-${key}`} name={`Label kotak ${key}`} props={p} value={tileNames[i]}
      x={x+100} y={y+32} size={27} weight={820} anchor="middle" opacity={boxAlpha}/>
     {!moving&&!done?<>
      <EditableSvgLayer id={`pending-icon-${key}`} name={`ISO di kotak ${key}`} props={p}
        opacity={boxAlpha} basePosition={{x:x+38,y:y+90}} assetSize={{w:48,h:64}}>
       <g transform="scale(.55)"><ISOIcon/></g>
      </EditableSvgLayer>
      <CopyText id={`pending-file-${key}`} name={`Nama ISO ${key}`} props={p} value={srcFiles[i]??''}
        x={x+56} y={y+90} size={18} weight={650} opacity={boxAlpha}/>
      <CopyText id={`pending-state-${key}`} name={`Status siap ${key}`} props={p} value="SIAP"
        x={x+100} y={y+137} size={21} weight={630} color={C.muted} anchor="middle" opacity={boxAlpha}/>
     </>:null}
     {moving?<>
      <CopyText id={`moving-state-${key}`} name={`Status memindah ${key}`} props={p} value="MEMINDAH..."
       x={x+100} y={y+104} size={19} weight={770} color={C.accent} anchor="middle" opacity={boxAlpha}/>
      <EditableSvgLayer id={`flying-file-${key}`} name={`Animasi ISO ${key} masuk folder`} props={p}
        basePosition={{x:mx,y:my}} opacity={boxAlpha} assetSize={{w:260,h:70}}>
       <rect x={-lerp(135,40,pct)} y={-lerp(34,24,pct)} width={lerp(270,80,pct)} height={lerp(68,48,pct)} rx={13}
        fill="#F7E8DE" stroke={C.accent} strokeWidth={2}/>
       <g transform={`translate(${-lerp(107,0,pct)} 0) scale(.52)`}><ISOIcon/></g>
      </EditableSvgLayer>
      {pct<.78?<CopyText id={`flying-name-${key}`} name={`Nama file bergerak ${key}`} props={p}
         value={srcFiles[i]??''} x={mx-lerp(65,0,pct)} y={my+2} size={23} weight={730}
         opacity={boxAlpha*(1-progress(pct,.56,.78))}/>:null}
     </>:null}
     {done?<>
      <EditableSvgLayer id={`success-check-${key}`} name={`Centang kotak ${key}`} props={p}
       basePosition={{x:x+65,y:y+99}} opacity={boxAlpha}>
       <Check size={19}/>
      </EditableSvgLayer>
      <CopyText id={`success-ok-${key}`} name={`Status OK ${key}`} props={p}
        x={x+94} y={y+101} size={28} value="OK" weight={800} color="#24875D" opacity={boxAlpha}/>
     </>:null}
    </React.Fragment>;
   })}
   {/* Keep the original large hero, NOT a new small in-Explorer installer card. */}
   <CopyText id="hero-title" name="4 INSTALLER" props={p} value={p.scene04HeroTitle}
    x={540} y={500} anchor="middle" size={58} weight={860} opacity={heroAlpha}/>
   <CopyText id="hero-support" name="SATU FLASHDISK" props={p} value={p.scene04HeroSupport}
    x={540} y={570} anchor="middle" size={40} weight={820} color={C.accent} opacity={heroAlpha}/>
   <EditableSvgLayer id="usb-hero" name="USB dengan empat OS" props={p}
     basePosition={{x:540,y:927}} opacity={heroAlpha}
     animationTransform={`translate(0 ${44*(1-heroAlpha)}) scale(${.88+.12*heroAlpha})`}
     assetSize={{w:260,h:470}}>
    <UsbHero label={p.scene04UsbLabel}/>
   </EditableSvgLayer>
   <EditableSvgLayer id="usb-ready" name="Badge siap untuk booting" props={p}
     basePosition={{x:540,y:1368}} opacity={heroAlpha} assetSize={{w:560,h:75}}>
    <rect x={-280} y={-38} width={560} height={76} rx={40} fill="#DFF2E8"/>
    <g transform="translate(-219 0)"><Check size={21}/></g>
   </EditableSvgLayer>
   <CopyText id="usb-ready-text" name="SIAP UNTUK BOOTING" props={p}
     value="SIAP UNTUK BOOTING" x={570} y={1368} anchor="middle" size={30}
     color="#228861" weight={800} opacity={heroAlpha}/>
  </svg>
  {/* The final Scene03 source frame is a real React/SVG Freeze, not a raster import. */}
  {f<T.handoffEnd?<AbsoluteFill style={{opacity:1-progress(f,T.handoffFadeStart,T.handoffEnd),pointerEvents:'none'}}>
   <Freeze frame={419}><Scene03Preparation {...p}/></Freeze>
  </AbsoluteFill>:null}
  {p.scene04ShowTextVO&&!p.showSubtitles?<SceneTextVO scene={4} props={p}/>:null}
 </AbsoluteFill>;
};
