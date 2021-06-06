import { WH, XY } from "~/assets/types/position"

export interface ImageConfig extends XY, WH {
  image: HTMLImageElement
  crop?: XY & WH,
  offset?: XY,
  listening?: boolean
}

export interface TextConfig extends XY {
  text: string
  width?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  fillAfterStrokeEnabled?: boolean
  fontSize?: number
  align?: string
  listening?: boolean
}