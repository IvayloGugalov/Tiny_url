import { useNavigate } from 'react-router-dom'
import { Paper, Stack, Typography, Button, Box, Card, CardContent } from '@mui/material'
import { PublicLayout } from '../layouts/PublicLayout'
import { CreateLinkForm } from '../components/organisms/CreateLinkForm'
import { Alert } from '../components/molecules/Alert'
import { publicHomePageStyles } from './PublicHomePage.styles'
import {
  FlashOn as Zap,
  BarChart as BarChart3,
  Security as Shield,
  Smartphone as Smartphone
} from '@mui/icons-material'

interface PublicHomePageProps {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  isAuthenticated: boolean
}

export function PublicHomePage({ theme, setTheme, isAuthenticated }: PublicHomePageProps) {
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

  return (
    <PublicLayout
      title='🔗 TinyURL'
      theme={theme}
      setTheme={setTheme}
      onLogin={handleLogin}
      onGoToAnalytics={handleGoToAnalytics}
    >
      <CreateLinkForm onLinkCreated={() => {}} />

      <Paper sx={publicHomePageStyles.featuresPaper}>
        <Typography
          variant="h5"
          gutterBottom
          sx={publicHomePageStyles.featuresTitle}
        >
          Why use TinyURL?
        </Typography>
        <Stack spacing={1} sx={publicHomePageStyles.featuresList}>
          <Typography
            variant="body1"
            sx={publicHomePageStyles.featureItem}
          >
            ✅ <strong>Instant:</strong> Create short links in seconds
          </Typography>
          <Typography
            variant="body1"
            sx={publicHomePageStyles.featureItem}
          >
            ✅ <strong>Free:</strong> No registration required
          </Typography>
          <Typography
            variant="body1"
            sx={publicHomePageStyles.featureItem}
          >
            ✅ <strong>Analytics:</strong> Track clicks and performance (with login)
          </Typography>
          <Typography
            variant="body1"
            sx={publicHomePageStyles.featureItem}
          >
            ✅ <strong>Secure:</strong> Built with modern web technologies
          </Typography>
        </Stack>
      </Paper>

      {/* Why Choose TinyURL Section */}
      <Box sx={publicHomePageStyles.whyChooseSection}>
        <Box sx={publicHomePageStyles.whyChooseHeader}>
          <Typography variant="h2" sx={publicHomePageStyles.whyChooseTitle}>
            Why Choose TinyURL?
          </Typography>
          <Typography variant="h6" sx={publicHomePageStyles.whyChooseSubtitle}>
            More than just a URL shortener - get powerful analytics and insights
          </Typography>
        </Box>

        <Box sx={publicHomePageStyles.whyChooseGrid}>
          <Card sx={publicHomePageStyles.featureCard}>
            <Box sx={{ ...publicHomePageStyles.iconContainer, ...publicHomePageStyles.iconContainerBlue }}>
              <Zap sx={{ fontSize: 24, color: 'primary.main' }} />
            </Box>
            <Typography variant="h6" sx={publicHomePageStyles.cardTitle}>
              Lightning Fast
            </Typography>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Typography sx={publicHomePageStyles.cardContent}>
                Create short links instantly with our high-performance infrastructure
              </Typography>
            </CardContent>
          </Card>

          <Card sx={publicHomePageStyles.featureCard}>
            <Box sx={{ ...publicHomePageStyles.iconContainer, ...publicHomePageStyles.iconContainerPurple }}>
              <BarChart3 sx={{ fontSize: 24, color: 'secondary.main' }} />
            </Box>
            <Typography variant="h6" sx={publicHomePageStyles.cardTitle}>
              Detailed Analytics
            </Typography>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Typography sx={publicHomePageStyles.cardContent}>
                Track clicks, locations, devices, and more with beautiful charts
              </Typography>
            </CardContent>
          </Card>

          <Card sx={publicHomePageStyles.featureCard}>
            <Box sx={{ ...publicHomePageStyles.iconContainer, ...publicHomePageStyles.iconContainerGreen }}>
              <Shield sx={{ fontSize: 24, color: 'success.main' }} />
            </Box>
            <Typography variant="h6" sx={publicHomePageStyles.cardTitle}>
              Secure & Reliable
            </Typography>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Typography sx={publicHomePageStyles.cardContent}>
                Enterprise-grade security with 99.9% uptime guarantee
              </Typography>
            </CardContent>
          </Card>

          <Card sx={publicHomePageStyles.featureCard}>
            <Box sx={{ ...publicHomePageStyles.iconContainer, ...publicHomePageStyles.iconContainerOrange }}>
              <Smartphone sx={{ fontSize: 24, color: 'warning.main' }} />
            </Box>
            <Typography variant="h6" sx={publicHomePageStyles.cardTitle}>
              Mobile Optimized
            </Typography>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Typography sx={publicHomePageStyles.cardContent}>
                Perfect experience across all devices and screen sizes
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Alert
        message='Want to track your links?'
        description='Login to access detailed analytics, view click statistics, and manage your links.'
        severity='info'
        action={
          <Button size='small' variant='contained' onClick={handleLogin}>
            Login Now
          </Button>
        }
      />
    </PublicLayout>
  )
}
