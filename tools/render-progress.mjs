/** Progress CLI Remotion: pisahkan pembacaan status dari UI terminal. */
export const removeAnsi=(text)=>text.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g,'').replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/g,'');
export const duration=(ms)=>{
  const s=Math.max(0,Math.round(ms/1000));
  return s>=3600?`${Math.floor(s/3600)}j ${Math.floor(s%3600/60)}m ${s%60}d`:`${Math.floor(s/60)}m ${s%60}d`;
};
export const progressBar=(percent,width=20)=>{
  const n=Math.max(0,Math.min(width,Math.round(percent/100*width)));
  return `[${'█'.repeat(n)}${'░'.repeat(width-n)}]`;
};
/** Hanya baca progres bila output CLI benar-benar melaporkannya. */
export function parseRenderUpdate(raw,defaultTotal){
  const line=removeAnsi(raw).trim();
  if(!line)return null;
  const stage=/encod(?:ing|ed)|mux(?:ing|ed)|stitch(?:ing|ed)/i.test(line)?'Encoding MP4':
    /render(?:ing|ed)|frames?\b/i.test(line)?'Render frame':
    /bundl(?:ing|ed)|webpack|compil(?:ing|ed)/i.test(line)?'Menyiapkan project':
    /browser|chrom(?:e|ium)/i.test(line)?'Menyiapkan browser':null;
  // Remotion melaporkan mis. "Rendered 200/2205" atau "Rendered 200 of 2205".
  const frame=/\b(?:render(?:ed|ing)?|frames?\s*(?:rendered|done)?)\D{0,28}(\d{1,8})\s*(?:\/|of|dari)\s*(\d{1,8})\b/i.exec(line) ||
    /\b(\d{1,8})\s*\/\s*(\d{1,8})\s*(?:frames?\b|rendered\b)/i.exec(line);
  if(frame){
    const done=Number(frame[1]);const total=Number(frame[2]);
    if(total>0&&done>=0&&done<=total&&total<10_000_000)return {stage:stage||'Render frame',done,total,percent:Math.min(100,done/total*100)};
  }
  const single=/\brendered\s+(\d{1,8})\s+frames?\b/i.exec(line);
  if(single&&defaultTotal>0){const done=Number(single[1]);if(done<=defaultTotal)return {stage:'Render frame',done,total:defaultTotal,percent:done/defaultTotal*100}}
  // Persentase hanya digunakan bila baris itu menyebut tahap yang jelas.
  const pct=/(?:\b|^)(\d{1,3}(?:\.\d+)?)\s*%/.exec(line);
  if(stage&&pct&&Number(pct[1])<=100)return {stage,percent:Number(pct[1]),done:null,total:defaultTotal};
  return stage?{stage}:null;
}
export function newProgressTracker(total){
  let first=null,last=null;
  return (done,now=Date.now())=>{
    if(!Number.isFinite(done)||done<=0)return null;
    if(!first||done<first.done){first={done,now};last={done,now};return null}
    if(done>last.done)last={done,now};
    const diff=last.done-first.done;const time=last.now-first.now;
    if(diff<10||time<1000)return null;
    const rate=diff/(time/1000);
    return rate>0?Math.max(0,(total-done)/rate)*1000:null;
  };
}
