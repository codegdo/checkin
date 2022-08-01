import React, { PropsWithChildren } from 'react';
import { GridViewProvider } from './gridview.context';
import { Render } from './gridview.render';

export interface GridViewProps {
  data?: any;
  columns?: any;
  status?: string | undefined;
  onClick?: () => void;
}

export const GridView: React.FC<PropsWithChildren<GridViewProps>> = ({ children, ...props }): JSX.Element => {

  return <div>
    <GridViewProvider {...props}>
      {
        children ? <Render>{children}</Render> : <Render />
      }
    </GridViewProvider>
  </div>
}