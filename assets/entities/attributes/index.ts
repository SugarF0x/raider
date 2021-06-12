export * from './Attribute'
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
  AttributeType
} from "./"

export function getRandomAttribute() {
  const attributes: AttributeType[] = []
  for (let attribute in AttributeType) {
    if (attribute !== 'DEFAULT')
      // noinspection JSUnfilteredForInLoop
      attributes.push(attribute.toLowerCase() as AttributeType)
  }

  const type = attributes[Math.floor(Math.random() * attributes.length)]

  switch(type) {
    case AttributeType.CHARISMA: return new Charisma()
    case AttributeType.DAMAGE: return new Damage()
    case AttributeType.DEFENSE: return new Defense()
    case AttributeType.DEXTERITY: return new Dexterity()
    case AttributeType.HEALTH: return new Health()
    case AttributeType.LUCK: return new Luck()
    case AttributeType.STRENGTH: return new Strength()
    case AttributeType.VITALITY: return new Vitality()
    default: throw new Error(`No attribute of type "${type}" found`)
  }
}