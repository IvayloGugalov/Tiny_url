import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchLinks } from '../../api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Link {
  id: string;
  target: string;
  clicks: number;
  createdAt: string;
}

interface ClickAnalyticsChartProps {
  refreshKey: number;
}

export function ClickAnalyticsChart({ refreshKey }: ClickAnalyticsChartProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLinks();
  }, [refreshKey]);

  async function loadLinks() {
    try {
      setLoading(true);
      const data = await fetchLinks();
      setLinks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load links');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (error) {
    return <div className="error">Error loading analytics: {error}</div>;
  }

  if (links.length === 0) {
    return <div className="empty">No data available for analytics</div>;
  }

  // Sort links by clicks (descending) and take top 10
  const sortedLinks = [...links]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  const chartData = {
    labels: sortedLinks.map(link => link.id),
    datasets: [
      {
        label: 'Clicks',
        data: sortedLinks.map(link => link.clicks),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top 10 Most Clicked Links',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: { dataIndex: number }) {
            const link = sortedLinks[context.dataIndex];
            return `Target: ${link.target.length > 40 ? link.target.substring(0, 40) + '...' : link.target}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Clicks',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Short Link ID',
        },
      },
    },
  };

  return (
    <div className="click-analytics-chart">
      <div style={{ height: '400px', width: '100%' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}