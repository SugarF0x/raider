import { Attribute, AttributeType } from "./Attribute"

export class Defense extends Attribute {
  type = AttributeType.DEFENSE
  text = {
    title: 'Defense',
    description: 'Max armor value',
    short: 'DEF'
  }
}

export function isDefense(attribute: Attribute): attribute is Defense {
  return attribute.type === AttributeType.DEFENSE
}