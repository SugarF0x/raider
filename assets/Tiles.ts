import { KONVA_BACKGROUND_COLOR,  KONVA_STROKE_COLOR } from '~/assets/consts'
const seedrandom = require('seedrandom');

// items related

export type TShop = 'none' | 'item' | 'upgrade' | 'levelup'
export type TItem = 'helmet' | 'armor' | 'shield' | 'weapon' | 'accessory'
export type TBuffs = TBuffsArmor | TBuffsWeapon | TBuffsAccessory
export type TBuffsArmor = '' // TODO: define armor buffs
export type TBuffsWeapon = '' // TODO: define weapon buffs
export type TBuffsAccessory = '' // TODO: define accessory buffs

export class Item {
  id: number
  type: TItem
  stat: number
  buffs: TBuffs[]

  constructor(type: TItem, previousItem?: Item) {
    this.id = Math.floor(Math.random() * 1000000)
    this.type = type

    const rng = new seedrandom(this.id)

    if (previousItem) {
      // upgrade based on previous item
      this.stat = previousItem.stat+1 + (rng() > .7 ? 1 : 0)
      // TODO: have a chance to increase/decrease buffs
      this.buffs = previousItem.buffs
    } else {
      // generate new item
      this.stat = 1
      this.buffs = []
    }
  }

  getIconConfig(x: number, y: number, icons: HTMLImageElement) {
    let cropY = {
      weapon: 1,
      helmet: 201,
      armor: 401,
      shield: 601,
      accessory: 801
    }

    return {
      x: x,
      y: y,
      image: icons,
      width: 62,
      height: 62,
      crop: {
        x: 1 + (this.id%20)*50,
        y: cropY[this.type]+(this.id%4)*50,
        width: 50,
        height: 50
      }
    }
  }
}

// tile related

export type TFamily = 'coin' | 'skull' | 'potion' | 'sword' | 'shield' | 'effect'
export type TType = TTCoin | TTSkull | TTPotion | TTSword | TTShield | TTEffect
export type THud = 'coins' | 'upgrade' | 'experience' | 'health'

export type TTCoin   = 'common'
export type TTSkull  = 'common'  | 'boss'
export type TTPotion = 'common'  | 'mana'   | 'poison' | 'explosive'
export type TTSword  = 'common'  | 'broken' | 'skull'
export type TTShield = 'common'  | 'broken'
export type TTEffect = 'burning' | 'frozen' | 'vulnerable'

export interface TileState {
  health: number;
  armor: number;
  attack: number;
}

export interface IEffect {
  current: TTEffect[];
  duration: number;
  damage?: number;
}

export class Tile {
  family: TFamily;
  type: TType;
  effects: TTEffect[] = [];
  id: number;

  constructor(family: TFamily, type: TType = 'common') {
    this.family = family;
    this.type   = type;
    this.id     = Math.floor(Math.random() * 1000000)
  }
}

export class Skull extends Tile {
  state: TileState;
  base: TileState;
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

    // make sure it has at least 1 health and 1 damage
    if (base.health <= 0) base.health = 1;
    if (base.attack <= 0) base.attack = 1;

    // assign values
    this.base  = base;
    this.state = base;
  }

  getReady(): void {
    this.isFresh = false;
  }

  isFatal(value: number): boolean {
    if ((this.state.health + this.state.armor) - value <= 0) {
      if (this.effects.indexOf('vulnerable') === -1) {
        this.effects.push('vulnerable');
      }
      return true;
    } else {
      this.effects = this.effects.filter(entry => entry !== 'vulnerable')
      return false;
    }
  }

  applyDamage(value: number): void {
    let overkill = value - this.state.armor;
    if (overkill < 0) overkill = 0;

    for (let i = 0; i < value - overkill; i++) {
      // 30% chance for armor not to break
      if (Math.random() > .3) this.state.armor--;
    }

    if (overkill > 0) this.state.health -= overkill;
    if (this.state.health <= 0) {
      this.state.health = 0;
    }
  }
}

// markdown

export const dungeonMD = {
  header: {
    x: 10,
    y: 10,
    width: 430,
    height: 40,
    stroke: KONVA_STROKE_COLOR,
  },
  spell1: {
    x: 10,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  spell2: {
    x: 100,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  spell3: {
    x: 190,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  spell4: {
    x: 280,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  menu: {
    x: 370,
    y: 60,
    width: 70,
    height: 35,
    stroke: KONVA_STROKE_COLOR,
  },
  stats: {
    x: 370,
    y: 105,
    width: 70,
    height: 35,
    stroke: KONVA_STROKE_COLOR,
  },
  dungeon: {
    x: 10,
    y: 150,
    width: 430,
    height: 430,
    stroke: KONVA_STROKE_COLOR,
    fill: 'black'
  },
  hud: {
    x: 10,
    y: 590,
    width: 430,
    height: 150,
    stroke: KONVA_STROKE_COLOR,
  },
  footer: {
    x: 10,
    y: 750,
    width: 430,
    height: 40,
    stroke: KONVA_STROKE_COLOR,
  },
}
export const shopMD = {
  background: {
    x: 0,
    y: 0,
    width: 450,
    height: 850,
    fill: 'black',
    opacity: .5
  },
  screen: {
    x: 40,
    y: 190,
    width: 450,
    height: 350,
    stroke: KONVA_STROKE_COLOR,
    strokeWidth: 5,
    fill: KONVA_BACKGROUND_COLOR
  },
  screen_accept: {
    x: 40,
    y: 540.5,
    width: 100,
    height: 50,
    stroke: KONVA_STROKE_COLOR,
    strokeWidth: 5,
    fill: KONVA_BACKGROUND_COLOR
  },
  screen_acceptOverflow: {
    x: 42.5,
    y: 535,
    width: 95,
    height: 10,
    fill: KONVA_BACKGROUND_COLOR
  }
}
