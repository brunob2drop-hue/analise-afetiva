import { cn } from "@/lib/utils"

type SectionBg = "linen" | "charcoal" | "dark-card"
type SectionAs = "section" | "footer" | "header" | "div"

type SectionProps = {
  children: React.ReactNode
  bg?: SectionBg
  as?: SectionAs
  className?: string
  id?: string
}

/**
 * Semantic section wrapper with vertical padding and background token.
 * Padding is generous on purpose (48px mobile → 80px desktop) — whitespace
 * is a core part of the editorial aesthetic.
 */
const BG_CLASSES: Record<SectionBg, string> = {
  linen: "bg-linen text-brown",
  charcoal: "bg-charcoal text-sand",
  "dark-card": "bg-dark-card text-sand",
}

export default function Section({
  children,
  bg = "linen",
  as: Tag = "section",
  className,
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("py-12 md:py-20", BG_CLASSES[bg], className)}
    >
      {children}
    </Tag>
  )
}
