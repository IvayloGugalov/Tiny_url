import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { CreateLinkForm } from '../components/organisms/CreateLinkForm'
import { ClickAnalyticsChart } from '../components/organisms/ClickAnalyticsChart'
import { LinksTable } from '../components/organisms/LinksTable'
import { analyticsPageStyles } from './AnalyticsPage.styles'

interface AnalyticsPageProps {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  onLogout: () => void
}

export function AnalyticsPage({ theme, setTheme, onLogout }: AnalyticsPageProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const navigate = useNavigate()

  function handleLinkCreated() {
    setRefreshKey((prev) => prev + 1)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <DashboardLayout
      title='📊 Analytics Dashboard'
      description='View and manage your short links'
      theme={theme}
      setTheme={setTheme}
      onLogout={handleLogout}
      onGoHome={handleGoHome}
    >
      <CreateLinkForm onLinkCreated={handleLinkCreated} />

      <Box sx={analyticsPageStyles.gridContainer}>
        <Paper sx={analyticsPageStyles.chartPaper}>
          <ClickAnalyticsChart refreshKey={refreshKey} />
        </Paper>
        <Paper sx={analyticsPageStyles.tablePaper}>
          <LinksTable key={refreshKey} />
        </Paper>
      </Box>
    </DashboardLayout>
  )
}
