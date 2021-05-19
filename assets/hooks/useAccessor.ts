import { wrapProperty } from "@nuxtjs/composition-api"
import { accessorType } from "~/store"

export const useAccessor = (): typeof accessorType => (wrapProperty('$accessor', false))()