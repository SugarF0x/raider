import { TFamily } from "~/assets/Tiles"

export const KONVA_HEIGHT = 800
export const KONVA_WIDTH = 450
export const KONVA_BACKGROUND_COLOR = '#1D214E'

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
    broken: { x: 425, y: 724 }
  },
  sword: {
    common: 213,
    broken: { x: 425, y: 777 },
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
} as { [key in TFamily]: any }