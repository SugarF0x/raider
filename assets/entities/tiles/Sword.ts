import { isSkull, Tile, TileOptions, TileType } from "~/assets/entities/tiles"
import { XY } from "~/assets/types"

export class Sword extends Tile {
  type = TileType.SWORD
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

  onDeselection() {
    this.accessor.dungeon.selectedTiles.forEach(tile => { if (isSkull(tile)) tile.checkFatality(this.accessor.character.totalAttack) })
    super.onDeselection()
  }
}

export interface SwordOptions extends TileOptions {
  isBroken?: boolean
}

export function isSword(tile: Tile): tile is Sword {
  return tile.type === TileType.SWORD
}