import { TFamily } from "~/assets/Tiles"

export const KONVA_HEIGHT = 800
export const KONVA_WIDTH = 450
export const KONVA_BACKGROUND_COLOR = '#1D214E'
export const KONVA_STROKE_COLOR = '#503E90'

/**
 * Coords of every tile
 */
export const DUNGEON_TILE_COORDS = {
  x: [46, 118, 190, 262, 334, 406],
  y: [186, 258, 330, 402, 474, 546],
};

/**
 * Define generic types and subtypes that can be inter-connected
 *
 * numbers are generics
 *   that means that the number itself is a Y coordinate
 *   X coordinate is calculated based on the following formula
 *     x = (52) * [0-7 random order] + 1 + [0-7 random order]
 *
 * objects contain both X and Y coordinate
 *
 * skulls' Boss is an exception
 *   base defines base Y coordinate that can change on itself
 *   these two formulas define both X and Y
 *     x = (52) * (order.indexOf(BOSS_NAME) % 8) + 1 + (order.indexOf(BOSS_NAME) % 8)
 *     y = base + (52) * Math.floor(order.indexOf(BOSS_NAME)/8)
 */
export const TILESET_COORDS = {
  coin: {
    common: 107
  },
  potion: {
    common: 1,
    mana: 512,
    poison: 565,
    explosive: 618
  },
  shield: {
    common: 160,
    broken: { x: 424, y: 726 }
  },
  sword: {
    common: 213,
    broken: { x: 424, y: 779 },
    skull: null
  },
  skull: {
    common: 54,
    boss: {
      base: 671,
      order: [
        'tough', 'spiked', 'golden', 'healing', 'invisible', 'undefined-1', 'flaming', 'undefined-2',
        'venomous', 'boomer', 'leader', 'corrupt', 'alchemist', 'jumper', 'mage', 'assassin',
        'mimic', 'thief', 'unstable', 'vampire', 'ravaging', 'trampling', 'undefined-3', 'explosive',
        'undefined-4', 'brute', 'armored', 'devourer', 'poisonous', 'beefy', 'fleeing', 'lich'
      ]
    },
    sword: null
  },
  effect: {
    vulnerable: { x: 160, y: 330 },
    frozen: { x: 328, y: 394 },
    burning: { x: 414, y: 572 }
  }
} as { [key in TFamily | 'effect']: any }


// markdown

export const dungeonMD = {
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

// shop

export const shopMD = {
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

export const titleBase = {
  item: {
    head: {
      fontSize: 32,
      width: 200,
      align: 'left',
      x: 50,
      y: 200
    },
    desc: {
      fontSize: 18,
      width: 250,
      align: 'right',
      x: 190,
      y: 212
    }
  }
}

export const shopTiles = {
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
