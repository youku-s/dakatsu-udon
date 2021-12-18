interface Sheet {
  uuid: string;
  isPrivate: boolean;
  password?: string;
  tags: Array<string>;
  profile: Profile;
  favors: Array<Favor>;
  usedFavors: Array<UsedFavor>;
  classes: Classes;
  tabs: Array<ItemTab>;
}

interface Profile {
  name: string;
  race: string;
  age: string;
  place: Place;
  height: string;
  weight: string;
  implication: string;
  hair: string;
  eye: string;
  skin: string;
  memo: string;
  memories: Array<Memory>;
  regrets: Array<Regret>;
  karmas: Array<Karma>;
}

enum Place {
  Purgatory = 'Purgatory',
  Garden = 'Garden',
  Paradise = 'Paradise',
}

interface Memory {
  uuid: string;
  name: string;
  description: string;
}

interface Regret {
  uuid: string;
  target: string;
  name: string;
  currentVal: number;
  maxVal: number;
  negative: string;
  description: string;
}

interface Karma {
  uuid: string;
  achieved: boolean;
  name: string;
  description: string;
}

interface Favor {
  uuid: string;
  personal?: number;
  battle?: number;
  memo: string;
}

interface UsedFavor {
  uuid: string;
  purpose: string;
  favor: number;
  memo: string;
}

interface Classes {
  positions: Array<PositionDetail>;
  subPositions: Array<SubPositionDetail>;
  highTechs: Array<HighTechDetail>;
  classes: Array<ClassDetail>;
  points: Array<Point>;
}

interface PositionDetail {
  uuid: string;
  name: string;
}

interface SubPositionDetail {
  uuid: string;
  name: string;
}

interface HighTechDetail {
  uuid: string;
  name: string;
  favor?: number;
}

enum ClassCategory {
  MainClass = 'MainClass',
  SubClass = 'SubClass',
  SecondClass = 'SecondClass',
  ThirdClass = 'ThirdClass',
  ThirdPointFiveClass = 'ThirdPointFiveClass',
  HighSociety = 'HighSociety',
  HighSocietyPlus = 'HighSocietyPlus',
  OtherClass = 'OtherClass',
}

interface ClassDetail {
  uuid: string;
  category: ClassCategory;
  from: string;
  name: string;
  number: number;
}

interface Point {
  uuid: String;
  name: String;
  busou?: number;
  heni?: number;
  kaizou?: number;
  favor?: number;
}

interface ItemTab {
  uuid: string;
  tabType: ItemTabType;
  title: string;
  items: Array<Maneuva> | Array<Resource>;
}

enum ItemTabType {
  ManeuvaTab = 'ManeuvaTab',
  ResourceTab = 'ResourceTab',
}

enum ManeuvaType {
  Skill = 'Skill',
  Part = 'Part',
  Item = 'Item',
  Effect = 'Effect',
  Archive = 'Archive',
  Tag = 'Tag',
}

interface Maneuva {
  uuid: string;
  used: boolean;
  lost: boolean;
  act?: number;
  malice?: number;
  favor?: number;
  maneuvaType: ManeuvaType;
  category: string;
  name: string;
  timing: Timing;
  cost: string;
  range: string;
  description: string;
  from: string;
  region: Region;
  position: number;
}

enum Region {
  NoRegion = 'NoRegion',
  Head = 'Head',
  Arm = 'Arm',
  Body = 'Body',
  Leg = 'Leg',
  Girl = 'Girl',
  OtherRegion = 'OtherRegion',
}

enum Timing {
  AutoAlways = 'AutoAlways',
  AutoNeedsDeclearation = 'AutoNeedsDeclearation',
  AutoOthers = 'AutoOthers',
  Action = 'Action',
  Judge = 'Judge',
  Damage = 'Damage',
  Rapid = 'Rapid',
  FastRapid = 'FastRapid',
  BeforeBattle = 'BeforeBattle',
  BattleStart = 'BattleStart',
  TurnStart = 'TurnStart',
  CountStart = 'CountStart',
}

interface Resource {
  uuid: string;
  name: string;
  description: string;
  favor?: number;
  position: number;
}

export type { Sheet, Profile, Memory, Regret, Karma };
export { Place };
