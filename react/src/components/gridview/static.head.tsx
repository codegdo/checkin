import React, { Children, isValidElement } from 'react';

export const StaticHead: React.FC = ({ children }): JSX.Element => {
  return <tr>
    {
      Children.map(children, (child): JSX.Element | null => {
        return isValidElement(child) ? <th>{child.props.title}</th> : null;
      })
    }
  </tr>
}