import { ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { createBasicLayoutTheme, basicLayoutStyles } from './BasicLayout.styles'
import { Footer } from '@/organisms/Footer'

interface BasicLayoutProps {
  children: ReactNode
  theme: 'light' | 'dark'
}

export function BasicLayout({ children, theme }: BasicLayoutProps) {
  const isDark = theme === 'dark'

  const muiTheme = createTheme(createBasicLayoutTheme(isDark))

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={basicLayoutStyles.root}>
        <Box component='main' sx={{ flex: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
