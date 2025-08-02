import { Theme } from '@mui/material/styles'
import { TYPOGRAPHY_SIZES } from '../../styles/constants'

export const createLinkFormStyles = {
  container: {
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    boxShadow: 'none',
    p: 4,
    maxWidth: 600,
    mx: 'auto',
  },
  header: {
    textAlign: 'center',
    mb: 4,
  },
  title: {
    fontWeight: 700,
    textAlign: 'left',
    background: (theme: Theme) =>
      `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  description: {
    textAlign: 'left',
    maxWidth: 400,
  },
  formContainer: {
    px: 3,
    py: 4,
    background: (theme: Theme) =>
      theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(40, 40, 40, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
    transition: 'all 0.3s ease',
    border: (theme: Theme) =>
      theme.palette.mode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
    },
  },
  inputField: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: (theme: Theme) =>
          `0 4px 12px ${theme.palette.primary.main}1A`,
      },
      '&.Mui-focused': {
        boxShadow: (theme: Theme) =>
          `0 4px 16px ${theme.palette.primary.main}33`,
      },
      '&.Mui-error': {
        boxShadow: (theme: Theme) => `0 4px 12px ${theme.palette.error.main}33`,
      },
      '& fieldset': {
        borderColor: (theme: Theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[600]
            : theme.palette.grey[300],
      },
      '&:hover fieldset': {
        borderColor: (theme: Theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[500]
            : theme.palette.grey[400],
      },
      '&.Mui-focused fieldset': {
        borderColor: (theme: Theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
      },
    },
  },
  submitButton: {
    width: '100%',
    fontSize: TYPOGRAPHY_SIZES.body1,
    fontWeight: 600,
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: (theme: Theme) => `0 4px 14px ${theme.palette.primary.main}4D`,
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: (theme: Theme) => `0 6px 20px ${theme.palette.primary.main}66`,
    },
    '&:disabled': {
      transform: 'none',
      boxShadow: 'none',
    },
    transition: 'all 0.3s ease',
  },
  resultContainer: {
    mb: 2,
    p: 2,
    borderRadius: 2,
    background: (theme: Theme) =>
      `linear-gradient(135deg, ${theme.palette.success.main}1A 0%, ${theme.palette.success.main}0D 100%)`,
    border: (theme: Theme) => `1px solid ${theme.palette.success.main}33`,
  },
  copyButton: {
    borderRadius: 1.5,
    minWidth: 'auto',
    px: 2,
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.palette.success.main,
      color: 'white',
    },
    transition: 'all 0.3s ease',
  },
  helperText: {
    textAlign: 'left',
    mt: 1,
    fontStyle: 'italic',
  },
  alert: {
    mb: 2,
    borderRadius: 2,
  },
  resultField: {
    backgroundColor: (theme: Theme) => theme.palette.grey[800],
    borderRadius: 1,
  },
} as const
