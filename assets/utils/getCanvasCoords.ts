import { XY } from "~/assets/types"

export function getCanvasCoords(position: XY): XY {
  return {
    x: 16 + 72 * position.x,
    y: 156 + 72 * position.y
  }
}