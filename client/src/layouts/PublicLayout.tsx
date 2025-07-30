import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ReactNode } from 'react'
import Brightness4 from '@mui/icons-material/Brightness4'
import Brightness7 from '@mui/icons-material/Brightness7'
import { publicLayoutStyles } from './PublicLayout.styles'

interface PublicLayoutProps {
  title: string
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  onLogin: () => void
  onLogout?: () => void
  onGoToAnalytics: () => void
  children: ReactNode
  headerActions?: ReactNode
  isAuthenticated?: boolean
}

export function PublicLayout({
  title,
  theme,
  setTheme,
  onLogin,
  onLogout,
  onGoToAnalytics,
  children,
  headerActions,
  isAuthenticated = false,
}: PublicLayoutProps) {
  const themeHook = useTheme()
  const isMobile = useMediaQuery(themeHook.breakpoints.down('md'))

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <Box sx={publicLayoutStyles.root}>
      <AppBar position='static' sx={{ borderRadius: '0 0 12px 12px' }}>
        <Toolbar sx={publicLayoutStyles.toolbar}>
          {/* Title */}
          <Box sx={publicLayoutStyles.titleContainer}>
            <Typography variant='h4' component='h1' sx={publicLayoutStyles.title}>
              {title}
            </Typography>
          </Box>

          {/* Desktop Actions */}
          {!isMobile && (
            <Box sx={publicLayoutStyles.desktopActions}>
              {headerActions}
              <Button
                onClick={onGoToAnalytics}
                variant='outlined'
                size='small'
                sx={publicLayoutStyles.outlinedButton}
              >
                Analytics
              </Button>
              {isAuthenticated ? (
                <Button variant='contained' onClick={onLogout} size='small'>
                  Log out
                </Button>
              ) : (
                <Button variant='contained' onClick={onLogin} size='small'>
                  Login
                </Button>
              )}
              <IconButton
                onClick={handleThemeToggle}
                color='inherit'
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                size='medium'
              >
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>
          )}

          {/* Mobile Actions */}
          {isMobile && (
            <Box sx={publicLayoutStyles.mobileActions}>
              {headerActions}
              <Button
                onClick={onGoToAnalytics}
                variant='outlined'
                size='small'
                sx={publicLayoutStyles.mobileOutlinedButton}
              >
                Analytics
              </Button>
              {isAuthenticated ? (
                <Button
                  variant='contained'
                  onClick={onLogout}
                  size='small'
                  sx={publicLayoutStyles.mobileContainedButton}
                >
                  Log out
                </Button>
              ) : (
                <Button
                  variant='contained'
                  onClick={onLogin}
                  size='small'
                  sx={publicLayoutStyles.mobileContainedButton}
                >
                  Login
                </Button>
              )}
              <IconButton
                onClick={handleThemeToggle}
                color='inherit'
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                size='medium'
              >
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container component='main' sx={publicLayoutStyles.mainContent}>
        {children}
      </Container>
    </Box>
  )
}
