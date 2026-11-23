import React from 'react';
import {AbsoluteFill, Interactive, interpolate, useCurrentFrame} from 'remotion';

/** CLEAN FOCUS starter: one focal point per beat; no decorative bars or persistent headers.
 * Replace every placeholder with the topic-specific real object; do not copy this mock card to final videos.
 * Editable names and literal inline styles are preserved for native Studio editing.
 */
export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Interactive.Div name="S01 — Judul" style={{
        position: 'absolute', left: 110, top: 610, width: 860,
        color: '#202020', fontFamily: 'Arial, sans-serif', fontSize: 86,
        fontWeight: 700, textAlign: 'center',
        opacity: interpolate(frame, [0, 12, 47, 60], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        translate: interpolate(frame, [0, 18], ['0px 42px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      }}>Satu pertanyaan penting?</Interactive.Div>
      <Interactive.Div name="S01 — Kartu informasi" style={{
        position: 'absolute', left: 100, top: 550, width: 880, height: 740,
        backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderStyle: 'solid',
        borderWidth: 2, borderRadius: 28,
        opacity: interpolate(frame, [66, 82], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        translate: interpolate(frame, [66, 86], ['0px 32px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      }}/>
      {/* One direct Studio text node per editable caption cue. Never loop a shared Interactive wrapper. */}
      {frame>=128 && frame<218 ? <Interactive.Div name="S01 — Subtitle 01" style={{
        position:'absolute',left:110,top:1400,width:860,
        fontFamily:'Arial, sans-serif',fontSize:42,fontWeight:700,
        color:'#202020',textAlign:'center',
        translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
      }}>Hasilnya langsung terlihat.</Interactive.Div> : null}
      <Interactive.Div name="S01 — Isi kartu" style={{
        position: 'absolute', left: 185, top: 885, width: 710,
        color: '#202020', fontFamily: 'Arial, sans-serif', fontSize: 53,
        fontWeight: 600, textAlign: 'center',
        opacity: interpolate(frame, [86, 104], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      }}>AKSI → HASIL</Interactive.Div>
    </AbsoluteFill>
  );
};
