import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../utils/cn'

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
