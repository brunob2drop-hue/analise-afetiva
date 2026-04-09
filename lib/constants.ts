/**
 * Single source of truth for brand strings and external links.
 * Links marked as `[PLACEHOLDER: ...]` must be replaced by the user
 * before publishing — `isPlaceholder()` lets components detect them
 * and render with href="#" + data-placeholder="true".
 */

export const BRAND = {
  name: "Analise Afetiva",
  handle: "@analiseafetiva",
  tagline: "Decifrando padrões afetivos. Construindo relações conscientes.",
} as const

export const LINKS = {
  ebook: "[PLACEHOLDER: link Kiwify — preencher após criar produto]",
  whatsapp: "[PLACEHOLDER: link comunidade WhatsApp]",
  tiktok: "https://www.tiktok.com/@analiseafetiva",
  youtube: "https://www.youtube.com/@analiseafetiva",
  instagram: "https://www.instagram.com/analiseafetiva",
} as const

export function isPlaceholder(url: string): boolean {
  return url.startsWith("[PLACEHOLDER")
}

/**
 * Returns a safe href for an anchor: if the configured link is still a
 * placeholder, return "#" so the browser doesn't break on navigation.
 * Components should also set `data-placeholder="true"` in that case.
 */
export function resolveHref(url: string): string {
  return isPlaceholder(url) ? "#" : url
}
