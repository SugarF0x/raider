import { Attribute, AttributeType } from "./Attribute"

export class Health extends Attribute {
  type = AttributeType.HEALTH
  text = {
    title: 'Health',
    description: '+15 health',
    short: 'HP'
  }
}

export function isHealth(attribute: Attribute): attribute is Health {
  return attribute.type === AttributeType.HEALTH
}