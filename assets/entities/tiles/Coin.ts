import { Tile, TileOptions } from "~/assets/entities/tiles"
import { TileType, XY } from "~/assets/types"

export class Coin extends Tile {
  type: TileType = 'coin'

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
  // @ts-ignore
  return tile.type === 'coin'
}