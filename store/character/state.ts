import { BASE_HEALTH_VALUE } from "~/assets/consts/balance"
import { Attribute } from "~/assets/entities/attributes/Attribute"

export const defaultState = () => ({
  gold: 0,
  armor: 3,
  health: BASE_HEALTH_VALUE,
  upgrade: 0,
  experience: 0,
  level: 1,
  attributes: [] as Attribute[]
})

export const state = () => (defaultState())

export default state