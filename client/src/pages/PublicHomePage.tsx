import { useNavigate } from 'react-router-dom'
import { Paper, Stack, Typography, Button, Box, CardContent } from '@mui/material'
import { PublicLayout } from '../layouts/PublicLayout'
import { CreateLinkForm } from '../components/organisms/CreateLinkForm'
import { Alert } from '../components/molecules/Alert'
import {
  BlurText,
  AnimatedIcon,
  AnimatedSection,
  StaggeredContainer,
  AnimatedCard,
} from '../components'
import { useAuthStore, useThemeStore } from '../stores'
import { publicHomePageStyles } from './PublicHomePage.styles'
import {
  ANIMATION_TIMING,
  FEATURE_CARD_DELAYS,
  ICON_DELAYS,
  BLUR_TEXT_DELAYS,
} from '../constants/animations'
import {
  FlashOn as Zap,
  BarChart as BarChart3,
  Security as Shield,
  Smartphone as Smartphone,
} from '@mui/icons-material'

export function PublicHomePage() {
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

  const handleRegister = () => {
    navigate('/register')
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
      <AnimatedSection delay={ANIMATION_TIMING.CREATE_LINK_FORM}>
        <CreateLinkForm onLinkCreated={() => {}} />
      </AnimatedSection>

      <AnimatedSection delay={ANIMATION_TIMING.FEATURES_PAPER}>
        <Paper sx={publicHomePageStyles.featuresPaper}>
          <Typography variant='h5' gutterBottom sx={publicHomePageStyles.featuresTitle}>
            Why use TinyURL?
          </Typography>
          <Stack spacing={1} sx={publicHomePageStyles.featuresList}>
            <Typography variant='body1' sx={publicHomePageStyles.featureItem}>
              <BlurText text='✅ Instant ' animateBy='character' delay={0.5} fontWeight='bold' />
              <BlurText text='Create short links in seconds' animateBy='word' delay={0.55} />
            </Typography>
            <Typography variant='body1' sx={publicHomePageStyles.featureItem}>
              <BlurText text='✅ Free: ' animateBy='character' delay={0.6} fontWeight='bold' />
              <BlurText text='No registration required' animateBy='word' delay={0.65} />
            </Typography>
            <Typography variant='body1' sx={publicHomePageStyles.featureItem}>
              <BlurText text='✅ Analytics: ' animateBy='character' delay={0.7} fontWeight='bold' />
              <BlurText
                text='Track clicks and performance (with login)'
                animateBy='word'
                delay={0.75}
              />
            </Typography>
            <Typography variant='body1' sx={publicHomePageStyles.featureItem}>
              <BlurText text='✅ Secure: ' animateBy='character' delay={0.8} fontWeight='bold' />
              <BlurText text='Built with modern web technologies' animateBy='word' delay={0.85} />
            </Typography>
          </Stack>
        </Paper>
      </AnimatedSection>

      <AnimatedSection delay={ANIMATION_TIMING.WHY_CHOOSE_HEADER}>
        <Box sx={publicHomePageStyles.whyChooseSection}>
          <Box sx={publicHomePageStyles.whyChooseHeader}>
            <Typography variant='h2' sx={publicHomePageStyles.whyChooseTitle}>
              <BlurText text='Why Choose TinyURL?' animateBy='character' delay={1} />
            </Typography>
            <Typography variant='h6' sx={publicHomePageStyles.whyChooseSubtitle}>
              <BlurText
                text='More than just a URL shortener - get powerful analytics and insights'
                animateBy='word'
                delay={1.1}
              />
            </Typography>
          </Box>

          <StaggeredContainer
            delay={ANIMATION_TIMING.FEATURE_CARDS - ANIMATION_TIMING.WHY_CHOOSE_HEADER}
            staggerChildren={0.1}
          >
            <Box sx={publicHomePageStyles.whyChooseGrid}>
              <AnimatedCard
                sx={publicHomePageStyles.featureCard}
                spotlightColor='rgba(232, 98, 34, 0.4)'
                delay={FEATURE_CARD_DELAYS.LIGHTNING_FAST}
              >
                <AnimatedIcon delay={ICON_DELAYS.LIGHTNING_FAST}>
                  <Box
                    sx={{
                      ...publicHomePageStyles.iconContainer,
                      ...publicHomePageStyles.iconContainerBlue,
                    }}
                  >
                    <Zap sx={{ fontSize: 24, color: 'primary.main' }} />
                  </Box>
                </AnimatedIcon>
                <Typography variant='h6' sx={publicHomePageStyles.cardTitle}>
                  <BlurText
                    text='Lightning Fast'
                    animateBy='character'
                    delay={BLUR_TEXT_DELAYS.LIGHTNING_FAST}
                    fontWeight='bold'
                  />
                </Typography>
                <CardContent sx={publicHomePageStyles.cardContentContainer}>
                  <Typography sx={publicHomePageStyles.cardContent}>
                    <BlurText
                      text='Create short links instantly with our high-performance infrastructure'
                      animateBy='word'
                      delay={1.2}
                    />
                  </Typography>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard
                sx={publicHomePageStyles.featureCard}
                spotlightColor='rgba(14, 134, 74, 0.35)'
                delay={FEATURE_CARD_DELAYS.DETAILED_ANALYTICS}
              >
                <AnimatedIcon delay={ICON_DELAYS.DETAILED_ANALYTICS}>
                  <Box
                    sx={{
                      ...publicHomePageStyles.iconContainer,
                      ...publicHomePageStyles.iconContainerPurple,
                    }}
                  >
                    <BarChart3 sx={{ fontSize: 24, color: 'secondary.main' }} />
                  </Box>
                </AnimatedIcon>
                <Typography variant='h6' sx={publicHomePageStyles.cardTitle}>
                  <BlurText
                    text='Detailed Analytics'
                    animateBy='character'
                    delay={BLUR_TEXT_DELAYS.DETAILED_ANALYTICS}
                    fontWeight='bold'
                  />
                </Typography>
                <CardContent sx={publicHomePageStyles.cardContentContainer}>
                  <Typography sx={publicHomePageStyles.cardContent}>
                    <BlurText
                      text='Track clicks, locations, devices, and more with beautiful charts'
                      animateBy='word'
                      delay={1.4}
                    />
                  </Typography>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard
                sx={publicHomePageStyles.featureCard}
                spotlightColor='rgba(17, 127, 167, 0.4)'
                delay={FEATURE_CARD_DELAYS.SECURE_RELIABLE}
              >
                <AnimatedIcon delay={ICON_DELAYS.SECURE_RELIABLE}>
                  <Box
                    sx={{
                      ...publicHomePageStyles.iconContainer,
                      ...publicHomePageStyles.iconContainerGreen,
                    }}
                  >
                    <Shield sx={{ fontSize: 24, color: 'success.main' }} />
                  </Box>
                </AnimatedIcon>
                <Typography variant='h6' sx={publicHomePageStyles.cardTitle}>
                  <BlurText text='Secure & Reliable' animateBy='character' delay={1.6} />
                </Typography>
                <CardContent sx={publicHomePageStyles.cardContentContainer}>
                  <Typography sx={publicHomePageStyles.cardContent}>
                    <BlurText
                      text='Enterprise-grade security with 99.9% uptime guarantee'
                      animateBy='word'
                      delay={BLUR_TEXT_DELAYS.SECURE_RELIABLE}
                    />
                  </Typography>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard
                sx={publicHomePageStyles.featureCard}
                spotlightColor='rgba(222, 23, 179, 0.3)'
                delay={FEATURE_CARD_DELAYS.MOBILE_OPTIMIZED}
              >
                <AnimatedIcon
                  delay={ICON_DELAYS.MOBILE_OPTIMIZED}
                  containerStyles={{
                    ...publicHomePageStyles.iconContainer,
                    ...publicHomePageStyles.iconContainerOrange,
                  }}
                >
                  <Smartphone sx={{ fontSize: 24, color: 'warning.main' }} />
                </AnimatedIcon>
                <Typography variant='h6' sx={publicHomePageStyles.cardTitle}>
                  <BlurText text='Mobile Optimized' animateBy='character' delay={BLUR_TEXT_DELAYS.MOBILE_OPTIMIZED} fontWeight="bold" />
                </Typography>
                <CardContent sx={publicHomePageStyles.cardContentContainer}>
                  <Typography sx={publicHomePageStyles.cardContent}>
                    <BlurText
                      text='Perfect experience across all devices and screen sizes'
                      animateBy='word'
                      delay={1.8}
                    />
                  </Typography>
                </CardContent>
              </AnimatedCard>
            </Box>
          </StaggeredContainer>
        </Box>
      </AnimatedSection>

      {!isAuthenticated && (
        <AnimatedSection delay={ANIMATION_TIMING.CALL_TO_ACTION}>
          <Alert
            message='Ready to unlock powerful analytics?'
            description='Create a free account to track your links, view detailed statistics, and manage all your URLs in one place.'
            severity='success'
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size='small' variant='contained' onClick={handleRegister}>
                  Create Account
                </Button>
                <Button size='small' variant='outlined' onClick={handleLogin}>
                  Sign In
                </Button>
              </Box>
            }
          />
        </AnimatedSection>
      )}
    </PublicLayout>
  )
}
