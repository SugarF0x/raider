import * as C from './consts'
const seedRandom = require('seedrandom');

// items related

export type TShop = 'none' | 'item' | 'upgrade' | 'levelup'
export type TItem = 'helmet' | 'armor' | 'shield' | 'weapon' | 'accessory'
export type TBuffs = TBuffsArmor | TBuffsWeapon | TBuffsAccessory
export type TBuffsArmor = 'gold' | 'upgrade' | 'thorns' | 'armor strength' | 'blunting' | 'dexterity'
export type TBuffsWeapon = 'damage' | 'leech' | 'poison' | 'armor piercing' | 'xp' | 'strength'
export type TBuffsAccessory = 'quick' | 'luck' | 'regeneration' | 'vitality'

export class Item {
  id: number
  type: TItem
  power: number
  powerName: string
  buffs: Buff[]
  name: string

  constructor(item: TItem | Item) {
    this.id = Math.floor(Math.random() * 1000000)
    this.type = typeof item === 'object' ? item.type : item
    this.powerName = this.type === 'weapon' ? 'dmg' : this.type === 'accessory' ? 'hp' : 'def'
    this.name = `${this.type} #${this.id%80+1}`

    const rng = new seedRandom(this.id)

    if (typeof item === 'object') {
      // upgrade based on previous item
      this.power = item.power+1 + (rng() > .7 ? 1 : 0)
      // TODO: have a chance to increase/decrease buffs
      this.buffs = item.buffs
    } else {
      // generate new item
      this.power = 1
      this.buffs = []
    }
  }

  upgradeItem() {
    this.power++; // this shall be replaced with buffs for upgrades
    // TODO: add buffs application
  }

  getPowerText() {
    if (this.powerName === 'hp') return `${this.power*15} ${this.powerName}`
    else return `${this.power} ${this.powerName}`
  }

  getIconConfig(x: number, y: number, icons: HTMLImageElement) {
    let cropY = {
      weapon: 1,
      helmet: 201,
      shield: 401,
      armor: 601,
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

class Buff {
  type: TBuffs
  power: number

  constructor(type: TBuffs, power: number) {
    this.type = type
    this.power = power
  }

  getIconConfig(x: number, y: number, icons: HTMLImageElement) {
    return {
      x: x,
      y: y,
      image: icons,
      width: 62,
      height: 62,
      crop: {
        x: C.TILESET_COORDS.buff.base.x + 50*(C.TILESET_COORDS.buff.order.indexOf(this.type) % 10),
        y: C.TILESET_COORDS.buff.base.y + 50*Math.floor(C.TILESET_COORDS.buff.order.indexOf(this.type) / 10),
        width: 50,
        height: 50
      }
    }
  }

  getText() {
    return C.BUFF_TEXT[this.type]
  }
}

// tile related

export type TFamily = 'coin' | 'skull' | 'potion' | 'sword' | 'shield'
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
  key: string;

  constructor(key: string, family: TFamily, type: TType = 'common') {
    this.key = key
    this.family = family
    this.type = type
    this.id = Math.floor(Math.random() * 1000000)
  }

  moveTile(newKey: string) {
    this.key = newKey
  }
}

export class Skull extends Tile {
  state: TileState;
  base: TileState;
  isFresh = true;

  constructor(key: string, power: number) {
    super(key, 'skull');
    const rng = new seedRandom(this.id)

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
