import { useState } from 'react';
import { Form, Space } from 'antd';
import { createShortLink } from '../../api';
import { Title } from '../atoms/Typography';
import { FormField } from '../molecules/FormField';
import { Alert } from '../molecules/Alert';
import { Button } from '../atoms/Button';

interface CreateLinkFormProps {
  onLinkCreated: () => void;
}

export function CreateLinkForm({ onLinkCreated }: CreateLinkFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onFinish(values: { targetUrl: string }) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const result = await createShortLink(values.targetUrl);
      setSuccess(`Short link created: ${result.shortUrl}`);
      form.resetFields();
      onLinkCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create short link');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={2}>Create New Short Link</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <FormField
          label="Target URL"
          name="targetUrl"
          type="url"
          placeholder="https://example.com/very-long-url"
          disabled={loading}
          rules={[
            { required: true, message: 'Please enter a URL' },
            { type: 'url', message: 'Please enter a valid URL (including http:// or https://)' },
          ]}
        />

        {error && <Alert message={error} type="error" style={{ marginBottom: 24 }} />}
        {success && <Alert message={success} type="success" style={{ marginBottom: 24 }} />}

        <Form.Item>
          <Button
            buttonVariant="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Create Short Link
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}