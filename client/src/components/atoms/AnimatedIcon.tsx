import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedIconProps {
  children: ReactNode
  delay?: number
  duration?: number
  containerStyles?: React.CSSProperties | object
  className?: string
  initial?: {
    opacity?: number
    scale?: number
    y?: number
    x?: number
  }
  animate?: {
    opacity?: number
    scale?: number
    y?: number
    x?: number
  }
}

const defaultInitial = {
  opacity: 0,
  scale: 0.5,
  y: 20,
}

const defaultAnimate = {
  opacity: 1,
  scale: 1,
  y: 0,
}

export const AnimatedIcon = ({
  children,
  delay = 0,
  duration = 0.6,
  containerStyles = {},
  className = '',
  initial = defaultInitial,
  animate = defaultAnimate,
}: AnimatedIconProps) => {
  return (
    <motion.div
      className={className}
      style={containerStyles}
      initial={initial}
      animate={animate}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOutQuart
      }}
    >
      {children}
    </motion.div>
  )
}
