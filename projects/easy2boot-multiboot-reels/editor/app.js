import {frameSvg} from './renderer.mjs';
const $=id=>document.getElementById(id);
const slug='easy2boot-multiboot-reels';
const spans=[360,330,420,480,420,390];
const labels=['Masalah','Solusi Easy2Boot','Menyiapkan USB','Salin file ISO','Booting','Penutup & Cover'];
const offsets=spans.map((_,i)=>spans.slice(0,i).reduce((a,b)=>a+b,0));
const maxFrame=spans.reduce((a,b)=>a+b,0)-1;
const dataCache={};let state={version:2,layers:{}};
let selected=null, frame=30, currentScene=0, playing=false,lastClock=0,lastInspectorSelection='',isDirty=false;
let drag=null;const history=[];
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const toast=t=>{const node=$('toast');node.textContent=t;node.classList.add('show');setTimeout(()=>node.classList.remove('show'),2200)};
const sceneFromFrame=f=>Math.min(5,offsets.findIndex((o,i)=>f>=o&&f<o+spans[i])<0?5:offsets.findIndex((o,i)=>f>=o&&f<o+spans[i]));
const sceneKey=()=>`S0${currentScene+1}`;
const sceneLocal=()=>frame-offsets[currentScene];
const keyFor=id=>`${sceneKey()}:${id}`;
const edit=()=>selected?state.layers[keyFor(selected)]??{}:{};
const activeKeyframe=()=>edit().keyframes?.find(k=>k.frame===sceneLocal())??null;
const currentValue=(field,def)=>activeKeyframe()?.[field]??edit()[field]??def;
const setEditedValue=(field,value)=>{
 const target=(['x','y','scale','rotation','opacity'].includes(field)&&activeKeyframe())||ensureOverride(selected);
 if(value===undefined)delete target[field];else target[field]=value;
};
const round=(n,d=2)=>Math.round(n*10**d)/10**d;
const saveLabel=()=>{$('saveStatus').textContent=isDirty?'Belum disimpan':'Tersimpan';$('saveStatus').classList.toggle('dirty',isDirty)};
const markDirty=()=>{isDirty=true;saveLabel()};
const snapshot=()=>{history.push(JSON.stringify(state.layers));if(history.length>40)history.shift()};
const ensureOverride=id=>{const key=keyFor(id);return state.layers[key]??(state.layers[key]={})};
const getData=async i=>{
 if(dataCache[i])return dataCache[i];
 const res=await fetch(`./data/scene${String(i+1).padStart(2,'0')}.json`);
 if(!res.ok)throw Error('File scene tidak ditemukan');return dataCache[i]=await res.json();
};
const fmtTime=f=>{const s=Math.floor(f/30);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
const setFrame=async(n,refreshInspector=false)=>{
 frame=Math.max(0,Math.min(maxFrame,Math.round(n)));
 const next=sceneFromFrame(frame),change=next!==currentScene;
 currentScene=next;await getData(currentScene);
 $('scrub').value=String(frame);$('frameValue').value=String(frame);
 $('clock').textContent=`${fmtTime(frame)} / ${fmtTime(maxFrame+1)}`;
 $('localFrame').textContent=`Frame lokal ${sceneLocal()}`;
 $('sceneLabel').textContent=`S0${currentScene+1} — ${labels[currentScene]}`;
 document.querySelectorAll('.sceneBlock').forEach((n,i)=>n.classList.toggle('active',i===currentScene));
 if(change){selected=null;renderLayers();refreshInspector=true;}
 render();if(refreshInspector||activeKeyframe())renderInspector();
};
const visibleLayer=(layer,detail)=>{
 if(!detail&&!['g','text'].includes(layer.tag))return false;
 const q=$('search').value.toLowerCase().trim();
 return !q||`${layer.label} ${layer.id} ${layer.tag}`.toLowerCase().includes(q);
};
const renderLayers=()=>{
 const all=dataCache[currentScene]?.layers??[];
 const filtered=all.filter(l=>visibleLayer(l,$('showDetails').checked));
 $('layerCount').textContent=`${filtered.length}/${all.length}`;
 const holder=$('layerlist');holder.replaceChildren();
 for(const l of filtered){
  const line=document.createElement('div');line.className='layer'+(l.id===selected?' active':'');
  const depth=l.parent?1:0;line.style.paddingLeft=`${7+depth*9}px`;
  const title=document.createElement('span');title.className='layerName';title.textContent=l.label||l.id;title.title=`${l.id} (${l.tag})`;
  const kind=document.createElement('span');kind.className='kind';kind.textContent=l.tag;
  const toggle=document.createElement('button');toggle.className='eye';toggle.textContent=state.layers[`${sceneKey()}:${l.id}`]?.visible===false?'○':'◉';toggle.title='Tampilkan/sembunyikan layer';
  toggle.addEventListener('click',e=>{e.stopPropagation();snapshot();const o=ensureOverride(l.id);o.visible=o.visible===false?true:false;markDirty();renderLayers();render();});
  line.addEventListener('click',()=>select(l.id));
  line.append(toggle,kind,title);holder.append(line);
 }
};
const select=id=>{
 if(!id)return;
 selected=id;renderLayers();renderInspector();updateOverlay();
};
const render=()=>{
 const d=dataCache[currentScene];if(!d)return;
 const markup=frameSvg(d.source,sceneKey(),sceneLocal(),d.frames,state.layers,'Inter, Arial, sans-serif','/assets/images/');
 $('art').innerHTML=markup;
 updateOverlay();
};
const overlayEl=()=>{
 if(!selected)return null;
 return [...$('art').querySelectorAll('[id]')].find(e=>e.id===selected)??null;
};
const updateOverlay=()=>{
 const el=overlayEl(),box=$('highlight'),resize=$('resize'),rotate=$('rotate');
 if(!el){box.style.display='none';resize.style.display='none';rotate.style.display='none';return;}
 const stage=$('stage').getBoundingClientRect(),r=el.getBoundingClientRect();
 if(!r.width||!r.height||r.left>stage.right||r.right<stage.left){box.style.display='none';resize.style.display='none';rotate.style.display='none';return;}
 const x=r.left-stage.left,y=r.top-stage.top;
 Object.assign(box.style,{display:'block',left:`${x}px`,top:`${y}px`,width:`${r.width}px`,height:`${r.height}px`});
 Object.assign(resize.style,{display:'block',left:`${x+r.width-8}px`,top:`${y+r.height-8}px`});
 Object.assign(rotate.style,{display:'block',left:`${x+r.width/2-8}px`,top:`${y-23}px`});
};
const getLayer=()=>dataCache[currentScene]?.layers.find(l=>l.id===selected);
const controls=[
 {key:'x',label:'X / Geser horizontal',kind:'number',step:1,default:0},{key:'y',label:'Y / Geser vertikal',kind:'number',step:1,default:0},
 {key:'scale',label:'Skala',kind:'number',step:.05,default:1,min:.05},{key:'rotation',label:'Rotasi (°)',kind:'number',step:1,default:0},
 {key:'opacity',label:'Opacity (0–1)',kind:'number',step:.1,default:1,min:0,max:1},
 {key:'width',label:'Lebar override (px)',kind:'number',step:5,default:''},{key:'height',label:'Tinggi override (px)',kind:'number',step:5,default:''},
 {key:'fill',label:'Warna isi',kind:'text',default:''},{key:'stroke',label:'Warna garis',kind:'text',default:''},
 {key:'fontSize',label:'Ukuran font',kind:'number',step:1,default:''},{key:'fontWeight',label:'Ketebalan font',kind:'number',step:50,default:''},
 {key:'startFrame',label:'Mulai tampil (frame lokal)',kind:'number',step:1,default:''},
 {key:'endFrame',label:'Berakhir (frame lokal)',kind:'number',step:1,default:''},
 {key:'zIndex',label:'Urutan dalam grup',kind:'number',step:1,default:''},
 {key:'animationStartFrame',label:'Awal animasi (frame)',kind:'number',step:1,default:0},
 {key:'delayFrames',label:'Delay (frame)',kind:'number',step:1,default:0},
 {key:'durationFrames',label:'Durasi animasi (frame)',kind:'number',step:1,default:15},
];
const fieldHTML=c=>{
 const val=currentValue(c.key,c.default);
 return `<div class="field"><label for="p_${c.key}">${c.label}</label><input id="p_${c.key}" data-field="${c.key}" type="${c.kind}" ${c.min!==undefined?`min="${c.min}"`:''} ${c.max!==undefined?`max="${c.max}"`:''} step="${c.step??1}" value="${escapeHTML(val)}"/></div>`;
};
const renderInspector=()=>{
 const host=$('inspector'),layer=getLayer();
 if(!layer){host.innerHTML='<div class="inspectorEmpty">Klik elemen di preview atau pilih dari daftar layer. Semua bentuk dan teks utama kini memiliki ID yang bisa diedit.</div>';return;}
 const p=edit(),textLayer=layer.tag==='text';
 const section=keys=>controls.filter(c=>keys.includes(c.key)).map(fieldHTML).join('');
 const keyList=(p.keyframes??[]).map((k,i)=>`<span class="pill">${k.frame}f: X${round(k.x??0)}, Y${round(k.y??0)}</span>`).join(' ');
 host.innerHTML=`
 <div class="selected"><b>${escapeHTML(layer.label)}</b><div class="small" style="margin-top:5px">${escapeHTML(sceneKey()+':'+selected)} · &lt;${layer.tag}&gt;</div></div>
 <div class="field"><label for="p_visible">Layer terlihat</label><input id="p_visible" data-field="visible" type="checkbox" ${p.visible!==false?'checked':''}/></div>
 <div class="sectionLabel">Transformasi</div>${section(['x','y','scale','rotation','opacity','width','height','zIndex'])}
 ${textLayer?`<div class="sectionLabel">Edit Teks</div><div class="field rowtext"><label for="p_text">Isi tulisan</label><textarea data-field="text" id="p_text">${escapeHTML(p.text??layer.text)}</textarea></div>${section(['fontSize','fontWeight'])}`:''}
 <div class="sectionLabel">Warna & Aset</div>${section(['fill','stroke'])}
 <div class="field"><label>Upload gambar pengganti</label><input id="assetUpload" type="file" accept=".png,.jpg,.jpeg,.webp" style="width:146px;font-size:11px"/></div>
 ${p.asset?`<div class="field"><label>Aset: ${escapeHTML(p.asset)}</label><button id="removeAsset">Hapus</button></div>`:''}
 <div class="sectionLabel">Waktu & Animasi</div>${section(['startFrame','endFrame'])}
 <div class="field"><label for="p_animation">Preset animasi</label><select id="p_animation" data-field="animation"><option value="">(Animasi asli)</option>${['fade','slide-up','pop','wipe'].map(s=>`<option value="${s}" ${p.animation===s?'selected':''}>${s}</option>`).join('')}</select></div>
 <div class="field"><label for="p_easing">Easing</label><select id="p_easing" data-field="easing">${['ease-in-out','linear'].map(s=>`<option ${p.easing===s?'selected':''}>${s}</option>`).join('')}</select></div>
 ${section(['animationStartFrame','delayFrames','durationFrames'])}
 <div class="sectionLabel">Keyframe pada layer ini</div><div class="note">Tambah keyframe pada waktu saat ini, lalu ubah X/Y/skala/rotasi/opasitas. Nilai antarframe akan dihitung otomatis.</div>
 <div style="display:flex;gap:8px;margin-top:10px"><button id="addKF" class="primary">+ Keyframe saat ini</button><button id="removeKF">Hapus keyframe</button></div><div style="display:flex;flex-wrap:wrap;gap:4px;margin:9px 0">${keyList||'<span class="small">Belum ada keyframe tambahan.</span>'}</div>
 <div class="sectionLabel">Reset</div><button id="resetLayer">Reset seluruh edit pada layer ini</button>
 `;
 for(const input of host.querySelectorAll('[data-field]')){
  const field=input.dataset.field;
  input.addEventListener('change',()=>changeField(input,field));
  if(input.tagName==='TEXTAREA')input.addEventListener('blur',()=>changeField(input,field));
 }
 host.querySelector('#assetUpload')?.addEventListener('change',upload);
 host.querySelector('#removeAsset')?.addEventListener('click',()=>{snapshot();delete ensureOverride(selected).asset;markDirty();render();renderInspector();});
 host.querySelector('#resetLayer')?.addEventListener('click',()=>{snapshot();delete state.layers[keyFor(selected)];markDirty();render();renderLayers();renderInspector();toast('Perubahan layer direset');});
 host.querySelector('#addKF')?.addEventListener('click',addKeyframe);
 host.querySelector('#removeKF')?.addEventListener('click',removeKeyframe);
};
const changeField=(input,field)=>{
 if(!selected)return;
 snapshot();const p=ensureOverride(selected);
 if(input.type==='checkbox')setEditedValue(field,input.checked);
 else if(input.type==='number'){if(input.value==='')setEditedValue(field,undefined);else if(Number.isFinite(+input.value))setEditedValue(field,+input.value);}
 else if(input.value==='')setEditedValue(field,undefined);else setEditedValue(field,input.value);
 markDirty();render();if(field==='visible')renderLayers();
};
const addKeyframe=()=>{
 if(!selected)return;snapshot();const p=ensureOverride(selected);
 const t=sceneLocal();const k={frame:t};for(const f of ['x','y','scale','rotation','opacity'])k[f]=currentValue(f,f==='scale'||f==='opacity'?1:0);
 if(!p.keyframes?.length&&t>0){const initial={frame:0};for(const f of ['x','y','scale','rotation','opacity'])initial[f]=p[f]??(f==='scale'||f==='opacity'?1:0);p.keyframes=[initial];}
 p.keyframes=(p.keyframes??[]).filter(x=>x.frame!==t).concat(k).sort((a,b)=>a.frame-b.frame);
 markDirty();render();renderInspector();toast(`Keyframe ${t} ditambahkan`);
};
const removeKeyframe=()=>{
 if(!selected)return;snapshot();const p=ensureOverride(selected);p.keyframes=(p.keyframes??[]).filter(k=>k.frame!==sceneLocal());markDirty();render();renderInspector();
};
const upload=async(e)=>{
 const file=e.target.files?.[0];if(!selected||!file)return;
 const bytes=await file.arrayBuffer();const b64=btoa(Array.from(new Uint8Array(bytes),x=>String.fromCharCode(x)).join(''));
 const res=await fetch('/api/upload',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:file.name,data:b64})});
 const result=await res.json();if(!res.ok)return toast(result.error??'Gagal upload');
 snapshot();ensureOverride(selected).asset=result.name;markDirty();render();renderInspector();toast('Aset lokal berhasil dipasang. Sinkronkan Master jika diperlukan.');
};
const dragStart=(e,type,id)=>{
 if(e.button!==0)return;
 if(id&&selected!==id)select(id);
 if(!selected)return;
 const p=edit(); const el=overlayEl();const r=el?.getBoundingClientRect(),stage=$('stage').getBoundingClientRect();
 snapshot();drag={type,x:e.clientX,y:e.clientY,baseX:currentValue('x',0),baseY:currentValue('y',0),baseScale:currentValue('scale',1),baseRotation:currentValue('rotation',0),centerX:(r?.left??0)+(r?.width??0)/2,centerY:(r?.top??0)+(r?.height??0)/2,stageW:stage.width};
 e.preventDefault();e.target.setPointerCapture?.(e.pointerId);
};
const dragMove=e=>{
 if(!drag||!selected)return;const p=ensureOverride(selected);
 const dx=(e.clientX-drag.x)*1080/drag.stageW;const dy=(e.clientY-drag.y)*1080/drag.stageW;
 if(drag.type==='move'){setEditedValue('x',round(drag.baseX+dx));setEditedValue('y',round(drag.baseY+dy));}
 if(drag.type==='resize')setEditedValue('scale',round(Math.max(.05,drag.baseScale+(e.clientX-drag.x)/Math.max(60,drag.stageW*.5)),3));
 if(drag.type==='rotate'){
  const a0=Math.atan2(drag.y-drag.centerY,drag.x-drag.centerX),a1=Math.atan2(e.clientY-drag.centerY,e.clientX-drag.centerX);
  setEditedValue('rotation',round(drag.baseRotation+(a1-a0)*180/Math.PI));
 }
 markDirty();render();
};
const dragEnd=()=>{if(!drag)return;drag=null;renderInspector();};
$('art').addEventListener('pointerdown',e=>{
 const target=e.target.closest?.('[id]');if(!target||!target.id)return;
 dragStart(e,'move',target.id);
});
$('resize').addEventListener('pointerdown',e=>dragStart(e,'resize',selected));
$('rotate').addEventListener('pointerdown',e=>dragStart(e,'rotate',selected));
window.addEventListener('pointermove',dragMove);window.addEventListener('pointerup',dragEnd);
$('art').addEventListener('dblclick',e=>{
 const el=e.target.closest?.('text[id]');if(!el)return;
 select(el.id);const answer=prompt('Ubah teks layer:',edit().text??getLayer()?.text??el.textContent);
 if(answer===null)return;snapshot();ensureOverride(selected).text=answer;markDirty();render();renderInspector();
});
const save=async()=>{
 const button=$('save');button.disabled=true;button.textContent='Menyimpan...';
 try{
  const r=await fetch('/api/state',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});
  const result=await r.json();if(!r.ok)throw Error(result.error??'Gagal save');
  isDirty=false;saveLabel();toast(`Tersimpan permanen: ${result.count} layer`);
 }catch(e){toast('Gagal menyimpan: '+e.message);}finally{button.disabled=false;button.textContent='Simpan ke Remotion';}
};
const undo=()=>{
 if(!history.length)return;state.layers=JSON.parse(history.pop());markDirty();render();renderLayers();renderInspector();toast('Perubahan terakhir dibatalkan');
};
let lastPlayTime=0;
const tick=async(t)=>{
 if(!playing)return;
 const dt=Math.min(0.2,(t-lastPlayTime)/1000||0);lastPlayTime=t;
 await setFrame(frame+Math.max(1,Math.round(dt*30)));
 if(frame>=maxFrame){playing=false;$('play').textContent='▶';return;}
 requestAnimationFrame(tick);
};
const setPlaying=p=>{playing=p;$('play').textContent=p?'❚❚':'▶';if(p){lastPlayTime=performance.now();requestAnimationFrame(tick);}};
$('save').addEventListener('click',save);$('undo').addEventListener('click',undo);
$('search').addEventListener('input',renderLayers);$('showDetails').addEventListener('change',renderLayers);
$('scrub').addEventListener('input',e=>{setPlaying(false);setFrame(+e.target.value,true);});
$('frameValue').addEventListener('change',e=>{setPlaying(false);setFrame(+e.target.value,true);});
$('play').addEventListener('click',()=>setPlaying(!playing));
$('previous').addEventListener('click',()=>{setPlaying(false);setFrame(offsets[Math.max(0,currentScene-1)]+30,true);});
$('next').addEventListener('click',()=>{setPlaying(false);setFrame(offsets[Math.min(5,currentScene+1)]+30,true);});
$('keyAdd').addEventListener('click',addKeyframe);
window.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save();}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo();}
});
for(let i=0;i<6;i++){
 const b=document.createElement('button');b.className='sceneBlock';b.style.flex=String(spans[i]);b.textContent=`S0${i+1} · ${labels[i]}`;
 b.addEventListener('click',()=>{setPlaying(false);setFrame(offsets[i]+Math.min(30,spans[i]-1),true);});
 $('scenebar').append(b);
}
try{
 const response=await fetch('/api/state');state=await response.json();
 await setFrame(frame,true);renderLayers();saveLabel();
 toast('Editor siap • Pilih layer untuk mulai edit');
}catch(e){$('art').textContent='Gagal membuka editor: '+e.message;}
