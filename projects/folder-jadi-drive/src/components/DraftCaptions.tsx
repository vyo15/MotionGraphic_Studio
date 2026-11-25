import React from 'react';
import {Interactive} from 'remotion';
import narration from '../config/narration.json';
// Text literal per line: independent source-edit targets; timing from VO JSON.
// Swiss typography at frame 348–413 remains the sole text track for that beat.
export const DraftCaptions=({frame}:{frame:number})=>{
 const active=(bi:number,ci:number)=>{const b=narration.beats[bi];const c=b?.captionCuts?.[ci];if(!b||!c)return false;return frame>=(ci?b.captionCuts[ci-1].endFrame:b.startFrame)&&frame<c.endFrame;};
 return <g id="native-draft-captions">
  {active(0,0)?<Interactive.Text name="S01 Subtitle 01.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Punya folder kerjaan</Interactive.Text>:null}
  {active(0,0)?<Interactive.Text name="S01 Subtitle 01.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>atau project</Interactive.Text>:null}
  {active(1,0)?<Interactive.Text name="S01 Subtitle 02.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>yang hampir setiap hari</Interactive.Text>:null}
  {active(1,0)?<Interactive.Text name="S01 Subtitle 02.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>kamu buka?</Interactive.Text>:null}
  {active(2,0)?<Interactive.Text name="S01 Subtitle 03.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Tapi, pernah kepikiran</Interactive.Text>:null}
  {active(2,0)?<Interactive.Text name="S01 Subtitle 03.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>nggak sih,</Interactive.Text>:null}
  {active(3,0)?<Interactive.Text name="S01 Subtitle 04.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>kalau folder itu bisa</Interactive.Text>:null}
  {active(3,0)?<Interactive.Text name="S01 Subtitle 04.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>dijadiin drive sendiri,</Interactive.Text>:null}
  {active(4,0)?<Interactive.Text name="S01 Subtitle 05.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>kayak drive C atau D?</Interactive.Text>:null}
  {active(6,0)?<Interactive.Text name="S02 Subtitle 07.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Pertama, buka folder yang</Interactive.Text>:null}
  {active(6,0)?<Interactive.Text name="S02 Subtitle 07.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>mau kamu jadiin drive,</Interactive.Text>:null}
  {active(7,0)?<Interactive.Text name="S02 Subtitle 08.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>terus copy alamat foldernya.</Interactive.Text>:null}
  {active(8,0)?<Interactive.Text name="S03 Subtitle 09.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Setelah itu, tekan Windows R,</Interactive.Text>:null}
  {active(9,0)?<Interactive.Text name="S03 Subtitle 10.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>ketik CMD, lalu Enter.</Interactive.Text>:null}
  {active(10,0)?<Interactive.Text name="S04 Subtitle 11.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Ketik SUBST,</Interactive.Text>:null}
  {active(11,0)?<Interactive.Text name="S04 Subtitle 12.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>kasih huruf drive yang</Interactive.Text>:null}
  {active(11,0)?<Interactive.Text name="S04 Subtitle 12.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>belum dipakai,</Interactive.Text>:null}
  {active(12,0)?<Interactive.Text name="S04 Subtitle 13.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>misalnya Z titik dua.</Interactive.Text>:null}
  {active(13,0)?<Interactive.Text name="S04 Subtitle 14.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Terus, paste alamat folder tadi</Interactive.Text>:null}
  {active(14,0)?<Interactive.Text name="S04 Subtitle 15.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>di dalam tanda kutip,</Interactive.Text>:null}
  {active(15,0)?<Interactive.Text name="S04 Subtitle 16.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>lalu Enter.</Interactive.Text>:null}
  {active(16,0)?<Interactive.Text name="S05 Subtitle 17.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Sekarang, coba buka This PC.</Interactive.Text>:null}
  {active(17,0)?<Interactive.Text name="S05 Subtitle 18.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Nah, folder tadi udah muncul</Interactive.Text>:null}
  {active(17,0)?<Interactive.Text name="S05 Subtitle 18.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>sebagai drive Z.</Interactive.Text>:null}
  {active(18,0)?<Interactive.Text name="S05 Subtitle 19.1.1" x={0} y={-25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Jadi, kamu nggak perlu masuk</Interactive.Text>:null}
  {active(18,0)?<Interactive.Text name="S05 Subtitle 19.1.2" x={0} y={25.62} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>ke banyak folder lagi.</Interactive.Text>:null}
  {active(19,0)?<Interactive.Text name="S05 Subtitle 20.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Oh iya, drive ini bakal hilang</Interactive.Text>:null}
  {active(20,0)?<Interactive.Text name="S05 Subtitle 21.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>kalau komputer di-restart,</Interactive.Text>:null}
  {active(21,0)?<Interactive.Text name="S05 Subtitle 22.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>tapi data aslinya tetap aman.</Interactive.Text>:null}
  {active(22,0)?<Interactive.Text name="S05 Subtitle 23.1.1" x={0} y={0} textAnchor="middle" style={{fontSize:42,translate:"0px 0px",scale:1,rotate:"0deg",opacity:1}}>Gimana? Lebih praktis, kan?</Interactive.Text>:null}
 </g>;
};
