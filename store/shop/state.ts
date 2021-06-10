export const defaultState = () => ({
  type: ShopType.LEVELUP
})

export const state = () => (defaultState())

export default state

export enum ShopType {
  NONE = "none",
  LEVELUP = 'levelup',
  UPGRADE = 'upgrade',
  MERCHANT = 'merchant'
}