import { STROKE_COLOR, BACKGROUND_COLOR } from '../consts/konva'
import { useAccessor } from "~/assets/hooks"

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

interface Options {
  tiles?: boolean
  icons?: boolean
  stroke?: boolean
  fill?: boolean
}

export function parseMarkdown(data: string): ParsedMarkdown {
  const [dimensions, options] = parseOptions(data)
  const [position, crop] = dimensions.split(':')

  if (crop && !(options.tiles || options.icons) || (options.tiles || options.icons) && !crop)
    throw new Error(`Neither crop, nor image can exist without one another`)

  let result: ParsedMarkdown = parseDimensions(position)
  if (crop) result.crop = parseDimensions(crop)
  if (options.stroke) result.stroke = STROKE_COLOR
  if (options.fill) result.fill = BACKGROUND_COLOR

  if (options.tiles || options.icons) {
    const { assets } = useAccessor()
    if (options.tiles) result.image = assets.tiles
    if (options.icons) result.image = assets.icons
  }

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

function parseOptions(data: string): [string, Options] {
  const [dimensions, options] = data.split(';')

  const parsed: Options = {}
  if (options) {
    if (options.includes('T')) parsed.tiles = true
    if (options.includes('I')) parsed.icons = true
    if (options.includes('S')) parsed.stroke = true
    if (options.includes('F')) parsed.fill = true
  }

  if (parsed.icons && parsed.tiles) throw new Error(
    `Markdown can not have both Tileset and Icons options
    Data passed: ${data}`,
  )

  return [dimensions, parsed]
}