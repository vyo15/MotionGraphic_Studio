// Local OFL fonts, locked per project. No network at render.
import React,{useEffect,useState} from 'react';
import {staticFile,delayRender,continueRender,cancelRender} from 'remotion';
const sources=[
 {family:'MG Poppins',weight:'400',url:staticFile('videos/sharing-printer-lan/fonts/poppins/Poppins-Regular.ttf')},
 {family:'MG Poppins',weight:'500',url:staticFile('videos/sharing-printer-lan/fonts/poppins/Poppins-Medium.ttf')},
 {family:'MG Poppins',weight:'600',url:staticFile('videos/sharing-printer-lan/fonts/poppins/Poppins-SemiBold.ttf')},
 {family:'MG Poppins',weight:'700',url:staticFile('videos/sharing-printer-lan/fonts/poppins/Poppins-Bold.ttf')},
 {family:'MG Poppins',weight:'800',url:staticFile('videos/sharing-printer-lan/fonts/poppins/Poppins-ExtraBold.ttf')},
 {family:'MG Poppins',weight:'900',url:staticFile('videos/sharing-printer-lan/fonts/poppins/Poppins-Black.ttf')},
 {family:'MG Inter',weight:'100 900',url:staticFile('videos/sharing-printer-lan/fonts/inter/Inter-Variable.ttf')},
 {family:'MG Manrope',weight:'200 800',url:staticFile('videos/sharing-printer-lan/fonts/manrope/Manrope-Variable.ttf')},
];
let pending:Promise<void>|undefined;
const load=()=>pending??=(Promise.all(sources.map(async s=>{const face=new FontFace(s.family,"url('"+s.url+"')",{weight:s.weight,style:'normal'});document.fonts.add(await face.load());})).then(()=>undefined));
export const LocalFonts:React.FC=()=>{const [handle]=useState(()=>delayRender('Loading local OFL fonts'));useEffect(()=>{load().then(()=>continueRender(handle)).catch(err=>cancelRender(err));},[handle]);return null;};
