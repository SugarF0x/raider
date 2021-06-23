import { Entity, EntityOptions } from "~/assets/entities"

export class Buff extends Entity {
  type = BuffType.DEFAULT
  level = 1
  maxLevel = 99

  constructor(options?: BuffOptions) {
    super(options)
    if (options?.level) this.level = options.level
  }

  upgrade() {
    if (this.level + 1 <= this.maxLevel) this.level++
  }
}

export interface BuffOptions extends EntityOptions {
  level?: number
}

export enum BuffType {
  DEFAULT = 'default',
  ARMOR_STRENGTH = 'armor strength',
  GOLD_PER_COIN = 'gold per coin',
  THORNS = 'thorns',
  UPGRADE_PER_SHIELD = 'upgrade per shield',
  BLUNTING = 'blunting',
  LEECH = 'leech',
  POISON = 'poison',
  ARMOR_PIERCING = 'armor piercing',
  XP_PER_SKULL = 'xp per skull',
  QUICK = 'quick',
  REGENERATION = 'regeneration'
}