import { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { dashboardLayoutStyles } from './DashboardLayout.styles'
import { ReactNode } from 'react'
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { SplitText } from '../components'

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
      <AppBar position="static">
        <Toolbar sx={dashboardLayoutStyles.toolbar}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={dashboardLayoutStyles.mobileMenuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={dashboardLayoutStyles.titleContainer}>
            <Typography
              variant="h4"
              component="h1"
              sx={dashboardLayoutStyles.title}
            >
              <SplitText
                text="🔗 TinyURL"
                animateBy="character"
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
                variant="outlined"
                size="small"
                sx={dashboardLayoutStyles.outlinedButton}
              >
                Home
              </Button>
              <IconButton
                onClick={handleThemeToggle}
                color="inherit"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                size="medium"
              >
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
              <Button
                onClick={handleLogout}
                variant="contained"
                size="small"
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
                color="inherit"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                size="medium"
              >
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
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
      <Container
        component="main"
        sx={dashboardLayoutStyles.mainContent}
      >
        {children}
      </Container>
    </Box>
  )
}
