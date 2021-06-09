import { Attribute, AttributeType } from "./Attribute"

export class Luck extends Attribute {
  type = AttributeType.LUCK
  text = {
    title: 'Luck',
    description: '+5% bonus coin',
    short: 'LUK'
  }
}

export function isLuck(attribute: Attribute): attribute is Luck {
  return attribute.type === AttributeType.LUCK
}