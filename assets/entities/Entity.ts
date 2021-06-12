import { accessorType } from "~/store"

export class Entity {
  id: number
  accessor: typeof accessorType = window.$nuxt.$accessor

  constructor(options: EntityOptions) {
    this.id = Math.floor(Math.random() * 1000000)
  }
}

export interface EntityOptions {

}