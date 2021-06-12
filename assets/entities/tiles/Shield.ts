import { Tile, TileOptions, TileType } from "~/assets/entities/tiles"
import { XY } from "~/assets/types"

export class Shield extends Tile {
  type = TileType.SHIELD
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
  
  collect() {
    const newArmorValue = this.accessor.character.armor + 1
    const excessArmorValue = newArmorValue - this.accessor.character.totalArmor

    if (newArmorValue <= this.accessor.character.totalArmor) {
      this.accessor.character.SET_ARMOR(newArmorValue)
    } else {
      this.accessor.character.SET_ARMOR(this.accessor.character.totalArmor)

      const newUpgradeValue = this.accessor.character.upgrade + excessArmorValue
      if (newUpgradeValue >= 100) this.accessor.character.SET_UPGRADE(newUpgradeValue - 100)
      else this.accessor.character.SET_UPGRADE(newUpgradeValue)
    }

    this.accessor.instance.INC_SCORE(1)
    this.accessor.dungeon.REMOVE_TILE(this.id)
  }
}

export interface ShieldOptions extends TileOptions {
  isBroken?: boolean
}

export function isShield(tile: Tile): tile is Shield {
  return tile.type === TileType.SHIELD
}