export const DnDItems = {
  Maneuva: 'Maneuva',
  Resource: 'Resource',
} as const;

export type DnDItems = typeof DnDItems[keyof typeof DnDItems];
