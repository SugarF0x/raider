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
  image?: HTMLImageElement
}

interface Props {
  data: string
  stroke?: boolean
  fill?: boolean
  image?: 'I' | 'M' | 'T'
}

export function parseMarkdown({ data, stroke = false, fill = false, image}: Props): ParsedMarkdown {
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
    x: parseFloat(x),
    y: parseFloat(y) || parseFloat(x),
    width: parseFloat(width),
    height: parseFloat(height) || parseFloat(width),
  }
}

// function parseImage(data: string): HTMLImageElement {
//   if ()
// }