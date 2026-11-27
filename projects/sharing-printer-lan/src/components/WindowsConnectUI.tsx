import React from 'react';import {Interactive} from 'remotion';
export const WindowsConnectUI:React.FC<{shortcut:boolean;run:boolean;typed:string;explorer:boolean;selected:boolean;menu:boolean;install:boolean;progressX:number}>=({shortcut,run,typed,explorer,selected,menu,install,progressX})=><svg width={1080} height={1385} viewBox="0 0 1080 1385" style={{position:'absolute',left:0,top:0}}>
{!explorer && <g>
<Interactive.G name="S05 — Desktop wallpaper" style={{opacity:1}}><rect x={52} y={400} width={976} height={748} fill="#07599B"/><path d="M580 580 L970 480 V1020 L580 900 Z" fill="#0B6DB1" opacity={.45}/><path d="M650 633 L802 610 V755 H650 Z M813 608 L968 585 V755 H813 Z M650 767 H802 V905 L650 882 Z M813 767 H968 V930 L813 907 Z" fill="#35B4EF"/></Interactive.G>
<Interactive.G name="S05 — Recycle Bin icon" style={{opacity:1}}><path d="M77 430 H102 L99 462 H80 Z" fill="#E0E9F0" stroke="#C7DDE9"/><path d="M76 430 H103 M83 426 H96" stroke="#EAF5FF" strokeWidth={3}/></Interactive.G>
<Interactive.Text name="S05 — Recycle Bin label" x={90} y={482} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:14,fontWeight:400,fill:"white",opacity:1}}>Recycle Bin</Interactive.Text>
<Interactive.G name="S05 — Taskbar" style={{opacity:1}}><rect x={52} y={1109} width={976} height={39} fill="#17232B" stroke="none" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Start icon" style={{opacity:1}}><path d="M65 1119 h10 v10 H65 Z M77 1119 h10 v10 H77 Z M65 1131 h10 v10 H65 Z M77 1131 h10 v10 H77 Z" fill="white"/></Interactive.G>
<Interactive.G name="S05 — Taskbar Search" style={{opacity:1}}><rect x={100} y={1110} width={240} height={37} fill="#F3F3F3" stroke="#B0B0B0" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Taskbar search label" x={116} y={1134} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:15,fontWeight:400,fill:"#202020",opacity:1}}>Type here to search</Interactive.Text>
<Interactive.G name="S05 — Explorer taskbar icon" style={{opacity:1}}><path d="M356 1121 h14 l5 5 h20 v15 h-39z" fill="#F4D16C"/></Interactive.G>
<Interactive.Text name="S05 — Taskbar tray" x={982} y={1134} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:13,fontWeight:400,fill:"white",opacity:1}}>10:30 AM</Interactive.Text>
</g>}
{shortcut && <g>
<Interactive.G name="S05 — Win key" style={{opacity:1}}><rect x={425} y={1180} width={90} height={78} fill="#FFFFFF" stroke="#C6C6C6" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Win key logo" style={{opacity:1}}><path d="M452 1204 h17 v17 h-17z M472 1204 h17 v17 h-17z M452 1224 h17 v17 h-17z M472 1224 h17 v17 h-17z" fill="#202020"/></Interactive.G>
<Interactive.Text name="S05 — Shortcut plus" x={540} y={1230} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:28,fontWeight:400,fill:"#202020",opacity:1}}>+</Interactive.Text>
<Interactive.G name="S05 — R key" style={{opacity:1}}><rect x={565} y={1180} width={90} height={78} fill="#FFFFFF" stroke="#C6C6C6" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — R key label" x={610} y={1231} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:30,fontWeight:600,fill:"#202020",opacity:1}}>R</Interactive.Text>
</g>}
{run && <g>
<Interactive.G name="S05 — Run dialog" style={{opacity:1}}><rect x={140} y={686} width={799} height={321} fill="#F0F0F0" stroke="#8D8D8D" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Run titlebar" style={{opacity:1}}><rect x={141} y={687} width={797} height={41} fill="#FFFFFF" stroke="none" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Run title" x={182} y={714} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:20,fontWeight:400,fill:"#202020",opacity:1}}>Run</Interactive.Text>
<Interactive.G name="S05 — Run icon" style={{opacity:1}}><rect x={155} y={700} width={18} height={16} fill="#E1EEF8" stroke="#7C9BAF"/><path d="M158 705 h12 M158 710 h10" stroke="#7598B3"/></Interactive.G>
<Interactive.G name="S05 — Run close" style={{opacity:1}}><path d="M905 700 l14 14 M919 700 l-14 14" stroke="#333" strokeWidth={2}/></Interactive.G>
<Interactive.Text name="S05 — Run prompt 1" x={240} y={767} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:20,fontWeight:400,fill:"#202020",opacity:1}}>Type the name of a program, folder, document, or</Interactive.Text>
<Interactive.Text name="S05 — Run prompt 2" x={240} y={793} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:20,fontWeight:400,fill:"#202020",opacity:1}}>Internet resource, and Windows will open it for you.</Interactive.Text>
<Interactive.Text name="S05 — Open label" x={162} y={862} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:20,fontWeight:400,fill:"#202020",opacity:1}}>Open:</Interactive.Text>
<Interactive.G name="S05 — Run input" style={{opacity:1}}><rect x={240} y={837} width={667} height={43} fill="white" stroke="#0078D7" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — UNC typed" x={251} y={867} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:23,fontWeight:400,fill:"#202020",opacity:1}}>{typed}</Interactive.Text>
<Interactive.G name="S05 — Run dropdown" style={{opacity:1}}><path d="M885 854 l7 6 7 -6" stroke="#777" fill="none" strokeWidth={2}/></Interactive.G>
<Interactive.G name="S05 — OK bidang" style={{opacity:1}}><rect x={472} y={934} width={132} height={43} fill="#E1E1E1" stroke="#0078D7" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — OK label" x={538.0} y={961.5} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>OK</Interactive.Text>
<Interactive.G name="S05 — Cancel bidang" style={{opacity:1}}><rect x={618} y={934} width={132} height={43} fill="#E1E1E1" stroke="#A8A8A8" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Cancel label" x={684.0} y={961.5} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Cancel</Interactive.Text>
<Interactive.G name="S05 — Browse... bidang" style={{opacity:1}}><rect x={764} y={934} width={142} height={43} fill="#E1E1E1" stroke="#A8A8A8" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Browse... label" x={835.0} y={961.5} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Browse...</Interactive.Text>
</g>}
{explorer && <g>
<Interactive.G name="S05 — Explorer window" style={{opacity:1}}><rect x={52} y={400} width={976} height={748} fill="#FFFFFF" stroke="#999999" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Explorer title" x={84} y={425} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>192.168.10.1</Interactive.Text>
<Interactive.G name="S05 — Explorer window buttons" style={{opacity:1}}><path d="M896 420 h12 M935 411 h12 v12 h-12z M985 411 l12 12 M997 411 l-12 12" stroke="#333" fill="none"/></Interactive.G>
<Interactive.G name="S05 — Ribbon File tab" style={{opacity:1}}><rect x={53} y={438} width={64} height={30} fill="#0078D7" stroke="none" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Ribbon File" x={85} y={459} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:15,fontWeight:400,fill:"white",opacity:1}}>File</Interactive.Text>
<Interactive.Text name="S05 — Ribbon Home" x={140} y={459} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Home</Interactive.Text>
<Interactive.Text name="S05 — Ribbon Share" x={215} y={459} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Share</Interactive.Text>
<Interactive.Text name="S05 — Ribbon View" x={290} y={459} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>View</Interactive.Text>
<Interactive.Text name="S05 — Nav back" x={62} y={495} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:26,fontWeight:400,fill:"#777777",opacity:1}}>‹</Interactive.Text>
<Interactive.Text name="S05 — Nav forward" x={90} y={495} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:26,fontWeight:400,fill:"#AAAAAA",opacity:1}}>›</Interactive.Text>
<Interactive.Text name="S05 — Nav up" x={120} y={495} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:20,fontWeight:400,fill:"#777777",opacity:1}}>↑</Interactive.Text>
<Interactive.G name="S05 — Address bar" style={{opacity:1}}><rect x={143} y={474} width={640} height={31} fill="white" stroke="#D5D5D5" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Address value" x={154} y={495} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Network  ›  192.168.10.1</Interactive.Text>
<Interactive.G name="S05 — Search box" style={{opacity:1}}><rect x={793} y={474} width={223} height={31} fill="white" stroke="#D5D5D5" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Search value" x={802} y={495} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:15,fontWeight:400,fill:"#777777",opacity:1}}>Search 192.168.10.1</Interactive.Text>
<Interactive.G name="S05 — Sidebar" style={{opacity:1}}><rect x={53} y={510} width={188} height={608} fill="#FAFAFA" stroke="#E5E5E5" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Sidebar icon Quick access" style={{opacity:1}}><path d="M65 531 h8 l4 4 h14 v15 H65z" fill="#86B1CF"/></Interactive.G>
<Interactive.Text name="S05 — Sidebar Quick access" x={98} y={547} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Quick access</Interactive.Text>
<Interactive.G name="S05 — Sidebar icon Desktop" style={{opacity:1}}><path d="M65 569 h8 l4 4 h14 v15 H65z" fill="#E9CB79"/></Interactive.G>
<Interactive.Text name="S05 — Sidebar Desktop" x={98} y={585} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Desktop</Interactive.Text>
<Interactive.G name="S05 — Sidebar icon Downloads" style={{opacity:1}}><path d="M65 607 h8 l4 4 h14 v15 H65z" fill="#E9CB79"/></Interactive.G>
<Interactive.Text name="S05 — Sidebar Downloads" x={98} y={623} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Downloads</Interactive.Text>
<Interactive.G name="S05 — Sidebar icon Documents" style={{opacity:1}}><path d="M65 645 h8 l4 4 h14 v15 H65z" fill="#E9CB79"/></Interactive.G>
<Interactive.Text name="S05 — Sidebar Documents" x={98} y={661} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Documents</Interactive.Text>
<Interactive.G name="S05 — Sidebar icon Pictures" style={{opacity:1}}><path d="M65 683 h8 l4 4 h14 v15 H65z" fill="#E9CB79"/></Interactive.G>
<Interactive.Text name="S05 — Sidebar Pictures" x={98} y={699} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Pictures</Interactive.Text>
<Interactive.G name="S05 — Sidebar icon This PC" style={{opacity:1}}><path d="M65 721 h8 l4 4 h14 v15 H65z" fill="#86B1CF"/></Interactive.G>
<Interactive.Text name="S05 — Sidebar This PC" x={98} y={737} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>This PC</Interactive.Text>
<Interactive.G name="S05 — Network selection" style={{opacity:1}}><rect x={54} y={750} width={185} height={33} fill="#E1E1E1" stroke="none" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Sidebar icon Network" style={{opacity:1}}><path d="M65 759 h8 l4 4 h14 v15 H65z" fill="#86B1CF"/></Interactive.G>
<Interactive.Text name="S05 — Sidebar Network" x={98} y={775} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Network</Interactive.Text>
<Interactive.G name="S05 — Printer selection" style={{opacity:selected?1:0}}><rect x={295} y={543} width={330} height={75} fill="#DCECF9" stroke="#A9D1F2" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Network printer icon" style={{opacity:1}}><g transform="translate(306 548) scale(0.65)"><rect x={12} y={0} width={40} height={30} fill="#E9F0F4" stroke="#8296A4"/><rect x={0} y={22} width={65} height={38} rx={3} fill="#A8B8C1" stroke="#778690"/><rect x={9} y={43} width={46} height={10} fill="#596972"/><rect x={16} y={47} width={34} height={22} fill="white" stroke="#A0AAB0"/><circle cx={55} cy={30} r={3} fill="#64A65E"/></g></Interactive.G>
<Interactive.Text name="S05 — Shared printer label" x={361} y={571} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:18,fontWeight:400,fill:"#202020",opacity:1}}>EPSON L210 Series</Interactive.Text>
<Interactive.Text name="S05 — Shared printer type" x={361} y={594} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:15,fontWeight:400,fill:"#646464",opacity:1}}>Printer</Interactive.Text>
<Interactive.G name="S05 — Explorer status" style={{opacity:1}}><rect x={53} y={1118} width={974} height={29} fill="#FAFAFA" stroke="#E5E5E5" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Explorer status text" x={66} y={1138} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:14,fontWeight:400,fill:"#646464",opacity:1}}>1 item</Interactive.Text>
{menu && <g>
<Interactive.G name="S05 — Connect context menu" style={{opacity:1}}><rect x={441} y={580} width={244} height={132} fill="#F5F5F5" stroke="#999999" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Connect hover" style={{opacity:1}}><rect x={443} y={613} width={240} height={29} fill="#D8EAF9" stroke="none" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Menu Open" x={456} y={603} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:17,fontWeight:400,fill:"#202020",opacity:1}}>Open</Interactive.Text>
<Interactive.Text name="S05 — Menu Connect..." x={456} y={634} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:17,fontWeight:400,fill:"#202020",opacity:1}}>Connect...</Interactive.Text>
<Interactive.Text name="S05 — Menu Create shortcut" x={456} y={665} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:17,fontWeight:400,fill:"#202020",opacity:1}}>Create shortcut</Interactive.Text>
<Interactive.Text name="S05 — Menu Properties" x={456} y={696} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:17,fontWeight:400,fill:"#202020",opacity:1}}>Properties</Interactive.Text>
</g>}
{install && <g>
<Interactive.G name="S05 — Installation shadow" style={{opacity:1}}><rect x={196} y={630} width={718} height={270} fill="#D8D8D8" stroke="none" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Installation window" style={{opacity:1}}><rect x={190} y={624} width={718} height={270} fill="#F0F0F0" stroke="#8D8D8D" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Installation titlebar" style={{opacity:1}}><rect x={191} y={625} width={716} height={36} fill="white" stroke="none" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Installation title" x={205} y={649} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:18,fontWeight:400,fill:"#202020",opacity:1}}>Windows Printer Installation</Interactive.Text>
<Interactive.G name="S05 — Installing icon" style={{opacity:1}}><g transform="translate(214 679) scale(0.8)"><rect x={12} y={0} width={40} height={30} fill="#E9F0F4" stroke="#8296A4"/><rect x={0} y={22} width={65} height={38} rx={3} fill="#A8B8C1" stroke="#778690"/><rect x={9} y={43} width={46} height={10} fill="#596972"/><rect x={16} y={47} width={34} height={22} fill="white" stroke="#A0AAB0"/><circle cx={55} cy={30} r={3} fill="#64A65E"/></g></Interactive.G>
<Interactive.Text name="S05 — Installing label" x={285} y={704} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:19,fontWeight:400,fill:"#202020",opacity:1}}>Connecting to EPSON L210 Series on 192.168.10.1</Interactive.Text>
<Interactive.Text name="S05 — Driver lookup" x={285} y={734} textAnchor="start" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:17,fontWeight:400,fill:"#202020",opacity:1}}>Looking for a driver...</Interactive.Text>
<Interactive.G name="S05 — Progress track" style={{opacity:1}}><rect x={285} y={762} width={590} height={28} fill="#E1E1E1" stroke="#AAAAAA" strokeWidth={1}/></Interactive.G>
<Interactive.G name="S05 — Progress moving segment" style={{opacity:1}}><rect x={progressX} y={765} width={130} height={22} fill="#12A04A"/></Interactive.G>
<Interactive.G name="S05 — Install Cancel bidang" style={{opacity:1}}><rect x={755} y={839} width={120} height={38} fill="#E1E1E1" stroke="#A8A8A8" strokeWidth={1}/></Interactive.G>
<Interactive.Text name="S05 — Install Cancel label" x={815.0} y={864.0} textAnchor="middle" style={{fontFamily:"Segoe UI, Arial, sans-serif",fontSize:16,fontWeight:400,fill:"#202020",opacity:1}}>Cancel</Interactive.Text>
</g>}
</g>}
</svg>;
