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
  AttributeType, AttributeOptions,
} from "./"

export function getRandomAttribute() {
  const attributes: AttributeType[] = []
  for (let attribute in AttributeType) {
    if (attribute !== 'DEFAULT')
      // noinspection JSUnfilteredForInLoop
      attributes.push(attribute.toLowerCase() as AttributeType)
  }

  const type = attributes[Math.floor(Math.random() * attributes.length)]
  return getNewAttribute(type)
}

export function getNewAttribute(type: AttributeType, options?: AttributeOptions) {
  switch(type) {
    case AttributeType.CHARISMA: return new Charisma(options)
    case AttributeType.DAMAGE: return new Damage(options)
    case AttributeType.DEFENSE: return new Defense(options)
    case AttributeType.DEXTERITY: return new Dexterity(options)
    case AttributeType.HEALTH: return new Health(options)
    case AttributeType.LUCK: return new Luck(options)
    case AttributeType.STRENGTH: return new Strength(options)
    case AttributeType.VITALITY: return new Vitality(options)
    default: throw new Error(`No attribute of type "${type}" found`)
  }
}