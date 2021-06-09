import { Attribute, AttributeType } from "./Attribute"

export class Strength extends Attribute {
  type = AttributeType.STRENGTH
  text = {
    title: 'Strength',
    description: '(+1 base dmg, +5% exp)',
    short: 'STR'
  }
}

export function isStrength(attribute: Attribute): attribute is Strength {
  return attribute.type === AttributeType.STRENGTH
}