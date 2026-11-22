import React from 'react';
import {Scene10To11Flow} from './Scene10To11Flow';
import {type VideoProps} from '../config/props';
/** Native editable CTA: local frames 0–239 of the shared CTA/cover animation. */
export const Scene10CTA:React.FC<VideoProps>=(p)=><Scene10To11Flow {...p} frameOffset={0}/>;
