export const defaultState = () => ({
  turn: 0,
  score: 0,
  stage: StageType.PLAYER_TURN,
  shop: ShopType.NONE,
  isStageFinished: false
})

export const state = () => (defaultState())

export default state

export enum StageType {
  PLAYER_TURN = 'player turn',
  ENEMY_TURN = 'enemy turn',
  COLLECTION = 'collection'
}

export enum ShopType {
  NONE = "none",
  LEVELUP = 'levelup',
  UPGRADE = 'upgrade',
  MERCHANT = 'merchant'
}