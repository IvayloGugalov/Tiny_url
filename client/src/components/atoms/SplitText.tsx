import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  animateBy?: 'character' | 'word'
  staggerChildren?: number
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
  children?: ReactNode
}

const defaultInitial = {
  opacity: 0,
  y: 20,
}

const defaultAnimate = {
  opacity: 1,
  y: 0,
}

export const SplitText = ({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  animateBy = 'character',
  staggerChildren = 0.05,
  initial = defaultInitial,
  animate = defaultAnimate,
}: SplitTextProps) => {
  const splitText = animateBy === 'character'
    ? Array.from(text) // Use Array.from to properly handle Unicode characters like emojis
    : text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const childVariants = {
    hidden: initial,
    visible: {
      ...animate,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOutQuart
      },
    },
  }

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {splitText.map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{
            display: 'inline-block',
            whiteSpace: animateBy === 'character' ? 'pre' : 'nowrap',
          }}
        >
          {char === ' ' && animateBy === 'character' ? '\u00A0' : char}
          {animateBy === 'word' && index < splitText.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
