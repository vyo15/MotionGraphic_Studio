import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {VideoProps} from '../config/props';
import {Scene01} from '../scenes/Scene01';
import {Scene02} from '../scenes/Scene02';
import {Scene03} from '../scenes/Scene03';
import {Scene04} from '../scenes/Scene04';
import {Scene05} from '../scenes/Scene05';
import {Scene06} from '../scenes/Scene06';
import {Scene07} from '../scenes/Scene07';
import {Scene08} from '../scenes/Scene08';
import {Captions01} from './Captions01';
import {Captions02} from './Captions02';
import {Captions03} from './Captions03';
import {Captions04} from './Captions04';
import {Captions05} from './Captions05';
import {Captions06} from './Captions06';
import {Captions07} from './Captions07';
import {Scene01Question} from '../scenes/Scene01Question';
import {Scene01Response} from '../scenes/Scene01Response';
const scenes=[Scene01Question,Scene01Response,Scene01,Scene02,Scene03,Scene04,Scene05,Scene06,Scene07,Scene08];
const guides=[null,null,Captions01,Captions02,Captions03,Captions04,Captions05,Captions06,Captions07,null];
export const SceneLayout:React.FC<VideoProps & {sceneIndex:number}>=({sceneIndex,...p})=>{
 const Scene=scenes[sceneIndex],Guide=guides[sceneIndex];
 if(!Scene)return null;
 if(sceneIndex<2)return <Scene {...p}/>;
 // One outer design transform. Nested Freeze carries unscaled original scenes, avoiding double scaling.
 // UI/cursor share the same transform; guide stays in screen space outside camera/fades.
 const k=0.8;
 return <AbsoluteFill><div style={{position:'absolute',left:0,top:0,width:1080,height:1920,transformOrigin:'540px 785px',transform:`translateX(-20px) scale(${k})`}}><Scene {...p} showSubtitles={false}/></div>{Guide&&<Guide showSubtitles={p.showSubtitles}/>}</AbsoluteFill>;
};
