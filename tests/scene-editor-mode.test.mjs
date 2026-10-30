import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const root=read('src/Root.tsx');

test('all existing 12 segments use direct scene editor rather than whole-video trim',()=>{
 assert.equal((root.match(/createEditableSegmentComposition\(/g)||[]).length,12);
 assert.equal((root.match(/createFullPreviewComposition\(/g)||[]).length,2);
 assert.doesNotMatch(root,/= createSegmentComposition\(/);
 assert.match(read('projects/windows-hacks-5-shortcut-lengkap/src/SegmentVideo.tsx'),/<SceneContent segmentKey=\{key\}/);
 assert.match(read('projects/ip-address/src/SegmentVideo.tsx'),/<Scene\/>/);
 assert.doesNotMatch(read('projects/ip-address/src/SegmentVideo.tsx'),/<Sequence/);
 assert.doesNotMatch(read('projects/windows-hacks-5-shortcut-lengkap/src/SegmentVideo.tsx'),/<Sequence/);
});

test('segment source uses same renderer as full video, not a screenshot or flattened video',()=>{
 const w=read('projects/windows-hacks-5-shortcut-lengkap/src/Video.tsx');
 const v=read('projects/windows-hacks-5-shortcut-lengkap/src/SegmentVideo.tsx');
 for(const key of ['HOOK','CTRL_SHIFT_T','CTRL_SHIFT_ESC','WIN_SHIFT_S','WIN_E','CTRL_SHIFT_N','CTA']){
  assert.ok(w.includes(`segmentKey="${key}"`));
 }
 assert.match(v,/import \{SceneContent,SCENE_KEYS\}/);
 assert.match(read('projects/ip-address/src/SegmentVideo.tsx'),/from '\.\/Video'/);
 assert.match(read('src/FullPreviewComposition.tsx'),/VIDEO LENGKAP — preview gabungan/);
});

test('future add-on with SegmentVideo.tsx is automatically registered as direct scene editor',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'studio-scene-mode-'));
 try{
  for(const dir of ['tools','projects/demo-baru/src/config','src','library'])fs.mkdirSync(path.join(temp,dir),{recursive:true});
  for(const name of ['sync-projects.mjs','studio-props-bridge.mjs','register-scene-segments.mjs','production-scope.mjs'])fs.copyFileSync(path.join(ROOT,'tools',name),path.join(temp,'tools',name));
  fs.writeFileSync(path.join(temp,'package.json'),JSON.stringify({dependencies:{react:'19.0.0',remotion:'4.0.538'}}));
  fs.writeFileSync(path.join(temp,'library/catalog.json'),JSON.stringify({schemaVersion:1,videos:[]}));
  const proj=path.join(temp,'projects/demo-baru');
  fs.writeFileSync(path.join(proj,'motiongraphic-video.json'),JSON.stringify({id:'DemoBaru',slug:'demo-baru',title:'Demo Baru',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90,defaultProps:{text:'halo'}}));
  fs.writeFileSync(path.join(proj,'src/Video.tsx'),"export const Video=({text})=>text;");
  fs.writeFileSync(path.join(proj,'src/SegmentVideo.tsx'),"export const SegmentVideo=({segmentIndex,text})=>String(segmentIndex)+text;");
  fs.writeFileSync(path.join(proj,'src/config/segments.json'),JSON.stringify([{title:'Hook',startFrame:0,durationInFrames:30},{title:'Demo',startFrame:30,durationInFrames:60}]));
  const result=spawnSync(process.execPath,[path.join(temp,'tools/sync-projects.mjs')],{cwd:temp,encoding:'utf8'});
  assert.equal(result.status,0,result.stderr+'\n'+result.stdout);
  const r=fs.readFileSync(path.join(temp,'src/Root.tsx'),'utf8');
  assert.match(r,/createFullPreviewComposition\(FolderProject_demo_baru, 90\)/);
  assert.match(r,/createEditableSegmentComposition\(FolderProject_demo_baru_editable, 0\)/);
  assert.match(r,/createEditableSegmentComposition\(FolderProject_demo_baru_editable, 1\)/);
  assert.doesNotMatch(r,/= createSegmentComposition\(/);
  const m=JSON.parse(fs.readFileSync(path.join(proj,'motiongraphic-video.json'),'utf8'));
  assert.equal(m.segments.length,2);
  assert.deepEqual(m.defaultProps,{text:'halo'});
 }finally{fs.rmSync(temp,{recursive:true,force:true})}
});

test('legacy add-on without SegmentVideo stays previewable, not falsely marked editable',()=>{
 assert.match(read('tools/sync-projects.mjs'),/createSegmentComposition\(\$\{alias\}/);
 assert.match(read('tools/sync-projects.mjs'),/belum layer langsung/);
});
