import { BUFF_TEXT, TILESET_COORDS } from "~/assets/Old/consts"
import { ItemType } from "~/assets/entities/item"

export type BuffType = typeof TILESET_COORDS.buff.order[number]

export default class Buff {
  type: BuffType
  target: ItemType
  power: number

  constructor(type: BuffType, target: ItemType, power = 1) {
    this.type   = type
    this.power  = power
    this.target = target
  }

  upgrade() {
    this.power++
  }

  // TODO: perhaps refactor this out into a dedicated Buff component render?
  getIconConfig(x: number, y: number, icons: HTMLImageElement) {
    return {
      x: x,
      y: y,
      image: icons,
      width: 62,
      height: 62,
      crop: {
        x: TILESET_COORDS.buff.base.x + 50 * (TILESET_COORDS.buff.order.indexOf(this.type) % 10),
        y: TILESET_COORDS.buff.base.y + 50 * Math.floor(TILESET_COORDS.buff.order.indexOf(this.type) / 10),
        width: 50,
        height: 50
      }
    }
  }

  // TODO: make custom getText handlers so that e.g. Armor Strength will return % chance of each point to break
  getText() {
    return BUFF_TEXT[this.type]
  }
}