import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';
import { ReactNode } from 'react';
import { alertStyles } from './Alert.styles';

export interface AlertProps extends Omit<MuiAlertProps, 'message'> {
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
  severity = 'info',
  ...props
}: AlertProps) {
  return (
    <MuiAlert
      severity={severity}
      onClose={closable ? onClose : undefined}
      icon={showIcon ? undefined : false}
      {...props}
    >
      {message}
      {description && (
        <div style={alertStyles.description}>
          {description}
        </div>
      )}
    </MuiAlert>
  );
}