import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const master=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const handoffSource=path.join(master,'tools/export-concat-segments.mjs');
const mk=(root,file,content)=>{const p=path.join(root,file);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,content);};
const fakeCli=`import fs from 'node:fs';
import path from 'node:path';
const args=process.argv.slice(2);
if(args.includes('--frames=4-7')&&process.env.FAIL_SEGMENT==='ISI'){console.error('simulated render failure');process.exit(2);}
const out=args[3];fs.mkdirSync(path.dirname(out),{recursive:true});
const buf=Buffer.alloc(128);buf.writeUInt32BE(24,0);buf.write('ftyp',4,'ascii');buf.write('isom',8,'ascii');buf.write(args.find(x=>x.startsWith('--frames='))||'',24);
fs.writeFileSync(out,buf);
`;
test('handoff builds stable three-piece package, updates one clip without losing others, and rolls back on failed render',()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-handoff-'));
  try {
    mk(tmp,'tools/export-concat-segments.mjs',fs.readFileSync(handoffSource));
    mk(tmp,'src/index.ts','// stub');
    mk(tmp,'projects/demo-video/motiongraphic-video.json',JSON.stringify({id:'DemoVideo',slug:'demo-video',title:'Demo',fps:30,width:1080,height:1920,durationInFrames:12,defaultProps:{}}));
    mk(tmp,'projects/demo-video/concat-segments.json',JSON.stringify({hookEndFrame:4,ctaStartFrame:8}));
    mk(tmp,'projects/demo-video/public/audio/custom.wav',Buffer.from('test'));
    mk(tmp,'node_modules/@remotion/cli/remotion-cli.js',fakeCli);
    const run=(...args)=>spawnSync(process.execPath,[path.join(tmp,'tools/export-concat-segments.mjs'),'--project','demo-video','--no-sync',...args],{cwd:tmp,encoding:'utf8'});
    let r=run('--dry-run');assert.equal(r.status,0,r.stderr);assert.equal(fs.existsSync(path.join(tmp,'out')),false);
    r=run();assert.equal(r.status,0,r.stderr);
    const cur=path.join(tmp,'out/concat/demo-video/current');
    for(const part of ['01-HOOK.mp4','02-ISI.mp4','03-CTA.mp4']) assert.ok(fs.existsSync(path.join(cur,part)));
    let meta=JSON.parse(fs.readFileSync(path.join(cur,'concat-timeline.json'),'utf8'));
    assert.equal(meta.pieces.length,3);assert.equal(meta.includesSourceRemotionAudio,false);
    const before=fs.readFileSync(path.join(cur,'03-CTA.mp4'));
    mk(tmp,'out/concat/demo-video/current/BUKTI-LISENSI-PENGGUNA.csv','my-own-proof');
    r=run('--only','ISI');assert.equal(r.status,0,r.stderr);assert.deepEqual(fs.readFileSync(path.join(cur,'03-CTA.mp4')),before);
    assert.equal(fs.readFileSync(path.join(cur,'BUKTI-LISENSI-PENGGUNA.csv'),'utf8'),'my-own-proof');
    assert.equal(fs.readdirSync(path.join(tmp,'out/concat/demo-video/history')).length,1);
    r=run('--with-remotion-audio','--only','HOOK');assert.notEqual(r.status,0);assert.match(r.stderr,/berbeda/);
    const snapshot=fs.readFileSync(path.join(cur,'concat-timeline.json'));
    r=spawnSync(process.execPath,[path.join(tmp,'tools/export-concat-segments.mjs'),'--project','demo-video','--no-sync'],{cwd:tmp,encoding:'utf8',env:{...process.env,FAIL_SEGMENT:'ISI'}});
    assert.notEqual(r.status,0);assert.deepEqual(fs.readFileSync(path.join(cur,'concat-timeline.json')),snapshot);
    assert.ok(!fs.readdirSync(path.join(tmp,'out/concat/demo-video')).some(x=>x.startsWith('.staging-')));
  } finally {fs.rmSync(tmp,{recursive:true,force:true});}
});

test('IP Address handoff starts CTA at the actual EndScene frame',()=>{
  const config=JSON.parse(fs.readFileSync(path.join(master,'projects/ip-address/concat-segments.json'),'utf8'));
  const manifest=JSON.parse(fs.readFileSync(path.join(master,'projects/ip-address/motiongraphic-video.json'),'utf8'));
  assert.equal(config.hookEndFrame,manifest.segments[0].startFrame+manifest.segments[0].durationInFrames);
  assert.equal(config.ctaStartFrame,manifest.segments.at(-1).startFrame);
});
