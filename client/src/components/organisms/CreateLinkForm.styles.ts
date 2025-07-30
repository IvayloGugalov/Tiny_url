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
    background: (theme: Theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  description: {
    textAlign: 'left',
    color: (theme: Theme) => theme.palette.text.secondary,
    maxWidth: 400,
  },
  inputField: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: (theme: Theme) => `0 4px 12px ${theme.palette.primary.main}1A`,
      },
      '&.Mui-focused': {
        boxShadow: (theme: Theme) => `0 4px 16px ${theme.palette.primary.main}33`,
      },
      '&.Mui-error': {
        boxShadow: (theme: Theme) => `0 4px 12px ${theme.palette.error.main}33`,
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
    background: (theme: Theme) => `linear-gradient(135deg, ${theme.palette.success.main}1A 0%, ${theme.palette.success.main}0D 100%)`,
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
    color: (theme: Theme) => theme.palette.text.secondary,
    textAlign: 'left',
    mt: 1,
    fontStyle: 'italic',
  },
  alert: {
    mb: 2,
    borderRadius: 2,
  }
} as const
