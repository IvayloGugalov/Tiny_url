import { useState } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { dashboardLayoutStyles } from './DashboardLayout.styles'
import { ReactNode } from 'react'
import Brightness4 from '@mui/icons-material/Brightness4'
import Brightness7 from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import { SplitText } from '@/atoms/SplitText'

interface DashboardLayoutProps {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  onLogout: () => void
  onGoHome: () => void
  children: ReactNode
  headerActions?: ReactNode
}

export function DashboardLayout({
  theme,
  setTheme,
  onLogout,
  onGoHome,
  children,
  headerActions,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const themeHook = useTheme()
  const isMobile = useMediaQuery(themeHook.breakpoints.down('md'))

  const handleMenuClose = () => {
    setMobileMenuOpen(false)
  }

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  handleMenuClose()
  }

  const handleLogout = () => {
    onLogout()
    handleMenuClose()
  }

  const handleGoHome = () => {
    onGoHome()
    handleMenuClose()
  }

  const mobileMenuItems = [
    { text: 'Home', icon: <HomeIcon />, onClick: handleGoHome },
    { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
  ]

  return (
    <Box sx={dashboardLayoutStyles.root}>
      <AppBar position='static'>
        <Toolbar sx={dashboardLayoutStyles.toolbar}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color='inherit'
              aria-label='open menu'
              onClick={() => setMobileMenuOpen(true)}
              sx={dashboardLayoutStyles.mobileMenuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={dashboardLayoutStyles.titleContainer}>
            <Typography variant='h4' component='h1' sx={dashboardLayoutStyles.title}>
              <SplitText
                text='🔗 TinyURL'
                animateBy='character'
                staggerChildren={0.08}
                duration={0.6}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              />
            </Typography>
          </Box>

          {/* Desktop Actions */}
          {!isMobile && (
            <Box sx={dashboardLayoutStyles.desktopActions}>
              {headerActions}
              <Button
                onClick={handleGoHome}
                variant='outlined'
                size='small'
                sx={dashboardLayoutStyles.outlinedButton}
              >
                Home
              </Button>
              <IconButton
                onClick={handleThemeToggle}
                color='inherit'
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                size='medium'
              >
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
              <Button
                onClick={handleLogout}
                variant='contained'
                size='small'
                sx={dashboardLayoutStyles.containedButton}
              >
                Logout
              </Button>
            </Box>
          )}

          {/* Mobile Actions */}
          {isMobile && (
            <Box sx={dashboardLayoutStyles.mobileActions}>
              {headerActions}
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

      {/* Mobile Drawer */}
      <Drawer
        anchor='left'
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        <Box sx={dashboardLayoutStyles.drawer}>
          <List>
            {mobileMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container component='main' sx={dashboardLayoutStyles.mainContent}>
        {children}
      </Container>
    </Box>
  )
}
