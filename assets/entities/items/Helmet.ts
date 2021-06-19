import { Item, ItemType } from "~/assets/entities/items/Item"
import { Defense } from "~/assets/entities/attributes"
import { ImageConfig, XY } from "~/assets/types"

export class Helmet extends Item {
  type = ItemType.HELMET
  stat = new Defense({ level: 1 })

  getIconConfig(position: XY): ImageConfig {
    const config = super.getIconConfig(position)
    if (!config.crop) throw new Error('This is but a type guard')
    config.crop.x = 1 + (this.id%20)*50
    config.crop.y = 201 + (this.id%4)*50
    return config
  }
}