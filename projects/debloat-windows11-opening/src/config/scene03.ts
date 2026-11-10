/** Scene 03: all times in seconds, relative to this scene. 15s at 30fps. */
export const SCENE03 = {
  durationInFrames: 450,
  timing: {
    winutilStart: 0.0,
    introTitleChange: 2.15,
    authorReveal: 2.2,
    trashOpen: 0.8,
    trashClose: 6.4,
    appFlights: {
      xbox: {start: 2.65, end: 3.7},
      bing: {start: 3.85, end: 4.9},
      copilot: {start: 5.0, end: 6.05},
    },
    githubStart: 6.75,
    githubTransitionEnd: 7.35,
    repoFilesStart: 7.4,
    openSourceStart: 8.55,
    starIconStart: 9.6,
    starLabelStart: 10.3,
    starNumberStart: 11.15,
    quickStartHold: 13.65,
  },
  positions: {
    topKicker: {x: 76, y: 245},
    stage: {x: 80, y: 514, width: 920, height: 932},
    apps: [
      {x: 274, y: 816},
      {x: 540, y: 816},
      {x: 806, y: 816},
    ],
    bin: {x: 370, y: 1022, width: 340, height: 462},
    subtitle: {x: 105, y: 1484, width: 870, height: 84},
  },
  colors: {
    stage: '#FFFFFF',
    stageToolbar: '#F4F4F3',
    ink: '#242A34',
    muted: '#717780',
    coral: '#D8876D',
    green: '#22996F',
    star: '#E5A62F',
  },
  // Ubah asset di src/components/AppIcons.tsx; background/color di design.ts.
  note: 'Tong sampah adalah metafora penghapusan; bukan Windows Recycle Bin asli.',
} as const;
