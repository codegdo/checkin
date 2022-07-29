import React, { PropsWithChildren } from 'react';
import { Render } from './gridview.render';

export interface GridViewProps {
  data?: any;
  status?: string;
  onClick?: () => void;
}

export const GridView: React.FC<PropsWithChildren<GridViewProps>> = ({ children, ...props }): JSX.Element => {
  return <div>
    {
      children ? <Render>{children}</Render> : <Render {...props} />
    }
  </div>
}