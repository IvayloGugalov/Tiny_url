import { TYPOGRAPHY_SIZES } from '../../styles/constants'

export const createLinkFormStyles = {
  title: {
    fontSize: TYPOGRAPHY_SIZES.h4,
  },
  description: {
    fontSize: TYPOGRAPHY_SIZES.body1,
  },
  submitButton: {
    width: { xs: '100%', sm: 'auto' },
    fontSize: TYPOGRAPHY_SIZES.body1,
  },
  textField: {
    mb: 2,
  },
  alert: {
    mb: 2,
  },
} as const