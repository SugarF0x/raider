import { Tile, TileOptions, TileType } from "~/assets/entities/tiles"
import { XY } from "~/assets/types"

export class Coin extends Tile {
  type = TileType.COIN

  constructor(options: CoinOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: (52) * (this.id % 8) + 1 + (this.id % 8),
      y: 107
    }
  }

}

export interface CoinOptions  extends TileOptions {

}

export function isCoin(tile: Tile): tile is Coin {
  return tile.type === TileType.COIN
}