import { TILESET_COORDS, BUFF_TEXT, TBuffs } from './consts'
const seedRandom = require('seedrandom');

// items related

// TODO: segment buffs in such a way that ARMOR_BUFFS can not overlap - e.g. some are for helmets, some are for torso, some are for shield ONLY

export type TShop = 'none' | 'item' | 'upgrade' | 'levelup'
export type TItem = 'helmet' | 'armor' | 'shield' | 'weapon' | 'accessory'

export class Item {
  id: number
  type: TItem
  powerName: string
  buffs: Buff[] = []
  name: string

  constructor(item: TItem | Item) {
    this.id = Math.floor(Math.random() * 1000000)
    this.type = typeof item === 'object' ? item.type : item
    this.powerName = this.type === 'weapon' ? 'dmg' : this.type === 'accessory' ? 'hp' : 'def'
    this.name = `${this.type} #${this.id%80+1}`

    const rng = new seedRandom(this.id)

    if (typeof item === 'object') {
      // TODO: have a chance to increase/decrease other buffs
      item.buffs.forEach(buff => {
        this.buffs.push(new Buff(buff.type, item.type, buff.power))
      })
      this.upgradeItem()
      if (rng() > .85) this.upgradeItem() // chance for double upgrade
    } else {
      // generate new item
      let baseBuff: Buff
      switch (item) {
        case 'helmet': case 'armor': case 'shield':
          baseBuff = new Buff('defense', 'helmet'); break
        case 'weapon':
          baseBuff = new Buff('damage', 'weapon'); break
        case 'accessory':
          baseBuff = new Buff('vitality', 'accessory'); break
      }
      this.buffs = [baseBuff]
    }
  }

  upgradeItem() {
    this.getBaseBuff()?.upgrade() // upgrade main stat
  }

  applyBuff(buff: Buff) {
    let ownBuff = this.buffs.find(entry => entry.type === buff.type)
    if (ownBuff) {
      ownBuff.upgrade()
    } else {
      this.buffs.push(buff)
    }
  }

  getBaseBuff() {
    return this.buffs[0]
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

export class Buff {
  type: TBuffs
  target: TItem
  power: number

  constructor(type: TBuffs, target: TItem, power = 1) {
    this.type = type
    this.power = power
    this.target = target
  }

  upgrade() { // TODO: make it individual to buffs due to them having different effects e.g. +XP will have a +0.25 and A.STR will have a diminishing return
    this.power++
  }

  getIconConfig(x: number, y: number, icons: HTMLImageElement) {
    return {
      x: x,
      y: y,
      image: icons,
      width: 62,
      height: 62,
      crop: {
        x: TILESET_COORDS.buff.base.x + 50*(TILESET_COORDS.buff.order.indexOf(this.type) % 10),
        y: TILESET_COORDS.buff.base.y + 50*Math.floor(TILESET_COORDS.buff.order.indexOf(this.type) / 10),
        width: 50,
        height: 50
      }
    }
  }

  getText() {
    return BUFF_TEXT[this.type] // TODO: mace custom getText handlers so that e.g. Armor Strength will return % chance of each point to break
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

// TODO: refactor Effects to be of dedicated classes
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
