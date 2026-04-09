import { cn } from "@/lib/utils"
import { isPlaceholder } from "@/lib/constants"

type LinkBioVariant = "ebook" | "whatsapp" | "tiktok" | "youtube"

type LinkBioButtonProps = {
  variant: LinkBioVariant
  title: string
  subtitle: string
  href: string
  priceBadge?: string
  floatingBadge?: string
}

/**
 * Visual shell for the 4 hub buttons on /link-in-bio.
 * Styling is variant-locked (not a free-form `bg` prop) so the visual
 * system stays coherent. Each variant owns its background, border,
 * title/subtitle color, left icon, and right icon.
 *
 * Left icons are inline SVG (40x40). Right icons are inline SVG (24x24).
 * No icon library — maximum control of stroke and color.
 */

/* ============================================================
 * Icon primitives — 40x40 left icons
 * ============================================================ */

function EbookIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 8 C 6 7, 7 6, 8 6 L 18 6 C 19 6, 20 7, 20 8 L 20 32 C 20 33, 19 34, 18 34 L 8 34 C 7 34, 6 33, 6 32 Z"
        stroke="#B89070"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 8 C 20 7, 21 6, 22 6 L 32 6 C 33 6, 34 7, 34 8 L 34 32 C 34 33, 33 34, 32 34 L 22 34 C 21 34, 20 33, 20 32 Z"
        stroke="#B89070"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="10" y1="12" x2="16" y2="12" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="10" y1="16" x2="16" y2="16" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="10" y1="20" x2="14" y2="20" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="24" y1="12" x2="30" y2="12" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="24" y1="16" x2="30" y2="16" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="24" y1="20" x2="28" y2="20" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="#128C7E" strokeWidth="1.5" />
      <path
        d="M20 28 C 16 28, 13 25, 13 21 C 13 17, 16 14, 20 14 C 24 14, 27 17, 27 21 C 27 22.5, 26.5 23.9, 25.7 25 L 27 29 L 22.8 27.4 C 21.9 27.8, 21 28, 20 28 Z"
        stroke="#128C7E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 12.5 C 18 10, 15 10.5, 15 13 C 15 15, 17 16.5, 20 18 C 23 16.5, 25 15, 25 13 C 25 10.5, 22 10, 20 12.5 Z"
        fill="#B89070"
      />
    </svg>
  )
}

function TiktokIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M25 8 C 25 11, 27 14, 30 14 L 30 18 C 27.5 18, 25.5 17, 24 15.5 L 24 25 C 24 29.4, 20.4 33, 16 33 C 11.6 33, 8 29.4, 8 25 C 8 20.6, 11.6 17, 16 17 L 16 21 C 13.8 21, 12 22.8, 12 25 C 12 27.2, 13.8 29, 16 29 C 18.2 29, 20 27.2, 20 25 L 20 8 Z"
        fill="#B89070"
      />
      <path
        d="M25 8 C 25 11, 27 14, 30 14 L 30 18 C 27.5 18, 25.5 17, 24 15.5"
        fill="#E8DDD0"
      />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" fill="#B89070" />
      <path d="M17 14 L 28 20 L 17 26 Z" fill="#F7F3EE" />
    </svg>
  )
}

/* ============================================================
 * Right icons — 24x24
 * ============================================================ */

function ArrowRightIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12 L 19 12 M 13 6 L 19 12 L 13 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsappRightMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2 C 6.5 2, 2 6.5, 2 12 C 2 13.8, 2.5 15.5, 3.3 17 L 2 22 L 7.2 20.7 C 8.7 21.4, 10.3 21.8, 12 21.8 C 17.5 21.8, 22 17.3, 22 12 C 22 6.5, 17.5 2, 12 2 Z"
        fill="#128C7E"
      />
      <path
        d="M16.5 14.5 C 16.3 14.4, 15.4 14, 15.2 13.9 C 15 13.8, 14.9 13.8, 14.7 14 C 14.6 14.1, 14.2 14.6, 14.1 14.7 C 14 14.8, 13.9 14.8, 13.7 14.7 C 13.5 14.6, 12.8 14.4, 12 13.7 C 11.4 13.2, 11 12.5, 10.9 12.3 C 10.8 12.1, 10.9 12, 11 11.9 C 11.1 11.8, 11.2 11.7, 11.3 11.5 C 11.4 11.4, 11.4 11.3, 11.5 11.1 C 11.5 11, 11.5 10.9, 11.5 10.8 C 11.4 10.7, 11 9.8, 10.9 9.5 C 10.7 9.2, 10.6 9.2, 10.5 9.2 C 10.4 9.2, 10.3 9.2, 10.1 9.2 C 10 9.2, 9.8 9.3, 9.6 9.5 C 9.4 9.7, 8.9 10.2, 8.9 11.1 C 8.9 12.1, 9.6 13, 9.7 13.1 C 9.8 13.2, 11 15.1, 12.9 15.9 C 13.4 16.1, 13.7 16.2, 14 16.3 C 14.4 16.4, 14.8 16.4, 15.1 16.3 C 15.4 16.3, 16.1 15.9, 16.3 15.4 C 16.5 15, 16.5 14.6, 16.4 14.5 C 16.4 14.5, 16.4 14.5, 16.5 14.5 Z"
        fill="#F7F3EE"
      />
    </svg>
  )
}

function YoutubeRightMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="3" fill="#FF0000" />
      <path d="M10 9 L 16 12 L 10 15 Z" fill="#FFFFFF" />
    </svg>
  )
}

/* ============================================================
 * Variant configuration
 * ============================================================ */

type VariantConfig = {
  shell: string
  titleClass: string
  subtitleClass: string
  leftIcon: React.ReactNode
  rightIcon: React.ReactNode
}

const VARIANTS: Record<LinkBioVariant, VariantConfig> = {
  ebook: {
    shell:
      "bg-gradient-to-br from-charcoal to-dark-card border border-terracota",
    titleClass: "font-editorial font-semibold text-linen",
    subtitleClass: "font-body text-sand/80",
    leftIcon: <EbookIcon />,
    rightIcon: <ArrowRightIcon color="#B89070" />,
  },
  whatsapp: {
    shell: "bg-linen border border-sand",
    titleClass: "font-editorial font-medium text-charcoal",
    subtitleClass: "font-body text-brown",
    leftIcon: <WhatsappIcon />,
    rightIcon: <WhatsappRightMark />,
  },
  tiktok: {
    shell: "bg-charcoal",
    titleClass: "font-body font-bold text-linen",
    subtitleClass: "font-body text-sand/70",
    leftIcon: <TiktokIcon />,
    rightIcon: <ArrowRightIcon color="#B89070" />,
  },
  youtube: {
    shell: "bg-linen border border-sand",
    titleClass: "font-editorial font-medium text-charcoal",
    subtitleClass: "font-body text-brown",
    leftIcon: <YoutubeIcon />,
    rightIcon: <YoutubeRightMark />,
  },
}

/* ============================================================
 * Component
 * ============================================================ */

export default function LinkBioButton({
  variant,
  title,
  subtitle,
  href,
  priceBadge,
  floatingBadge,
}: LinkBioButtonProps) {
  const config = VARIANTS[variant]
  const isPH = isPlaceholder(href)
  const safeHref = isPH ? "#" : href
  const isExternal = !isPH

  return (
    <div className="relative">
      {floatingBadge && (
        <span className="badge-pulse absolute -top-2 -right-2 z-10 rounded-full bg-terracota px-3 py-1 font-body text-xs font-bold text-charcoal">
          {floatingBadge}
        </span>
      )}
      <a
        href={safeHref}
        data-placeholder={isPH ? "true" : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "flex min-h-[72px] w-full items-center gap-4 rounded-xl p-4",
          "transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg",
          config.shell
        )}
      >
        <div className="shrink-0">{config.leftIcon}</div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn("text-lg leading-tight", config.titleClass)}>
            {title}
          </span>
          <span className={cn("text-xs leading-snug", config.subtitleClass)}>
            {subtitle}
          </span>
        </div>
        {priceBadge && (
          <span className="shrink-0 rounded-md bg-terracota px-3 py-1 font-body text-sm font-bold text-charcoal">
            {priceBadge}
          </span>
        )}
        <div className="shrink-0">{config.rightIcon}</div>
      </a>
    </div>
  )
}
