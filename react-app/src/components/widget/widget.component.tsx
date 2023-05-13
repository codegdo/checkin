import React, { PropsWithChildren } from 'react';
import { WidgetProvider } from './widget.context';

export interface WidgetProps extends PropsWithChildren {
  data?: any[],
  value?: any,
  onChange?: () => void,
  onClick?: () => void
}

export function Widget({ children, ...props }: WidgetProps) {
  return <WidgetProvider {...props}>{children}</WidgetProvider>
}
