import React, { Children, cloneElement, isValidElement } from 'react';
import { GridViewItem } from './gridview.item';

export const TDataBound: React.FC<any> = ({ children }): JSX.Element => {

  return <td>
    {
      children && Children.map(children, child => {

        if (isValidElement(child) && typeof child.type !== 'string') {
          if (child.type.name == 'DataItem') {
            return <GridViewItem {...child.props} />;
          } else {
            return null;
          }
        }
        return null;
      })
    }
  </td>
}