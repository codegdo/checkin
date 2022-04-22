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

        if (typeof child == 'string' && child == 'CHILDREN') {
          const { data = [] } = props;

          return data.map((item: any, i: any) => {
            return <GridViewItem {...item} key={i} />;
          });
        }

      }) : <GridViewItem {...props} />
    }
  </td>
}