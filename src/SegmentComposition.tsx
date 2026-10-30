import React from 'react';
import {Sequence} from 'remotion';

/**
 * Satu sumber video: preview segmen memutar jendela frame asli dari video lengkap.
 * trimBefore mempertahankan useCurrentFrame() pada semua scene, kursor, audio, dll.
 * Mengedit JSX scene otomatis tercermin pada komposisi lengkap dan segmen.
 */
export const createSegmentComposition = <P extends Record<string, any>>(
  VideoComponent: React.ComponentType<P>,
  startFrame: number,
  durationInFrames: number,
): React.FC<P> => {
  const Segment: React.FC<P> = (props) => (
    <Sequence from={0} trimBefore={startFrame} durationInFrames={durationInFrames} name={`Segmen mulai frame ${startFrame}`}>
      <VideoComponent {...props}/>
    </Sequence>
  );
  Segment.displayName = `SceneSegment_${startFrame}`;
  return Segment;
};

/** Project add-on dengan src/SegmentVideo.tsx diekspor langsung.
 * Tidak ada Sequence trimBefore/Video lengkap sebagai pembungkus timeline scene.
 * Props per scene identik dengan Props video gabungan, ditambah index internal. */
export const createEditableSegmentComposition = <P extends Record<string,any>>(
 SegmentComponent: React.ComponentType<P & {segmentIndex:number}>,segmentIndex:number,
): React.FC<P> => {
 const Editable:React.FC<P>=(props)=><SegmentComponent {...props} segmentIndex={segmentIndex}/>;
 Editable.displayName=`EditableScene_${segmentIndex}`;
 return Editable;
};
