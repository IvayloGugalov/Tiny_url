import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import { ReactNode } from 'react';

export interface InputProps extends AntInputProps {
  label?: ReactNode;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  status = error ? 'error' : undefined,
  ...props
}: InputProps) {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ marginBottom: 8, fontWeight: 500 }}>
          {label}
        </div>
      )}
      <AntInput
        status={status}
        {...props}
      />
      {helperText && !error && (
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          {helperText}
        </div>
      )}
      {error && (
        <div style={{ fontSize: 12, color: '#ff4d4f', marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
}