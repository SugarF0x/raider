import { XY } from "~/assets/types"
import { Effect, EffectType, Vulnerable } from "~/assets/entities/effects"
import { Entity, EntityOptions } from "~/assets/entities"

export class Tile extends Entity {
  // Tile Type to be overridden by an actual Tile Type
  type = TileType.DEFAULT
  // Current Tile dungeon position
  position: XY
  // Dungeon position to move Tile to
  destination: XY
  // Current tile state
  state: TileState
  // Current Tile effects
  effects: Effect[] = []

  constructor(options: TileOptions) {
    super(options)
    this.position = options.position
    this.destination = options.destination || this.position
    this.state = options.state || TileState.IDLE
  }

  getCropPosition(): XY {
    console.error(`Tile ${this.id} has not been assigned a type`)
    return {
      x: 1,
      y: 928,
    }
  }

  setPosition(position: XY) { this.position = position }

  setDestination(position: XY) { this.destination = position }

  setState(state: TileState) { this.state = state }

  addEffect(effect: EffectType) {
    const newEffect = (() => {
      switch(effect) {
        case EffectType.VULNERABLE: return new Vulnerable()
        default: throw new Error(`Effect type ${effect} is not recognized`)
      }
    })()

    this.removeEffect(effect)
    this.effects.push(newEffect)
  }

  removeEffect(effect: EffectType) {
    const currentEffect = this.effects.find(entry => entry.type === effect)
    if (currentEffect) {
      const index = this.effects.indexOf(currentEffect)
      this.effects.splice(index)
    }
  }

  executeEffects() {
    this.effects.forEach(effect => {
      effect.action()
      if (effect.duration <= 0) this.removeEffect(effect.type)
    })
  }

  isDestinationMatch(position: XY) { return this.destination.x === position.x && this.destination.y === position.y }

  collect() { this.accessor.dungeon.REMOVE_TILE(this.id) }

  // these are here just to type check existence of said functions on children
  onSelection() { }
  onDeselection() { }
}

export interface TileOptions extends EntityOptions {
  position: XY
  destination?: XY
  state?: TileState
}

export enum TileType {
  DEFAULT = 'default',
  COIN = 'coin',
  POTION = 'potion',
  SHIELD = 'shield',
  SWORD = "sword",
  SKULL = 'skull',
}

export enum TileState {
  IDLE = 'idle',
  MOVING = 'moving',
  COLLECTING = 'collecting'
}