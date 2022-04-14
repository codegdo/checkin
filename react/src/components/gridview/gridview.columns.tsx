import React from 'react';
import { Render } from './gridview.render';

export const Columns: React.FC = ({ children }): JSX.Element => {
  return <Render>{children}</Render>
}