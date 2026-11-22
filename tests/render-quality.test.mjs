import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT} from '../tools/menu-helper.mjs';
import {RENDER_PROFILES,encoderFlags,capcutOverrides,resolveRenderProfile} from '../tools/render-profiles.mjs';

test('High quality CapCut uses H264 CRF 16, PNG frames, BT709, 48k AAC and no contradictory bitrate',()=>{
 const flags=encoderFlags('capcut');
 for(const flag of ['--codec=h264','--crf=16','--x264-preset=slow','--image-format=png','--pixel-format=yuv420p','--color-space=bt709','--audio-codec=aac','--audio-bitrate=256k','--sample-rate=48000','--hardware-acceleration=disable'])assert.ok(flags.includes(flag),flag);
 assert.ok(!flags.some(flag=>flag.startsWith('--video-bitrate=')));
 assert.deepEqual(encoderFlags('capcut'),encoderFlags('high'));
 assert.ok(encoderFlags('preview').includes('--crf=23'));
 assert.equal(resolveRenderProfile('1'),'capcut');
 assert.equal(resolveRenderProfile('2'),'high');
 assert.equal(resolveRenderProfile('3'),'preview');
 assert.throws(()=>resolveRenderProfile('4'));
 assert.ok(RENDER_PROFILES.capcut.label.includes('SFX'));
});

test('CapCut temporary props keep every edit and SFX, hide VO, music, guide; never mutate catalog',()=>{
 const source={text:'LOCKED',layerOverrides:{a:{x:22}},showSfx:false,showVoiceOver:true,showMusic:true,showOnScreenCaptions:true,showSubtitles:false,scene01ShowCaptions:true,scene03ShowTextVO:true,scene04ShowTextVO:true};
 const snapshot=structuredClone(source);
 const {props}=capcutOverrides(source);
 assert.deepEqual(source,snapshot);
 assert.equal(props.showSfx,true);
 assert.equal(props.showVoiceOver,false);
 assert.equal(props.showMusic,false);
 assert.equal(props.showOnScreenCaptions,false);
 assert.equal(props.showSubtitles,true); // known Easy2Boot guide suppression
 assert.equal(props.scene01ShowCaptions,false);
 assert.equal(props.scene03ShowTextVO,false);
 assert.equal(props.scene04ShowTextVO,false);
 assert.deepEqual(props.layerOverrides,source.layerOverrides);
 assert.equal(props.text,'LOCKED');
 assert.equal(capcutOverrides({showCaptions:true,showSubtitles:true}).props.showSubtitles,false);
 assert.throws(()=>capcutOverrides(null));
});

test('Existing menu route offers CapCut HQ while retaining all 4 render modes',()=>{
 const source=fs.readFileSync(path.join(ROOT,'tools/studio-menu.mjs'),'utf8');
 assert.match(source,/renderProfileChoices\(\)/);
 assert.match(source,/--profile',profile/);
 assert.match(source,/renderChoices/);
 assert.match(source,/runScript\('render-menu\.mjs'/);
});

test('CLI CapCut mock end-to-end passes temporary props+encoder flags and cleans temp files',()=>{
 const home=fs.mkdtempSync(path.join(os.tmpdir(),'mg-quality-test-'));
 try{
  const root=path.join(home,'MotionGraphic-Studio');
  fs.mkdirSync(path.join(root,'tools'),{recursive:true});
  fs.mkdirSync(path.join(root,'library'),{recursive:true});
  const cli=path.join(root,'node_modules/@remotion/cli/remotion-cli.js');
  fs.mkdirSync(path.dirname(cli),{recursive:true});
  for(const name of ['render-menu.mjs','render-profiles.mjs','menu-helper.mjs','render-plan.mjs','render-progress.mjs','export-paths.mjs']){
   fs.copyFileSync(path.join(ROOT,'tools',name),path.join(root,'tools',name));
  }
  const demo={id:'DemoTest',title:'Demo Test',slug:'demo-test',durationInFrames:30,fps:30,
   defaultProps:{showVoiceOver:true,showMusic:false,showSfx:true,showOnScreenCaptions:false,showSubtitles:false,scene03ShowTextVO:true,layerOverrides:{obj:{x:1}}},segments:[]};
  fs.writeFileSync(path.join(root,'library/catalog.json'),JSON.stringify({videos:[demo]}));
  const artifact=path.join(home,'received.json');
  fs.writeFileSync(cli,`const fs=require('node:fs');const args=process.argv.slice(2);const propArg=args.find(x=>x.startsWith('--props='));
fs.writeFileSync(${JSON.stringify(artifact)},JSON.stringify({args,props:propArg?JSON.parse(fs.readFileSync(propArg.slice(8),'utf8')):null,propsPath:propArg?.slice(8)}));
const output=process.argv[5];fs.mkdirSync(require('node:path').dirname(output),{recursive:true});fs.writeFileSync(output,Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.from('TESTVIDEO')]));console.log('Rendered 30/30');`);
  const result=spawnSync(process.execPath,[path.join(root,'tools/render-menu.mjs'),'DemoTest','--profile','capcut'],{cwd:root,encoding:'utf8',timeout:18000});
  assert.equal(result.status,0,result.stderr+'\n'+result.stdout);
  const received=JSON.parse(fs.readFileSync(artifact,'utf8'));
  assert.ok(received.args.includes('--crf=16'));
  assert.ok(received.args.includes('--image-format=png'));
  assert.equal(received.props.showVoiceOver,false);
  assert.equal(received.props.showSfx,true);
  assert.equal(received.props.showSubtitles,true);
  assert.equal(received.props.scene03ShowTextVO,false);
  assert.deepEqual(received.props.layerOverrides,{obj:{x:1}});
  assert.equal(fs.existsSync(received.propsPath),false,'temporary props must be deleted after render');
  const mp4=path.join(home,'MotionGraphic-Studio-Backups/MP4/demo-test/full');
  assert.equal(fs.readdirSync(mp4).length,1);
 }finally{fs.rmSync(home,{recursive:true,force:true})}
});
