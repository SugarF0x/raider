import { Entity, EntityOptions } from "~/assets/entities"
import { TextConfig, XY } from "~/assets/types"
import { measureText } from "~/assets/utils"

export class Attribute extends Entity {
  type = AttributeType.DEFAULT
  level: number

  text = {
    title: 'Default Attribute',
    description: 'Default description',
    short: 'DFT'
  }

  constructor(options: AttributeOptions = { level: 0 }) {
    super(options)
    this.level = options.level
  }

  getTextConfigs(position: XY) {
    const base = {
      align: 'left',
      width: 200,
      fill: 'lightgray'
    }
    return {
      titleConfig: {
        text: this.text.title,
        ...base,
        ...position
      } as TextConfig,
      descriptionConfig: {
        text: this.text.description,
        ...base,
        fontSize: 14,
        x: position.x,
        y: position.y + 21
      } as TextConfig,
      shortConfig: {
        text: this.text.short,
        ...base,
        fontSize: 14,
        x: position.x,
        y: position.y + 43
      } as TextConfig
    }
  }

  getUpgradeTextConfig(position: XY): TextConfig[] {
    const baseConfig = {
      y: position.y,
      listening: false,
      color: 'lightgray',
      align: 'left',
      fontSize: 14
    }

    const base = {
      x: position.x,
      text: `${this.text.short}: `
    }

    const firstDigit = {
      x: position.x + measureText(base.text, baseConfig.fontSize),
      text: `${this.level} `,
      fill: 'red'
    }

    const separator = {
      x: firstDigit.x + measureText(firstDigit.text, baseConfig.fontSize),
      text: `>> `,
    }

    const lastDigit = {
      x: separator.x + measureText(separator.text, baseConfig.fontSize),
      text: `${this.level + 1}`,
      fill: 'lightgreen'
    }

    return [base, firstDigit, separator, lastDigit].map(entry => ({ ...baseConfig, ...entry }))
  }
}

export interface AttributeOptions extends EntityOptions {
  level: number
}

export enum AttributeType {
  DEFAULT = 'default',
  // base damage & bonus exp chance +1 & +5% per tier respectively
  STRENGTH = 'strength',
  // repair per shield & bonus shield chance +1 & +5% per tier respectively
  DEXTERITY = 'dexterity',
  // health per potion & bonus potion chance +1 & +5% per tier respectively
  VITALITY = 'vitality',
  // bonus coin chance +5% per tier
  LUCK = 'luck',
  // bonus health +15 per tier
  HEALTH = 'health',
  // bonus every chance +5% per tier
  CHARISMA = 'charisma',
  DAMAGE = 'damage',
  DEFENSE = 'defense'
}
