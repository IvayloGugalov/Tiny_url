import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { PublicLayout } from '../layouts/PublicLayout'
import { RegistrationForm } from '../components/organisms/RegistrationForm'
import { useAuthStore, useThemeStore } from '../stores'

export function RegistrationPage() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleGoToAnalytics = () => {
    if (isAuthenticated) {
      navigate('/analytics')
    } else {
      navigate('/login')
    }
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <PublicLayout
      title='🔗 TinyURL'
      theme={theme}
      setTheme={setTheme}
      onLogin={handleLogin}
      onLogout={logout}
      onGoToAnalytics={handleGoToAnalytics}
      isAuthenticated={isAuthenticated}
    >
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          variant="text"
          color="primary"
        >
          Back to Home
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Join TinyURL
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Create an account to unlock powerful link analytics and management features
        </Typography>
      </Box>

      <RegistrationForm />
    </PublicLayout>
  )
}
