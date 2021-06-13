import { XY } from "~/assets/types"

export function getCanvasCoords(position: XY): XY {
  return {
    x: 15 + 72 * position.x,
    y: 155 + 72 * position.y
  }
}