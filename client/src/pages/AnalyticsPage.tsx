import { useState } from 'react';
import { Row, Col, Card } from 'antd';
import { DashboardLayout, CreateLinkForm, ClickAnalyticsChart, LinksTable } from '../components';

interface AnalyticsPageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onLogout: () => void;
  onGoHome: () => void;
}

export function AnalyticsPage({ theme, setTheme, onLogout, onGoHome }: AnalyticsPageProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleLinkCreated() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <DashboardLayout
      title="📊 Analytics Dashboard"
      description="View and manage your short links"
      theme={theme}
      setTheme={setTheme}
      onLogout={onLogout}
      onGoHome={onGoHome}
    >
      <CreateLinkForm onLinkCreated={handleLinkCreated} />
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <Card>
            <ClickAnalyticsChart refreshKey={refreshKey} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <LinksTable key={refreshKey} />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}