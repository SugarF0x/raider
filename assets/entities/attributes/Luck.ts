import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Luck extends Attribute {
  type = AttributeType.LUCK
  text = {
    title: 'Luck',
    description: '+5% bonus coin',
    short: 'LUK'
  }

  getCropPosition(): XY {
    return {
      x: 663,
      y: 200
    }
  }
}

export function isLuck(attribute: Attribute): attribute is Luck {
  return attribute.type === AttributeType.LUCK
}