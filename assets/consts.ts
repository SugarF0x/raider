import { TBuffs, TFamily, TItem } from "~/assets/Tiles"

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
      base: { x: 0, y: 671 },
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
  },
  spell: {
    base: { x: 513, y: 0 }, // every tile is 50x50
    order: [
      'steal', 'freeze', 'heal', 'repair', 'counter-attack', 'trample', 'golden sword', 'teleport', 'explosives', 'liquid exp',
      'enchant', 'slash', 'treasure', 'fortify', 'disarm', 'daze', 'double damage', 'double coins', 'double potions', 'double shields',
      'exorcise', 'banish', 'trap', 'big game hunter', 'treasure room', 'magic sword', 'earthquake', 'explosive armor', 'fire ball', 'mana potions',
      'hack', 'arrow', 'masochism', 'wish', 'bloodlust', 'undefined-1', 'theft', 'undying', 'undefined-2', 'undefined-3'
    ]
  },
  perk: {
    base: { x: 513, y: 200 }, //every tiles is 50x50
    order: [
      'strength', 'dexterity', 'vitality', 'luck', 'damage', 'defense', 'health', 'charisma'
    ]
  },
  buff: {
    base: { x: 513, y: 250 }, // every tile is 50x50
    order: [
      'damage', 'undefined-1', 'leech', 'poison', 'armor piercing', 'quick', 'xp', 'gold', 'strength', 'luck',
      'undefined-2', 'defense', 'thorns', 'upgrade', 'armor strength', 'blunting', 'undefined-3', 'regeneration', 'dexterity', 'vitality'
    ]
  }
} as { [key in TFamily | 'effect' | 'spell' | 'perk' | 'buff']: any } // TODO: make union type for all the coords

// text and shit (this is to be exported to a locale)

export const BUFF_EQUIPMENT = {
  helmet: ['defense', 'dexterity', 'armor strength'] as const,
  armor: ['defense', 'gold', 'thorns'] as const,
  shield: ['defense', 'upgrade', 'blunting'] as const,
  weapon: ['damage', 'leech', 'poison', 'armor piercing', 'xp', 'strength'] as const,
  accessory: ['vitality', 'quick', 'luck', 'regeneration'] as const
}

export const BUFF_TEXT: {[K in TBuffs]: { title: string, description: string, short: string }} = {
  'damage': {
    title: 'Damage Buff',
    description: '+Damage',
    short: 'Dmg'
  },
  'leech': {
    title: 'Leech',
    description: 'Heal 5% of damage',
    short: 'Leech'
  },
  'poison': {
    title: 'Poison',
    description: 'Apply poison to skulls',
    short: 'P.DMG'
  },
  'armor piercing': {
    title: 'Armor piercing',
    description: 'Damage to skull armor',
    short: 'Ar.DMG'
  },
  'quick': {
    title: 'Quick',
    description: "Reduce skills' cooldown",
    short: 'CD'
  },
  'xp': {
    title: 'Boost XP',
    description: 'Experience per skull',
    short: '+XP'
  },
  'gold': {
    title: 'Boost Gold',
    description: 'Gold per coin',
    short: '+GP'
  },
  'strength': {
    title: 'Boost Strength',
    description: '(+1 dmg, +5% exp)',
    short: '+STR'
  },
  'luck': {
    title: 'Boost Luck',
    description: '+5% bonus potion',
    short: '+LUK'
  },
  'defense': {
    title: 'Defense',
    description: 'Max armor defense',
    short: 'Def'
  },
  'thorns': {
    title: 'Thorns',
    description: 'Damage attackers',
    short: 'Th.DMG'
  },
  'upgrade': {
    title: 'Boost Upgrade',
    description: 'Upgrade per shield',
    short: '+UP'
  },
  'armor strength': {
    title: 'Armor strength',
    description: 'Armor durability',
    short: 'A.STR'
  },
  'blunting': {
    title: 'Blunting',
    description: "Reduce enemies' attack",
    short: 'B.DMG'
  },
  'regeneration': {
    title: 'Regeneration',
    description: 'Heal per turn',
    short: 'REG'
  },
  'dexterity': {
    title: 'Boost Dexterity',
    description: '(+1 repair, +5% shield)',
    short: '+DEX'
  },
  'vitality': {
    title: 'Boost Vitality',
    description: '(+1 vitality, +5% hp)',
    short: 'HP'
  },
}

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
}

export const shopTiles = {
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
