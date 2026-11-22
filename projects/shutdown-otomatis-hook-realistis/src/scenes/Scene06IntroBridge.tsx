import React from 'react';
import type {VideoProps} from '../config/props';
import {Scene05To06Flow} from './Scene05To06Flow';
/** Shared flow frames 0..89. Final frame and next first frame are adjacent. */
export const Scene06IntroBridge:React.FC<VideoProps>=(props)=><Scene05To06Flow {...props} frameOffset={0}/>;
