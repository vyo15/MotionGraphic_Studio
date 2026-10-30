import type {AudioTrack} from './AudioTimeline';
/** Potong jalur audio menurut posisi global, pertahankan offset trim + volume. */
export const clipAudioTracks=(tracks:AudioTrack[]|undefined,start:number,duration:number):AudioTrack[]=>
 (tracks??[]).flatMap(track=>{
  const first=Math.max(track.startFrame,start);
  const last=Math.min(track.startFrame+track.durationFrames,start+duration);
  if(last<=first)return [];
  return [{...track,startFrame:first-start,trimStartFrames:track.trimStartFrames+first-track.startFrame,durationFrames:last-first}];
 });
