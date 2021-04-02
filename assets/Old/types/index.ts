import { TILESET_COORDS } from "~/assets/Old/consts"
import { THud } from '~/assets/Old/Tiles'

type TGetOptionals<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k
}[keyof T]

export type TAttributes = typeof TILESET_COORDS.attribute.order[number]
export type TSpells = typeof TILESET_COORDS.spell.order[number]
export type TBuffs = typeof TILESET_COORDS.buff.order[number]

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
