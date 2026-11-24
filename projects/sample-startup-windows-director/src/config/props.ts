export type VideoProps = {
  showVoGuide?: boolean;
  showSubtitles?: boolean;
  showDraftCaptions?: boolean;
  backgroundColor?: string;
};
// VO Guide is ON in Studio review; CapCut HQ temporarily disables it.
export const DEFAULT_PROPS:Required<VideoProps>={
  showVoGuide:true,
  showSubtitles:true,
  showDraftCaptions:false,
  backgroundColor:'#F7F7F5'
};
