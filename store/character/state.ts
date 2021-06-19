import { BASE_HEALTH_VALUE, BASE_ARMOR_VALUE } from "~/assets/consts/balance"
import { Attribute } from "~/assets/entities/attributes/Attribute"
import { Accessory, Helmet, Item, Shield, Torso, Weapon } from "~/assets/entities/items"

export const defaultState = () => ({
  gold: 0,
  armor: BASE_ARMOR_VALUE,
  health: BASE_HEALTH_VALUE,
  upgrade: 0,
  experience: 0,
  level: 1,
  attributes: [] as Attribute[],
  items: [] as Item[]
})

export const state = () => (defaultState())

export default state