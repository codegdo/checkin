import React, { createContext, PropsWithChildren } from 'react';
import { WidgetProps } from './widget.component';

interface WidgetContextValue extends PropsWithChildren<WidgetProps> { }

export const WidgetContext = createContext<WidgetContextValue>({});

export function WidgetProvider({ children }: PropsWithChildren<WidgetProps>) {
  const contextValue = {};

  return (
    <div>
      <WidgetContext.Provider value={contextValue}>
        {children}
      </WidgetContext.Provider>
    </div>
  );
}