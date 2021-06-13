import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Strength extends Attribute {
  type = AttributeType.STRENGTH
  text = {
    title: 'Strength',
    description: '(+1 base dmg, +5% exp)',
    short: 'STR'
  }

  getCropPosition(): XY {
    return {
      x: 513,
      y: 200
    }
  }
}

export function isStrength(attribute: Attribute): attribute is Strength {
  return attribute.type === AttributeType.STRENGTH
}