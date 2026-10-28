import type React from 'react';
import {Interactive, type InteractivitySchema} from 'remotion';
import {House, Laptop, Router, Parcel} from './Visuals';

/**
 * Tiap ilustrasi adalah SATU layer draggable, sedangkan warna sub-bagian
 * terbuka sebagai kontrol yang terpisah di panel kanan Remotion Studio.
 * Ukuran dan posisi awal disetel inline pada instance, bukan di file ini.
 */
const houseSchema = {
  wallColor: {type: 'color', default: '#E7F7FF', description: 'Rumah • warna dinding'},
  roofColor: {type: 'color', default: '#31E7E7', description: 'Rumah • warna atap'},
  accentColor: {type: 'color', default: '#66EAF2', description: 'Rumah • aksen jendela'},
} as const satisfies InteractivitySchema;

const HouseInner: React.FC<{
  wallColor?: string;roofColor?:string;accentColor?:string;style?:React.CSSProperties;
}> = ({wallColor,roofColor,accentColor,style}) => (
  <div style={{width:280,height:251,...style}}><House wallColor={wallColor} roofColor={roofColor} accentColor={accentColor}/></div>
);
export const EditableHouse = Interactive.create({Component:HouseInner, componentName:'Ilustrasi Rumah',schema:houseSchema});

const laptopSchema = {
  screenColor: {type: 'color', default: '#0A2344', description:'Laptop • layar'},
  trimColor: {type: 'color', default: '#8DE7EF', description:'Laptop • bingkai'},
  accentColor: {type: 'color', default: '#19CEE5', description:'Laptop • globe'},
} as const satisfies InteractivitySchema;
const LaptopInner: React.FC<{
  screenColor?:string;trimColor?:string;accentColor?:string;style?:React.CSSProperties;
}> = ({screenColor,trimColor,accentColor,style}) => (
  <div style={{width:280,height:271,...style}}><Laptop screenColor={screenColor} trimColor={trimColor} accentColor={accentColor}/></div>
);
export const EditableLaptop = Interactive.create({Component:LaptopInner,componentName:'Ilustrasi Laptop',schema:laptopSchema});

const routerSchema = {
  bodyColor: {type:'color',default:'#2E527A',description:'Router • warna bodi'},
  trimColor: {type:'color',default:'#37DBF2',description:'Router • garis pinggir'},
  signalColor: {type:'color',default:'#F4D66C',description:'Router • sinyal Wi-Fi'},
} as const satisfies InteractivitySchema;
const RouterInner:React.FC<{
  bodyColor?:string;trimColor?:string;signalColor?:string;style?:React.CSSProperties;
}> = ({bodyColor,trimColor,signalColor,style}) => (
  <div style={{width:280,height:280,...style}}><Router bodyColor={bodyColor} trimColor={trimColor} signalColor={signalColor}/></div>
);
export const EditableRouter = Interactive.create({Component:RouterInner,componentName:'Ilustrasi Router',schema:routerSchema});

const parcelSchema = {
  boxColor:{type:'color',default:'#FCD26C',description:'Paket • bagian atas'},
  sideColor:{type:'color',default:'#FAAF4E',description:'Paket • bagian samping'},
  tapeColor:{type:'color',default:'#FFF0B4',description:'Paket • lakban'},
} as const satisfies InteractivitySchema;
const ParcelInner:React.FC<{
  boxColor?:string;sideColor?:string;tapeColor?:string;style?:React.CSSProperties;
}> = ({boxColor,sideColor,tapeColor,style}) => (
  <div style={{width:110,height:115,...style}}><Parcel boxColor={boxColor} sideColor={sideColor} tapeColor={tapeColor}/></div>
);
export const EditableParcel = Interactive.create({Component:ParcelInner,componentName:'Ilustrasi Paket',schema:parcelSchema});
