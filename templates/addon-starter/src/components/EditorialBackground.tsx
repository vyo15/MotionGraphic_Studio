import React from 'react';
import {Interactive} from 'remotion';
/** Background is also an editable native Studio layer. */
export const EditorialBackground: React.FC = () => (
  <Interactive.Div name="S00 — Background" data-qa-track="S00 — Background" style={{
    position: 'absolute', inset: 0, backgroundColor: '#F7F7F5',
  }}/>
);
