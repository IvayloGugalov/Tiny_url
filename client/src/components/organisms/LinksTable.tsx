import { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Spin, Empty, Tag, Space, Tooltip, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { fetchLinks, getShortUrl } from '../../api';
import { Title } from '../atoms/Typography';
import { Link } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { CopyButton } from '../molecules/CopyButton';
import { Alert } from '../molecules/Alert';

interface Link {
  id: string;
  target: string;
  clicks: number;
  createdAt: string;
}

const MAX_URL_DISPLAY_LENGTH = 50;
const DEFAULT_PAGE_SIZE = 10;

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
      message.error(errorMessage);
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

  const columns: ColumnsType<Link> = useMemo(
    () => [
      {
        title: 'Short Code',
        dataIndex: 'id',
        key: 'id',
        width: 120,
        render: (id: string) => (
          <Tag color='blue' style={{ fontFamily: 'monospace' }}>
            {id}
          </Tag>
        ),
      },
      {
        title: 'Target URL',
        dataIndex: 'target',
        key: 'target',
        ellipsis: true,
        render: (target: string) => (
          <Tooltip title={target} placement='topLeft'>
            <Link
              href={target}
              target='_blank'
              rel='noopener noreferrer'
              style={{ maxWidth: '100%' }}
            >
              {formatUrl(target)}
            </Link>
          </Tooltip>
        ),
      },
      {
        title: 'Clicks',
        dataIndex: 'clicks',
        key: 'clicks',
        width: 120,
        sorter: (a, b) => a.clicks - b.clicks,
        render: (clicks: number) => (
          <Tag color={clicks > 0 ? 'green' : 'default'}>{clicks.toLocaleString()}</Tag>
        ),
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        render: (dateString: string) => formatDate(dateString),
        sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        defaultSortOrder: 'descend',
      },
      {
        title: 'Action',
        key: 'action',
        width: 120,
        render: (_, record) => (
          <CopyButton text={getShortUrl(record.id)} />
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
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size='large' tip='Loading links...' />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message='Error Loading Links'
        description={error}
        type='error'
        action={
          <Button size='small' icon={<ReloadOutlined />} onClick={loadLinks}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }} size='large'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0 }}>
          Your Short Links ({links.length})
        </Title>
        <Button icon={<ReloadOutlined />} onClick={loadLinks} disabled={loading}>
          Refresh
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={links}
        rowKey='id'
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} links`,
        }}
        locale={{
          emptyText: (
            <Empty
              description='No links created yet. Create your first short link!'
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        scroll={{ x: 600 }}
        size='middle'
      />
    </Space>
  );
}