import { alpha, Theme } from '@mui/material/styles'

export const footerStyles = {
  root: {
    mt: 'auto',
    py: 4,
    background: (theme: Theme) =>
      theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.1)} 0%, ${alpha(theme.palette.secondary.dark, 0.05)} 100%)`
        : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
    borderTop: (theme: Theme) =>
      `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    backdropFilter: 'blur(10px)',
  },

  brandText: {
    fontWeight: 700,
    background: (theme: Theme) =>
      theme.palette.mode === 'dark'
        ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`
        : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.dark} 90%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: { xs: 'center', md: 'left' },
  },

  description: {
    color: (theme: Theme) => theme.palette.text.secondary,
    maxWidth: '280px',
    textAlign: { xs: 'center', md: 'left' },
    lineHeight: 1.6,
  },

  sectionTitle: {
    fontWeight: 600,
    color: (theme: Theme) => theme.palette.text.primary,
    mb: 0.5,
    textAlign: { xs: 'center', md: 'left' },
  },

  link: {
    color: (theme: Theme) => theme.palette.text.secondary,
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      color: (theme: Theme) => theme.palette.primary.main,
      textDecoration: 'none',
      transform: 'translateY(-1px)',
    },
  },

  socialButton: {
    color: (theme: Theme) => theme.palette.text.secondary,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      color: (theme: Theme) => theme.palette.primary.main,
      transform: 'translateY(-2px) scale(1.1)',
      background: (theme: Theme) => alpha(theme.palette.primary.main, 0.1),
    },
  },

  divider: {
    borderColor: (theme: Theme) => alpha(theme.palette.divider, 0.1),
    my: 2,
  },

  copyright: {
    color: (theme: Theme) => theme.palette.text.secondary,
    fontSize: '0.875rem',
  },

  madeWith: {
    color: (theme: Theme) => theme.palette.text.secondary,
    fontSize: '0.875rem',
  },

  heartIcon: {
    color: (theme: Theme) => theme.palette.error.main,
    fontSize: '1rem',
    animation: 'heartbeat 2s ease-in-out infinite',
    '@keyframes heartbeat': {
      '0%': {
        transform: 'scale(1)',
      },
      '14%': {
        transform: 'scale(1.1)',
      },
      '28%': {
        transform: 'scale(1)',
      },
      '42%': {
        transform: 'scale(1.1)',
      },
      '70%': {
        transform: 'scale(1)',
      },
    },
  },
} as const
