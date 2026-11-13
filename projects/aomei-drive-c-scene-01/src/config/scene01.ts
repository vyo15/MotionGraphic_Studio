/** Timeline seconds are relative to Scene 01. Adjust to fit a real recorded VO. */
export const SCENE01 = {
  duration: 7.45,
  layout: {
    header: {x: 95, y: 225, width: 700, height: 32},
    explorer: {x: 80, y: 457, width: 920, height: 945},
    disk: {x: 129, y: 652, width: 822, height: 620},
    subtitle: {x: 90, y: 1524, width: 900, height: 96},
  },
  moments: {
    explorer: {in: .15, fullyVisible: .85, out: 4.15, gone: 4.65},
    c: {from: .92, to: 3.35},
    d: {from: 3.18, to: 4.58},
    disk: {in: 4.25, fullyVisible: 4.88},
    question: {in: 5.72, fullyVisible: 6.26},
  },
  // VO baru (belum direkam):
  // "Waktu Drive C penuh, pernah nggak kepikiran buat nambahin kapasitasnya dari Drive D?"
  captions: [
    {id: 'cap-1', from: 0, to: 1.55, value: 'Waktu Drive C penuh,'},
    {id: 'cap-2', from: 1.55, to: 3.1, value: 'pernah nggak kepikiran'},
    {id: 'cap-3', from: 3.1, to: 5.52, value: 'buat nambahin kapasitasnya'},
    {id: 'cap-4', from: 5.52, to: 7.45, value: 'dari Drive D?'},
  ],
  cursor: [
    {t: 0, x: 775, y: 1095},
    {t: .7, x: 780, y: 1088},
    {t: 1.33, x: 821, y: 897},
    {t: 2.95, x: 821, y: 897},
    {t: 3.66, x: 794, y: 1168},
    {t: 4.38, x: 794, y: 1168},
  ],
  samplePartition: {cTotalGb: 120, cFreeGb: 5, dTotalGb: 360, dFreeGb: 295},
} as const;

export type LayerControl = {x:number;y:number;scale:number;rotation:number;opacity:number};
export type EditorGroup = 'explorer'|'disk'|'header'|'cursor'|'subtitle';
export type Scene01Editor = Record<EditorGroup,LayerControl>;
export const DEFAULT_ADJUST:LayerControl={x:0,y:0,scale:1,rotation:0,opacity:1};
