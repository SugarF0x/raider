// tile type can only equal to one of these
export type TTile = 'coin' | 'skull' | 'potion' | 'sword' | 'shield';

export type TEffect = 'burning' | 'poisoned' | 'frozen' | 'stunned';

export interface TileState {
  health: number;
  armor:  number;
  attack: number;
  effect: TEffect;
}

export interface IEffect {
  current: TEffect[];
  duration: number;
  damage?: number;
}

export class Tile {
  type: TTile;
  id: string;

  constructor(type: TTile) {
    this.type = type;
    this.id = `${type}#${Math.floor(Math.random()*1000)}`
  }
}

export class Skull extends Tile {
  state: TileState;
  base:  TileState;

  constructor(state: TileState) {
    super('skull');

    this.base  = state;
    this.state = state;
  }
}

export const dungeonMD = {
  header:  {
    x:      10,
    y:      10,
    width:  430,
    height: 40,
    stroke: 'black',
  },
  spell1:  {
    x:      10,
    y:      60,
    width:  80,
    height: 80,
    stroke: "black",
  },
  spell2:  {
    x:      100,
    y:      60,
    width:  80,
    height: 80,
    stroke: "black",
  },
  spell3:  {
    x:      190,
    y:      60,
    width:  80,
    height: 80,
    stroke: "black",
  },
  spell4:  {
    x:      280,
    y:      60,
    width:  80,
    height: 80,
    stroke: "black",
  },
  menu:    {
    x:      370,
    y:      60,
    width:  70,
    height: 35,
    stroke: "black",
  },
  stats:   {
    x:      370,
    y:      105,
    width:  70,
    height: 35,
    stroke: "black",
  },
  dungeon: {
    x:      10,
    y:      150,
    width:  430,
    height: 430,
    stroke: "black",
  },
  gold:    {
    x:      10,
    y:      590,
    width:  130,
    height: 150,
    stroke: "black",
  },
  enemy:   {
    x:      150,
    y:      590,
    width:  43,
    height: 50,
    stroke: "black",
  },
  defence: {
    x:      203,
    y:      590,
    width:  43,
    height: 50,
    stroke: "black",
  },
  attack:  {
    x:      256,
    y:      590,
    width:  43,
    height: 50,
    stroke: "black",
  },
  upgrade: {
    x:      150,
    y:      650,
    width:  150,
    height: 40,
    stroke: "black",
  },
  level:   {
    x:      150,
    y:      700,
    width:  150,
    height: 40,
    stroke: "black",
  },
  health:  {
    x:      310,
    y:      590,
    width:  130,
    height: 150,
    stroke: "black",
  },
  footer:  {
    x:      10,
    y:      750,
    width:  430,
    height: 40,
    stroke: "black",
  },
}
