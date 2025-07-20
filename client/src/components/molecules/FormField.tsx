import { Form, FormItemProps, Input as AntInput } from 'antd';
import { Input } from '../atoms/Input';
import { ReactNode } from 'react';

export interface FormFieldProps {
  label: ReactNode;
  name: string;
  rules?: FormItemProps['rules'];
  placeholder?: string;
  type?: 'text' | 'password' | 'url' | 'email';
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
}

export function FormField({
  label,
  name,
  rules,
  placeholder,
  type = 'text',
  disabled,
  autoFocus,
  autoComplete,
  ...props
}: FormFieldProps) {
  const InputComponent = type === 'password' ? AntInput.Password : Input;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      {...props}
    >
      <InputComponent
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
    </Form.Item>
  );
}