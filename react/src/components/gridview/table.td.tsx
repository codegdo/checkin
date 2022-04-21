import React, { Children, isValidElement } from 'react';
import { GridViewItem } from './gridview.item';

export const TD: React.FC<any> = ({ children, ...props }): JSX.Element => {

  return <td>
    {
      children ? Children.map(children, child => {

        if (isValidElement(child) && typeof child.type !== 'string') {
          if (child.type.name == 'DataItem') {
            return <GridViewItem {...child.props} />;
          } else {
            return null;
          }
        }
        return null;
      }) : <GridViewItem {...props} />
    }
  </td>
}