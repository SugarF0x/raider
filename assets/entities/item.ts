import { Buff } from "~/assets/entities/index"

export type ItemType = 'helmet' | 'armor' | 'shield' | 'weapon' | 'accessory'

export default class Item {
  id: number
  type: ItemType
  powerName: string
  buffs: Buff[] = []
  name: string

  constructor(item: ItemType | Item) {
    this.id        = Math.floor(Math.random() * 1000000)
    this.type      = typeof item === 'object' ? item.type : item
    this.powerName = this.type === 'weapon' ? 'dmg' : this.type === 'accessory' ? 'hp' : 'def'
    this.name      = `${ this.type } #${ this.id % 80 + 1 }`

    if (typeof item === 'object') {
      // TODO: have a chance to increase/decrease other buffs
      item.buffs.forEach(buff => {
        this.buffs.push(new Buff(buff.type, item.type, buff.power))
      })
      this.upgradeItem()
      if (Math.random() > .85) this.upgradeItem() // chance for double upgrade
    } else {
      // generate new item
      let baseBuff: Buff
      switch (item) {
        case 'helmet':
        case 'armor':
        case 'shield':
          baseBuff = new Buff('defense', 'helmet')
          break
        case 'weapon':
          baseBuff = new Buff('damage', 'weapon')
          break
        case 'accessory':
          baseBuff = new Buff('vitality', 'accessory')
          break
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

  // TODO: perhaps refactor this out into a dedicated Buff component render?
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
        x: 1 + (this.id % 20) * 50,
        y: cropY[this.type] + (this.id % 4) * 50,
        width: 50,
        height: 50
      }
    }
  }
}