import React from 'react';

// Source-editable camera poses, in the same 1080 × 1920 world as the native UI.
// First value is frame relative to the start of S06 (global frame 840).
// Match the approved motion prototype while retaining the existing action/SFX timing.
export const FOCUS_POSES = [
  [0, 540, 840, 1],
  [75, 540, 840, 1],
  [112, 345, 967, 1.7],
  [238, 345, 967, 1.7],
  [282, 345, 984, 1.7],
  [287, 345, 984, 1.7],
  [306, 540, 1034, 1.7],
  [311, 540, 1034, 1.7],
  [334, 535, 857, 1.27],
  [359, 535, 857, 1.27],
  [487, 535, 857, 1.27],
  [509, 540, 840, 1],
  [524, 540, 840, 1],
  [555, 770, 1045, 1.65],
  [567, 770, 1045, 1.65],
  [590, 540, 840, 1],
  [660, 540, 840, 1],
] as const;

export const focusPose = (frame: number) => {
  const first = FOCUS_POSES[0];
  if (frame <= first[0]) return {cx:first[1],cy:first[2],zoom:first[3]};
  for (let i=1; i<FOCUS_POSES.length; i++) {
    const a=FOCUS_POSES[i-1], b=FOCUS_POSES[i];
    if (frame<=b[0]) {
      const t=(frame-a[0])/(b[0]-a[0]);
      const ease=t*t*(3-2*t);
      return {cx:a[1]+(b[1]-a[1])*ease,cy:a[2]+(b[2]-a[2])*ease,zoom:a[3]+(b[3]-a[3])*ease};
    }
  }
  const last=FOCUS_POSES[FOCUS_POSES.length-1];
  return {cx:last[1],cy:last[2],zoom:last[3]};
};

// The camera is a technical viewport, not a flattened image or transition mask.
// Children retain their unique Interactive callsites and original world coordinates.
// Background, label and subtitles remain in screen space.
export const FocusCamera: React.FC<React.PropsWithChildren<{frame:number}>> = ({frame,children}) => {
  const {cx,cy,zoom}=focusPose(frame);
  return <div style={{position:'absolute',left:50,top:390,width:980,height:900,overflow:'hidden'}}>
    <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,transformOrigin:'0 0',transform:`translate(${490-cx*zoom}px, ${450-cy*zoom}px) scale(${zoom})`}}>
      {children}
    </div>
  </div>;
};
