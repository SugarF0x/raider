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
  
  collect() {
    const newHealthValue = this.accessor.character.health + 1

    if (newHealthValue >= this.accessor.character.totalHealth) this.accessor.character.SET_HEALTH(this.accessor.character.totalHealth)
    else this.accessor.character.SET_HEALTH(newHealthValue)

    this.accessor.instance.INC_SCORE(1)
    this.accessor.dungeon.REMOVE_TILE(this.id)
  }
}

export interface PotionOptions extends TileOptions {

}

export function isPotion(tile: Tile): tile is Potion {
  return tile.type === TileType.POTION
}