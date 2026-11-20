import React from 'react';
import {AbsoluteFill} from 'remotion';
import {DESIGN} from '../config/design';
/** Decorative and deliberately non-interactive. Foreground layers belong to the scene. */
export const EditorialBackground:React.FC=()=> <AbsoluteFill style={{background:DESIGN.background}}/>;
