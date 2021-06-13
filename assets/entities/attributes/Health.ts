import { Attribute, AttributeType } from "./Attribute"
import { XY } from "~/assets/types"

export class Health extends Attribute {
  type = AttributeType.HEALTH
  text = {
    title: 'Health',
    description: '+15 health',
    short: 'HP'
  }

  getCropPosition(): XY {
    return {
      x: 813,
      y: 200
    }
  }
}

export function isHealth(attribute: Attribute): attribute is Health {
  return attribute.type === AttributeType.HEALTH
}