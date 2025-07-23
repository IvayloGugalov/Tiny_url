import { useState, useEffect, useCallback, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, Button, Chip, Link, Alert, CircularProgress } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { fetchLinks, getShortUrl } from '../../api';
import { CopyButton } from '../molecules/CopyButton';
import { linksTableStyles } from './LinksTable.styles';

interface Link {
  id: string;
  target: string;
  clicks: number;
  createdAt: string;
}

const MAX_URL_DISPLAY_LENGTH = 50;

export function LinksTable() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLinks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLinks();
      setLinks(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load links';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatUrl = useCallback((url: string) => {
    return url.length > MAX_URL_DISPLAY_LENGTH
      ? `${url.substring(0, MAX_URL_DISPLAY_LENGTH)}...`
      : url;
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'Short Code',
        width: 120,
        renderCell: (params) => (
          <Chip label={params.value} color="primary" size="small" />
        ),
      },
      {
        field: 'target',
        headerName: 'Target URL',
        flex: 1,
        minWidth: 300,
        renderCell: (params) => (
          <Link
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            sx={linksTableStyles.link}
          >
            {formatUrl(params.value)}
          </Link>
        ),
      },
      {
        field: 'clicks',
        headerName: 'Clicks',
        width: 120,
        type: 'number',
        renderCell: (params) => (
          <Chip
            label={params.value.toLocaleString()}
            color={params.value > 0 ? 'success' : 'default'}
            size="small"
          />
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Created',
        width: 150,
        valueGetter: (params: { value?: string } | null) =>
          params?.value ? formatDate(params.value) : '',
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <CopyButton text={getShortUrl(params.row.id)} />
        ),
      },
    ],
    [formatUrl, formatDate],
  );

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  if (loading) {
    return (
      <Box sx={linksTableStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button size="small" startIcon={<RefreshIcon />} onClick={loadLinks}>
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={linksTableStyles.headerContainer}>
        <Typography variant="h5" sx={linksTableStyles.title}>
          Your Short Links ({links.length})
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={loadLinks}
          disabled={loading}
          size="small"
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
          density="compact"
          sx={linksTableStyles.dataGrid}
        />
      </Box>
    </Box>
  );
}