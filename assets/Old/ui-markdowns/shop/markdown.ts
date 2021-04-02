import { KONVA_BACKGROUND_COLOR, KONVA_STROKE_COLOR } from "~/assets/Old/consts"
import Konva from "konva"

export type MarkdownKeys =
  | 'background'
  | 'screen'
  | 'screen_accept'
  | 'screen_acceptOverflow'

export const markdown: Record<MarkdownKeys, Konva.RectConfig> = {
  background: {
    x: 0,
    y: 0,
    width: 450,
    height: 850,
    fill: 'black',
    opacity: .5
  },
  screen: {
    x: 40,
    y: 190,
    width: 450,
    height: 350,
    stroke: KONVA_STROKE_COLOR,
    strokeWidth: 5,
    fill: KONVA_BACKGROUND_COLOR
  },
  screen_accept: {
    x: 40,
    y: 540.5,
    width: 100,
    height: 50,
    stroke: KONVA_STROKE_COLOR,
    strokeWidth: 5,
    fill: KONVA_BACKGROUND_COLOR
  },
  screen_acceptOverflow: {
    x: 42.5,
    y: 535,
    width: 95,
    height: 10,
    fill: KONVA_BACKGROUND_COLOR
  }
}

export default markdown
