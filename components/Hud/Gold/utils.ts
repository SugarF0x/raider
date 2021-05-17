import { parseMarkdown } from "~/assets/utils"
import { GOLD } from "~/assets/consts/markdowns/hud"

export function getColumn(column: number, fill: number) {
  const gold = parseMarkdown(GOLD[column])
  if (!gold.crop) throw new Error('Gold column markdown is to contain tileset option')

  gold.y = gold.y + (gold.height * (1 - fill))
  gold.height = gold.height * fill
  gold.crop.y = gold.crop.y + (20 - 20 * fill) * 3
  gold.crop.height = gold.crop.height - (20 - 20 * fill) * 3

  return gold
}