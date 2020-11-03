import { TTile } from '~/assets/Tiles'

export interface IDungeon {
  [property: string]: TTile
}
export interface ITile {
  x: number,
  y: number,
  radius: number,
  fill: string,
  type: TTile
}
