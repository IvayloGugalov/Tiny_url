import { ReactNode, useRef, MouseEvent } from 'react'
import { Card, CardProps } from '@mui/material'

interface SpotlightCardProps extends Omit<CardProps, 'onMouseMove'> {
  children: ReactNode
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  sx,
  ...cardProps
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    cardRef.current.style.setProperty('--spotlight-color', spotlightColor)
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
        '--spotlight-color': spotlightColor,
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
