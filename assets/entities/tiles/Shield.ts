import { Tile, TileOptions } from "~/assets/entities/tiles"
import { TileType, XY } from "~/assets/types"

export class Shield extends Tile {
  type: TileType = 'shield'
  isBroken: boolean

  constructor(options: ShieldOptions) {
    super(options)
    this.isBroken = !!options.isBroken
  }

  getCropPosition(): XY {
    if (this.isBroken) return {
      x: 424,
      y: 726
    }
    return {
      x: (52) * (this.id % 8) + 1 + (this.id % 8),
      y: 160
    }
  }
}

export interface ShieldOptions  extends TileOptions {
  isBroken?: boolean
}

export function isShield(tile: Tile): tile is Shield {
  return tile.type === 'shield'
}