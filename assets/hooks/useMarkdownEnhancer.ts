import { ParsedMarkdown, parseMarkdown } from "~/assets/utils"
import { useAccessor } from "~/assets/hooks/useAccessor"

export function useMarkdownEnhancer(data: string) {
  const markdown = parseMarkdown(data)
  if (!markdown.image) return markdown

  const placeholderImage = new Image()
  const result: EnhancedMarkdown = { ...markdown, image: placeholderImage }

  const { assets } = useAccessor()
  if (markdown.image === "tiles") result.image = assets.tiles
  if (markdown.image === "icons") result.image = assets.icons

  if (result.image === placeholderImage) throw new Error(`No asset "${markdown.image}" found`)

  return result
}

export interface EnhancedMarkdown extends Omit<ParsedMarkdown, 'image'> {
  image: HTMLImageElement
}