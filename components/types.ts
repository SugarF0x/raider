import { THud } from '~/assets/Tiles'

// TODO: move these to assets

type TGetOptionals<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k
}[keyof T]

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
  opacity: number,
  listening?: boolean
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
  text: string | number
  x: number
  y: number
  width?: number
  fill?: string
  fontSize?: number
  align?: string
  listening?: boolean
  fillAfterStrokeEnabled?: boolean
}
export type ITextNonOptionals = Required<Omit<ITextConfigOptions, TGetOptionals<ITextConfigOptions>>>

// this here is so as not to spam warning in console until i move this whole file into assets
export default ''