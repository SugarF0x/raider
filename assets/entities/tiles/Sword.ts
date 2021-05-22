import { Tile, TileOptions } from "~/assets/entities/tiles"
import { TileType, XY } from "~/assets/types"

export class Sword extends Tile {
  type: TileType = 'sword'
  isBroken: boolean

  constructor(options: SwordOptions) {
    super(options)
    this.isBroken = !!options.isBroken
  }

  getCropPosition(): XY {
    if (this.isBroken) return {
      x: 424,
      y: 779
    }
    return {
      x: (52) * (this.id % 8) + 1 + (this.id % 8),
      y: 213
    }
  }
}

export interface SwordOptions  extends TileOptions {
  isBroken?: boolean
}

export function isSword(tile: Tile): tile is Sword {
  // @ts-ignore
  return tile.type === 'sword'
}