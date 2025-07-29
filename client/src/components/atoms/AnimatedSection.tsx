import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  initial?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
  }
  animate?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
  }
}

const defaultInitial = {
  opacity: 0,
  y: 40,
}

const defaultAnimate = {
  opacity: 1,
  y: 0,
}

export const AnimatedSection = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  style = {},
  initial = defaultInitial,
  animate = defaultAnimate,
}: AnimatedSectionProps) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
    >
      {children}
    </motion.div>
  )
}
