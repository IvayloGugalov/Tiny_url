import { ReactNode, useRef, MouseEvent } from 'react'
import { Card, CardProps, useTheme } from '@mui/material'
import type { Palette } from '@mui/material/styles'
import { hexToRGBA } from '@/utils/colorUtils'

type PaletteColorKey = keyof Pick<Palette, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>
type PaletteColorVariant = keyof Palette['primary']

interface SpotlightCardProps extends Omit<CardProps, 'onMouseMove'> {
  children: ReactNode
  className?: string
  spotlightColor?: PaletteColorKey
  spotlightVariant?: PaletteColorVariant
  spotlightOpacity?: number
}

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'primary',
  spotlightVariant = 'main',
  spotlightOpacity = 0.25,
  sx,
  ...cardProps
}: SpotlightCardProps) => {
  const theme = useTheme()
  const cardRef = useRef<HTMLDivElement>(null)

  const getSpotlightColorValue = () => {
    const paletteColor = theme.palette[spotlightColor]
    const colorValue = paletteColor[spotlightVariant]
    return hexToRGBA(colorValue, spotlightOpacity)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    cardRef.current.style.setProperty('--spotlight-color', getSpotlightColorValue())
  }

  return (
    <Card
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-out',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': getSpotlightColorValue(),
        '&:hover': {
          transform: 'translateY(-2px)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&:hover::before, &:focus-within::before': {
          opacity: 0.6,
        },
        '& > *': {
          position: 'relative',
          zIndex: 2,
        },
        ...sx,
      }}
      {...cardProps}
    >
      {children}
    </Card>
  )
}
