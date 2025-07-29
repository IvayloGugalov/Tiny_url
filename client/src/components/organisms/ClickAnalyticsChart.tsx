import { BarChart } from '@mui/x-charts/BarChart'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useLinksStore } from '../../stores'

const colorPalette = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
]

export function ClickAnalyticsChart() {
  const { links, loading, error } = useLinksStore()

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
        <Typography variant='body2' color='text.secondary'>
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
