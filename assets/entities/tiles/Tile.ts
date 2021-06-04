import { TileState, TileType, XY } from "~/assets/types"

export class Tile {
  // Tile unique identifier
  id: number
  // Tile Type to be overridden by an actual Tile Type
  type: TileType = 'default'
  // Current Tile dungeon position
  position: XY
  // Dungeon position to move Tile to
  destination: XY
  // Current tile state
  state: TileState

  constructor(options: TileOptions) {
    this.id = Math.floor(Math.random() * 1000000)
    this.position = options.position
    this.destination = options.destination || this.position
    this.state = options.state || 'idle'
  }

  getCropPosition(): XY {
    console.error(`Tile ${this.id} has not been assigned a type`)
    return {
      x: 1,
      y: 928,
    }
  }

  setPosition(position: XY) { this.position = position }

  setDestination(position: XY) { this.destination = position }

  setState(state: TileState) { this.state = state }

  isDestinationMatch(position: XY) { return this.destination.x === position.x && this.destination.y === position.y }
}


export interface TileOptions {
  image: HTMLImageElement
  position: XY
  destination?: XY
  state?: TileState
}