import { BREAKPOINTS, LAYOUT } from '../styles/constants'

// Theme color constants
const THEME_COLORS = {
  light: {
    primary: {
      main: '#e86222',
      light: '#f0863f',
      dark: '#d4501c',
    },
    secondary: {
      main: '#79f1b4',
      light: '#9cf5c7',
      dark: '#0e864a',
    },
    info: {
      main: '#57c5ee',
      light: '#7dd3f2',
      dark: '#117fa7',
    },
    background: {
      default: '#fdf3ee',
      paper: '#ffffff',
    },
    text: {
      primary: '#100702',
      secondary: '#6b7280',
    },
  },
  dark: {
    primary: {
      main: '#de5617',
      light: '#e86222',
      dark: '#c94a14',
    },
    secondary: {
      main: '#0e864a',
      light: '#79f1b4',
      dark: '#0c7540',
    },
    info: {
      main: '#117fa7',
      light: '#57c5ee',
      dark: '#0f6d8e',
    },
    background: {
      default: '#120802',
      paper: '#1f2937',
    },
    text: {
      primary: '#fdf2ed',
      secondary: '#d1d5db',
    },
  },
} as const

export const createBasicLayoutTheme = (isDark: boolean) => ({
  breakpoints: {
    values: BREAKPOINTS,
  },
  palette: {
    mode: isDark ? 'dark' as const : 'light' as const,
    primary: isDark ? THEME_COLORS.dark.primary : THEME_COLORS.light.primary,
    secondary: isDark ? THEME_COLORS.dark.secondary : THEME_COLORS.light.secondary,
    info: isDark ? THEME_COLORS.dark.info : THEME_COLORS.light.info,
    background: isDark ? THEME_COLORS.dark.background : THEME_COLORS.light.background,
    text: isDark ? THEME_COLORS.dark.text : THEME_COLORS.light.text,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: LAYOUT.borderRadius,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT.borderRadius,
          textTransform: 'none' as const,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: LAYOUT.borderRadius,
        },
      },
    },
  },
})

export const basicLayoutStyles = {
  root: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
  },
} as const