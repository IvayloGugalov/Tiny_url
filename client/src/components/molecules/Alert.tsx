import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd';
import { ReactNode } from 'react';

export interface AlertProps extends Omit<AntAlertProps, 'message'> {
  message: ReactNode;
  description?: ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

export function Alert({
  message,
  description,
  showIcon = true,
  closable = false,
  onClose,
  ...props
}: AlertProps) {
  return (
    <AntAlert
      message={message}
      description={description}
      showIcon={showIcon}
      closable={closable}
      onClose={onClose}
      {...props}
    />
  );
}