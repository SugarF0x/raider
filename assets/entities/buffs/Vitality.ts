import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class Vitality extends Buff {
  type = BuffType.VITALITY

  constructor(options?: VitalityOptions) {
    super(options)
  }
}

export interface VitalityOptions extends BuffOptions {

}