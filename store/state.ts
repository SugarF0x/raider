export const defaultState = () => ({
  assets: {
    tiles: new Image(),
    icons: new Image(),
  },
  loadedAssets: 0,
  isMouseDown: false,
})

export const state = () => (defaultState())

export default state