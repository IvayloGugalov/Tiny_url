import { TYPOGRAPHY_SIZES, LAYOUT, RESPONSIVE, COMMON_SX } from '../styles/constants'

export const dashboardLayoutStyles = {
  root: {
    ...COMMON_SX.fullHeight,
    ...COMMON_SX.flexColumn,
  },
  toolbar: {
    flexDirection: RESPONSIVE.flexDirection,
    alignItems: RESPONSIVE.alignItems,
    gap: RESPONSIVE.gap,
  },
  mobileMenuButton: {
    alignSelf: 'flex-start',
  },
  titleContainer: {
    flexGrow: 1,
    textAlign: RESPONSIVE.textAlign,
    minWidth: 0, // Allow text to shrink
  },
  title: {
    color: 'white',
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
    alignSelf: 'flex-end',
  },
  drawer: {
    width: LAYOUT.drawerWidth,
    pt: 2,
  },
  mainContent: {
    flexGrow: 1,
    py: LAYOUT.containerPadding,
    px: LAYOUT.containerPadding,
    maxWidth: '100%',
  },
  outlinedButton: {
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  containedButton: {
    backgroundColor: 'white',
    color: 'primary.main',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
} as const