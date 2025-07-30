import { useNavigate } from 'react-router-dom'
import { Paper, Stack, Typography, Button, Box, CardContent, useTheme } from '@mui/material'
import { AccessTime, MoneyOff, BarChart, Security } from '@mui/icons-material'
import { PublicLayout } from '@/layouts/PublicLayout'
import { CreateLinkForm } from '@/organisms/CreateLinkForm'
import { Alert } from '@/molecules/Alert'
import { FeatureItem } from '@/molecules/FeatureItem'
import { BlurText } from '@/atoms/BlurText'
import { AnimatedIcon } from '@/atoms/AnimatedIcon'
import { AnimatedSection } from '@/atoms/AnimatedSection'
import { StaggeredContainer } from '@/atoms/StaggeredContainer'
import { AnimatedCard } from '@/atoms/AnimatedCard'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { publicHomePageStyles } from './PublicHomePage.styles'
import {
  ANIMATION_TIMING,
  FEATURE_CARD_DELAYS,
  ICON_DELAYS,
  BLUR_TEXT_DELAYS,
  FEATURE_ITEM_DELAYS,
} from '@/styles/animations'
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
  const muiTheme = useTheme()

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
        <Stack spacing={4} direction={'row'}>
          <CreateLinkForm />

          <AnimatedSection delay={ANIMATION_TIMING.FEATURES_PAPER}>
            <Paper
              sx={{
                ...publicHomePageStyles.featuresPaper,
                boxShadow: 'none',
                background: 'transparent',
              }}
            >
              <Stack spacing={3} alignItems='center'>
                <AnimatedSection
                  delay={ANIMATION_TIMING.FEATURES_TITLE - ANIMATION_TIMING.FEATURES_PAPER}
                >
                  <Typography
                    variant='h4'
                    gutterBottom
                    sx={{
                      ...publicHomePageStyles.featuresTitle,
                      textAlign: 'center',
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${muiTheme.palette.primary.light} 0%, ${muiTheme.palette.primary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Why Choose TinyURL?
                  </Typography>
                </AnimatedSection>

                <StaggeredContainer
                  delay={ANIMATION_TIMING.FEATURES_LIST - ANIMATION_TIMING.FEATURES_PAPER}
                  staggerChildren={0.1}
                >
                  <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
                    <FeatureItem
                      icon={<AccessTime />}
                      title='Instant'
                      description='Create short links in seconds with our lightning-fast infrastructure'
                      delay={FEATURE_ITEM_DELAYS.INSTANT}
                    />
                    <FeatureItem
                      icon={<MoneyOff />}
                      title='Free'
                      description='No registration required - start shortening links immediately'
                      delay={FEATURE_ITEM_DELAYS.FREE}
                    />
                    <FeatureItem
                      icon={<BarChart />}
                      title='Analytics'
                      description='Track clicks, locations, devices, and performance with detailed charts'
                      delay={FEATURE_ITEM_DELAYS.ANALYTICS}
                    />
                    <FeatureItem
                      icon={<Security />}
                      title='Secure'
                      description='Built with modern web technologies and enterprise-grade security'
                      delay={FEATURE_ITEM_DELAYS.SECURE}
                    />
                  </Stack>
                </StaggeredContainer>
              </Stack>
            </Paper>
          </AnimatedSection>
        </Stack>
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
                spotlightColor='primary'
                spotlightOpacity={0.4}
                delay={FEATURE_CARD_DELAYS.LIGHTNING_FAST}
              >
                <AnimatedIcon delay={ICON_DELAYS.LIGHTNING_FAST}>
                  <Box
                    sx={{
                      ...publicHomePageStyles.iconContainer,
                    }}
                  >
                    <Zap sx={{ fontSize: 24, color: muiTheme.palette.primary.main }} />
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
                spotlightColor='secondary'
                spotlightOpacity={0.35}
                delay={FEATURE_CARD_DELAYS.DETAILED_ANALYTICS}
              >
                <AnimatedIcon delay={ICON_DELAYS.DETAILED_ANALYTICS}>
                  <Box
                    sx={{
                      ...publicHomePageStyles.iconContainer,
                    }}
                  >
                    <BarChart3 sx={{ fontSize: 24, color: muiTheme.palette.secondary.main }} />
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
                spotlightColor='info'
                spotlightOpacity={0.4}
                delay={FEATURE_CARD_DELAYS.SECURE_RELIABLE}
              >
                <AnimatedIcon delay={ICON_DELAYS.SECURE_RELIABLE}>
                  <Box
                    sx={{
                      ...publicHomePageStyles.iconContainer,
                    }}
                  >
                    <Shield sx={{ fontSize: 24, color: muiTheme.palette.success.main }} />
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
                spotlightColor='warning'
                spotlightOpacity={0.3}
                delay={FEATURE_CARD_DELAYS.MOBILE_OPTIMIZED}
              >
                <AnimatedIcon
                  delay={ICON_DELAYS.MOBILE_OPTIMIZED}
                  containerStyles={{
                    ...publicHomePageStyles.iconContainer,
                  }}
                >
                  <Smartphone sx={{ fontSize: 24, color: muiTheme.palette.warning.main }} />
                </AnimatedIcon>
                <Typography variant='h6' sx={publicHomePageStyles.cardTitle}>
                  <BlurText
                    text='Mobile Optimized'
                    animateBy='character'
                    delay={BLUR_TEXT_DELAYS.MOBILE_OPTIMIZED}
                    fontWeight='bold'
                  />
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
