import React from 'react';
import {staticFile} from 'remotion';
import {INK,CORAL,Folder,Disk} from './Windows';
export const ProjectIcon=({x,y,w,url=""}:{x:number;y:number;w:number;url?:string})=><image href={url||staticFile('videos/folder-jadi-drive/images/project-icon.png')} x={x-w/2} y={y-w*503/616/2} width={w} height={w*503/616}/>;
export const Clipboard=({path}:{path:string})=><g><rect x="90" y="1268" width="900" height="110" rx="14" fill="white" stroke={CORAL} strokeWidth="3"/><rect x="111" y="1293" width="36" height="52" rx="4" fill="#F3F3F0" stroke="#737B80" strokeWidth="3"/><rect x="120" y="1287" width="18" height="12" rx="3" fill="#DF805F"/><text x="166" y="1334" fontSize="34" fill={INK}>{path}</text></g>;
export const CenterText=({y,text,size=40,color=INK}:{y:number;text:string;size?:number;color?:string})=><text x="540" y={y} textAnchor="middle" fontWeight="600" fontSize={size} fill={color}>{text}</text>;
