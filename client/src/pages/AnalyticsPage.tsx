import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { CreateLinkForm } from '@/organisms/CreateLinkForm'
import { ClickAnalyticsChart } from '@/organisms/ClickAnalyticsChart'
import { LinksTable } from '@/organisms/LinksTable'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'

export function AnalyticsPage() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

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
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          📊 Analytics Dashboard
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
          View and manage your short links
        </Typography>
      </Box>

      <Box py={2}>
        <CreateLinkForm />
      </Box>

      <Stack spacing={4}>
        <ClickAnalyticsChart />
        <LinksTable />
      </Stack>
    </DashboardLayout>
  )
}
