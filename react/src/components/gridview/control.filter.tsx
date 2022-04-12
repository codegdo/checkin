import React, { Children, isValidElement } from 'react';
import { Field } from './gridview.field';
import { ControlSearchProps } from './gridview.type';

export const ControlFilter: React.FC<ControlSearchProps> = ({ data, children }): JSX.Element => {
  return <div className='filter'>
    {
      children ? Children.map(children, (child): JSX.Element | null => {
        if (isValidElement(child) && typeof (child.type) !== 'string') {
          return child.props.isDefault ? null : child
        }
        return null;
      }) : data && data.map((item: any, i: any) => {
        return item.isDefault ? null : <Field input={item} key={i} />
      })
    }
  </div>
}