import React, { Children, cloneElement, isValidElement } from 'react';

export const TB: React.FC<any> = ({ children, ...props }): JSX.Element => {

  return <td>
    {
      Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, { ...props });
        }
        return child;
      })
    }
  </td>
}