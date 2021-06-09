import { Attribute, AttributeType } from "./Attribute"

export class Dexterity extends Attribute {
  type = AttributeType.DEXTERITY
  text = {
    title: 'Dexterity',
    description: '(+1 repair, +5% shield)',
    short: 'DEX'
  }
}

export function isDexterity(attribute: Attribute): attribute is Dexterity {
  return attribute.type === AttributeType.DEXTERITY
}