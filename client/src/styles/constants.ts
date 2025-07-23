import { Theme } from '@mui/material/styles'

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const

// Typography sizes
export const TYPOGRAPHY_SIZES = {
  h1: { xs: '1.5rem', sm: '2.125rem' },
  h2: { xs: '1.25rem', sm: '1.5rem' },
  h3: { xs: '1.1rem', sm: '1.25rem' },
  h4: { xs: '1.1rem', sm: '1.5rem' },
  h5: { xs: '1.1rem', sm: '1.5rem' },
  h6: { xs: '1.1rem', sm: '1.25rem' },
  body1: { xs: '0.875rem', sm: '1rem' },
  body2: { xs: '0.75rem', sm: '0.875rem' },
  caption: { xs: '0.75rem', sm: '0.875rem' },
} as const

// Spacing values
export const SPACING = {
  xs: { xs: 1, sm: 1 },
  sm: { xs: 1, sm: 2 },
  md: { xs: 2, sm: 3 },
  lg: { xs: 2, sm: 4 },
  xl: { xs: 3, sm: 5 },
} as const

// Layout constants
export const LAYOUT = {
  containerPadding: { xs: 2, sm: 3 },
  headerHeight: { xs: 'auto', sm: 64 },
  drawerWidth: 250,
  borderRadius: 12,
} as const

// Component heights
export const HEIGHTS = {
  mobile: { xs: 300, sm: 400 },
  compact: { xs: 200, sm: 300 },
  large: { xs: 400, sm: 500 },
} as const

// Common responsive patterns
export const RESPONSIVE = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'stretch', sm: 'center' },
  textAlign: { xs: 'center', sm: 'left' },
  gap: { xs: 1, sm: 0 },
  padding: { xs: 1, sm: 2 },
  margin: { xs: 1, sm: 2 },
} as const

// Theme-specific colors
export const getThemeColors = (theme: Theme) => ({
  primary: theme.palette.primary.main,
  secondary: theme.palette.secondary.main,
  background: theme.palette.background.default,
  paper: theme.palette.background.paper,
  text: theme.palette.text.primary,
  textSecondary: theme.palette.text.secondary,
})

// Common sx patterns
export const COMMON_SX = {
  fullHeight: { minHeight: '100vh' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  flexCenter: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  flexBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  fullWidth: { width: '100%' },
  height100: { height: '100%' },
  noTextDecoration: { textDecoration: 'none' },
  compactDensity: { density: 'compact' as const },
} as const