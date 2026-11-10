import React from 'react';
import {Img, staticFile} from 'remotion';

export type AppName = 'Edge'|'Copilot'|'Xbox'|'Outlook'|'Paint'|'Clock'|'Store'|'Notepad'|'Bing Search';
const iconPath: Record<AppName, string> = {
  Edge: 'edge.svg', Copilot: 'copilot.png', Xbox: 'xbox.svg', Outlook: 'outlook.svg',
  Paint: 'paint.svg', Clock: 'clock.svg', Store: 'store.svg', Notepad: 'notepad.svg',
  'Bing Search': 'bing.svg',
};
export const AppIcon: React.FC<{app: AppName; size?: number}> = ({app, size = 56}) => (
  <Img src={staticFile(`videos/debloat-windows11-opening/images/${iconPath[app]}`)}
       style={{width: size, height: size, objectFit: 'contain', display: 'block'}}/>
);
