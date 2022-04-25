import React, { Children, isValidElement, PropsWithChildren } from 'react';
import { GridViewItem } from './gridview.item';
import { DataColumnProps } from './gridview.type';

export const TD: React.FC<PropsWithChildren<DataColumnProps>> = ({ children, ...props }): JSX.Element => {

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