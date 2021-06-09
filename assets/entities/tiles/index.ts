import * as Tiles from "."
import { SPAWN_WEIGHT } from "~/assets/consts/balance"
import { XY } from "~/assets/types"

export * from './Tile'
export * from './Coin'
export * from './Potion'
export * from './Shield'
export * from './Sword'
export * from './Skull'

export function getRandomTile({ weights, ...options }: randomTileProps): Tiles.Tile {
  const mergedWeights: typeof SPAWN_WEIGHT = { ...SPAWN_WEIGHT, ...weights }
  const poll: Tiles.TileType[] = []
  Object.entries(mergedWeights).forEach(entry => {
    const type = entry[0] as Tiles.TileType
    const weight = entry[1]
    for (let i = 0; i < weight; i++) poll.push(type)
  })

  const result = poll[Math.floor(Math.random() * poll.length)]
  switch (result) {
    case Tiles.TileType.COIN: return new Tiles.Coin(options)
    case Tiles.TileType.POTION: return new Tiles.Potion(options)
    case Tiles.TileType.SHIELD: return new Tiles.Shield(options)
    case Tiles.TileType.SKULL: return new Tiles.Skull(options)
    case Tiles.TileType.SWORD: return new Tiles.Sword(options)
    default: throw new Error(`No tile of type "${result}" found`)
  }
}

export interface randomTileProps {
  weights?: Partial<typeof SPAWN_WEIGHT>
  destination?: XY
  state?: Tiles.TileState
  position: XY
  power: number
  image: HTMLImageElement
}