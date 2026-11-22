import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, mkdtempSync, rmSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
const root=resolve('.');
const project=join(root,'projects/easy2boot-multiboot-reels');
const read=rel=>readFileSync(join(project,rel),'utf8');
test('Easy2Boot visual layers call sites are independent for S01/S02',()=>{
  for(const file of ['Scene01Problem.tsx','Scene02Solution.tsx']){
    const code=read('src/scenes/'+file);
    assert.match(code,/<Interactive\.G name="S0[12] — /);
    assert.doesNotMatch(code,/return <Interactive\.G name=\{`S0[12] — \$\{name\}`\}/);
  }
  assert.match(read('src/scenes/Scene02Solution.tsx'),/Card Break: semua kepingan/);
  assert.match(read('src/scenes/Scene02Solution.tsx'),/ISO: 3 kartu installer/);
});
test('Only frame-specific SFX track plays on full and segment compositions',()=>{
  for(const file of ['src/Video.tsx','src/SegmentVideo.tsx']){
    const code=read(file);
    assert.match(code,/<SceneSoundCues sceneIndex=/);
    assert.match(code,/showSfx=\{false\}/);
    assert.doesNotMatch(code,/scene0[1-6]_sfx\.wav/);
  }
  const cues=JSON.parse(read('production/sound-cues.json'));
  assert.ok(cues.cues.length>=25);
  assert.deepEqual([...new Set(cues.cues.map(x=>x.scene))],['S01','S02','S03','S04','S05','S06']);
  assert.ok(cues.cues.every(x=>existsSync(join(project,'public',x.file))));
});
test('Layer checker blocks reused Interactive wrapper and accepts distinct call sites',()=>{
  const temp=mkdtempSync(join(tmpdir(),'mg-layer-'));
  try{
    const scene=join(temp,'src');mkdirSync(scene);
    const file=join(scene,'Video.tsx');
    writeFileSync(file,"import {Interactive} from 'remotion'; const Layer=({children})=><Interactive.G>{children}</Interactive.G>; export const Video=()=> <><Layer>One</Layer><Layer>Two</Layer></>;");
    const cmd=join(root,'tools/check-layer-instances.mjs');
    const bad=spawnSync(process.execPath,[cmd,'--strict',temp],{encoding:'utf8'});
    assert.equal(bad.status,1,bad.stdout+' '+bad.stderr);
    writeFileSync(file,"import {Interactive} from 'remotion'; export const Video=()=> <><Interactive.G name='A'>One</Interactive.G><Interactive.G name='B'>Two</Interactive.G></>;");
    const good=spawnSync(process.execPath,[cmd,'--strict',temp],{encoding:'utf8'});
    assert.equal(good.status,0,good.stdout+' '+good.stderr);
  }finally{rmSync(temp,{recursive:true,force:true})}
});
