export * from './Tile'
export * from './Coin'
export * from './Potion'
export * from './Shield'
export * from './Sword'
export * from './Skull'

import * as Tiles from '.'
import { SPAWN_WEIGHT } from "~/assets/consts/balance"
import { TileState, TileType, XY } from "~/assets/types"

export function getRandomTile({ weights, ...options }: randomTileProps): Tiles.Tile {
  const mergedWeights: typeof SPAWN_WEIGHT = { ...SPAWN_WEIGHT, ...weights }
  const poll: TileType[] = []
  Object.entries(mergedWeights).forEach(entry => {
    const type = entry[0] as TileType
    const weight = entry[1]
    for (let i = 0; i < weight; i++) poll.push(type)
  })

  const result = poll[Math.floor(Math.random() * poll.length)]
  switch (result) {
    case "coin": return new Tiles.Coin(options)
    case "potion": return new Tiles.Potion(options)
    case "shield": return new Tiles.Shield(options)
    case "skull": return new Tiles.Skull(options)
    case "sword": return new Tiles.Sword(options)
    default: throw new Error(`No tile of type "${result}" found`)
  }
}

export interface randomTileProps {
  weights?: Partial<typeof SPAWN_WEIGHT>
  destination?: XY
  state?: TileState
  position: XY
  power: number
  image: HTMLImageElement
}