import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {analyze,diagnoseText,redactForSharing,formatReport,latestRemotionLog} from '../tools/concat-log-analyzer.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'tools/concat-manager.ps1'),'utf8');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const mktemp=()=>fs.mkdtempSync(path.join(os.tmpdir(),'mg-concat-diag-'));
const write=(p,text)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,text);};

test('official Concat native logging, portable data and monitored launcher are wired without replacing Remotion',()=>{
  assert.match(source,/function Ensure-LocalPortableFolder/);
  assert.match(source,/Join-Path .*'portable'/);
  assert.match(source,/Start-Process[\s\S]*?-PassThru[\s\S]*?-RedirectStandardOutput/);
  assert.match(source,/\.WaitForExit\(\)/);
  assert.match(source,/Save-WindowsEvents/);
  assert.match(source,/if \(\$null -ne \$exitCode -and \$exitCode -ne 0 -and -not \$SoftwareGraphics\)/);
  assert.match(source,/Print-Diagnostics \$sessionDir/);
  assert.match(source,/\$env:CONCAT_LOG='debug'/);
  assert.match(pkg.scripts.dev,/start-studio\.mjs/);
  assert.match(pkg.scripts.concat,/concat-manager\.ps1 -Action launch/);
  assert.equal(pkg.scripts.logs,'node tools/concat-log-analyzer.mjs');
  assert.match(pkg.scripts['concat:debug'],/-DebugLogging/);
  assert.match(fs.readFileSync(path.join(root,'.gitignore'),'utf8'),/apps\/concat\//);
});

test('diagnostic parser distinguishes GPU, media, exception, missing DLL, normal exit and unknown crashes',()=>{
  assert.equal(diagnoseText('GPU device was lost (Removed): driver reset',-1).code,'GPU');
  assert.equal(diagnoseText('failed to decode frame, unsupported codec',1).code,'MEDIA_DECODER');
  assert.equal(diagnoseText('FATAL [main] crash: 0xC0000005 EXCEPTION_ACCESS_VIOLATION in gpu.dll',-1).code,'ACCESS_VIOLATION');
  assert.equal(diagnoseText('0xC0000135 STATUS_DLL_NOT_FOUND',-1).code,'MISSING_DLL');
  assert.equal(diagnoseText('',0).code,'NORMAL_EXIT');
  assert.equal(diagnoseText('',-7).code,'UNEXPECTED_EXIT');
  assert.equal(diagnoseText('',null).code,'UNKNOWN');
});

test('analyzer reads native Concat portable logs and remembers a failed first launch after safe retry',()=>{
 const temp=mktemp();
 try{
  const folder=path.join(temp,'apps','concat','logs','sessions','20261030-100010-aabbcc');
  const exe=path.join(temp,'apps','concat','runtime','current','concat.exe');
  const logDir=path.join(path.dirname(exe),'portable','logs');
  const started=new Date(Date.now()-30_000), firstEnd=new Date(Date.now()-20_000), safeStart=new Date(Date.now()-15_000), safeEnd=new Date(Date.now()-5_000);
  write(path.join(folder,'session.json'),'\uFEFF'+JSON.stringify({attempts:['01-normal','02-software']}));
  const attempt=(name,s,e,code,mode)=>write(path.join(folder,name,'attempt.json'),'\uFEFF'+JSON.stringify({startedAtUtc:s.toISOString(),finishedAtUtc:e.toISOString(),exitCode:code,binaryPath:exe,mode}));
  attempt('01-normal',started,firstEnd,-1,'normal');attempt('02-software',safeStart,safeEnd,0,'software');
  const stamp=d=>new Date(d).toISOString().replace(/[-:]/g,'').replace('T','-').slice(0,15);
  const log1=path.join(logDir,`concat-${stamp(started)}.log`);
  const log2=path.join(logDir,`concat-${stamp(safeStart)}.log`);
  write(log1,'2026-10-30 ERROR GPU device was lost (Removed): driver reset\n');
  write(log2,'2026-10-30 INFO editor finished normally\n');
  fs.utimesSync(log1,firstEnd,firstEnd);fs.utimesSync(log2,safeEnd,safeEnd);
  const result=analyze({root:temp,env:{}});
  assert.equal(result.attempts.length,2);
  assert.equal(result.attempts[0].diagnostic.code,'GPU');
  assert.equal(result.attempts[1].diagnostic.code,'NORMAL_EXIT');
  const output=formatReport(result);
  assert.match(output,/GPU/);
  assert.match(output,/crash pertama tercatat/);
  assert.equal(result.nativeLog,log1);
 } finally{fs.rmSync(temp,{recursive:true,force:true});}
});

test('share summary masks Windows username, email, passwords and tokens without deleting raw local evidence',()=>{
 const text='C:\\Users\\vio\\Downloads\\clip.mp4 contact=me@example.com token=abcDEF123 password=secret Authorization: Bearer aaaaa.bbbbb.ccccc';
 const safe=redactForSharing(text);
 assert.doesNotMatch(safe,/vio|me@example\.com|abcDEF|password=secret|Bearer aaaaa/);
 assert.match(safe,/\[USER\]/);assert.match(safe,/\[RAHASIA\]/);
});

test('fresh Master with no logs gives a usable result and does not invent a crash',()=>{
 const temp=mktemp();
 try{const result=analyze({root:temp,env:{}});assert.equal(result.attempts.length,0);assert.equal(result.diagnostic.code,'UNKNOWN');assert.match(formatReport(result),/Belum ada sesi/);}finally{fs.rmSync(temp,{recursive:true,force:true});}
});

test('dashboard points to existing Remotion render logs without copying personal logs into Git',()=>{
 const base=mktemp();const project=path.join(base,'MotionGraphic-Studio');fs.mkdirSync(project);
 try{
  assert.equal(latestRemotionLog(project),null);
  const source=path.join(base,'MotionGraphic-Studio-Backups','Logs','render-test.log');
  write(source,'Rendered frames 10/20\nERROR sample export failed\n');
  const latest=latestRemotionLog(project);assert.equal(latest.file,source);assert.match(latest.errors[0],/ERROR sample/);
 }finally{fs.rmSync(base,{recursive:true,force:true});}
});

test('launch errors before native logger starts are still explained, without claiming a GPU crash',()=>{
 const tmp=mktemp();
 try {
  const base=path.join(tmp,'apps','concat','logs','sessions','20261030-110000-123456');
  write(path.join(base,'session.json'),JSON.stringify({attempts:['01-normal']}));
  write(path.join(base,'01-normal','attempt.json'),JSON.stringify({exitCode:null,note:'concat.exe cannot start: DLL missing',mode:'normal',binaryPath:'C:\\fake\\concat.exe'}));
  const result=analyze({root:tmp,env:{}});
  assert.equal(result.diagnostic.code,'LAUNCH_ERROR');
  assert.match(formatReport(result),/DLL missing/);
 } finally {fs.rmSync(tmp,{recursive:true,force:true});}
});
