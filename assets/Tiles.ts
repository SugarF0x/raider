// tile type can only equal to one of these
export type TTile = 'coin' | 'skull' | 'potion' | 'sword' | 'shield';
export type TEffect = 'burning' | 'poisoned' | 'frozen' | 'stunned';
export type THud = 'coins' | 'upgrade' | 'experience' | 'health';

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
  id: number;

  constructor(type: TTile) {
    this.type = type;
    this.id = Math.floor(Math.random()*1000000)
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

const dungeonMD_Stroke = '#503E90'
export const dungeonMD = {
  header:  {
    x:      10,
    y:      10,
    width:  430,
    height: 40,
    stroke: dungeonMD_Stroke,
  },
  spell1:  {
    x:      10,
    y:      60,
    width:  80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  spell2:  {
    x:      100,
    y:      60,
    width:  80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  spell3:  {
    x:      190,
    y:      60,
    width:  80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  spell4:  {
    x:      280,
    y:      60,
    width:  80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  menu:    {
    x:      370,
    y:      60,
    width:  70,
    height: 35,
    stroke: dungeonMD_Stroke,
  },
  stats:   {
    x:      370,
    y:      105,
    width:  70,
    height: 35,
    stroke: dungeonMD_Stroke,
  },
  dungeon: {
    x:      10,
    y:      150,
    width:  430,
    height: 430,
    stroke: dungeonMD_Stroke,
    fill: 'black'
  },
  hud:     {
    x:      10,
    y:      590,
    width:  430,
    height: 150,
    stroke: dungeonMD_Stroke,
  },
  footer:  {
    x:      10,
    y:      750,
    width:  430,
    height: 40,
    stroke: dungeonMD_Stroke,
  },
}
