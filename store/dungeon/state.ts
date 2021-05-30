import { Tiles } from "~/assets/entities"

export const defaultState = () => ({
  tiles: [] as Tiles.Tile[],
  selected: [] as number[],
})

export const state = () => (defaultState())

export default state