import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Charisma extends Attribute {
  type = AttributeType.CHARISMA
  text = {
    title: 'Charisma',
    description: '+5% in all categories',
    short: 'CHA'
  }

  getCropPosition(): XY {
    return {
      x: 863,
      y: 200
    }
  }
}

export function isCharisma(attribute: Attribute): attribute is Charisma {
  return attribute.type === AttributeType.CHARISMA
}