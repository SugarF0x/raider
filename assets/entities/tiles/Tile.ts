import Konva from "konva"
import { generateHash } from "~/assets/utils"
import { XY } from "~/assets/types"
import { getCanvasCoords } from "~/assets/utils/getCanvasCoords"

export class Tile {
  // Tile unique identifier
  id: number
  // Current Tile dungeon position
  position: XY
  // Dungeon position to move Tile to
  destination: XY

  constructor(options: TileOptions) {
    this.id = Math.floor(Math.random()*1000000)
    this.position = options.position
    this.destination = options.destination || this.position
  }

  getCropPosition(): XY {
    console.error(`Tile ${this.id} has not been assigned a type`)
    return {
      x: 1,
      y: 928
    }
  }

  setPosition(position: XY) {
    this.position = position
  }

  setDestination(position: XY) {
    this.destination = position
  }
}

export interface TileOptions {
  image: HTMLImageElement
  position: XY
  destination?: XY
}