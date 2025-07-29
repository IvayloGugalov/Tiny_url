import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { SpotlightCard } from './SpotlightCard'
import { SxProps, Theme } from '@mui/material'

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  duration?: number
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
  sx?: SxProps<Theme>
  className?: string
}

export const AnimatedCard = ({
  children,
  delay = 0,
  duration = 0.6,
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  sx,
  className = '',
}: AnimatedCardProps) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <motion.div variants={cardVariants}>
      <SpotlightCard
        sx={sx}
        className={className}
        spotlightColor={spotlightColor}
      >
        {children}
      </SpotlightCard>
    </motion.div>
  )
}
