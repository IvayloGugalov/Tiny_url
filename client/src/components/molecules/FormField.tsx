import { TextField } from '@mui/material';
import { ReactNode } from 'react';

export interface FormFieldProps {
  label: ReactNode;
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'url' | 'email';
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
}

export function FormField({
  label,
  name,
  placeholder,
  type = 'text',
  disabled,
  autoFocus,
  autoComplete,
  ...props
}: FormFieldProps) {
  return (
    <TextField
      label={label}
      name={name}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
}