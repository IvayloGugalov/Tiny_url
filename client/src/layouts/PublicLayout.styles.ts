import { Theme } from '@mui/material/styles'
import {
  TYPOGRAPHY_SIZES,
  LAYOUT,
  RESPONSIVE,
  COMMON_SX,
} from '../styles/constants'

export const publicLayoutStyles = {
  root: {
    ...COMMON_SX.fullHeight,
    ...COMMON_SX.flexColumn,
  },
  toolbar: {
    flexDirection: RESPONSIVE.flexDirection,
    alignItems: RESPONSIVE.alignItems,
    gap: RESPONSIVE.gap,
    py: { xs: 1, sm: 0 },
  },
  titleContainer: {
    flexGrow: 1,
    textAlign: RESPONSIVE.textAlign,
    minWidth: 0, // Allow text to shrink
  },
  title: {
    color: (theme: Theme) => theme.palette.common.white,
    margin: 0,
    fontSize: TYPOGRAPHY_SIZES.h4,
    lineHeight: 1.2,
  },
  desktopActions: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
  mobileActions: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  outlinedButton: {
    color: (theme: Theme) => theme.palette.common.white,
    borderColor: (theme: Theme) => theme.palette.common.white,
  },
  mobileOutlinedButton: {
    color: (theme: Theme) => theme.palette.common.white,
    borderColor: (theme: Theme) => theme.palette.common.white,
    fontSize: '0.75rem',
    px: 1,
  },
  mobileContainedButton: {
    fontSize: '0.75rem',
    px: 1,
  },
  mainContent: {
    flexGrow: 1,
    py: LAYOUT.containerPadding,
    px: LAYOUT.containerPadding,
    maxWidth: '100%',
  },
} as const
