export const defaultState = () => ({
  turn: 0,
  score: 0,
  stage: "Player Turn" as StageType
})

export const state = () => (defaultState())

export default state

export type StageType =
  | "Player Turn"
  | "Enemy Turn"
  | "Collection"
  | "Shop"