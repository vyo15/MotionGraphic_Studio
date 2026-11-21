import React from 'react';
import {AbsoluteFill, Interactive, interpolate, useCurrentFrame} from 'remotion';

/** Edit literal title/UI/color/position in Studio. Animation keyframes stay inline. */
export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Interactive.Div name="S01 — Judul" style={{
        position: 'absolute', left: 110, top: 430, width: 860,
        color: '#202020', fontFamily: 'Arial, sans-serif', fontSize: 86,
        fontWeight: 700, textAlign: 'center',
        opacity: interpolate(frame, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        translate: interpolate(frame, [0, 18], ['0px 42px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      }}>JUDUL CONTOH</Interactive.Div>
      <Interactive.Div name="S01 — Kartu informasi" style={{
        position: 'absolute', left: 140, top: 760, width: 800, height: 420,
        backgroundColor: '#FFFFFF', borderColor: '#E7E7E5', borderStyle: 'solid',
        borderWidth: 2, borderRadius: 28,
        opacity: interpolate(frame, [16, 29], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        translate: interpolate(frame, [16, 31], ['0px 40px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      }}/>
      <Interactive.Div name="S01 — Isi kartu" style={{
        position: 'absolute', left: 185, top: 902, width: 710,
        color: '#202020', fontFamily: 'Arial, sans-serif', fontSize: 53,
        fontWeight: 600, textAlign: 'center',
        opacity: interpolate(frame, [25, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      }}>AKSI → HASIL</Interactive.Div>
    </AbsoluteFill>
  );
};
