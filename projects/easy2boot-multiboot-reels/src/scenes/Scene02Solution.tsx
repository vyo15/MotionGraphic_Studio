import React from 'react';
import {AbsoluteFill,Audio,Interactive,Sequence,staticFile,useCurrentFrame} from 'remotion';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
import {getEditableTransform} from '../components/EditableTransform';
import {CARD_BREAK} from '../config/scene02CardBreak';
import {fade,between,smooth01,outCubic,outBack,lerp} from '../animations/scene02CardBreak';

const font='Inter, Arial, sans-serif';
const COL={bg:'#F7F7F5',coral:'#DA7A5C',ink:'#202327',muted:'#71808B',blue:'#2770B7'};
/** Each independently named native layer separates user transform from animation transform. */
const Layer:React.FC<{id:string;name:string;p:Easy2BootScene03Props;children:React.ReactNode;opacity?:number;motion?:string}> =
({id,name,p,children,opacity=1,motion=''})=>{
 const f=useCurrentFrame();const u:LayerOverride=p.layerOverrides?.[`S02:${id}` as keyof typeof p.layerOverrides]??{};
 if(u.visible===false||(u.startFrame!==undefined&&f<u.startFrame)||(u.endFrame!==undefined&&f>=u.endFrame))return null;
 const k=[...(u.keyframes??[])].sort((a,b)=>a.frame-b.frame);
 const value=(key:'x'|'y'|'scale'|'rotation'|'opacity',def:number)=>{
  const a=[...k].reverse().find(z=>z.frame<=f&&z[key]!==undefined),b=k.find(z=>z.frame>f&&z[key]!==undefined);
  if(!a)return b?.[key]??def;if(!b)return a[key]??def;
  const t=smooth01((f-a.frame)/(b.frame-a.frame));return lerp(a[key]??def,b[key]??def,t);
 };
 if(id==='solutionLine2'||id==='reaction'||id==='manyLine2'||id==='reactionSecond'||id==='solutionLine1'||id==='manyLine1')return <g id={`S02-text-${id}`} opacity={opacity*value('opacity',u.opacity??1)}
  transform={`translate(${value('x',u.x??0)} ${value('y',u.y??0)}) rotate(${value('rotation',u.rotation??0)}) scale(${value('scale',u.scale??1)})`}><g transform={motion}>{children}</g></g>;
 return <g id={`S02-${id}`} opacity={opacity*value('opacity',u.opacity??1)}
   transform={`translate(${value('x',u.x??0)} ${value('y',u.y??0)}) rotate(${value('rotation',u.rotation??0)}) scale(${value('scale',u.scale??1)})`}
   fill={u.fill}><g transform={motion}>{children}</g></g>;
};
const Txt:React.FC<{x:number;y:number;v:string;size?:number;weight?:number;color?:string;anchor?:'start'|'middle'}>=
({x,y,v,size=24,weight=800,color=COL.ink,anchor='middle'})=><text x={x} y={y} textAnchor={anchor??'middle'} dominantBaseline="middle" fontFamily={font} fontWeight={weight} fontSize={size} fill={color}>{v}</text>;
const Part:React.FC<{id:string;name:string;p:Easy2BootScene03Props;children:React.ReactNode}>=({id,name,p,children})=>{
 const f=useCurrentFrame();const u:LayerOverride=p.layerOverrides?.[`S02:${id}`]??{};
 const edit=getEditableTransform(u,f);
 if(!edit.visible)return null;
 return <g transform={edit.transform} opacity={edit.opacity} fill={u.fill}>{children}</g>;
};
const Usb:React.FC<{x:number;y:number;scale?:number;lights?:number;p:Easy2BootScene03Props}> = ({x,y,scale=1,lights=0,p})=><g transform={`translate(${x} ${y}) scale(${scale})`}>
 <Interactive.G name="S02 — USB hero — konektor" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="hero-usb-connector" name="USB hero — konektor" p={p}>
  <rect x={24} y={0} width={60} height={49} rx={7} fill="#9BACB5"/>
  <rect x={37} y={12} width={8} height={13} rx={1} fill="#6E818B"/>
  <rect x={63} y={12} width={8} height={13} rx={1} fill="#6E818B"/>
 </Part></Interactive.G>
 <Interactive.G name="S02 — USB hero — bodi" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="hero-usb-body" name="USB hero — bodi" p={p}>
  <rect x={8} y={42} width={92} height={195} rx={14} fill="#29363D"/>
  <rect x={14} y={51} width={80} height={174} rx={9} fill="#31464F"/>
 </Part></Interactive.G>
 <Interactive.G name="S02 — USB hero — warna label" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="hero-usb-label" name="USB hero — warna label" p={p}>
  <rect x={23} y={63} width={62} height={39} rx={6} fill={COL.coral}/>
 </Part></Interactive.G>
 <Interactive.G name="S02 — USB hero — tulisan USB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="hero-usb-name" name="USB hero — tulisan USB" p={p}>
  <Txt x={54} y={83} v={p.layerOverrides?.['S02:hero-usb-name']?.text??'USB'} size={23} color="#FFFFFF"/>
 </Part></Interactive.G>
 <Interactive.G name="S02 — USB hero — indikator tiga ISO" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="hero-usb-leds" name="USB hero — indikator tiga ISO" p={p}>
  <rect x={42} y={216} width={24} height={9} rx={3} fill="#83969F"/>
  {[0,1,2].map((i)=><rect key={i} x={24+i*20} y={147} width={15} height={17} rx={3} stroke={i<lights?'#FFFFFF':'#647780'} strokeWidth={2} fill={i<lights?'#E2F3FA':'#31464F'}/>)}
 </Part></Interactive.G>
</g>;
/** Old scene-1 boot window as editable vector, never a flattened screenshot. */
const OldWindow:React.FC =()=> <g>
 <rect x={62} y={488} width={416} height={210} rx={15} fill="#C5CAC9" opacity={.38}/>
 <rect x={59} y={480} width={422} height={208} rx={15} fill="#FFFFFF" stroke="#DDE0DE" strokeWidth={2}/>
 <rect x={77} y={498} width={12} height={12} rx={2} fill="#D7E1E3"/><rect x={96} y={498} width={12} height={12} rx={2} fill="#D7E1E3"/>
 <Txt x={270} y={537} v="USB Bootable" size={24}/><Txt x={270} y={577} v="Membuat bootable ulang..." weight={500} color="#71808B" size={17}/>
 <rect x={90} y={611} width={360} height={19} rx={9} fill="#E3E6E4"/><rect x={90} y={611} width={274} height={19} rx={9} fill={COL.coral}/>
 <Txt x={270} y={659} size={20} weight={650} v="76%"/>
 <path d="M201 512L339 650M339 512L201 650" fill="none" stroke="#57504D" strokeWidth={28} strokeLinecap="round" transform="translate(4 5)"/>
 <path d="M201 512L339 650M339 512L201 650" fill="none" stroke={COL.coral} strokeWidth={23} strokeLinecap="round"/>
 </g>;
const FileCard:React.FC<{v:string;accent:string}>=({v,accent})=><g>
 <rect x={-60} y={-35} width={146} height={73} rx={13} fill="#FFFFFF" stroke="#E0E5E3" strokeWidth={2}/>
 <rect x={-46} y={-20} width={39} height={42} rx={5} fill="#EAF3F9"/>
 <path d="M-37 -8H-15M-37 2H-15M-37 12H-22" stroke={accent} strokeWidth={4} strokeLinecap="round"/>
 <text x={2} y={8} fontFamily={font} fontWeight={770} fontSize={16} fill={COL.ink}>{v}</text>
 </g>;

/** 13-second S02 using the same native layers for Remotion preview and render. */
export const Scene02Solution:React.FC<Easy2BootScene03Props>=(p)=>{
 const f=useCurrentFrame();const t=f/30;
 const u=(id:string)=>p.layerOverrides?.[`S02:${id}` as keyof typeof p.layerOverrides]??{};
 const title=(id:string,fallback:string)=>u(id).text??fallback;
 const size=(id:string,fallback:number)=>u(id).fontSize??fallback;
 const color=(id:string,fallback:string)=>u(id).fill??fallback;
 const brStart=p.scene02BreakStartFrame,brDur=p.scene02BreakDurationFrames;
 const burst=outCubic((f-brStart)/brDur),breaking=fade(f,brStart,brStart+4);
 const shardOpacity=1-fade(f,brStart+14,brStart+brDur);
 const oldTitle=1-fade(f,brStart+3,brStart+11);
 const reaction=between(t,.60,.99,2.54,2.92);
 const sol=between(t,2.83,3.30,5.37,5.72);
 const menu=fade(t,5.73,6.10);
 const stored=[6.95,8.15,9.30].filter((s)=>t>=s+.84).length;
 const cardStarts=[6.95,8.15,9.30];
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="1080" height="1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>
   <defs>
    {CARD_BREAK.shards.map(s=><clipPath key={s.id} id={`s02-shard-${s.id}`} clipPathUnits="userSpaceOnUse"><polygon points={s.clip}/></clipPath>)}
   </defs>
   {/* Continuity: start exactly with S01's final X-window, then break its actual pieces. */}
   {p.scene02ShowBreak&&shardOpacity>0? <>
    <Interactive.G name="S02 — Card Break — pertanyaan lama 1" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="oldTitle1" name="Card Break — pertanyaan lama 1" p={p} opacity={oldTitle}>
     <Txt x={270} y={251} v={p.scene01FinalLine1} size={40}/>
    </Layer></Interactive.G>
    <Interactive.G name="S02 — Card Break — pertanyaan lama 2" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="oldTitle2" name="Card Break — pertanyaan lama 2" p={p} opacity={oldTitle}>
     <Txt x={270} y={318} v={p.scene01FinalLine2} size={42} color={COL.coral}/>
    </Layer></Interactive.G>
    <Interactive.G name="S02 — Card Break: semua kepingan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{CARD_BREAK.shards.map((s,i)=>{
      const delay=i%3*1.2; const move=outCubic((f-brStart-delay)/(brDur-delay));
      const spread=p.scene02BreakSpread,rot=p.scene02BreakRotation;
      const wobble=(1-move)*Math.sin(Math.max(0,f-brStart)*1.1+i*2)*2;
      return <Layer key={s.id} id={`breakShard${s.id}`} name={`Card Break — potongan ${s.id}`} p={p}
        opacity={shardOpacity} motion={`translate(${s.dx*spread*move+wobble} ${s.dy*spread*move}) rotate(${s.rot*rot*move} ${s.pivotX} ${s.pivotY})`}>
        <g clipPath={`url(#s02-shard-${s.id})`}><OldWindow/></g>
      </Layer>;
    })}</Interactive.G>
    <Interactive.G name="S02 — Card Break — percikan benturan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="breakDust" name="Card Break — percikan benturan" p={p} opacity={breaking*(1-fade(f,brStart+4,brStart+13))}>
     <path d="M160 491L146 477M389 494L409 474M168 687L149 704M385 680L401 699" stroke={p.scene02BreakColor} strokeWidth={4} fill="none" strokeLinecap="round"/>
    </Layer></Interactive.G>
   </>:null}
   {/* Single message during reaction; no duplicate headline or presentation card. */}
   <Layer id="reaction" name="Ah, ribet — baris 1" p={p} opacity={reaction}
     motion={`translate(0 ${lerp(35,0,outBack((t-.64)/.55))})`}>
    {title('reaction',p.scene02ReactionLine1) !== 'AH, RIBET' || size('reaction',38) !== 38 || color('reaction',COL.ink) !== COL.ink ? <Txt x={270} y={308} size={size('reaction',38)} color={color('reaction',COL.ink)} v={title('reaction',p.scene02ReactionLine1)}/> : <Interactive.Text
     name="S02 — reaction"
     x={270}
     y={308}
     textAnchor="middle"
     dominantBaseline="middle"
     fontFamily="Inter, Arial, sans-serif"
     fontWeight={800}
     fontSize={38}
     fill={COL.ink}
     style={{
      translate: '0px 145px',
      scale: 1,
      rotate: '0deg',
      opacity: 1
     }}
    >AH, RIBET</Interactive.Text>}
   </Layer>
   <Layer id="reactionSecond" name="Banget — baris 2" p={p} opacity={reaction}
     motion={`translate(0 ${lerp(38,0,outBack((t-.69)/.55))})`}>
    {title('reactionSecond',p.scene02ReactionLine2) !== 'BANGET.' || size('reactionSecond',46) !== 46 || color('reactionSecond',p.scene02BreakColor) !== p.scene02BreakColor ? <Txt x={270} y={363} size={size('reactionSecond',46)} color={color('reactionSecond',p.scene02BreakColor)} v={title('reactionSecond',p.scene02ReactionLine2)}/> : <Interactive.Text
     name="S02 — reactionSecond"
     x={270}
     y={363}
     textAnchor="middle"
     dominantBaseline="middle"
     fontFamily="Inter, Arial, sans-serif"
     fontWeight={800}
     fontSize={46}
     fill={p.scene02BreakColor}
     style={{
      translate: '0px 145px',
      scale: 1,
      rotate: '0deg',
      opacity: 1
     }}
    >BANGET.</Interactive.Text>}
   </Layer>
   {!p.showSubtitles ? <Interactive.G name="S02 — Teks VO: Ah, ribet banget" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="reactionCaption" name="Teks VO: Ah, ribet banget" p={p} opacity={between(t,.85,1.14,2.50,2.8)}>
    {title('reactionCaption','Ah, ribet banget.')==='Ah, ribet banget.' ?
      <Interactive.Text
       name="S02 — Subtitle draft 01 — Ah ribet"
       x={270}
       y={750}
       textAnchor="middle"
       dominantBaseline="middle"
       fontFamily="Inter, Arial, sans-serif"
       fontSize={20}
       fontWeight={620}
       fill="#202327"
       style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}
      >Ah, ribet banget.</Interactive.Text> :
      <Txt x={270} y={750} v={title('reactionCaption','Ah, ribet banget.')} color={COL.ink} size={20} weight={620}/>}
   </Layer></Interactive.G>:null}
   {/* Solution appears after reaction exits. */}
   <Layer id="solutionLine1" name="Mending pakai — headline" p={p} opacity={sol}
    motion={`translate(0 ${26*(1-outCubic((t-2.95)/.64))})`}>
    {title('solutionLine1',p.scene02SolutionLine1) !== 'MENDING PAKAI' || size('solutionLine1',35) !== 35 || color('solutionLine1',COL.ink) !== COL.ink ? <Txt x={270} y={288} v={title('solutionLine1',p.scene02SolutionLine1)} size={size('solutionLine1',35)} color={color('solutionLine1',COL.ink)}/> : <Interactive.Text name="S02 — solutionLine1" x={270} y={288} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={35} fill={COL.ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MENDING PAKAI</Interactive.Text>}
   </Layer>
   <Layer id="solutionLine2" name="Easy2Boot — headline" p={p} opacity={sol}
    motion={`translate(0 ${26*(1-outCubic((t-3.06)/.65))})`}>
    {title('solutionLine2',p.scene02SolutionLine2) !== 'EASY2BOOT.' || size('solutionLine2',51) !== 51 || color('solutionLine2',COL.coral) !== COL.coral ? <Txt x={270} y={346} v={title('solutionLine2',p.scene02SolutionLine2)} size={size('solutionLine2',51)} color={color('solutionLine2',COL.coral)}/> : <Interactive.Text name="S02 — solutionLine2" x={270} y={346} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={51} fill={COL.coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EASY2BOOT.</Interactive.Text>}
   </Layer>
   <Interactive.G name="S02 — USB yang sama: solusi sampai tiga ISO" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="solutionUsb" name="USB yang sama: solusi sampai tiga ISO" p={p} opacity={fade(t,2.96,3.42)} motion={`translate(0 ${72*(1-outCubic((t-2.96)/.55))})`}>
    <Usb p={p} x={204} y={447} scale={1.2} lights={stored}/>
   </Layer></Interactive.G>
   {!p.showSubtitles ? <Interactive.G name="S02 — Teks VO: Mending pakai Easy2Boot" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="solutionCaption" name="Teks VO: Mending pakai Easy2Boot" p={p} opacity={between(t,3.35,3.56,5.30,5.60)}>
    {title('solutionCaption','Mending pakai Easy2Boot aja.')==='Mending pakai Easy2Boot aja.' ?
      <Interactive.Text
       name="S02 — Subtitle draft 02 — Easy2Boot"
       x={270}
       y={750}
       textAnchor="middle"
       dominantBaseline="middle"
       fontFamily="Inter, Arial, sans-serif"
       fontSize={19}
       fontWeight={620}
       fill="#202327"
       style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}
      >Mending pakai Easy2Boot aja.</Interactive.Text> :
      <Txt x={270} y={750} size={19} weight={620} v={title('solutionCaption','Mending pakai Easy2Boot aja.')}/>}
   </Layer></Interactive.G>:null}
   {/* Files visibly enter one USB, not three independent slides. */}
   <Layer id="manyLine1" name="Satu flashdisk — headline" p={p} opacity={menu} motion={`translate(0 ${30*(1-outCubic((t-6.03)/.55))})`}>
    {title('manyLine1',p.scene02ManyLine1) !== 'SATU FLASHDISK' || size('manyLine1',32) !== 32 || color('manyLine1',COL.ink) !== COL.ink ? <Txt x={270} y={274} v={title('manyLine1',p.scene02ManyLine1)} size={size('manyLine1',32)} color={color('manyLine1',COL.ink)}/> : <Interactive.Text name="S02 — manyLine1" x={270} y={274} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={32} fill={COL.ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SATU FLASHDISK</Interactive.Text>}
   </Layer>
   <Layer id="manyLine2" name="Banyak installer — headline" p={p} opacity={menu} motion={`translate(0 ${32*(1-outCubic((t-6.13)/.55))})`}>
    {title('manyLine2',p.scene02ManyLine2) !== 'BANYAK INSTALLER' || size('manyLine2',36) !== 36 || color('manyLine2',COL.coral) !== COL.coral ? <Txt x={270} y={326} v={title('manyLine2',p.scene02ManyLine2)} size={size('manyLine2',36)} color={color('manyLine2',COL.coral)}/> : <Interactive.Text name="S02 — manyLine2" x={270} y={326} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={36} fill={COL.coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BANYAK INSTALLER</Interactive.Text>}
   </Layer>
   <Interactive.G name="S02 — ISO: 3 kartu installer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{[0,1,2].map(i=>{
      const start=cardStarts[i];const pct=outCubic((t-start)/.82);
      const appear=between(t,start-.06,start+.15,start+.68,start+.85)*menu;
      const names=['WIN 10','WIN 11','LINUX'];
      return <Layer key={i} id={`iso${i+1}`} name={`ISO ${names[i]} masuk ke USB`} p={p} opacity={appear}
       motion={`translate(${lerp(-135,210,pct)} ${lerp(545,570,pct)}) scale(${lerp(1,.25,pct)})`}>
       <FileCard v={names[i]} accent={i===2?'#D18454':COL.blue}/>
      </Layer>;
   })}</Interactive.G>
   {!p.showSubtitles ? <Interactive.G name="S02 — Teks VO: satu flashdisk banyak installer" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="manyCaption" name="Teks VO: satu flashdisk banyak installer" p={p} opacity={between(t,6.45,6.7,12.55,12.87)}>
    {t<8 ? (title('manyCaption','Satu flashdisk bisa nyimpen installer.')==='Satu flashdisk bisa nyimpen installer.' ?
      <Interactive.Text
       name="S02 — Subtitle draft 03A — Satu flashdisk"
       x={270}
       y={750}
       textAnchor="middle"
       dominantBaseline="middle"
       fontFamily="Inter, Arial, sans-serif"
       fontSize={19}
       fontWeight={620}
       fill="#202327"
       style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}
      >Satu flashdisk bisa nyimpen installer.</Interactive.Text> :
      <Txt x={270} y={750} size={19} weight={620} v={title('manyCaption','Satu flashdisk bisa nyimpen installer.')}/>) :
     t<9.15 ? (title('manyCaption','Windows 10, Windows 11,')==='Windows 10, Windows 11,' ?
      <Interactive.Text name="S02 — Subtitle draft 03B — Windows" x={270} y={750} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontSize={19} fontWeight={620} fill="#202327" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Windows 10, Windows 11,</Interactive.Text> :
      <Txt x={270} y={750} size={19} weight={620} v={title('manyCaption','Windows 10, Windows 11,')}/>) :
      (title('manyCaption','Sampai Linux sekaligus.')==='Sampai Linux sekaligus.' ?
      <Interactive.Text
       name="S02 — Subtitle draft 03C — Linux"
       x={270}
       y={750}
       textAnchor="middle"
       dominantBaseline="middle"
       fontFamily="Inter, Arial, sans-serif"
       fontSize={19}
       fontWeight={620}
       fill="#202327"
       style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}
      >Sampai Linux sekaligus.</Interactive.Text> :
      <Txt x={270} y={750} size={19} weight={620} v={title('manyCaption','Sampai Linux sekaligus.')}/>)}
   </Layer></Interactive.G>:null}
  </svg>
  {p.showSfx&&p.scene02ShowBreak?<Sequence from={p.scene02BreakStartFrame} durationInFrames={CARD_BREAK.durationInFrames-p.scene02BreakStartFrame}>
    <Audio src={staticFile('videos/easy2boot-multiboot-reels/audio/scene02_card_break.wav')} volume={0.72}/>
  </Sequence>:null}
 </AbsoluteFill>;
};
