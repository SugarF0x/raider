import { Entity, EntityOptions } from "~/assets/entities"
import { TextConfig, XY } from "~/assets/types"
import Konva from "konva"

export class Buff extends Entity {
  type = BuffType.DEFAULT
  level: number
  maxLevel = 99

  text = {
    title: 'Default Buff',
    description: 'Default description',
    short: 'DFT'
  }

  constructor(options?: BuffOptions) {
    super(options)
    this.level = options?.level ?? 1
  }

  upgrade() {
    this.accessor.character.MUTATE_BUFF(() => { if (this.level + 1 <= this.maxLevel) this.level++ })
  }

  getTextConfigs(position: XY): TextConfig[] {
    const base = {
      align: 'left',
      width: 200,
      fill: 'lightgray'
    }

    const titleConfig = {
      text: this.text.title,
      ...base,
      ...position
    }

    return [titleConfig]
  }

  getUpgradeTextConfigs(position: XY): TextConfig[] {
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

    const base = {
      x: position.x,
      text: `${this.text.short}: `
    }

    const firstDigit = {
      x: position.x + text.measureSize(base.text).width,
      text: `${this.level} `,
      fill: 'red'
    }

    const separator = {
      x: firstDigit.x + text.measureSize(firstDigit.text).width,
      text: `>> `,
    }

    const lastDigit = {
      x: separator.x + text.measureSize(separator.text).width,
      text: `${this.level + 1}`,
      fill: 'lightgreen'
    }

    return [base, firstDigit, separator, lastDigit].map(entry => ({ ...baseConfig, ...entry }))
  }
}

export interface BuffOptions extends EntityOptions {
  level?: number
}

export enum BuffType {
  DEFAULT = 'default',

  DAMAGE = 'damage',
  BASE_DAMAGE = 'base damage',
  LEECH = 'leech',
  POISON = 'poison',
  ARMOR_PIERCING = 'armor piercing',
  QUICK = 'quick',
  XP_PER_SKULL = 'xp per skull',
  GOLD_PER_COIN = 'gold per coin',
  STRENGTH = 'strength',
  LUCK = 'luck',

  REGENERATION = 'regeneration',
  DEFENSE = 'defense',
  THORNS = 'thorns',
  UPGRADE_PER_SHIELD = 'upgrade per shield',
  ARMOR_STRENGTH = 'armor strength',
  BLUNTING = 'blunting',
  REPAIR = 'repair',
  HEALING = 'healing',
  DEXTERITY = 'dexterity',
  VITALITY = 'vitality'
}