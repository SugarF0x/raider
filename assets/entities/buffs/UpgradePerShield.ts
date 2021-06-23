import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"

export class UpgradePerShield extends Buff {
  type = BuffType.UPGRADE_PER_SHIELD
  maxLevel = 4

  constructor(options?: UpgradePerShieldOptions) {
    super(options)
  }
}

export interface UpgradePerShieldOptions extends BuffOptions {

}