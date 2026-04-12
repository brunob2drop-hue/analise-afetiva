/**
 * CSS-only book cover mockup used in Hero and Oferta.
 * No external images — a pure SVG/Tailwind composition of a tilted
 * hardcover with "O Código da Repetição" set in Cormorant Garamond.
 *
 * Sizes are controlled by the `size` prop (w/h in rem). The tilt and
 * shadow give a premium, editorial feel without leaning on bitmap art.
 */

type BookMockupProps = {
  size?: "md" | "lg"
  className?: string
}

const SIZES = {
  md: { w: "w-[220px] md:w-[260px]", h: "h-[320px] md:h-[380px]" },
  lg: { w: "w-[260px] md:w-[320px]", h: "h-[380px] md:h-[460px]" },
} as const

export default function BookMockup({
  size = "md",
  className,
}: BookMockupProps) {
  const s = SIZES[size]
  return (
    <div
      className={`relative ${s.w} ${s.h} ${className ?? ""}`}
      aria-hidden="true"
      style={{ perspective: "1400px" }}
    >
      {/* Shadow plate */}
      <div
        className="absolute inset-x-8 bottom-[-18px] h-6 rounded-full bg-charcoal/40 blur-2xl"
        aria-hidden="true"
      />

      {/* Cover — tilted */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[4px] shadow-[0_40px_80px_-20px_rgba(26,20,16,0.55),0_18px_40px_-12px_rgba(26,20,16,0.35)]"
        style={{
          transform: "rotateY(-14deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(145deg, #1A1410 0%, #2A2018 45%, #4A3728 100%)",
        }}
      >
        {/* Terracota stripe */}
        <div
          className="absolute left-0 top-0 h-full w-[10px]"
          style={{
            background:
              "linear-gradient(180deg, #B89070 0%, #8A6A50 100%)",
          }}
        />

        {/* Inner border */}
        <div className="absolute inset-4 rounded-[2px] border border-terracota/25" />

        {/* Type stack */}
        <div className="absolute inset-0 flex flex-col items-center justify-between px-8 py-10 text-center">
          <div className="flex flex-col items-center gap-1">
            <span className="font-body text-[9px] font-bold uppercase tracking-[0.3em] text-terracota">
              Analise Afetiva
            </span>
            <span className="mt-1 block h-px w-8 bg-terracota/60" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="font-editorial text-[30px] font-semibold leading-[1.05] text-linen md:text-[34px]">
              O Código
              <br />
              da Repetição
            </h3>
            <div className="flex items-center gap-2">
              <span className="block h-px w-4 bg-terracota/70" />
              <span className="font-editorial text-[10px] italic text-sand/80">
                um ensaio
              </span>
              <span className="block h-px w-4 bg-terracota/70" />
            </div>
            <p className="max-w-[22ch] font-editorial text-[11px] italic leading-snug text-sand/75">
              Por que você aceita o amor
              <br />
              que acha que merece?
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="font-body text-[8px] uppercase tracking-[0.25em] text-sand/60">
              Ed. digital
            </span>
          </div>
        </div>

        {/* Glossy light */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)",
          }}
        />
      </div>
    </div>
  )
}
