import React,{useMemo} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {NativeS04Layers} from '../components/NativeSceneLayers';
import {frameSvg} from '../components/FrameSvgRenderer';
import {frames} from '../config/frames/scene04';
import {SCENE04_SVG} from '../config/scene04Svg';
import type {Easy2BootScene03Props} from '../config/props';

const xml=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const mergeEditable=(source:string,p:Easy2BootScene03Props):string=>source
  .replace('SALIN <tspan fill="#DF805F">ISO.</tspan>',`SALIN <tspan fill="#DF805F">${xml(p.titleIso.replace(/^SALIN\s*/i,''))}</tspan>`)
  .replace('WINDOWS <tspan fill="#DF805F">10</tspan>',`<tspan fill="#202628">${xml(p.titleWin10.replace(/10$/,'').trim())} </tspan><tspan fill="#DF805F">10</tspan>`)
  .replace('WINDOWS <tspan fill="#DF805F">11</tspan>',`<tspan fill="#202628">${xml(p.titleWin11.replace(/11$/,'').trim())} </tspan><tspan fill="#DF805F">11</tspan>`)
  .replace('LIN<tspan fill="#DF805F">UX</tspan>',`<tspan fill="#202628">${xml(p.titleLinux.slice(0,3))}</tspan><tspan fill="#DF805F">${xml(p.titleLinux.slice(3))}</tspan>`)
  .replace('CUKUP <tspan fill="#DF805F">SALIN.</tspan>',`CUKUP <tspan fill="#DF805F">${xml(p.titleMore.replace(/^CUKUP\s*/i,''))}</tspan>`)
  .replaceAll('Win10_22H2.iso',xml(p.isoWin10Name))
  .replaceAll('Win11_24H2.iso',xml(p.isoWin11Name))
  .replaceAll('Ubuntu-24.04.iso',xml(p.isoLinuxName))
  .replace('EASY2BOOT — SATU USB, BANYAK PILIHAN',xml(p.footerText));

/** S04 — setiap bagian SVG editable dalam scene04Svg.ts; animasi di scene04.ts. */
/** Declarative frame renderer: text, SVG objects and animation use the same source data. */
export const Scene04CopyIso:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const original=useMemo(()=>mergeEditable(SCENE04_SVG,props),[props]);
 const markup=useMemo(()=>frameSvg(original,'S04',frame,frames,props.layerOverrides,props.fontFamily),[original,frame,props.layerOverrides,props.fontFamily]);
 return <AbsoluteFill style={{background:props.backgroundColor}}><NativeS04Layers markup={markup}/></AbsoluteFill>;
};
