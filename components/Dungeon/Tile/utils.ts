import { isSkull, Tile, TileType } from "~/assets/entities/tiles"
import { getCanvasCoords } from "~/assets/utils"
import { XY } from "~/assets/types"

export function getSkullStateConfig(tile: Tile) {
  if (!isSkull(tile)) return undefined

  const canvasCoords = getCanvasCoords(tile.position)

  const skullStateConfigBase = {
    x: canvasCoords.x+7,
    width: 25,
    fontSize: 14,
    align: 'right'
  }
  return {
    attack: Object.assign({ text: tile.currentState.attack, y: canvasCoords.y-25, fill: 'lightgray' }, skullStateConfigBase),
    armor: Object.assign({ text: tile.currentState.armor, y: canvasCoords.y-5, fill: 'lightblue' }, skullStateConfigBase),
    health: Object.assign({ text: tile.currentState.health, y: canvasCoords.y+15, fill: 'red' }, skullStateConfigBase),
  }
}

export function isNear(base: XY, target: XY) {
  const { x: x1, y: y1 } = base
  const { x: x2, y: y2 } = target
  return x2 >= x1 - 1
    && x2 <= x1 + 1
    && y2 >= y1 - 1
    && y2 <= y1 + 1
}

export function isSelectableCheck(selectedType: TileType | null, tileType: TileType) {
  return !selectedType
    || selectedType === tileType
    || selectedType === TileType.SWORD && tileType === TileType.SKULL
    || selectedType === TileType.SKULL && tileType === TileType.SWORD
}