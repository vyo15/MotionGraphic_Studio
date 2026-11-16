import React,{useMemo} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {NativeS05Layers} from '../components/NativeSceneLayers';
import {frameSvg} from '../components/FrameSvgRenderer';
import {frames} from '../config/frames/scene05';
import {SCENE05_SVG} from '../config/scene05Svg';
import type {Easy2BootScene03Props} from '../config/props';

const escapeXml=(v:string)=>v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const editableText=(src:string,p:Easy2BootScene03Props)=>src
 .replace('BOOT DARI <tspan fill="#DF805F">USB.</tspan>',`BOOT DARI <tspan fill="#DF805F">${escapeXml(p.titleBoot.replace(/^BOOT DARI\s*/i,''))}</tspan>`)
 .replace('PILIH <tspan fill="#DF805F">USB BOOT.</tspan>',`PILIH <tspan fill="#DF805F">${escapeXml(p.titleSelectUsb.replace(/^PILIH\s*/i,''))}</tspan>`)
 .replace('CARI FILE <tspan fill="#DF805F">ISO.</tspan>',`CARI FILE <tspan fill="#DF805F">${escapeXml(p.titleFindIso.replace(/^CARI FILE\s*/i,''))}</tspan>`)
 .replace('PILIH <tspan fill="#DF805F">WINDOWS 11.</tspan>',`PILIH <tspan fill="#DF805F">${escapeXml(p.titleSelectIso.replace(/^PILIH\s*/i,''))}</tspan>`)
 .replace('INSTALLER <tspan fill="#DF805F">TERBUKA.</tspan>',`INSTALLER <tspan fill="#DF805F">${escapeXml(p.titleSetup.replace(/^INSTALLER\s*/i,''))}</tspan>`)
 .replaceAll('UEFI: USB Flash Drive',escapeXml(p.bootOption))
 .replaceAll('Win11_24H2.iso',escapeXml(p.isoBootName))
 .replaceAll('EASY2BOOT — SATU USB, BANYAK PILIHAN',escapeXml(p.footerText));

/** S05 — UEFI boot menu → agFM (simulasi) → Windows Setup. */
/** Declarative frame renderer: text, SVG objects and animation use the same source data. */
export const Scene05Boot:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const original=useMemo(()=>editableText(SCENE05_SVG.replaceAll('#F7F7F5',props.backgroundColor),props),[props]);
 const markup=useMemo(()=>frameSvg(original,'S05',frame,frames,props.layerOverrides,props.fontFamily),[original,frame,props.layerOverrides,props.fontFamily]);
 return <AbsoluteFill style={{background:props.backgroundColor}}><NativeS05Layers markup={markup}/></AbsoluteFill>;
};
