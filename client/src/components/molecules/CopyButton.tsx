import { useState, useCallback } from 'react';
import { Button, Snackbar, Alert as MuiAlert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { copyButtonStyles } from './CopyButton.styles';

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export function CopyButton({ text, onCopy, size = 'small', disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!navigator.clipboard) {
      setShowSnackbar(true);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setShowSnackbar(true);
      onCopy?.();

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setShowSnackbar(true);
    }
  }, [text, onCopy]);

  return (
    <>
      <Button
        startIcon={<ContentCopy />}
        onClick={handleCopy}
        disabled={disabled || copied}
        size={size}
        variant={copied ? 'contained' : 'outlined'}
        color={copied ? 'success' : 'primary'}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setShowSnackbar(false)}
          severity={copied ? 'success' : 'error'}
          sx={copyButtonStyles.snackbar}
        >
          {copied ? 'Copied to clipboard!' : 'Failed to copy. Please try again.'}
        </MuiAlert>
      </Snackbar>
    </>
  );
}