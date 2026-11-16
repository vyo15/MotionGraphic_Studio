/**
 * Animasi deterministik berbasis frame Remotion; berasal dari versi preview yang sudah dirender.
 * Tidak ada timer, requestAnimationFrame, atau tindakan DOM oleh pengguna.
 */
export const animateScene03 = (root: Element, f: number): void => {
  const el=(id: string): SVGElement => root.querySelector<SVGElement>(`#${id}`)!;
  const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const ease=(v:number)=>{v=clamp(v);return v*v*(3-2*v)};
  const z=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
  const show=(t:number,a:number,b:number,c:number,d:number)=>z(t,a,b)*(1-z(t,c,d));
  const opa=(id:string,v:number)=>el(id).setAttribute('opacity',String(clamp(v)));
  const move=(id:string,x=0,y=0,s=1,r=0,cx=540,cy=1000)=>el(id).setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)}) translate(${cx} ${cy}) rotate(${r.toFixed(2)}) scale(${s.toFixed(3)}) translate(${-cx} ${-cy})`);
const t=f/30;el('timebar').setAttribute('width',String(900*clamp(t/14)));
// Arrive from previous scene 2 list and pull it aside to reveal setup steps.
opa('carry',1-z(t,0,.72));move('carry',-320*z(t,.05,.8),95*z(t,.05,.8),1-.26*z(t,.05,.8),-4*z(t,.05,.8));
const a=show(t,.20,.57,2.63,3.12);opa('A',a);move('A',95*(1-z(t,.2,.62))-150*z(t,2.7,3.11),0,.96+.04*z(t,.2,.67));move('aTitle',0,42*(1-z(t,.2,.64)));move('aUsb',-360*(1-z(t,.6,1.23)),40*(1-z(t,.6,1.23)),.85+.15*z(t,.6,1.23));move('aFolder',260*(1-z(t,.84,1.45)),15*(1-z(t,.84,1.45)),.82+.18*z(t,.84,1.45));opa('copyPath',show(t,1.15,1.45,2.30,2.62));
for(const [id,start] of ([['file1',1.13],['file2',1.52]] as [string,number][])){const p=z(t,start,start+.75),visible=show(t,start,start+.17,start+.72,start+.92);opa(id,visible);const sx=365,sy=866,ex=740,ey=850;move(id,sx+(ex-sx)*p,sy+(ey-sy)*p-92*Math.sin(p*Math.PI),1-.54*p,-8+15*p,0,0)}
opa('aDone',show(t,2.10,2.38,2.68,3.0));move('aDone',0,35*(1-z(t,2.10,2.43)),.93+.07*z(t,2.1,2.43));
// Open the executable in File Explorer
const b=show(t,2.90,3.20,5.62,6.02);opa('B',b);move('B',205*(1-z(t,2.9,3.25))-155*z(t,5.64,6.00),0,.97+.03*z(t,2.9,3.36));move('bTitle',0,45*(1-z(t,2.92,3.38)));move('bExplorer',-80*(1-z(t,3.12,3.65)),60*(1-z(t,3.12,3.65)),.92+.08*z(t,3.12,3.7));
const bpointerX=825+(465-825)*z(t,4.00,4.75),bpointerY=1276+(1014-1276)*z(t,4.00,4.75);move('bPointer',bpointerX,bpointerY,1,0,0,0);opa('bPointer',show(t,3.75,4.06,5.33,5.61));move('bClick',bpointerX,bpointerY,.45+.8*z(t,4.8,5.12),0,0,0);opa('bClick',show(t,4.76,4.88,4.95,5.19));
el('exeSelect').setAttribute('fill',t>=4.8?'#FEECE6':'#EDF5F9');
// Drive selection in Make_E2B window
const c=show(t,5.81,6.18,8.57,9.02);opa('C',c);move('C',220*(1-z(t,5.81,6.2))-125*z(t,8.61,9.03),0,.97+.03*z(t,5.81,6.24));move('cTitle',0,48*(1-z(t,5.82,6.22)));move('cWindow',0,65*(1-z(t,5.95,6.51)),.87+.13*z(t,5.95,6.53));
const cpX=900+(733-900)*z(t,6.74,7.45),cpY=1150+(893-1150)*z(t,6.74,7.45);move('cPointer',cpX,cpY,1,0,0,0);opa('cPointer',show(t,6.35,6.7,8.58,8.90));move('cClick',cpX,cpY,.65+.45*z(t,7.39,7.6),0,0,0);opa('cClick',show(t,7.37,7.45,7.53,7.65));opa('cDrop',show(t,7.48,7.62,8.18,8.42));opa('cFocus',show(t,8.18,8.34,8.63,8.87));
// Focus on red Make E2B Drive action and safety warning
const d=show(t,8.78,9.10,11.59,12.02);opa('D',d);move('D',240*(1-z(t,8.79,9.14))-100*z(t,11.61,12.05),0,.96+.04*z(t,8.78,9.13));move('dTitle',0,44*(1-z(t,8.8,9.22)));move('dPanel',0,75*(1-z(t,8.9,9.56)),.90+.10*z(t,8.9,9.6));
const dpX=857+(755-857)*z(t,9.84,10.46),dpY=1230+(1045-1230)*z(t,9.84,10.46);move('dPointer',dpX,dpY,1,0,0,0);opa('dPointer',show(t,9.5,9.85,11.22,11.5));move('dClick',dpX,dpY,.38+1.32*z(t,10.53,10.85),0,0,0);opa('dClick',show(t,10.50,10.56,10.70,10.91));el('dButton').setAttribute('fill',t>10.55&&t<10.85?'#BB5047':'#D85F52');move('warning',0,0,1+.05*z(t,10.95,11.22),0,270,1170);
// App completed: progress to 100%; end with _ISO folder bridging to scene 04
const e=z(t,11.75,12.12);opa('E',e);move('E',240*(1-e),20*(1-e),.95+.05*e);move('eTitle',0,42*(1-z(t,11.75,12.20)));move('eProgress',0,55*(1-z(t,11.78,12.35)),.90+.10*z(t,11.78,12.38));el('eBar').setAttribute('width',String(635*z(t,12.16,13.08)));opa('eFolder',z(t,13.12,13.48));move('eFolder',0,40*(1-z(t,13.12,13.54)),.85+.15*z(t,13.12,13.55));

};
