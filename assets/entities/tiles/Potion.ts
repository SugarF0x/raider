import { Tile, TileOptions, TileType } from "~/assets/entities/tiles"
import { XY } from "~/assets/types"

export class Potion extends Tile {
  type = TileType.POTION

  constructor(options: PotionOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: (52) * (this.id % 8) + 1 + (this.id % 8),
      y: 1
    }
  }
}

export interface PotionOptions  extends TileOptions {

}

export function isPotion(tile: Tile): tile is Potion {
  return tile.type === TileType.POTION
}