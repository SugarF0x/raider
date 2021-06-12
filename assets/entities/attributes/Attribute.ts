import { Entity, EntityOptions } from "~/assets/entities"

export class Attribute extends Entity {
  type = AttributeType.DEFAULT
  level: number

  text = {
    title: 'Default Attribute',
    description: 'Default description',
    short: 'DFT'
  }

  constructor(options: AttributeOptions = { level: 1 }) {
    super(options)
    this.level = options.level
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
