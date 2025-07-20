import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { ReactNode } from 'react';

export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  children: ReactNode;
  buttonVariant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'middle' | 'large';
}

export function Button({
  children,
  buttonVariant = 'primary',
  size = 'middle',
  type = buttonVariant === 'primary' ? 'primary' : 'default',
  ...props
}: ButtonProps) {
  return (
    <AntButton
      type={type}
      size={size}
      {...props}
    >
      {children}
    </AntButton>
  );
}