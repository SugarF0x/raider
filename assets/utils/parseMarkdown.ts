import { STROKE_COLOR, BACKGROUND_COLOR } from '../consts/konva'

export function parseMarkdown(data: string, stroke = false, fill = false) {
  const [position, size] = data.split('/')
  const [x, y] = position.split('-')
  const [width, height] = size.split('-')

  return {
    x: parseInt(x),
    y: parseInt(y) || parseInt(x),
    width: parseInt(width),
    height: parseInt(height) || parseInt(width),
    stroke: stroke && STROKE_COLOR || undefined,
    fill: fill && BACKGROUND_COLOR || undefined
  }
}