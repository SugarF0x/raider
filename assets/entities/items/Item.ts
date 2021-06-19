import { Entity, EntityOptions } from "~/assets/entities"
import { Attribute } from "~/assets/entities/attributes"
import { BASE_DOUBLE_UPGRADE_CHANCE } from "~/assets/consts/balance"
import { ImageConfig, XY } from "~/assets/types"

export class Item extends Entity {
  type = ItemType.DEFAULT
  stat = new Attribute()
  buffs: any[] = []
  name: string

  constructor(options?: ItemOptions) {
    super(options)
    this.name = `${this.type} #${this.id%80+1}`

    // mutations based
    if (options?.sourceItem) {
      Object.assign(this.buffs, options.sourceItem.buffs)
      this.stat.upgrade()
      // double upgrade chance
      if (Math.random() < BASE_DOUBLE_UPGRADE_CHANCE) this.stat.upgrade()
    }
  }

  addBuff(buff: any) {
    this.accessor.character.MUTATE_ITEM(() => {
      const newBuff: any = 'aids'

      this.removeBuff(buff)
      this.buffs.push(newBuff)
    })
  }

  removeBuff(buff: any) {
    this.accessor.character.MUTATE_ITEM(() => {
      const currentBuff = this.buffs.find(entry => entry.type === buff)
      if (currentBuff) {
        const index = this.buffs.indexOf(currentBuff)
        this.buffs.splice(index)
      }
    })
  }

  getIconConfig(position: XY): ImageConfig {
    if (this.type === ItemType.DEFAULT) throw new Error(`item ${this.id} does not have an assigned icon config`)
    return {
      ...position,
      image: this.accessor.assets.icons,
      width: 62,
      height: 62,
      crop: {
        x: 0,
        y: 0,
        width: 50,
        height: 50
      }
    }
  }
}

export interface ItemOptions extends EntityOptions {
  sourceItem?: Item
}

export enum ItemType {
  DEFAULT = 'default',
  HELMET = 'helmet',
  TORSO = 'torso',
  SHIELD = 'shield',
  WEAPON = 'weapon',
  ACCESSORY = 'accessory'
}