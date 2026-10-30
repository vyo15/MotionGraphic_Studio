import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {ROOT} from '../tools/menu-helper.mjs';
import {parseCompositions,captureStudioProps,saveGeneratedState} from '../tools/studio-props-bridge.mjs';
const read=f=>fs.readFileSync(f,'utf8');
const source=read(path.join(ROOT,'src','Root.tsx'));
const mfName='motiongraphic-video.json';
function fixture(){
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'remotion-props-test-'));
 fs.mkdirSync(path.join(tmp,'src'),{recursive:true});
 fs.mkdirSync(path.join(tmp,'library'),{recursive:true});
 const entries=[];
 for(const slug of ['ip-address','windows-hacks-5-shortcut-lengkap']){
  const src=path.join(ROOT,'projects',slug,mfName),dst=path.join(tmp,'projects',slug,mfName);
  fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);
  const m=JSON.parse(read(dst));entries.push({id:m.id,ownerId:m.id,defaultProps:m.defaultProps});
  for(const seg of m.segments||[])entries.push({id:seg.id,ownerId:m.id,defaultProps:m.defaultProps});
 }
 fs.writeFileSync(path.join(tmp,'src','Root.tsx'),source);
 saveGeneratedState(tmp,source,entries);
 return tmp;
}
test('only one native Studio is started; no separate editor routes remain',()=>{
 const start=read(path.join(ROOT,'tools','start-studio.mjs'));
 assert.match(start,/spawn\(cli/);
 assert.match(start,/--port/);
 assert.doesNotMatch(start,/import.*easy-editor-server/);
 for(const p of ['tools/studio-hub-server.mjs','tools/easy-editor-server.mjs','tools/universal-visual-editor.mjs','projects/windows-hacks-5-shortcut-lengkap/BUKA-EDITOR-KURSOR.bat']){
  assert.equal(fs.existsSync(path.join(ROOT,p)),false,p);
 }
 const registered=[...parseCompositions(source).props.keys()];
 assert.equal(registered.length,14);
 assert.ok(registered.includes('IPAddressReels'));
 assert.ok(registered.includes('WindowsHacks5ShortcutLengkap'));
 assert.ok(registered.includes('WinHacks-01-CtrlShiftT'));
 assert.match(source,/<Folder name="Belajar-IP-Address">/);
 assert.match(source,/<Folder name="Windows-Hacks-5-Shortcut">/);
});
test('native Remotion Save Props is safely promoted to folder-first manifest',()=>{
 const tmp=fixture();try{
  const src=path.join(tmp,'src','Root.tsx');
  assert.match(read(src),/"backgroundColor":"#071429"/);
  fs.writeFileSync(src,read(src).replace('"backgroundColor":"#071429"','"backgroundColor":"#ABCDEF"'));
  assert.equal(captureStudioProps(tmp),1);
  const m=JSON.parse(read(path.join(tmp,'projects','ip-address',mfName)));
  assert.equal(m.defaultProps.backgroundColor,'#ABCDEF');
  const b=path.join(tmp,'library','backups','studio-props');
  assert.equal(fs.readdirSync(b).length,1);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
test('source/manifest conflicts stop sync and do not overwrite user data',()=>{
 const tmp=fixture();try{
  const src=path.join(tmp,'src','Root.tsx');
  fs.writeFileSync(src,read(src).replace('"backgroundColor":"#071429"','"backgroundColor":"#ABCDEF"'));
  const mf=path.join(tmp,'projects','ip-address',mfName),m=JSON.parse(read(mf));
  m.defaultProps.backgroundColor='#123456';fs.writeFileSync(mf,JSON.stringify(m));
  assert.throws(()=>captureStudioProps(tmp),/sama-sama diubah/);
  assert.equal(JSON.parse(read(mf)).defaultProps.backgroundColor,'#123456');
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
test('non-props source modifications are protected from root regeneration',()=>{
 const tmp=fixture();try{
  const f=path.join(tmp,'src','Root.tsx');fs.writeFileSync(f,read(f).replace('<Folder name="Videos">','<Folder name="Changed">'));
  assert.throws(()=>captureStudioProps(tmp),/berubah selain Props/);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});

test('segment props change is promoted to master manifest (without touching other videos)',()=>{
 const tmp=fixture();try{
  const src=path.join(tmp,'src','Root.tsx');
  const before=read(src);
  const id='WinHacks-01-CtrlShiftT';
  const line=before.split('\n').find(l=>l.includes(`id="${id}"`));
  assert.ok(line);
  const replacement=line.replace('"showTimingGuide":false','"showTimingGuide":true');
  assert.notEqual(replacement,line);
  fs.writeFileSync(src,before.replace(line,replacement));
  assert.equal(captureStudioProps(tmp),1);
  const m=JSON.parse(read(path.join(tmp,'projects','windows-hacks-5-shortcut-lengkap',mfName)));
  assert.equal(m.defaultProps.showTimingGuide,true);
  const ip=JSON.parse(read(path.join(tmp,'projects','ip-address',mfName)));
  assert.equal(ip.defaultProps.backgroundColor,'#071429');
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
test('non-overlapping changes across two segments merge safely',()=>{
 const tmp=fixture();try{
  const src=path.join(tmp,'src','Root.tsx');
  const lines=read(src).split('\n');
  const a=lines.findIndex(x=>x.includes('id="WinHacks-01-CtrlShiftT"'));
  const b=lines.findIndex(x=>x.includes('id="WinHacks-02-TaskManager"'));
  assert.ok(a>=0&&b>=0);
  lines[a]=lines[a].replace('"showTimingGuide":false','"showTimingGuide":true');
  lines[b]=lines[b].replace('"enabled":false,"volume":1','"enabled":true,"volume":1');
  fs.writeFileSync(src,lines.join('\n'));
  assert.equal(captureStudioProps(tmp),1);
  const m=JSON.parse(read(path.join(tmp,'projects','windows-hacks-5-shortcut-lengkap',mfName)));
  assert.equal(m.defaultProps.showTimingGuide,true);
  assert.equal(m.defaultProps.voice.enabled,true);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
test('conflicting changes in two segment props fail without data loss',()=>{
 const tmp=fixture();try{
  const src=path.join(tmp,'src','Root.tsx');
  const lines=read(src).split('\n');
  const a=lines.findIndex(x=>x.includes('id="WinHacks-01-CtrlShiftT"'));
  const b=lines.findIndex(x=>x.includes('id="WinHacks-02-TaskManager"'));
  lines[a]=lines[a].replace('"showTimingGuide":false','"showTimingGuide":true');
  lines[b]=lines[b].replace('"showTimingGuide":false','"showTimingGuide":"test"');
  fs.writeFileSync(src,lines.join('\n'));
  assert.throws(()=>captureStudioProps(tmp),/mengubah Props yang sama/);
  const m=JSON.parse(read(path.join(tmp,'projects','windows-hacks-5-shortcut-lengkap',mfName)));
  assert.equal(m.defaultProps.showTimingGuide,false);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
