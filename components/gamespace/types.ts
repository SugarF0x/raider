import { TTile, THud, Tile } from '~/assets/Tiles'

type TGetOptionals<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k
}[keyof T]

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
  type: TTile,
  opacity: number
}
export interface IKonvaHUD extends IKonvaConfig {
  type: THud
}

export interface IFill {
  coins: number;
  upgrade: number;
  experience: number;
  health: number;
}

export interface ITextConfigOptions {
  text: string | number;
  x: number;
  y: number;
  width?: number;
  fill?: string;
  fontSize?: number;
  align?: string;
  listen?: boolean;
}
export type ITextNonOptionals = Required<Omit<ITextConfigOptions, TGetOptionals<ITextConfigOptions>>>