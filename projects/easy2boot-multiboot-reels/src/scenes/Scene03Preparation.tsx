import React,{useMemo} from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {NativeS03Layers} from '../components/NativeSceneLayers';
import {frameSvg} from '../components/FrameSvgRenderer';
import {frames} from '../config/frames/scene03';
import {SCENE03_SVG} from '../config/scene03Svg';
import {cleanScene03Svg} from '../config/scene03Clean';
import type {Easy2BootScene03Props} from '../config/props';

const escapeXml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const withText = (svg: string, props: Easy2BootScene03Props): string => {
  // Kata kunci mengikuti VO. Pertahankan tag tspan dan layer independen.
  return svg
    .replace('BACKUP <tspan fill="#DF805F">DATA.</tspan>', `BACKUP <tspan fill="#DF805F">${escapeXml(props.titleBackup.replace(/^BACKUP\s*/i, ''))}</tspan>`)
    .replace('>EASY2BOOT.</text></g>', `>${escapeXml(props.titleOpen)}</text></g>`)
    .replace('PILIH <tspan fill="#DF805F">USB.</tspan>', `${escapeXml(props.titleSelect.split(' ')[0] ?? 'PILIH')} <tspan fill="#DF805F">${escapeXml(props.titleSelect.split(' ').slice(1).join(' ') || 'USB.')}</tspan>`)
    .replace('BUAT <tspan fill="#DF805F">USB.</tspan>', `BUAT <tspan fill="#DF805F">${escapeXml(props.titleCreate.replace(/^BUAT\s*/i,''))}</tspan>`)
    .replace('USB <tspan fill="#DF805F">SIAP.</tspan>', `USB <tspan fill="#DF805F">${escapeXml(props.titleDone.replace(/^USB\s*/i,''))}</tspan>`)
    .replaceAll('E: USB Flash Drive  —  32 GB', escapeXml(props.usbDriveLabel))
    .replace('EASY2BOOT — SATU USB, BANYAK PILIHAN', escapeXml(props.footerText));
};

/** Editable vector scene — individual objects are SVG groups (not raster video). */
/** Declarative frame renderer: text, SVG objects and animation use the same source data. */
export const Scene03Preparation:React.FC<Easy2BootScene03Props>=(props)=>{
 const frame=useCurrentFrame();
 const original=useMemo(()=>withText(cleanScene03Svg(SCENE03_SVG,props).replaceAll('#F7F7F5',props.backgroundColor),props),[props]);
 const markup=useMemo(()=>frameSvg(original,'S03',frame,frames,props.layerOverrides,props.fontFamily),[original,frame,props.layerOverrides,props.fontFamily]);
 return <AbsoluteFill style={{background:props.backgroundColor}}><NativeS03Layers markup={markup}/></AbsoluteFill>;
};
