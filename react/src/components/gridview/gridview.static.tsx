import React, { Children } from 'react';

export const GridviewStatic: React.FC = ({ children }): JSX.Element | null => {

  return <>
    {
      Children.toArray(children).sort((a, b) => { return a < b ? 1 : -1 })
    }
  </>

}


/* 
Children.map(components, (child): JSX.Element | null => {
  if (isValidElement(child) && typeof (child.type) !== 'string') {
    return <>
      {
        child.type.name == 'Control' && child
      }
      {
        child.type.name == 'Render' && child
      }
    </>
  }
  return null
}) 
*/