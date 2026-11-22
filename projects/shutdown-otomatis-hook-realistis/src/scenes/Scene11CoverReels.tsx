import React from 'react';
import {Scene10To11Flow} from './Scene10To11Flow';
import {type VideoProps} from '../config/props';
/** Native editable cover: local frames 0–149 = shared frames 240–389. */
export const Scene11CoverReels:React.FC<VideoProps>=(p)=><Scene10To11Flow {...p} frameOffset={240}/>;
