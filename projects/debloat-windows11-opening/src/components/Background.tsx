import React from 'react';
import {AbsoluteFill, Interactive} from 'remotion';
import {DESIGN} from '../config/design';

export const Background: React.FC<{showGrid: boolean}> = ({showGrid}) => (
  <AbsoluteFill style={{background: DESIGN.bg}}>
    {showGrid ? <AbsoluteFill style={{
      opacity: 1, backgroundImage: `linear-gradient(to right, ${DESIGN.grid} 1px, transparent 1px), linear-gradient(to bottom, ${DESIGN.grid} 1px, transparent 1px)`,
      backgroundSize: '44px 44px',
    }}/> : null}
    <Interactive.Div name="S01 — Latar / Warna Halus" style={{
      position: 'absolute', left: 0, top: 0, width: 1080, height: 1920,
      translate: '0px 0px', scale: 1, rotate: '0deg', pointerEvents: 'none',
      background: 'radial-gradient(ellipse 780px 660px at 52% 44%, rgba(255,255,255,0.85), transparent 85%)',
    }}/>
  </AbsoluteFill>
);
