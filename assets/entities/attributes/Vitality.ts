import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Vitality extends Attribute {
  type = AttributeType.VITALITY
  text = {
    title: 'Vitality',
    description: '(+1 vitality, +5% hp)',
    short: 'VIT'
  }

  getCropPosition(): XY {
    return {
      x: 613,
      y: 200
    }
  }

  upgrade() {
    super.upgrade()
    this.accessor.character.SET_HEALTH(this.accessor.character.health + 5)
  }
}

export function isVitality(attribute: Attribute): attribute is Vitality {
  return attribute.type === AttributeType.VITALITY
}