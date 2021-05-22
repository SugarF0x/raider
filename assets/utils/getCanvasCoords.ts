import { XY } from "~/assets/types"

export function getCanvasCoords(position: XY): XY {
  return {
    x: 46 + 72 * position.x,
    y: 186 + 72 * position.y
  }
}