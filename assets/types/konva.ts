import { WH, XY } from "~/assets/types/position"

export interface ImageConfig extends XY, WH {
  image: HTMLImageElement
  crop?: XY & WH,
  offset?: XY,
  listening?: boolean
}