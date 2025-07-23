import { ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createBasicLayoutTheme } from './BasicLayout.styles'

interface BasicLayoutProps {
  children: ReactNode
  theme: 'light' | 'dark'
}

export function BasicLayout({ children, theme }: BasicLayoutProps) {
  const isDark = theme === 'dark'

  // Create MUI theme using extracted configuration
  const muiTheme = createTheme(createBasicLayoutTheme(isDark))

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}