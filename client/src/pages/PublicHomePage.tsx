import { Card, Space } from 'antd';
import { PublicLayout, CreateLinkForm, Title, Paragraph, Button, Alert } from '../components';

interface PublicHomePageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onLogin: () => void;
  onGoToAnalytics: () => void;
}

export function PublicHomePage({ theme, setTheme, onLogin, onGoToAnalytics }: PublicHomePageProps) {
  return (
    <PublicLayout
      title="🔗 TinyURL"
      description="Shorten your links instantly"
      theme={theme}
      setTheme={setTheme}
      onLogin={onLogin}
      onGoToAnalytics={onGoToAnalytics}
    >
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Create Short Links
        </Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: 32 }}>
          Transform long URLs into short, shareable links instantly. No registration required!
        </Paragraph>
        <CreateLinkForm onLinkCreated={() => {}} />
      </Card>

      <Card>
        <Title level={3}>Why use TinyURL?</Title>
        <Space direction='vertical' size='small'>
          <Paragraph>✅ <strong>Instant:</strong> Create short links in seconds</Paragraph>
          <Paragraph>✅ <strong>Free:</strong> No registration required</Paragraph>
          <Paragraph>✅ <strong>Analytics:</strong> Track clicks and performance (with login)</Paragraph>
          <Paragraph>✅ <strong>Secure:</strong> Built with modern web technologies</Paragraph>
        </Space>
      </Card>

      <Alert
        message="Want to track your links?"
        description="Login to access detailed analytics, view click statistics, and manage your links."
        type="info"
        action={
          <Button size="small" buttonVariant="primary" onClick={onLogin}>
            Login Now
          </Button>
        }
      />
    </PublicLayout>
  );
}