import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {inspectNativeEditable} from '../tools/validate-addon.mjs';

const create=(jsx,targets=[{name:'S01 — Subtitle 01',source:'src/scenes/Scene01.tsx'}])=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-native-'));
 fs.mkdirSync(path.join(dir,'src/scenes'),{recursive:true});
 fs.mkdirSync(path.join(dir,'production'),{recursive:true});
 fs.writeFileSync(path.join(dir,'src/scenes/Scene01.tsx'),jsx);
 fs.writeFileSync(path.join(dir,'production/editable-blueprint.json'),JSON.stringify({
  schemaVersion:1,nativeTextTargets:targets,nativeVisualTargets:[],propsTextTargets:[],guiVerification:'unverified'
 }));
 return dir;
};
const good=`import {Interactive} from 'remotion';export const Scene01=()=> <Interactive.Text name="S01 — Subtitle 01" x={0} y={0} style={{translate:'0px 0px',opacity:1}}>Halo user!</Interactive.Text>;`;
function inspectCode(code,expectOk){
 const dir=create(code);
 try{
  const report=inspectNativeEditable(dir,{strict:true});
  assert.equal(report.errors.length===0,expectOk,JSON.stringify(report.errors));
  return report;
 } finally {fs.rmSync(dir,{recursive:true,force:true})}
}
test('native-editable-first accepts literal Interactive.Text + blueprint',()=>{
 const report=inspectCode(good,true);assert.equal(report.targets,1);
});
test('native-editable-first refuses SVG text disguised as editable',()=>{
 inspectCode(`import {Interactive} from 'remotion';export const Scene01=()=> <Interactive.G name="S01 — Subtitle 01" style={{opacity:1}}><text>Halo</text></Interactive.G>;`,false);
});
test('native-editable-first refuses computed child text',()=>{
 inspectCode(`import {Interactive} from 'remotion';export const Scene01=({text})=><Interactive.Text name="S01 — Subtitle 01" style={{opacity:1}}>{text}</Interactive.Text>;`,false);
});
test('native-editable-first refuses map creating merged instances',()=>{
 inspectCode(`import {Interactive} from 'remotion';export const Scene01=()=> <>{[1,2].map(i=><Interactive.Text name="S01 — Subtitle 01" style={{opacity:1}}>Halo</Interactive.Text>)}</>;`,false);
});
test('native-editable-first refuses style spreads and missing promised target',()=>{
 inspectCode(`import {Interactive} from 'remotion';const common={color:'red'};export const Scene01=()=> <Interactive.Text name="S01 — Subtitle 01" style={{...common}}>Halo</Interactive.Text>;`,false);
 const dir=create(good,[{name:'S01 — Subtitle Hilang',source:'src/scenes/Scene01.tsx'}]);
 try{assert.ok(inspectNativeEditable(dir,{strict:true}).errors.length>0);}finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('template declares its native captions, title and visual object',()=>{
 const root=path.resolve('.');
 const report=inspectNativeEditable(path.join(root,'templates/addon-starter'),{strict:true});
 assert.deepEqual(report.errors,[],JSON.stringify(report.errors));
 const blueprint=JSON.parse(fs.readFileSync(path.join(root,'templates/addon-starter/production/editable-blueprint.json'),'utf8'));
 assert.equal(report.targets,blueprint.nativeTextTargets.length+blueprint.nativeVisualTargets.length);assert.ok(report.targets>=15);
});
test('Easy2Boot final subtitles: each cue gets a unique JSX declaration; no map',()=>{
 const root=path.resolve('.');
 const file=fs.readFileSync(path.join(root,'projects/easy2boot-multiboot-reels/src/components/SubtitleTrack.tsx'),'utf8');
 const cueFile=fs.readFileSync(path.join(root,'projects/easy2boot-multiboot-reels/src/config/subtitles.ts'),'utf8');
 const names=[...file.matchAll(/<Interactive.Div name="(S0\d — Subtitle final \d+)"/g)].map(m=>m[1]);
 const cues=[...cueFile.matchAll(/\{from:\d+,to:\d+,text:/g)];
 assert.equal(names.length,cues.length);
 assert.equal(new Set(names).size,names.length);
 assert.doesNotMatch(file,/SUBTITLE_CUES\.map\(/);
 assert.match(file,/sceneIndex/);
});
test('Easy2Boot scene 02 & 05 draft captions no shared dynamic node',()=>{
 const dir=path.resolve('projects/easy2boot-multiboot-reels/src/scenes');
 const s2=fs.readFileSync(path.join(dir,'Scene02Solution.tsx'),'utf8');
 const s5=fs.readFileSync(path.join(dir,'Scene05Boot.tsx'),'utf8');
 assert.equal([...s2.matchAll(/<Interactive\.Text\s+name="S02 — Subtitle draft/g)].length,5);
 assert.equal([...s5.matchAll(/<Interactive\.Text\s+name="S05 — Subtitle VO/g)].length,5);
 assert.doesNotMatch(s5,/timings\.map\(/);
 for(const [name,src] of [["S02",s2],["S05",s5]]) {const nodes=[...src.matchAll(/<Interactive\.Text\s+name="(S0[25] — Subtitle [^"]+)"[\s\S]*?>([\s\S]*?)<\/Interactive\.Text>/g)];assert.ok(nodes.every(x=>x[2].trim()),name+" contains empty native subtitle(s); possible local edit, review ACC before restoring");}
});

test('strict add-on import gate rejects promised native captions if blueprint missing or computed',async()=>{
 const {validateAddon}=await import('../tools/validate-addon.mjs');
 const template=path.resolve('templates/addon-starter');
 const destination=fs.mkdtempSync(path.join(os.tmpdir(),'mg-addon-native-'));
 const app=path.join(destination,'test-native-video');
 try{
  fs.cpSync(template,app,{recursive:true});
  const mf=path.join(app,'motiongraphic-video.json');
  const value=JSON.parse(fs.readFileSync(mf,'utf8'));
  value.slug='test-native-video';value.id='TestNativeVideo';
  const assets=path.join(app,'src/components/SoundAssets.ts');fs.writeFileSync(assets,fs.readFileSync(assets,'utf8').replaceAll('videos/contoh-video-reels/','videos/test-native-video/'));
  fs.writeFileSync(mf,JSON.stringify(value,null,2));
  const good=validateAddon(app,{strict:true});
  assert.equal(good.ok,true,good.errors.join('\n'));
  fs.rmSync(path.join(app,'production/editable-blueprint.json'));
  const bad=validateAddon(app,{strict:true});
  assert.equal(bad.ok,false);
  assert.match(bad.errors.join('\n'),/editable-blueprint/);
 }finally{fs.rmSync(destination,{recursive:true,force:true})}
});

test('final subtitle mode suppresses S01/S02 draft captions and is present in segment preview',()=>{
 const root=path.resolve('projects/easy2boot-multiboot-reels/src');
 const read=p=>fs.readFileSync(path.join(root,p),'utf8');
 assert.match(read('Video.tsx'),/scene01ShowCaptions=\{sceneProps\.showSubtitles\?false:/);
 assert.match(read('SegmentVideo.tsx'),/<SubtitleTrack color=\{p\.subtitleColor\} sceneIndex=\{segmentIndex\}\/>/);
 for (const id of ['reactionCaption','solutionCaption','manyCaption']){
  assert.match(read('scenes/Scene02Solution.tsx'),new RegExp(`!p\\.showSubtitles[\\s\\S]{0,300}id="${id}"`));
 }
});


test('native-editable-first refuses a repeated custom Interactive caption wrapper',()=>{
 inspectCode(`import {Interactive} from 'remotion';
 const Caption=()=> <Interactive.Text name="S01 — Subtitle 01" style={{opacity:1}}>Hello</Interactive.Text>;
 export const Scene01=()=> <><Caption/><Caption/></>;`,false);
});
