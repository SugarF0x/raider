import { TTile, Tile } from '~/assets/Tiles'

export interface IDungeon {
  [property: string]: Tile
}
export interface IKonvaTile {
  x: number,
  y: number,
  image: HTMLImageElement,
  width: number,
  height: number,
  crop: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  offset: {
    x: number,
    y: number
  },
  type: TTile
}
