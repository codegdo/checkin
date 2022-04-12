import React from 'react';
import { DynamicRender } from './dynamic.render';
import { StaticRender } from './static.render';

export const Render: React.FC = ({ children }): JSX.Element => {
  return children ? <StaticRender>{children}</StaticRender> : <DynamicRender />
}
























/* 
Children.toArray(children).sort((a, b) => { return a < b ? 1 : -1 })

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