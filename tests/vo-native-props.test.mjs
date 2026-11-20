import {test} from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {saveGeneratedState,captureStudioProps} from '../tools/studio-props-bridge.mjs';
const tmp=cb=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-native-vo-'));try{return cb(dir)}finally{fs.rmSync(dir,{recursive:true,force:true})}};
const create=dir=>{
 const project=path.join(dir,'projects/test-project'),narr=path.join(project,'src/config/narration.json');
 fs.mkdirSync(path.dirname(narr),{recursive:true});fs.mkdirSync(path.join(dir,'src'),{recursive:true});
 fs.writeFileSync(path.join(project,'motiongraphic-video.json'),JSON.stringify({id:'TestProject',slug:'test-project',durationInFrames:90,defaultProps:{title:'Demo'}}));
 const beats=[{scene:'Intro',startFrame:0,endFrame:90,text:'Narasi awal'}];
 fs.writeFileSync(narr,JSON.stringify({schemaVersion:1,status:'draft',beats}));
 const props={title:'Demo',voiceGuide:{status:'draft',beats}};
 const component=values=>`export const Root=()=> <Composition id="TestProjectVOGuide" defaultProps={${JSON.stringify(values)}} />;`;
 const generated=component(props);
 const root=path.join(dir,'src/Root.tsx');fs.writeFileSync(root,generated);
 saveGeneratedState(dir,generated,[{id:'TestProjectVOGuide',ownerId:'TestProject',kind:'voiceGuide',defaultProps:props}]);
 return {root,narr,component,props};
};
test('native Studio editing a VO beat persists into narration.json (without touching manifest)',()=>tmp(dir=>{
 const {root,narr,component,props}=create(dir);
 const updated=structuredClone(props);updated.voiceGuide.beats[0].text='Narasi sesudah edit';
 fs.writeFileSync(root,component(updated));
 assert.equal(captureStudioProps(dir),1);
 assert.equal(JSON.parse(fs.readFileSync(narr)).beats[0].text,'Narasi sesudah edit');
 assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir,'projects/test-project/motiongraphic-video.json'))).defaultProps,{title:'Demo'});
}));
test('native Studio edit rejects conflicting external narration changes',()=>tmp(dir=>{
 const {root,narr,component,props}=create(dir);
 const changed=JSON.parse(fs.readFileSync(narr));changed.beats[0].text='Changed outside Studio';fs.writeFileSync(narr,JSON.stringify(changed));
 const updated=structuredClone(props);updated.voiceGuide.beats[0].text='Changed in Studio';fs.writeFileSync(root,component(updated));
 assert.throws(()=>captureStudioProps(dir),/KONFLIK/);
 assert.equal(JSON.parse(fs.readFileSync(narr)).beats[0].text,'Changed outside Studio');
}));
