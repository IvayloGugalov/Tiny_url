import { BarChart } from '@mui/x-charts/BarChart'
import { Box, Typography, CircularProgress, Alert, useTheme } from '@mui/material'
import { useLinksStore } from '@/stores/useLinksStore'

export function ClickAnalyticsChart() {
  const { links, loading, error } = useLinksStore()
  const theme = useTheme()

  const colorPalette = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.success.light,
    theme.palette.error.light,
  ]

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='200px'>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity='error'>Error loading analytics: {error}</Alert>
  }

  if (links.length === 0) {
    return <Alert severity='info'>No data available for analytics</Alert>
  }

  // Sort links by clicks (descending) and take top 10
  const sortedLinks = [...links].sort((a, b) => b.clicks - a.clicks).slice(0, 10)

  const chartData = sortedLinks.map((link) => ({
    id: link.id,
    clicks: link.clicks,
    target: link.target.length > 40 ? link.target.substring(0, 40) + '...' : link.target,
  }))

  return (
    <Box>
      <Box mb={3}>
        <Typography variant='h5' gutterBottom>
          Click Analytics
        </Typography>
        <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
          Visualization of your most popular short links
        </Typography>
      </Box>

      <Box height={400}>
        <BarChart
          dataset={chartData}
          axisHighlight={{
            y: 'band',
          }}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'id',
              colorMap: {
                type: 'ordinal',
                colors: colorPalette,
              },
            },
          ]}
          series={[{ dataKey: 'clicks' }]}
          borderRadius={8}
          height={400}
        />
      </Box>
    </Box>
  )
}
