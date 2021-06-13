import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Damage extends Attribute {
  type = AttributeType.DAMAGE
  text = {
    title: 'Damage',
    description: 'Damage per sword',
    short: 'DMG'
  }

  getCropPosition(): XY {
    return {
      x: 713,
      y: 200
    }
  }
}

export function isDamage(attribute: Attribute): attribute is Damage {
  return attribute.type === AttributeType.DAMAGE
}