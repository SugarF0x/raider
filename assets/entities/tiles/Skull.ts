import { Tile, TileOptions, TileState, TileType } from "~/assets/entities/tiles"
import { XY } from "~/assets/types"
import { BASE_ARMOR_BREAK_CHANCE, EXPERIENCE_THRESHOLD } from "~/assets/consts/balance"
import { Effect, EffectType, Fresh } from "~/assets/entities/effects"
import { ShopType, StageType } from "~/store/instance"

export class Skull extends Tile {
  type = TileType.SKULL
  currentState: SkullState
  baseState: SkullState
  effects: Effect[] = [new Fresh()]

  constructor(options: SkullOptions) {
    super(options)
    const { power } = options

    // generate base stats
    const base = {
      health: Math.floor(Math.pow(1.2, power)) + power - 1,
      armor: Math.floor(Math.pow(1.05, power)) + Math.floor(power * .5),
      attack: Math.floor(Math.pow(1.15, power)) + Math.floor(power * .25)
    } as SkullState

    // add randomness based on id seed
    base.health += Math.floor((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 10) / 100) * base.health)
    base.armor += Math.floor((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 10) / 100) * base.armor)
    base.attack += Math.floor((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 10) / 100) * base.attack)

    // make sure it has at least 1 health and 1 damage
    if (base.health <= 0) base.health = 1
    if (base.attack <= 0) base.attack = 1

    // assign values
    this.baseState = Object.assign({}, base)
    this.currentState = Object.assign({}, base)
  }

  getCropPosition(): XY {
    return {
      x: (52) * (this.id % 8) + 1 + (this.id % 8),
      y: 54
    }
  }

  checkFatality(value = 0): boolean {
    const isFatal = this.currentState.health + this.currentState.armor <= value
    if (isFatal) this.accessor.dungeon.MUTATE_TILE(() => { this.addEffect(EffectType.VULNERABLE) })
    else this.accessor.dungeon.MUTATE_TILE(() => { this.removeEffect(EffectType.VULNERABLE) })
    return isFatal
  }

  applyDamage(value: number): void {
    this.accessor.dungeon.MUTATE_TILE(() => {
      let overkill = value - this.currentState.armor
      if (overkill < 0) overkill = 0;

      for (let i = 0; i < value - overkill; i++) {
        if (Math.random() > BASE_ARMOR_BREAK_CHANCE) this.currentState.armor--
      }

      if (overkill > 0) this.currentState.health -= overkill;
      if (this.currentState.health <= 0) {
        this.currentState.health = 0;
      }
    })
  }
  
  collect() {
    if (this.effects.find(effect => effect.type === EffectType.VULNERABLE)) {
      const newExperienceValue = this.accessor.character.experience + 1

      if (newExperienceValue < EXPERIENCE_THRESHOLD) this.accessor.character.SET_EXPERIENCE(newExperienceValue)
      else {
        this.accessor.character.SET_EXPERIENCE(newExperienceValue - EXPERIENCE_THRESHOLD)
        this.accessor.instance.SET_SHOP(ShopType.LEVELUP)
      }

      this.accessor.instance.INC_SCORE(10)
      this.accessor.dungeon.REMOVE_TILE(this.id)
    } else {
      this.applyDamage(this.accessor.character.totalAttack)
      this.setState(TileState.IDLE)
    }
  }

  onSelection() {
    this.checkFatality(this.accessor.character.totalAttack)
    super.onSelection()
  }

  onDeselection() {
    this.checkFatality()
    super.onDeselection()
  }
}

export interface SkullOptions extends TileOptions {
  power: number
}

export interface SkullState {
  health: number
  armor: number
  attack: number
}

export function isSkull(tile: Tile): tile is Skull {
  return tile.type === TileType.SKULL
}