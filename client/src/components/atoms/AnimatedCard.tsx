import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { SpotlightCard } from './SpotlightCard'
import type { SxProps, Theme } from '@mui/material/styles'
import type { Palette } from '@mui/material/styles'

type PaletteColorKey = keyof Pick<Palette, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>
type PaletteColorVariant = keyof Palette['primary']

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  duration?: number
  spotlightColor?: PaletteColorKey
  spotlightVariant?: PaletteColorVariant
  spotlightOpacity?: number
  sx?: SxProps<Theme>
  className?: string
}

export const AnimatedCard = ({
  children,
  delay = 0,
  duration = 0.6,
  spotlightColor = 'primary',
  spotlightVariant = 'main',
  spotlightOpacity = 0.25,
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
        spotlightVariant={spotlightVariant}
        spotlightOpacity={spotlightOpacity}
      >
        {children}
      </SpotlightCard>
    </motion.div>
  )
}
