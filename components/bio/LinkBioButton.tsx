import { cn } from "@/lib/utils"
import { isPlaceholder } from "@/lib/constants"

type LinkBioVariant = "ebook" | "tiktok" | "youtube"

type LinkBioButtonProps = {
  variant: LinkBioVariant
  title: string
  subtitle?: string
  href: string
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

const sharedShell =
  "bg-gradient-to-br from-charcoal to-dark-card border border-terracota"

const sharedTitleClass = "font-editorial font-semibold text-linen"
const sharedSubtitleClass = "font-body text-sand/80"
const sharedRightIcon = <ArrowRightIcon color="#B89070" />

const VARIANTS: Record<LinkBioVariant, VariantConfig> = {
  ebook: {
    shell: sharedShell,
    titleClass: sharedTitleClass,
    subtitleClass: sharedSubtitleClass,
    leftIcon: <EbookIcon />,
    rightIcon: sharedRightIcon,
  },
  tiktok: {
    shell: sharedShell,
    titleClass: sharedTitleClass,
    subtitleClass: sharedSubtitleClass,
    leftIcon: <TiktokIcon />,
    rightIcon: sharedRightIcon,
  },
  youtube: {
    shell: sharedShell,
    titleClass: sharedTitleClass,
    subtitleClass: sharedSubtitleClass,
    leftIcon: <YoutubeIcon />,
    rightIcon: sharedRightIcon,
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
}: LinkBioButtonProps) {
  const config = VARIANTS[variant]
  const isPH = isPlaceholder(href)
  const safeHref = isPH ? "#" : href
  const isExternal = !isPH

  return (
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
        {subtitle && (
          <span className={cn("text-xs leading-snug", config.subtitleClass)}>
            {subtitle}
          </span>
        )}
      </div>
      <div className="shrink-0">{config.rightIcon}</div>
    </a>
  )
}