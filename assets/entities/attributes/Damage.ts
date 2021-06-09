import { Attribute, AttributeType } from "./Attribute"

export class Damage extends Attribute {
  type = AttributeType.DAMAGE
  text = {
    title: 'Damage',
    description: 'Damage per sword',
    short: 'DMG'
  }
}

export function isDamage(attribute: Attribute): attribute is Damage {
  return attribute.type === AttributeType.DAMAGE
}