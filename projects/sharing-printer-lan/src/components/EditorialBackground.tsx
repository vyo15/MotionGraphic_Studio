import React from 'react';import {Interactive} from 'remotion';
export const EditorialBackground:React.FC<{color:string}>=({color})=><Interactive.Div name="Global — Background" style={{position:"absolute",left:0,top:0,width:1080,height:1920,backgroundColor:color,opacity:1}}></Interactive.Div>;
