import * as Items from '.'
import { getEnumKeys } from "~/assets/utils"

export * from './Item'
export * from './Helmet'
export * from './Torso'
export * from './Shield'
export * from './Weapon'
export * from './Accessory'

export function getNewItem(type: Items.ItemType, options?: Items.ItemOptions) {
  switch (type) {
    case Items.ItemType.HELMET: return new Items.Helmet(options)
    case Items.ItemType.TORSO: return new Items.Torso(options)
    case Items.ItemType.SHIELD: return new Items.Shield(options)
    case Items.ItemType.WEAPON: return new Items.Weapon(options)
    case Items.ItemType.ACCESSORY: return new Items.Accessory(options)
    default: throw new Error(`No item of type ${type} found`)
  }
}

export function getRandomItemType(): Items.ItemType {
  const keys = getEnumKeys(Items.ItemType)
  keys.splice(keys.indexOf("DEFAULT"), 1)
  return Items.ItemType[keys[Math.floor(Math.random() * keys.length)]]
}