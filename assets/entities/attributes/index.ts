import { Attribute, AttributeType } from "~/assets/entities/attributes/Attribute"

export * from './Strength'
export * from './Dexterity'
export * from './Vitality'
export * from './Luck'
export * from './Health'
export * from './Charisma'
export * from './Damage'
export * from './Defense'

import {
  Strength,
  Dexterity,
  Vitality,
  Luck,
  Health,
  Charisma,
  Damage,
  Defense,
} from "./"

export function getNewAttribute(type: AttributeType, level?: number) {
  switch(type) {
    case AttributeType.CHARISMA: return new Charisma(level)
    case AttributeType.DAMAGE: return new Damage(level)
    case AttributeType.DEFENSE: return new Defense(level)
    case AttributeType.DEXTERITY: return new Dexterity(level)
    case AttributeType.HEALTH: return new Health(level)
    case AttributeType.LUCK: return new Luck(level)
    case AttributeType.STRENGTH: return new Strength(level)
    case AttributeType.VITALITY: return new Vitality(level)
    default: return new Attribute(level)
  }
}