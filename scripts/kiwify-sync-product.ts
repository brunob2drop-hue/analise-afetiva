/**
 * scripts/kiwify-sync-product.ts
 *
 * Helper de sincronização com a API pública do Kiwify.
 *
 * Por quê este arquivo existe:
 * -----------------------------
 * A API pública do Kiwify (public-api.kiwify.com) expõe os escopos
 * `products`, `sales`, `events`, `webhooks`, `financial` etc. em modo
 * **somente-leitura**. Não existe, até o momento deste commit, endpoint
 * REST público para *criar* produtos — tentativas de `POST /v1/products`
 * retornam 404. A criação do produto precisa ser feita uma única vez
 * pelo dashboard web (ver `docs/kiwify-setup.md`).
 *
 * O que este script faz:
 * -----------------------
 *   1. Autentica via OAuth client credentials (client_id + client_secret)
 *   2. Busca os produtos da conta configurada
 *   3. Se encontrar um produto cujo nome contenha "Código da Repetição"
 *      (case-insensitive), imprime o `product_id` e a URL de checkout
 *      inferida no formato `https://pay.kiwify.com.br/<id>`
 *   4. Opcionalmente (flag `--write`) atualiza `LINKS.ebook` em
 *      `lib/constants.ts` automaticamente com a URL encontrada
 *
 * Uso:
 *   npx tsx scripts/kiwify-sync-product.ts            # dry run
 *   npx tsx scripts/kiwify-sync-product.ts --write    # atualiza constants
 *
 * Variáveis de ambiente necessárias (em .env):
 *   KIWIFY_CLIENT_ID
 *   KIWIFY_CLIENT_SECRET
 *   KIWIFY_ACCOUNT_ID
 */

import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const TOKEN_URL = "https://public-api.kiwify.com/v1/oauth/token"
const PRODUCTS_URL = "https://public-api.kiwify.com/v1/products"
const CONSTANTS_PATH = resolve(process.cwd(), "lib/constants.ts")
const PRODUCT_NAME_MATCH = /código da repetição/i

type OAuthResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string[]
}

type KiwifyProduct = {
  id: string
  name: string
  price?: number
  status?: string
  checkout_link?: string
}

type ProductsResponse = {
  pagination: { count: number; page_number: number; page_size: number }
  data: KiwifyProduct[]
}

function requireEnv(key: string): string {
  const v = process.env[key]
  if (!v) {
    throw new Error(
      `Variável de ambiente ausente: ${key} — defina em .env antes de rodar.`
    )
  }
  return v
}

async function getAccessToken(): Promise<string> {
  const clientId = requireEnv("KIWIFY_CLIENT_ID")
  const clientSecret = requireEnv("KIWIFY_CLIENT_SECRET")

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
  })

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OAuth Kiwify falhou (${res.status}): ${text}`)
  }

  const json = (await res.json()) as OAuthResponse
  return json.access_token
}

async function listProducts(token: string): Promise<KiwifyProduct[]> {
  const accountId = requireEnv("KIWIFY_ACCOUNT_ID")
  const res = await fetch(`${PRODUCTS_URL}?page_size=100`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-kiwify-account-id": accountId,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Listagem de produtos falhou (${res.status}): ${text}`)
  }

  const json = (await res.json()) as ProductsResponse
  return json.data
}

function inferCheckoutUrl(p: KiwifyProduct): string {
  // Prioriza `checkout_link` se a API devolver; caso contrário, monta pelo id.
  if (p.checkout_link && p.checkout_link.startsWith("http")) {
    return p.checkout_link
  }
  return `https://pay.kiwify.com.br/${p.id}`
}

async function updateConstantsFile(newUrl: string): Promise<void> {
  const source = await readFile(CONSTANTS_PATH, "utf8")

  const patched = source.replace(
    /ebook:\s*"[^"]*"/,
    `ebook: "${newUrl}"`
  )

  if (patched === source) {
    throw new Error(
      "Não consegui localizar a linha `ebook: \"...\"` em lib/constants.ts."
    )
  }

  await writeFile(CONSTANTS_PATH, patched, "utf8")
}

async function main() {
  const shouldWrite = process.argv.includes("--write")

  console.log("[kiwify-sync] Autenticando…")
  const token = await getAccessToken()

  console.log("[kiwify-sync] Buscando produtos…")
  const products = await listProducts(token)

  if (products.length === 0) {
    console.log(
      "[kiwify-sync] Nenhum produto encontrado na conta.\n" +
        "→ Crie o produto pelo dashboard (ver docs/kiwify-setup.md) e rode este script de novo."
    )
    return
  }

  console.log(
    `[kiwify-sync] ${products.length} produto(s) na conta:`,
    products.map((p) => ({ id: p.id, name: p.name, status: p.status }))
  )

  const target = products.find((p) => PRODUCT_NAME_MATCH.test(p.name))

  if (!target) {
    console.log(
      `[kiwify-sync] Nenhum produto com nome casando com ${PRODUCT_NAME_MATCH}.\n` +
        "→ Crie o produto com o nome exato (ou ajuste PRODUCT_NAME_MATCH neste script)."
    )
    return
  }

  const url = inferCheckoutUrl(target)
  console.log(`[kiwify-sync] Produto encontrado: ${target.id}`)
  console.log(`[kiwify-sync] URL de checkout: ${url}`)

  if (!shouldWrite) {
    console.log(
      "[kiwify-sync] Dry run (use --write para atualizar lib/constants.ts automaticamente)."
    )
    return
  }

  await updateConstantsFile(url)
  console.log("[kiwify-sync] lib/constants.ts atualizado com sucesso.")
}

main().catch((err) => {
  console.error("[kiwify-sync] ERRO:", err.message ?? err)
  process.exit(1)
})
