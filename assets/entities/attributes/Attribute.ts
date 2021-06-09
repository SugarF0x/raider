export class Attribute {
  type = AttributeType.DEFAULT
  id: number
  level: number

  text = {
    title: 'Default Attribute',
    description: 'Default description',
    short: 'DFT'
  }

  constructor(level = 1) {
    this.id = Math.floor(Math.random() * 1000000)
    this.level = level
  }
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
