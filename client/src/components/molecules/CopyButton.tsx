import { useState, useCallback } from 'react';
import { Button } from '../atoms/Button';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
}

export function CopyButton({ text, onCopy, size = 'small', disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!navigator.clipboard) {
      message.error('Clipboard not supported in this browser');
      return;
    }

    try {
      setCopying(true);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      message.success('Copied to clipboard!');
      onCopy?.();

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      message.error('Failed to copy. Please try again.');
    } finally {
      setCopying(false);
    }
  }, [text, onCopy]);

  return (
    <Button
      icon={<CopyOutlined />}
      onClick={handleCopy}
      loading={copying}
      disabled={disabled || copied}
      size={size}
      type={copied ? 'primary' : 'default'}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}