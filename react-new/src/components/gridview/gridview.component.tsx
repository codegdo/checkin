import React, { PropsWithChildren } from 'react';
import { GridViewProvider } from './gridview.context';
import { Render } from './gridview.render';
import { GridViewProps } from './gridview.type';

export const GridView = <T extends Object>({ children, onClick, ...props }: PropsWithChildren<GridViewProps<T>>): JSX.Element => {

  const handleClick = () => {
    console.log('CLICK');
  }

  return <div>
    <GridViewProvider<T> {...props} onClick={handleClick}>
      {
        children ? <Render>{children}</Render> : <Render />
      }
    </GridViewProvider>
  </div>
}