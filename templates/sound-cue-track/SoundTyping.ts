/** Pure deterministic scheduler. One tap per frame showing newly visible characters.
 * No timer, side effects or scene audio. JS string length/slice matches the existing visuals.
 * Rate, offsets and round are opt-in reveal modes, not a generic typing simulation.
 */
export type TypingRule = {prop:string; mode:'rate'|'offsets'|'round'; originFrame:number; localStart:number; localEnd:number; startSeconds?:number; charsPerSecond?:number; offsets?:number[]};
export function visibleCount(rule:TypingRule,text:string,frame:number,fps:number):number {
  const length=text.length;
  if(frame<rule.localStart) return 0;
  if(rule.mode==='rate') return Math.min(length,Math.max(0,Math.floor((frame/fps-(rule.startSeconds??0))*(rule.charsPerSecond??0))));
  if(rule.mode==='offsets') {const offsets=rule.offsets??[]; return offsets.length?Math.floor(length*offsets.filter(n=>frame>=rule.localStart+n).length/offsets.length):0;}
  return Math.round(length*Math.min(1,Math.max(0,(frame-rule.localStart)/Math.max(1,rule.localEnd-rule.localStart))));
}
export function typingFrames(rule:TypingRule,text:string,fps:number):number[] {
  const result:number[]=[];
  for(let f=rule.localStart;f<=rule.localEnd;f++) if(visibleCount(rule,text,f,fps)>visibleCount(rule,text,f-1,fps)) result.push(rule.originFrame+f);
  return result;
}
