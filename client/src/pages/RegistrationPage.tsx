import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { PublicLayout } from '@/layouts/PublicLayout'
import { RegistrationForm } from '@/organisms/RegistrationForm'
import { SplitText } from '@/atoms/SplitText'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'

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
          <SplitText
            text="Join TinyURL"
            animateBy="word"
            staggerChildren={0.15}
            duration={0.8}
            delay={0.2}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Create an account to unlock powerful link analytics and management features
        </Typography>
      </Box>

      <RegistrationForm />
    </PublicLayout>
  )
}
