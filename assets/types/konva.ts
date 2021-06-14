import { WH, XY } from "~/assets/types/position"

export interface ImageConfig extends XY, Partial<WH> {
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
  fontFamily?: string
  align?: string
  listening?: boolean
}