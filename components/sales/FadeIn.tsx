"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

/**
 * Reusable scroll-in wrapper used by landing page sections to fade
 * content up on first appearance. Respects prefers-reduced-motion.
 *
 * Important SSR note: we never emit `opacity: 0` from the server. The
 * server (and the very first client render, before hydration) renders
 * a plain visible <div>. After mount we swap in framer-motion so the
 * fade-in still plays on the client. This prevents a blank page when
 * the IntersectionObserver/whileInView fails to fire (which happened
 * in production on Next.js 16 + framer-motion 12).
 */

type FadeInProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
}: FadeInProps) {
  const reduce = useReducedMotion()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated || reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
