/** Canvas coordinates: 540×960 logical, scaled by SVG to 1080×1920. */
export const CARD_BREAK={
  durationInFrames:390,
  // Last S01 frame continues for 5 frames before the Card Break begins.
  startFrame:5,
  defaultDurationFrames:23,
  defaultSpread:1,
  defaultRotation:1,
  shards:[
    {id:'A',clip:'59,480 210,480 198,555 59,566',dx:-145,dy:-105,rot:-19,pivotX:134,pivotY:520},
    {id:'B',clip:'210,480 352,480 339,545 198,555',dx:18,dy:-150,rot:12,pivotX:272,pivotY:512},
    {id:'C',clip:'352,480 481,480 481,563 339,545',dx:156,dy:-82,rot:23,pivotX:409,pivotY:520},
    {id:'D',clip:'59,566 198,555 205,688 59,688',dx:-166,dy:117,rot:17,pivotX:130,pivotY:615},
    {id:'E',clip:'198,555 339,545 351,688 205,688',dx:-2,dy:160,rot:-17,pivotX:267,pivotY:620},
    {id:'F',clip:'339,545 481,563 481,688 351,688',dx:166,dy:97,rot:-24,pivotX:414,pivotY:630},
  ]
} as const;
