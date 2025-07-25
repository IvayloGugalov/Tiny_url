import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { CreateLinkForm } from '../components/organisms/CreateLinkForm'
import { ClickAnalyticsChart } from '../components/organisms/ClickAnalyticsChart'
import { LinksTable } from '../components/organisms/LinksTable'
import { useAuthStore, useThemeStore, useLinksStore } from '../stores'
import { analyticsPageStyles } from './AnalyticsPage.styles'

export function AnalyticsPage() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const { fetchLinks } = useLinksStore()

  const handleLinkCreated = async () => {
    await fetchLinks()
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <DashboardLayout
      theme={theme}
      setTheme={setTheme}
      onLogout={handleLogout}
      onGoHome={handleGoHome}
    >
      <Box sx={analyticsPageStyles.pageHeader}>
        <Typography variant="h4" component="h1" gutterBottom>
          📊 Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          View and manage your short links
        </Typography>
      </Box>

      <CreateLinkForm onLinkCreated={handleLinkCreated} />

      <Box sx={analyticsPageStyles.gridContainer}>
        <Paper sx={analyticsPageStyles.chartPaper}>
          <ClickAnalyticsChart />
        </Paper>
        <Paper sx={analyticsPageStyles.tablePaper}>
          <LinksTable />
        </Paper>
      </Box>
    </DashboardLayout>
  )
}
