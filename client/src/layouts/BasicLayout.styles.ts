import { BREAKPOINTS, LAYOUT } from '../styles/constants'

export const createBasicLayoutTheme = (isDark: boolean) => ({
  breakpoints: {
    values: BREAKPOINTS,
  },
  palette: {
    mode: isDark ? 'dark' as const : 'light' as const,
    primary: {
      main: isDark ? '#de5617' : '#e86222',
      light: isDark ? '#e86222' : '#f0863f',
      dark: isDark ? '#c94a14' : '#d4501c',
    },
    secondary: {
      main: isDark ? '#0e864a' : '#79f1b4',
      light: isDark ? '#79f1b4' : '#9cf5c7',
      dark: isDark ? '#0c7540' : '#0e864a',
    },
    info: {
      main: isDark ? '#117fa7' : '#57c5ee',
      light: isDark ? '#57c5ee' : '#7dd3f2',
      dark: isDark ? '#0f6d8e' : '#117fa7',
    },
    background: {
      default: isDark ? '#120802' : '#fdf3ee',
      paper: isDark ? '#1f2937' : '#ffffff',
    },
    text: {
      primary: isDark ? '#fdf2ed' : '#100702',
      secondary: isDark ? '#d1d5db' : '#6b7280',
    },
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