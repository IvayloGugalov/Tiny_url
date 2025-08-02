import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  animateBy?: 'character' | 'word'
  fontWeight?: string | number
  style?: React.CSSProperties
  children?: ReactNode
}

export const BlurText = ({
  text,
  className = '',
  delay = 0,
  animateBy = 'word',
  fontWeight,
  style,
}: BlurTextProps) => {
  const splitText = animateBy === 'character' ? text.split('') : text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animateBy === 'character' ? 0.03 : 0.1,
        delayChildren: delay,
      },
    },
  }

  const childVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: 5,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      style={{
        display: 'inline-block',
        fontWeight,
        ...style,
      }}
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
