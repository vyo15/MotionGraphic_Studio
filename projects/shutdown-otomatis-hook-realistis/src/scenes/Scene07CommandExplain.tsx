import React from 'react';
import type {VideoProps} from '../config/props';
import {BRIDGE_FRAMES,Scene05To06Flow} from './Scene05To06Flow';
/** Shared flow frames 90..464. No slide reset, no crossfade, no duplicate 3600. */
export const Scene07CommandExplain:React.FC<VideoProps>=(props)=><Scene05To06Flow {...props} frameOffset={BRIDGE_FRAMES}/>;
