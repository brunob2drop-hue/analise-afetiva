import { cn } from "@/lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Centered max-width wrapper with horizontal padding.
 * Every section of the site drops its content inside a Container to
 * maintain a consistent reading rhythm (1200px desktop target).
 */
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-6", className)}>
      {children}
    </div>
  )
}
