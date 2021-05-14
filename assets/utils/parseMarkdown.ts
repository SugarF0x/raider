import { STROKE_COLOR, BACKGROUND_COLOR } from '../consts/konva'

interface Dimensions {
  x: number
  y: number
  width: number
  height: number
}

interface ParsedMarkdown extends Dimensions {
  stroke?: string
  fill?: string
  crop?: Dimensions
}

export function parseMarkdown(data: string, stroke = false, fill = false): ParsedMarkdown {
  const [position, crop] = data.split(':')

  let result: ParsedMarkdown = parseDimensions(position)
  if (crop) result.crop = parseDimensions(crop)
  if (stroke) result.stroke = STROKE_COLOR
  if (fill) result.fill = BACKGROUND_COLOR

  return result
}

function parseDimensions(data: string): Dimensions {
  const [position, size] = data.split('/')
  const [x, y] = position.split('-')
  const [width, height] = size.split('-')

  return {
    x: parseInt(x),
    y: parseInt(y) || parseInt(x),
    width: parseInt(width),
    height: parseInt(height) || parseInt(width),
  }
}