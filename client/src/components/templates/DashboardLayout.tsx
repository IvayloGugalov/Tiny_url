import { Layout, Space } from 'antd';
import { ReactNode } from 'react';
import { Title, Paragraph } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { ThemeToggle } from '../atoms/ThemeToggle';

const { Header, Content } = Layout;

interface DashboardLayoutProps {
  title: string;
  description: string;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onLogout: () => void;
  onGoHome: () => void;
  children: ReactNode;
  headerActions?: ReactNode;
}

export function DashboardLayout({
  title,
  description,
  theme,
  setTheme,
  onLogout,
  onGoHome,
  children,
  headerActions
}: DashboardLayoutProps) {
  return (
    <Layout>
      <Header className='header'>
        <div className='header-content'>
          <Title level={1} className='title'>
            {title}
          </Title>
          <Paragraph className='desc'>{description}</Paragraph>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {headerActions}
          <Button onClick={onGoHome} style={{ marginTop: 16 }}>
            Home
          </Button>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <Button onClick={onLogout} style={{ marginTop: 16 }}>
            Logout
          </Button>
        </div>
      </Header>
      <Content className='content'>
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          {children}
        </Space>
      </Content>
    </Layout>
  );
}