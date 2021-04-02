import Konva from "konva"

export type TitleKeys =
  | 'head'
  | 'desc'

export const titleBase: Record<TitleKeys, Konva.TextConfig> = {
  head: {
    stroke: 'black',
    strokeWidth: 8,
    fontSize: 32,
    width: 200,
    align: 'left',
    x: 50,
    y: 200
  },
  desc: {
    stroke: 'black',
    strokeWidth: 8,
    fontSize: 18,
    width: 250,
    align: 'right',
    x: 190,
    y: 212
  }
}

export default titleBase
