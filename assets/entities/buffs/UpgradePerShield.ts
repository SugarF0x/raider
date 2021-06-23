import { Buff, BuffOptions, BuffType } from "~/assets/entities/buffs/Buff"
import { XY } from "~/assets/types"

export class UpgradePerShield extends Buff {
  type = BuffType.UPGRADE_PER_SHIELD
  maxLevel = 4

  text = {
    title: 'Upgrade per shield',
    description: '+25% upgrade per shield',
    short: 'UPS'
  }

  constructor(options?: UpgradePerShieldOptions) {
    super(options)
  }

  getCropPosition(): XY {
    return {
      x: 663,
      y: 300
    }
  }
}

export interface UpgradePerShieldOptions extends BuffOptions {

}