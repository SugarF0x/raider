import { KONVA_STROKE_COLOR } from "~/assets/Old/consts"
import Konva from "konva"

export type MarkdownKeys =
  | 'header'
  | 'spell1'
  | 'spell2'
  | 'spell3'
  | 'spell4'
  | 'menu'
  | 'stats'
  | 'dungeon'
  | 'hud'
  | 'footer'

export const markdown: Record<MarkdownKeys, Konva.RectConfig> = {
  header: {
    x: 10,
    y: 10,
    width: 430,
    height: 40,
    stroke: KONVA_STROKE_COLOR,
  },
  spell1: {
    x: 10,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  spell2: {
    x: 100,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  spell3: {
    x: 190,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  spell4: {
    x: 280,
    y: 60,
    width: 80,
    height: 80,
    stroke: KONVA_STROKE_COLOR,
  },
  menu: {
    x: 370,
    y: 60,
    width: 70,
    height: 35,
    stroke: KONVA_STROKE_COLOR,
  },
  stats: {
    x: 370,
    y: 105,
    width: 70,
    height: 35,
    stroke: KONVA_STROKE_COLOR,
  },
  dungeon: {
    x: 10,
    y: 150,
    width: 430,
    height: 430,
    stroke: KONVA_STROKE_COLOR,
    fill: 'black'
  },
  hud: {
    x: 10,
    y: 590,
    width: 430,
    height: 150,
    stroke: KONVA_STROKE_COLOR,
  },
  footer: {
    x: 10,
    y: 750,
    width: 430,
    height: 40,
    stroke: KONVA_STROKE_COLOR,
  },
}

export default markdown