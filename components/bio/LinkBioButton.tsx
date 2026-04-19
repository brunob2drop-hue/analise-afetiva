import { isPlaceholder } from "@/lib/constants"

type LinkBioVariant = "ebook" | "tiktok" | "youtube"

type LinkBioButtonProps = {
  variant: LinkBioVariant
  title: string
  href: string
  icon?: React.ReactNode
}

function ChevronRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M5.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function LinkBioButton({ variant, title, href, icon }: LinkBioButtonProps) {
  const isPH = isPlaceholder(href)
  const safeHref = isPH ? "#" : href

  const sharedProps = {
    href: safeHref,
    "data-placeholder": isPH ? ("true" as const) : undefined,
    target: !isPH ? "_blank" : undefined,
    rel: !isPH ? "noopener noreferrer" : undefined,
  }

  if (variant === "ebook") {
    return (
      <a
        {...sharedProps}
        className="flex w-full items-center gap-3 rounded-xl bg-cta px-7 py-5 text-left shadow-[0_4px_20px_rgba(122,78,58,0.28)] transition-all duration-200 hover:bg-cta-hover hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(122,78,58,0.38)] active:translate-y-0 active:shadow-[0_2px_12px_rgba(122,78,58,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
      >
        {icon && (
          <span className="shrink-0 text-linen/80" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="font-body text-[15px] font-medium leading-snug text-linen">
          {title}
        </span>
      </a>
    )
  }

  return (
    <a
      {...sharedProps}
      className="group flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-surface/50 px-6 py-[15px] transition-all duration-200 hover:border-terracota/40 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
    >
      <span className="flex items-center gap-3">
        {icon && (
          <span className="shrink-0 text-terracota/70 transition-colors duration-200 group-hover:text-cta" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="font-body text-[14px] leading-snug text-charcoal transition-colors duration-200 group-hover:text-cta">
          {title}
        </span>
      </span>
      <span className="shrink-0 text-terracota/60 transition-colors duration-200 group-hover:text-cta">
        <ChevronRight />
      </span>
    </a>
  )
}
