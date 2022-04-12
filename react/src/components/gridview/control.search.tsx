import React, { Children, isValidElement } from 'react';
import { ControlButton } from './control.button';
import { Field } from './gridview.field';
import { ControlSearchProps } from './gridview.type';

export const ControlSearch: React.FC<ControlSearchProps> = ({ data, children }): JSX.Element => {

  return <div className="search">
    {
      children ? Children.map(children, (child): JSX.Element | null => {
        if (isValidElement(child) && typeof (child.type) !== 'string') {
          return child.props.isDefault ? child : null
        }
        return null;
      }) : data && data.map((item: any, i: any) => {
        return item.isDefault ? <Field input={item} key={i} /> : null
      })
    }
    <ControlButton />
  </div>
}