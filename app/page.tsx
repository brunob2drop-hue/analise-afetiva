import Link from "next/link"

/**
 * Home route stub.
 * The full sales landing page is delivered by sub-project C in a later spec.
 * For now this is a minimal placeholder so the root route compiles and
 * the /link-in-bio page is reachable during development.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-linen px-6 text-center">
      <h1 className="font-editorial text-4xl font-semibold text-charcoal md:text-5xl">
        Analise Afetiva
      </h1>
      <p className="max-w-md font-body text-brown/80">
        Landing page de vendas em construção. Enquanto isso, visite o hub:
      </p>
      <Link
        href="/link-in-bio"
        className="inline-block rounded-full bg-terracota px-6 py-3 font-body text-sm font-bold text-charcoal transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90"
      >
        Ir para o link na bio →
      </Link>
    </main>
  )
}
