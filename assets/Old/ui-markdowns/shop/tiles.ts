import { KONVA_BACKGROUND_COLOR, KONVA_STROKE_COLOR } from "~/assets/Old/consts"
import Konva from "konva"

export type ShopTileKeys =
  | 'plus'
  | 'itemFrame'
  | 'itemFrameSelected'
  | 'selectedItemBG'
  | 'currentItemBG'
  | 'acceptButton'

type OptionalKonvaImage = Omit<Konva.ImageConfig, 'image'>
type ComplexTileKeys =
  | 'begin'
  | 'mid'
  | 'end'
type ShopTileComplex = {
  [key in ComplexTileKeys]: OptionalKonvaImage
}
export type ShopTile = OptionalKonvaImage | ShopTileComplex

export const shopTiles: Record<ShopTileKeys, ShopTile> = {
  plus: {
    width: 35,
    height: 35,
    crop: {
      x: 490,
      y: 92.5,
      width: 22,
      height: 22
    }
  },
  itemFrame: {
    width: 66,
    height: 66,
    crop: {
      x: 1,
      y: 382,
      width: 53,
      height: 53
    }
  },
  itemFrameSelected: {
    width: 66,
    height: 66,
    crop: {
      x: 55,
      y: 382,
      width: 53,
      height: 53
    }
  },
  selectedItemBG: {
    begin: {
      crop: {
        x: 309,
        y: 380,
        width: 3,
        height: 55
      }
    },
    mid: {
      crop: {
        x: 312,
        y: 380,
        width: 3,
        height: 55
      }
    },
    end: {
      crop: {
        x: 315,
        y: 380,
        width: 3,
        height: 55
      }
    }
  },
  currentItemBG: {
    begin: {
      crop: {
        x: 319,
        y: 380,
        width: 3,
        height: 55
      }
    },
    mid: {
      crop: {
        x: 322,
        y: 380,
        width: 3,
        height: 55
      }
    },
    end: {
      crop: {
        x: 325,
        y: 380,
        width: 3,
        height: 55
      }
    }
  },
  acceptButton: {
    x: 46.5,
    y: 536,
    width: 90,
    height: 49,
    crop: {
      x: 144,
      y: 288,
      width: 53,
      height: 35
    }
  }
}

export default shopTiles
