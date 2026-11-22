import React from 'react';
import {AbsoluteFill,Audio,Interactive,Sequence,staticFile,useCurrentFrame} from 'remotion';
import type {Easy2BootScene03Props,LayerOverride} from '../config/props';
import {getEditableTransform} from '../components/EditableTransform';
import {SCENE01_IMPACT,SCENE01_PALETTE} from '../config/scene01Impact';
import {clamp,smooth,easeOut,lerp,impactStamp} from '../animations/scene01Impact';

const P=SCENE01_PALETTE;
const font='Inter, Arial, sans-serif';
const stage=(t:number,enter:number,arrive:number,exit:number,gone:number)=>smooth((t-enter)/(arrive-enter))*(1-smooth((t-exit)/(gone-exit)));

/** Master native editor layer with non-destructive user transform + animation transform. */
const Layer:React.FC<{
  id:string;name:string;props:Easy2BootScene03Props;opacity?:number;
  animated?:string;children:React.ReactNode;fill?:string;
}> = ({id,name,props,opacity=1,animated='',children,fill})=>{
  const frame=useCurrentFrame();
  const layerKey=`S01:${id}` as keyof typeof props.layerOverrides;
  const u:LayerOverride=props.layerOverrides?.[layerKey]??{};
  const visible=(u.startFrame===undefined||frame>=u.startFrame)&&(u.endFrame===undefined||frame<u.endFrame);
  if(u.visible===false||!visible)return null;
  const keys=[...(u.keyframes??[])].sort((a,b)=>a.frame-b.frame);
  const userAt=(name:'x'|'y'|'scale'|'rotation'|'opacity',base:number)=>{
    if(!keys.length)return base;
    const prev=[...keys].reverse().find(k=>k.frame<=frame&&k[name]!==undefined);
    const next=keys.find(k=>k.frame>frame&&k[name]!==undefined);
    if(!prev)return next?.[name]??base;
    if(!next)return prev[name]??base;
    const t=smooth((frame-prev.frame)/(next.frame-prev.frame));
    return lerp(prev[name]??base,next[name]??base,t);
  };
  const f=clamp(opacity*userAt('opacity',u.opacity??1));
  const translate=`translate(${userAt('x',u.x??0)} ${userAt('y',u.y??0)})`;
  const rotate=`rotate(${userAt('rotation',u.rotation??0)})`;
  const scale=`scale(${userAt('scale',u.scale??1)})`;
  const visual=<g id={`S01-${id}`} opacity={f} transform={`${translate} ${rotate} ${scale}`} fill={u.fill??fill}>
   <g transform={animated}>{children}</g>
  </g>;
  return visual;
};
const Text:React.FC<{x:number;y:number;size:number;value:string;color?:string;weight?:number}> =
  ({x,y,size,value,color=P.ink,weight=800})=><text x={x} y={y} fontFamily={font} fontSize={size} fontWeight={weight}
   textAnchor="middle" dominantBaseline="middle" fill={color}>{value}</text>;
const WindowsLogo:React.FC<{x:number;y:number;u:number}> = ({x,y,u})=><g fill={P.blue}>
  {[0,1].flatMap(yy=>[0,1].map(xx=><rect key={`${xx}-${yy}`} x={x+xx*(u+3)} y={y+yy*(u+3)} width={u} height={u}/>))}
</g>;
/** One independent native Studio item per meaningful piece; geometry identical to approved S01. */
const Part:React.FC<{id:string;label:string;p:Easy2BootScene03Props;children:React.ReactNode}> =({id,label,p,children})=>{
 const frame=useCurrentFrame();const u:LayerOverride=p.layerOverrides?.[`S01:${id}`]??{};
 const edit=getEditableTransform(u,frame);
 if(!edit.visible)return null;
 return <g id={`S01-${id}`} transform={edit.transform} opacity={edit.opacity} fill={u.fill}>{children}</g>;
};
const Laptop:React.FC<{x:number;y:number;w:number;h:number;p:Easy2BootScene03Props}> =({x,y,w,h,p})=>{
 const sx=w/410,sy=h/255;
 const screenLabel=p.layerOverrides?.['S01:laptop-os-name']?.text??'Windows 11';
 return <g transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
  <Interactive.G name="S01 — Laptop — bayangan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="laptop-shadow" label="Laptop — bayangan" p={p}>
   <rect x={18} y={243} width={374} height={19} rx={8} fill="#CED4D5" opacity={.4}/>
  </Part></Interactive.G>
  <Interactive.G name="S01 — Laptop — bingkai hitam" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="laptop-bezel" label="Laptop — bingkai hitam" p={p}>
   <rect x={10} y={0} width={390} height={220} rx={12} fill="#282D35"/>
  </Part></Interactive.G>
  <Interactive.G name="S01 — Laptop — layar biru muda" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="laptop-screen" label="Laptop — layar biru muda" p={p}>
   <rect x={15} y={7} width={380} height={206} rx={8} fill="#E2EEF7"/>
   <path d="M230 7H379V212H286Z" fill="#D4E5F4" opacity={.55}/>
  </Part></Interactive.G>
  <Interactive.G name="S01 — Laptop — logo Windows 11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="laptop-windows-logo" label="Laptop — logo Windows 11" p={p}>
   <WindowsLogo x={168} y={78} u={34}/>
  </Part></Interactive.G>
  <Interactive.G name="S01 — Laptop — teks Windows 11" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="laptop-os-name" label="Laptop — teks Windows 11" p={p}>
   <Text x={205} y={172} value={screenLabel} size={p.layerOverrides?.['S01:laptop-os-name']?.fontSize??20}
     color={p.layerOverrides?.['S01:laptop-os-name']?.fill??'#25323E'} weight={600}/>
  </Part></Interactive.G>
  <Interactive.G name="S01 — Laptop — alas silver" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="laptop-silver-base" label="Laptop — alas silver" p={p}>
   <path d="M5 220H405L418 237H-8Z" fill="#C8CFD3"/>
   <path d="M-8 237H418L406 240H4Z" fill="#A8B0B6"/>
   <rect x={168} y={223} width={75} height={6} rx={3} fill="#9AA5AD"/>
  </Part></Interactive.G>
 </g>;
};
const FlashDisk:React.FC<{x:number;y:number;w?:number;h?:number;p:Easy2BootScene03Props}> =({x,y,w=97,h=201,p})=><g transform={`translate(${x} ${y}) scale(${w/97} ${h/201})`}>
 <Interactive.G name="S01 — USB — konektor logam" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="usb-metal" label="USB — konektor logam" p={p}>
  <rect x={18} y={0} width={61} height={45} rx={6} fill="#A4B2BB"/>
  <rect x={31} y={12} width={8} height={9} rx={1} fill="#637780"/>
  <rect x={57} y={12} width={8} height={9} rx={1} fill="#637780"/>
 </Part></Interactive.G>
 <Interactive.G name="S01 — USB — badan flashdisk" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="usb-body" label="USB — badan flashdisk" p={p}>
  <rect x={2} y={38} width={93} height={162} rx={13} fill="#2A343A"/>
  <rect x={7} y={45} width={83} height={147} rx={9} fill="#2F4248"/>
 </Part></Interactive.G>
 <Interactive.G name="S01 — USB — badge coral" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="usb-coral-label" label="USB — badge coral" p={p}>
  <rect x={16} y={53} width={66} height={33} rx={7} fill={P.coral}/>
 </Part></Interactive.G>
 <Interactive.G name="S01 — USB — tulisan USB" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="usb-label-text" label="USB — tulisan USB" p={p}>
  <Text x={49} y={70} size={22} value={p.layerOverrides?.['S01:usb-label-text']?.text??'USB'} color="#FFFFFF"/>
 </Part></Interactive.G>
 <Interactive.G name="S01 — USB — indikator bawah" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Part id="usb-indicator" label="USB — indikator bawah" p={p}>
  <rect x={39} y={176} width={20} height={9} rx={2} fill="#71848A"/>
 </Part></Interactive.G>
</g>;
/** Caption text that differs from the approved draft remains configurable through Props. */
const captionValue=(p:Easy2BootScene03Props,cue:number,line:number):string=>
  (p.scene01CaptionLines?.[cue]?.split('|')??SCENE01_IMPACT.captions[cue].lines)[line]??'';

/** Scene 01 of the existing Easy2Boot video (12.7 s). All key visuals are separate SVG/Remotion layers. */
export const Scene01Problem:React.FC<Easy2BootScene03Props>=(props)=>{
  const f=useCurrentFrame(); const t=f/30;
  const a=stage(t,.16,.65,3.58,3.88);
  const b=stage(t,3.74,4.14,7.84,8.16);
  const d=smooth((t-7.95)/.36);
  const move=smooth((t-3.77)/.64);
  const usbArrival=easeOut((t-4.17)/.62);
  const prog=.76*easeOut((t-8.65)/3.05);
  const stamp=impactStamp(f,props.scene01StampFrame,props.scene01ShakePower,props.scene01StampScale);
  const showNumber11=smooth((t-4.48)/.54),showNumber10=smooth((t-5.02)/.54);
  const modalY=480+31*(1-smooth((t-8.04)/.60));
  const patch=(id:string):LayerOverride=>props.layerOverrides?.[`S01:${id}` as keyof typeof props.layerOverrides]??{};
  const editText=(id:string,value:string)=>patch(id).text??value;
  const editColor=(id:string,value:string)=>patch(id).fill??value;
  const editSize=(id:string,value:number)=>patch(id).fontSize??value;
  return <AbsoluteFill style={{background:props.backgroundColor}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="1080" height="1920"
      style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>
      {/* Opening: needed installer (no circles, no decorative labels). */}
      <Layer id="headlineNeed" name="Judul butuh Windows" props={props} opacity={a*smooth((t-.28)/.56)} animated={`translate(0 ${27*(1-smooth((t-.28)/.56))})`}>
        {editText('headlineNeed',props.title01Need) !== 'MAU INSTAL' || editSize('headlineNeed',40) !== 40 || editColor('headlineNeed',P.ink) !== P.ink ? <Text x={270} y={255} size={editSize('headlineNeed',40)} value={editText('headlineNeed',props.title01Need)} color={editColor('headlineNeed',P.ink)}/> : <Interactive.Text name="S01 — headlineNeed" x={270} y={255} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={40} fill={P.ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MAU INSTAL</Interactive.Text>}
      </Layer>
      <Layer id="headlineWin11" name="Judul Windows 11" props={props} opacity={a*smooth((t-.53)/.56)} animated={`translate(0 ${26*(1-smooth((t-.53)/.56))})`}>
        {editText('headlineWin11',props.title01Target) !== 'WINDOWS 11?' || editSize('headlineWin11',47) !== 47 || editColor('headlineWin11',P.coral) !== P.coral ? <Text x={270} y={320} size={editSize('headlineWin11',47)} value={editText('headlineWin11',props.title01Target)} color={editColor('headlineWin11',P.coral)}/> : <Interactive.Text name="S01 — headlineWin11" x={270} y={320} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={47} fill={P.coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>WINDOWS 11?</Interactive.Text>}
      </Layer>
      {/* Same laptop travels from opening to comparison, no duplicate overlapping slide. */}
      <Layer id="laptop" name="Laptop dan Windows 11" props={props} opacity={Math.min(1,a+b)*easeOut((t-.28)/.55)}>
        <Laptop p={props} x={lerp(65,40,move)} y={lerp(466+28*(1-easeOut((t-.48)/.69)),501,move)}
          w={lerp(410,226,move)} h={lerp(255,166,move)}/>
      </Layer>
      <Layer id="headlineMismatch" name="Headline perbandingan USB" props={props} opacity={b*smooth((t-3.91)/.58)} animated={`translate(0 ${22*(1-smooth((t-3.91)/.58))})`}>
        {editText('headlineMismatch',props.scene01MismatchTitle) !== 'TAPI USB-NYA' || editSize('headlineMismatch',38) !== 38 || editColor('headlineMismatch',P.ink) !== P.ink ? <Text x={270} y={257} size={editSize('headlineMismatch',38)} value={editText('headlineMismatch',props.scene01MismatchTitle)} color={editColor('headlineMismatch',P.ink)}/> : <Interactive.Text name="S01 — headlineMismatch" x={270} y={257} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={38} fill={P.ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>TAPI USB-NYA</Interactive.Text>}
      </Layer>
      <Layer id="headlineWin10" name="Headline Windows 10" props={props} opacity={b*smooth((t-4.24)/.64)} animated={`translate(0 ${20*(1-smooth((t-4.24)/.64))})`}>
        {editText('headlineWin10',props.scene01MismatchValue) !== 'MASIH WIN 10' || editSize('headlineWin10',46) !== 46 || editColor('headlineWin10',P.coral) !== P.coral ? <Text x={270} y={323} size={editSize('headlineWin10',46)} value={editText('headlineWin10',props.scene01MismatchValue)} color={editColor('headlineWin10',P.coral)}/> : <Interactive.Text name="S01 — headlineWin10" x={270} y={323} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={46} fill={P.coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MASIH WIN 10</Interactive.Text>}
      </Layer>
      <Layer id="usb" name="USB Bootable Windows 10" props={props} opacity={b*usbArrival}>
        <FlashDisk p={props} x={lerp(560,341,usbArrival)} y={463}/>
      </Layer>
      <Interactive.G name="S01 — Angka 11: rolling reveal" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="number11" name="Angka 11: rolling reveal" props={props} opacity={b*showNumber11} animated={`translate(0 ${(1-easeOut((t-4.48)/.54))*45})`}>
        <Text x={148} y={707} size={64} value="11" color={P.blue} weight={900}/>
      </Layer></Interactive.G>
      <Interactive.G name="S01 — Angka 10: rolling reveal" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="number10" name="Angka 10: rolling reveal" props={props} opacity={b*showNumber10} animated={`translate(0 ${(1-easeOut((t-5.02)/.54))*45})`}>
        <Text x={389} y={707} size={64} value="10" color={P.coral} weight={900}/>
      </Layer></Interactive.G>
      {/* Final question: one app window, progress, then a separate editable impact stamp. */}
      <Layer id="headlineRedo" name="Pertanyaan penutup baris pertama" props={props} opacity={d*smooth((t-8.17)/.47)} animated={`translate(0 ${25*(1-smooth((t-8.17)/.47))})`}>
        {editText('headlineRedo',props.scene01FinalLine1) !== 'MASA HARUS' || editSize('headlineRedo',40) !== 40 || editColor('headlineRedo',P.ink) !== P.ink ? <Text x={270} y={251} size={editSize('headlineRedo',40)} value={editText('headlineRedo',props.scene01FinalLine1)} color={editColor('headlineRedo',P.ink)}/> : <Interactive.Text name="S01 — headlineRedo" x={270} y={251} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={40} fill={P.ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MASA HARUS</Interactive.Text>}
      </Layer>
      <Layer id="headlineRedo2" name="Pertanyaan penutup baris kedua" props={props} opacity={d*smooth((t-8.53)/.5)} animated={`translate(0 ${23*(1-smooth((t-8.53)/.5))})`}>
        {editText('headlineRedo2',props.scene01FinalLine2) !== 'BIKIN ULANG LAGI?' || editSize('headlineRedo2',42) !== 42 || editColor('headlineRedo2',P.coral) !== P.coral ? <Text x={270} y={318} size={editSize('headlineRedo2',42)} value={editText('headlineRedo2',props.scene01FinalLine2)} color={editColor('headlineRedo2',P.coral)}/> : <Interactive.Text name="S01 — headlineRedo2" x={270} y={318} textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, Arial, sans-serif" fontWeight={800} fontSize={42} fill={P.coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>BIKIN ULANG LAGI?</Interactive.Text>}
      </Layer>
      <Interactive.G name="S01 — Jendela USB Bootable" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="bootWindow" name="Jendela USB Bootable" props={props} opacity={d}
        animated={`translate(${stamp.dx} ${stamp.shakeY})`}>
        <rect x={62} y={modalY+8} width={416} height={210} rx={15} fill="#C5CAC9" opacity={.38}/>
        <rect x={59} y={modalY} width={422} height={208} rx={15} fill={P.paper} stroke="#DDE0DE" strokeWidth={2}/>
        <rect x={77} y={modalY+18} width={12} height={12} rx={2} fill="#D7E1E3"/>
        <rect x={96} y={modalY+18} width={12} height={12} rx={2} fill="#D7E1E3"/>
        <Text x={270} y={modalY+57} size={24} value="USB Bootable"/>
        <Text x={270} y={modalY+97} size={17} weight={500} value="Membuat bootable ulang..." color={P.muted}/>
      </Layer></Interactive.G>
      <Interactive.G name="S01 — Progress bootable" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="progress" name="Progress bootable" props={props} opacity={d}
        animated={`translate(${stamp.dx} ${stamp.shakeY})`}>
        <rect x={90} y={modalY+131} width={360} height={19} rx={9} fill="#E3E6E4"/>
        <rect x={90} y={modalY+131} width={Math.max(0,360*prog)} height={19} rx={9} fill={P.coral}/>
        <Text x={270} y={modalY+179} size={20} weight={650} value={`${Math.round(prog*100)}%`}/>
      </Layer></Interactive.G>
      <defs><clipPath id="s01-impact-window-clip" clipPathUnits="userSpaceOnUse">
        <rect x={59} y={modalY} width={422} height={208} rx={15}/>
      </clipPath></defs>
      {props.scene01ShowStamp&&stamp.visible?<>
        <Interactive.G name="S01 — Impact — flash singkat" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="stampFlash" name="Impact — flash singkat" props={props} opacity={stamp.flash}>
          <rect x={62} y={modalY} width={416} height={205} rx={15} fill="#FFFFFF"/>
        </Layer></Interactive.G>
        <g clipPath="url(#s01-impact-window-clip)">
        <Interactive.G name="S01 — Impact Stamp — bayangan X" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="stampShadow" name="Impact Stamp — bayangan X" props={props}
          animated={`translate(270 ${581+stamp.dy}) scale(${stamp.scale}) translate(-270 -581)`}>
          <path d="M201 512L339 650M339 512L201 650" fill="none" stroke="#57504D" strokeWidth={28} strokeLinecap="round"
            transform="translate(4 5)"/>
        </Layer></Interactive.G>
        <Interactive.G name="S01 — Impact Stamp — dua garis X" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="stampX" name="Impact Stamp — dua garis X" props={props}
          animated={`translate(270 ${581+stamp.dy}) scale(${stamp.scale}) translate(-270 -581)`}>
          <path d="M201 512L339 650M339 512L201 650" fill="none" stroke={props.scene01StampColor}
            strokeWidth={23} strokeLinecap="round"/>
        </Layer></Interactive.G>
        </g>
        <Interactive.G name="S01 — Impact — percikan" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><Layer id="stampSparks" name="Impact — percikan" props={props} opacity={stamp.sparks}>
          <g stroke={props.scene01StampColor} strokeWidth={5} strokeLinecap="round" fill="none">
            <path d="M180 542L158 530 M179 610L155 626 M360 532L388 518 M362 615L388 629 M248 484L238 465 M296 672L311 691"/>
          </g>
        </Layer></Interactive.G>
      </>:null}
      {/* Native editable captions: one literal Interactive.Text callsite per visible line.
          Do not map a shared Caption component: Studio merges its instances (+N).
          When a user changes the cue using Props, the alternate text remains
          configurable via Props instead of silently overriding that change. */}
      {props.scene01ShowCaptions? <>
        <Layer id="caption1" name="Teks VO 1" props={props}
          opacity={smooth((f-8)/9)*(1-smooth((f-(112-7))/7))}>
          {captionValue(props,0,0)==='Mau instal Windows 11,' && props.subtitleColor==='#202020'
            ? null
            : <Text x={270} y={769} size={20} color={props.subtitleColor} weight={650} value={captionValue(props,0,0)}/>}
          {captionValue(props,0,1)? <Text x={270} y={786} size={20} color={props.subtitleColor} weight={650} value={captionValue(props,0,1)}/> : null}
        </Layer>
        <Layer id="caption2" name="Teks VO 2" props={props}
          opacity={smooth((f-118)/9)*(1-smooth((f-(240-7))/7))}>
          {captionValue(props,1,0)==='tapi flashdisk bootable-nya' && props.subtitleColor==='#202020'
            ? <Interactive.Text
              name="S01 — Subtitle 02A — Flashdisk bootable"
              x={270}
              y={754}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, Arial, sans-serif"
              fontSize={20}
              fontWeight={650}
              fill="#202020"
              style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}
            ></Interactive.Text>
            : <Text x={270} y={754} size={20} color={props.subtitleColor} weight={650} value={captionValue(props,1,0)}/>}
          {captionValue(props,1,1)==='masih Windows 10?' && props.subtitleColor==='#202020'
            ? null
            : <Text x={270} y={786} size={20} color={props.subtitleColor} weight={650} value={captionValue(props,1,1)}/>}
        </Layer>
        <Layer id="caption3" name="Teks VO 3" props={props}
          opacity={smooth((f-246)/9)*(1-smooth((f-(381-7))/7))}>
          {captionValue(props,2,0)==='Masa harus bikin bootable' && props.subtitleColor==='#202020'
            ? <Interactive.Text
              name="S01 — Subtitle 03A — Bikin bootable"
              x={270}
              y={754}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, Arial, sans-serif"
              fontSize={20}
              fontWeight={650}
              fill="#202020"
              style={{
                translate: '14.3px 17.6px',
                scale: 1,
                rotate: '0deg',
                opacity: 1,
                pointerEvents: 'auto'
              }}
            ></Interactive.Text>
            : <Text x={270} y={754} size={20} color={props.subtitleColor} weight={650} value={captionValue(props,2,0)}/>}
          {captionValue(props,2,1)==='ulang lagi?' && props.subtitleColor==='#202020'
            ? <Interactive.Text
              name="S01 — Subtitle 03B — Ulang lagi"
              x={270}
              y={786}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, Arial, sans-serif"
              fontSize={20}
              fontWeight={650}
              fill="#202020"
              style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,pointerEvents:'auto'}}
            ></Interactive.Text>
            : <Text x={270} y={786} size={20} color={props.subtitleColor} weight={650} value={captionValue(props,2,1)}/>}
        </Layer>
      </> : null}
    </svg>
    {props.showSfx?<Sequence from={Math.floor(8.10*30)} durationInFrames={SCENE01_IMPACT.durationInFrames-Math.floor(8.10*30)}>
      <Audio src={staticFile('videos/easy2boot-multiboot-reels/audio/scene01_impact_stamp.wav')} volume={0.85}/>
    </Sequence>:null}
  </AbsoluteFill>;
};
