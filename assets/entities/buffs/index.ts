import { getEnumKeys } from "~/assets/utils"

export * from './Buff'

export * from './ArmorPiercing'
export * from './ArmorStrength'
export * from './BaseDamage'
export * from './Blunting'
export * from './Damage'
export * from './Defense'
export * from './Dexterity'
export * from './GoldPerCoin'
export * from './Healing'
export * from './Leech'
export * from './Luck'
export * from './Poison'
export * from './Quick'
export * from './Regeneration'
export * from './Repair'
export * from './Strength'
export * from './Thorns'
export * from './UpgradePerShield'
export * from './Vitality'
export * from './XpPerSkull'

import * as Buffs from "."
import { getNewItem, ItemType } from "~/assets/entities/items"

export function getRandomBuff(item?: ItemType): Buffs.Buff {
  return getNewBuff(getRandomBuffType(item))
}

export function getNewBuff(type: Buffs.BuffType, options?: Buffs.BuffOptions) {
  switch(type) {
    case Buffs.BuffType.ARMOR_PIERCING: return new Buffs.ArmorPiercing(options)
    case Buffs.BuffType.ARMOR_STRENGTH: return new Buffs.ArmorStrength(options)
    case Buffs.BuffType.BASE_DAMAGE: return new Buffs.BaseDamage(options)
    case Buffs.BuffType.BLUNTING: return new Buffs.Blunting(options)
    case Buffs.BuffType.DAMAGE: return new Buffs.Damage(options)
    case Buffs.BuffType.DEFENSE: return new Buffs.Defense(options)
    case Buffs.BuffType.DEXTERITY: return new Buffs.Dexterity(options)
    case Buffs.BuffType.GOLD_PER_COIN: return new Buffs.GoldPerCoin(options)
    case Buffs.BuffType.HEALING: return new Buffs.Healing(options)
    case Buffs.BuffType.LEECH: return new Buffs.Leech(options)
    case Buffs.BuffType.LUCK: return new Buffs.Luck(options)
    case Buffs.BuffType.POISON: return new Buffs.Poison(options)
    case Buffs.BuffType.QUICK: return new Buffs.Quick(options)
    case Buffs.BuffType.REGENERATION: return new Buffs.Regeneration(options)
    case Buffs.BuffType.REPAIR: return new Buffs.Repair(options)
    case Buffs.BuffType.STRENGTH: return new Buffs.Strength(options)
    case Buffs.BuffType.THORNS: return new Buffs.Thorns(options)
    case Buffs.BuffType.UPGRADE_PER_SHIELD: return new Buffs.UpgradePerShield(options)
    case Buffs.BuffType.VITALITY: return new Buffs.Vitality(options)
    case Buffs.BuffType.XP_PER_SKULL: return new Buffs.XpPerSkull(options)
    default: throw new Error(`Buff of type ${type} not found`)
  }
}

export function getRandomBuffType(item?: ItemType): Buffs.BuffType {
  if (!item) {
    const keys = getEnumKeys(Buffs.BuffType)
    keys.splice(keys.indexOf("DEFAULT"), 1)
    return Buffs.BuffType[keys[Math.floor(Math.random() * keys.length)]]
  } else {
    const buffs = getNewItem(item).assignableBuffs
    return buffs[Math.floor(Math.random() * buffs.length)]
  }
}