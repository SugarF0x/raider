import { Attribute, AttributeType } from "./Attribute"

export class Charisma extends Attribute {
  type = AttributeType.CHARISMA
  text = {
    title: 'Charisma',
    description: '+5% in all categories',
    short: 'CHA'
  }
}

export function isCharisma(attribute: Attribute): attribute is Charisma {
  return attribute.type === AttributeType.CHARISMA
}