import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Defense extends Attribute {
  type = AttributeType.DEFENSE
  text = {
    title: 'Defense',
    description: 'Max armor value',
    short: 'DEF'
  }

  getCropPosition(): XY {
    return {
      x: 763,
      y: 200
    }
  }
}

export function isDefense(attribute: Attribute): attribute is Defense {
  return attribute.type === AttributeType.DEFENSE
}