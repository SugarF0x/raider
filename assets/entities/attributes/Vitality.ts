import { Attribute, AttributeType } from "./Attribute"

export class Vitality extends Attribute {
  type = AttributeType.VITALITY
  text = {
    title: 'Vitality',
    description: '(+1 vitality, +5% hp)',
    short: 'VIT'
  }
}

export function isVitality(attribute: Attribute): attribute is Vitality {
  return attribute.type === AttributeType.VITALITY
}