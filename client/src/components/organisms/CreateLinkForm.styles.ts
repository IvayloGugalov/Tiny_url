import { TYPOGRAPHY_SIZES } from '../../styles/constants'

export const createLinkFormStyles = {
  container: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    p: 4,
    maxWidth: 600,
    mx: 'auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
    },
  },
  header: {
    textAlign: 'center',
    mb: 4,
  },
  title: {
    fontSize: TYPOGRAPHY_SIZES.h4,
    fontWeight: 700,
    background: 'linear-gradient(135deg, #e86222 0%, #de5617 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  description: {
    fontSize: TYPOGRAPHY_SIZES.body1,
    color: 'text.secondary',
    maxWidth: 400,
    mx: 'auto',
  },
  inputField: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(232, 98, 34, 0.1)',
      },
      '&.Mui-focused': {
        boxShadow: '0 4px 16px rgba(232, 98, 34, 0.2)',
      },
      '&.Mui-error': {
        boxShadow: '0 4px 12px rgba(244, 67, 54, 0.2)',
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
    boxShadow: '0 4px 14px rgba(232, 98, 34, 0.3)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(232, 98, 34, 0.4)',
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
    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
    border: '1px solid rgba(76, 175, 80, 0.2)',
  },
  copyButton: {
    borderRadius: 1.5,
    minWidth: 'auto',
    px: 2,
    '&:hover': {
      backgroundColor: 'success.main',
      color: 'white',
    },
    transition: 'all 0.3s ease',
  },
  helperText: {
    fontSize: '0.875rem',
    color: 'text.secondary',
    textAlign: 'center',
    mt: 1,
    fontStyle: 'italic',
  },
  alert: {
    mb: 2,
    borderRadius: 2,
  },
  successAnimation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'success.main',
    fontSize: '2rem',
    mb: 1,
  },
} as const