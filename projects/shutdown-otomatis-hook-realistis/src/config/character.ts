/** Golden Scene S01: semua perubahan ekspresi menggunakan frame (bukan CSS animation). */
export const stickmanCharacter = {
  name: 'Stickman Editorial',
  style: '2D clean bold line, head circle, neutral expressive features',
  timeline: {
    watching: [0,58],
    sleepy: [58,106],
    yawning: [106,150],
    sleeping: [150,209],
    resultHold: [209,240],
  },
  expression: {blinkFrames: [[30,35],[74,79],[96,100]]},
  layers: ['background','chair','body','desk','laptop','arms','head','filmCard'] as const,
} as const;
