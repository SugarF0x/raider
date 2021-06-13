import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Dexterity extends Attribute {
  type = AttributeType.DEXTERITY
  text = {
    title: 'Dexterity',
    description: '(+1 repair, +5% shield)',
    short: 'DEX'
  }

  getCropPosition(): XY {
    return {
      x: 563,
      y: 200
    }
  }
}

export function isDexterity(attribute: Attribute): attribute is Dexterity {
  return attribute.type === AttributeType.DEXTERITY
}