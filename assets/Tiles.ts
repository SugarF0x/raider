const seedrandom = require('seedrandom');

// tile type can only equal to one of these
export type TTile = 'coin' | 'skull' | 'potion' | 'sword' | 'shield';
export type TEffect = 'burning' | 'poisoned' | 'frozen' | 'stunned' | 'vulnerable';
export type THud = 'coins' | 'upgrade' | 'experience' | 'health';

export interface TileState {
  health: number;
  armor: number;
  attack: number;
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
    this.id   = Math.floor(Math.random() * 1000000)
  }
}

export class Skull extends Tile {
  state: TileState;
  base: TileState;
  effect: TEffect[] = [];
  isFresh = true;

  constructor(power: number) {
    super('skull');
    const rng = new seedrandom(this.id)

    // generate base stats
    let base = {
      health: Math.floor(Math.pow(1.2, power)) + power - 1,
      armor: Math.floor(Math.pow(1.05, power)) + Math.floor(power * .5),
      attack: Math.floor(Math.pow(1.15, power)) + Math.floor(power * .25)
    } as TileState;

    // add randomness based on id seed
    base.health += Math.floor((rng() < 0.5 ? -1 : 1) * (Math.floor(rng() * 10) / 100) * base.health);
    base.armor += Math.floor((rng() < 0.5 ? -1 : 1) * (Math.floor(rng() * 10) / 100) * base.armor);
    base.attack += Math.floor((rng() < 0.5 ? -1 : 1) * (Math.floor(rng() * 10) / 100) * base.attack);

    // make sure it has at least 1 health
    if (base.health <= 0) base.health = 1;

    // assign values
    this.base  = base;
    this.state = base;
  }

  getReady() {
    this.isFresh = false;
  }
}

const dungeonMD_Stroke = '#503E90'
export const dungeonMD = {
  header: {
    x: 10,
    y: 10,
    width: 430,
    height: 40,
    stroke: dungeonMD_Stroke,
  },
  spell1: {
    x: 10,
    y: 60,
    width: 80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  spell2: {
    x: 100,
    y: 60,
    width: 80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  spell3: {
    x: 190,
    y: 60,
    width: 80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  spell4: {
    x: 280,
    y: 60,
    width: 80,
    height: 80,
    stroke: dungeonMD_Stroke,
  },
  menu: {
    x: 370,
    y: 60,
    width: 70,
    height: 35,
    stroke: dungeonMD_Stroke,
  },
  stats: {
    x: 370,
    y: 105,
    width: 70,
    height: 35,
    stroke: dungeonMD_Stroke,
  },
  dungeon: {
    x: 10,
    y: 150,
    width: 430,
    height: 430,
    stroke: dungeonMD_Stroke,
    fill: 'black'
  },
  hud: {
    x: 10,
    y: 590,
    width: 430,
    height: 150,
    stroke: dungeonMD_Stroke,
  },
  footer: {
    x: 10,
    y: 750,
    width: 430,
    height: 40,
    stroke: dungeonMD_Stroke,
  },
}
