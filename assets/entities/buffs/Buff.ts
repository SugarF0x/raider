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

  DAMAGE = 'damage',
  BASE_DAMAGE = 'base damage',
  LEECH = 'leech',
  POISON = 'poison',
  ARMOR_PIERCING = 'armor piercing',
  QUICK = 'quick',
  XP_PER_SKULL = 'xp per skull',
  GOLD_PER_COIN = 'gold per coin',
  STRENGTH = 'strength',
  LUCK = 'luck',
  REGENERATION = 'regeneration',
  DEFENSE = 'defense',
  THORNS = 'thorns',
  UPGRADE_PER_SHIELD = 'upgrade per shield',
  ARMOR_STRENGTH = 'armor strength',
  BLUNTING = 'blunting',
  REPAIR = 'repair',
  HEALING = 'healing',
  DEXTERITY = 'dexterity',
  VITALITY = 'vitality'
}