import { Entity, EntityOptions } from "~/assets/entities"
import { TextConfig, XY } from "~/assets/types"
import Konva from "konva"

export class Attribute extends Entity {
  type = AttributeType.DEFAULT
  level = 0

  text = {
    title: 'Default Attribute',
    description: 'Default description',
    short: 'DFT'
  }

  constructor(options?: AttributeOptions) {
    super(options)
    if (options?.level) this.level = options.level
  }

  upgrade() {
    this.accessor.character.MUTATE_ATTRIBUTE(() => {
      this.level++
    })
  }

  // TODO: unite getTextConfig & getUpgradeTextConfig into one function

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
    const descriptionConfig = {
      text: this.text.description,
      ...base,
      fontSize: 14,
      x: position.x,
      y: position.y + 21
    }
    // const shortConfig = {
    //   text: this.text.short,
    //   ...base,
    //   fontSize: 14,
    //   x: position.x,
    //   y: position.y + 43
    // }

    return [titleConfig, descriptionConfig]
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

export interface AttributeOptions extends EntityOptions {
  level?: number
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
