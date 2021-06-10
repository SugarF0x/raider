import { computed } from "@nuxtjs/composition-api"
import { useMarkdownEnhancer } from "~/assets/hooks/useMarkdownEnhancer"

export function useAcceptButton() {
  return computed(() => {
    return {
      ...useMarkdownEnhancer('46.5-536/90-49:144-288/53-35;T'),
      opacity: 1
    }
  })
}