import { useState } from 'react';
import { Form } from 'antd';
import { FormField } from '../molecules/FormField';
import { Alert } from '../molecules/Alert';
import { Button } from '../atoms/Button';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token);
        onLoginSuccess();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 350, margin: 'auto', marginTop: 64 }}
      initialValues={{ email: '', password: '' }}
    >
      <FormField
        label="Email"
        name="email"
        type="email"
        autoFocus
        autoComplete="username"
        rules={[{ required: true, message: 'Please enter your email' }]}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      />

      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      <Form.Item>
        <Button
          buttonVariant="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: '100%' }}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}