import { Layout, Space } from 'antd';
import { ReactNode } from 'react';
import { Title, Paragraph } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { ThemeToggle } from '../atoms/ThemeToggle';

const { Header, Content } = Layout;

interface PublicLayoutProps {
  title: string;
  description: string;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onLogin: () => void;
  onGoToAnalytics: () => void;
  children: ReactNode;
  headerActions?: ReactNode;
}

export function PublicLayout({
  title,
  description,
  theme,
  setTheme,
  onLogin,
  onGoToAnalytics,
  children,
  headerActions
}: PublicLayoutProps) {
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
          <Button onClick={onGoToAnalytics} style={{ marginTop: 16 }}>
            Analytics
          </Button>
          <Button buttonVariant="primary" onClick={onLogin} style={{ marginTop: 16 }}>
            Login
          </Button>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </Header>
      <Content className='content'>
        <Space direction='vertical' size='large' style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
          {children}
        </Space>
      </Content>
    </Layout>
  );
}