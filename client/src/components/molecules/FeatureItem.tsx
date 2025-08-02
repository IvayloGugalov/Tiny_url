import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { BlurText } from '../atoms/BlurText'

interface FeatureItemProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export const FeatureItem = ({
  icon,
  title,
  description,
  delay = 0,
}: FeatureItemProps) => {
  const theme = useTheme()

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <motion.div variants={itemVariants}>
      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        sx={{
          p: 2,
          borderRadius: 2,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}1A 0%, ${theme.palette.primary.main}0D 100%)`,
          border: `2px solid ${theme.palette.primary.main}33`,
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(0, 0, 0, 0.02)',
            transform: 'translateX(8px)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 4px 12px rgba(255, 255, 255, 0.1)'
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant='body1'
            sx={{
              fontWeight: 600,
              mb: 0.5,
              color: theme.palette.text.primary,
            }}
          >
            <BlurText
              text={`✅ ${title}:`}
              animateBy='character'
              delay={delay + 0.1}
              fontWeight='bold'
            />
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.5,
            }}
          >
            <BlurText text={description} animateBy='word' delay={delay + 0.2} />
          </Typography>
        </Box>
      </Stack>
    </motion.div>
  )
}
