import React from 'react';
import {Sequence} from 'remotion';
import {VoiceGuideOverlay, type VoiceGuideBeat} from './VoiceGuideOverlay';
export type VoiceGuideProps = {voiceGuide?: {status?: string;beats: VoiceGuideBeat[]}};
/** Separate VO Guide composition: native Remotion Props are editable and persist to narration.json via sync. */
export const createFullPreviewComposition = <P extends Record<string, any>>(
  VideoComponent: React.ComponentType<P>, durationInFrames: number,
  guideBeats?: ReadonlyArray<VoiceGuideBeat>,
): React.FC<P & VoiceGuideProps> => {
  const Full: React.FC<P & VoiceGuideProps> = ({voiceGuide,...props}) => <>
    <Sequence name="VIDEO LENGKAP — preview gabungan" from={0} durationInFrames={durationInFrames}>
      <VideoComponent {...(guideBeats?.length && 'showSubtitles' in props ? {...props, showSubtitles:false} as P : props as P)}/>
    </Sequence>
    {guideBeats ? <VoiceGuideOverlay beats={voiceGuide?.beats ?? guideBeats}/> : null}
  </>;
  Full.displayName = guideBeats ? 'VOGuidePreview' : 'FullPreview';
  return Full;
};
