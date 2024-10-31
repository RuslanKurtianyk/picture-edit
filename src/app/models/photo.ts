export enum Orientation {
  PORTRAIT = 'PORTRAIT',
  ALBUM = 'ALBUM',
}

export interface PhotoSize {
  width: number;
  height: number;
}

export const photoSizes: Map<string, PhotoSize> = new Map([
  ['9x13', { width: 9, height: 13 }],
  ['10x15', { width: 10, height: 15 }],
  ['13x18', { width: 13, height: 18 }],
  ['15x20', { width: 15, height: 20 }],
  ['18x24', { width: 18, height: 24 }],
  ['20x30', { width: 20, height: 30 }],
  ['30x40', { width: 30, height: 40 }],
  ['30x45', { width: 30, height: 45 }],
  ['30x60', { width: 30, height: 60 }],
  ['30x70', { width: 30, height: 70 }],
  ['30x80', { width: 30, height: 80 }],
  ['30x90', { width: 30, height: 90 }],
]);
