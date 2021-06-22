import { Entity, EntityOptions } from "~/assets/entities"
import { Attribute, getNewAttribute } from "~/assets/entities/attributes"
import { BASE_DOUBLE_UPGRADE_CHANCE } from "~/assets/consts/balance"
import { ImageConfig, TextConfig, XY } from "~/assets/types"
import Konva from "konva"

export class Item extends Entity {
  type = ItemType.DEFAULT
  stat = new Attribute()
  buffs: any[] = []
  name: string

  constructor(options?: ItemOptions) {
    super(options)
    this.name = `Placeholder #${this.id%80+1}`

    // mutations based
    if (options?.sourceItem) {
      Object.assign(this.buffs, options.sourceItem.buffs)
      const newLevel = options.sourceItem.stat.level
        // base upgrade
        + 1
        // double upgrade chance
        + (Math.random() < BASE_DOUBLE_UPGRADE_CHANCE ? 1 : 0)

      this.stat = getNewAttribute(options.sourceItem.stat.type, { level: newLevel })
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

  getTextConfigs(position: XY): TextConfig[] {
    const base = {
      align: 'left',
      width: 200,
      fill: 'lightgray'
    }

    const titleConfig = {
      text: this.name,
      ...base,
      ...position
    }

    return [titleConfig]
  }

  getUpgradeTextConfigs(position: XY, comparison?: Item): TextConfig[] {
    const baseConfig = {
      y: position.y,
      listening: false,
      color: 'lightgray',
      align: 'left',
      fontSize: 14
    }

    const text = new Konva.Text({
      fontSize: 14,
      fontFamily: 'Comic Sans MS'
    })

    const configs = []

    const mainStat = this.stat.level > 0 ? {
      x: position.x,
      text: `${this.stat.text.short} ${this.stat.level} `
    } : undefined
    if (mainStat) configs.push(mainStat)

    this.buffs.forEach(buff => {
      // TODO: add buff text w/ possible comparison once buffs are in
    })

    return configs.map(entry => ({ ...baseConfig, ...entry }))
  }

  getImageConfig(position: XY): ImageConfig {
    return {
      ...super.getImageConfig(position),
      image: this.accessor.assets.icons
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