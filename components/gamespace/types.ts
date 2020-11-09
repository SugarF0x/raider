import { TTile, THud, Tile } from '~/assets/Tiles'

export interface IDungeon {
  [property: string]: Tile
}
export interface IKonvaConfig {
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
}
export interface IKonvaTile extends IKonvaConfig {
  offset: {
    x: number,
    y: number
  },
  type: TTile
}
export interface IKonvaHUD extends IKonvaConfig {
  type: THud
}
