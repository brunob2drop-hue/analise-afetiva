"use client"

import { motion, type Variants } from "framer-motion"
import { Children } from "react"

type LinkBioStackProps = {
  children: React.ReactNode
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.05, staggerChildren: 0.12 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

export default function LinkBioStack({ children }: LinkBioStackProps) {
  const items = Children.toArray(children)
  return (
    <motion.div
      className="flex flex-col"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
