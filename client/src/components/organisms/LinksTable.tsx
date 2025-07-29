import { useCallback, useMemo, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Typography, Button, Chip, Link, Alert, CircularProgress } from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'
import { getShortUrl } from '../../api'
import { CopyButton } from '../molecules/CopyButton'
import { linksTableStyles } from './LinksTable.styles'
import { useLinksStore } from '../../stores'

const MAX_URL_DISPLAY_LENGTH = 50

export function LinksTable() {
  const { links, loading, error, fetchLinks } = useLinksStore()

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const handleRefresh = useCallback(async () => {
    await fetchLinks()
  }, [fetchLinks])

  const formatUrl = useCallback((url: string) => {
    return url.length > MAX_URL_DISPLAY_LENGTH
      ? `${url.substring(0, MAX_URL_DISPLAY_LENGTH)}...`
      : url
  }, [])

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'Short Code',
        width: 120,
        renderCell: (params) => <Chip label={params.value} color='primary' size='small' />,
      },
      {
        field: 'target',
        headerName: 'Target URL',
        flex: 0.5,
        renderCell: (params) => (
          <Link
            href={params.value}
            target='_blank'
            rel='noopener noreferrer'
            sx={linksTableStyles.link}
          >
            {formatUrl(params.value)}
          </Link>
        ),
      },
      {
        field: 'clicks',
        headerName: 'Clicks',
        flex: 0.1,
        type: 'number',
        renderCell: (params) => (
          <Chip
            label={params.value.toLocaleString()}
            color={params.value > 0 ? 'success' : 'default'}
            size='small'
          />
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Created',
        flex: 0.2,
        valueGetter: (params: string) => new Date(params),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params) => <CopyButton text={getShortUrl(params.row.id)} />,
      },
    ],
    [formatUrl],
  )

  if (loading) {
    return (
      <Box sx={linksTableStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert
        severity='error'
        action={
          <Button size='small' startIcon={<RefreshIcon />} onClick={handleRefresh}>
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    )
  }

  return (
    <Box>
      <Box sx={linksTableStyles.headerContainer}>
        <Typography variant='h5' sx={linksTableStyles.title}>
          Your Short Links ({links.length})
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={loading}
          size='small'
          sx={linksTableStyles.refreshButton}
        >
          Refresh
        </Button>
      </Box>

      <Box sx={linksTableStyles.dataGridContainer}>
        <DataGrid
          rows={links}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          density='compact'
          sx={linksTableStyles.dataGrid}
        />
      </Box>
    </Box>
  )
}
