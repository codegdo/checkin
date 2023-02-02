import React, { PropsWithChildren } from 'react';
import { Render } from './form.render';

interface BlockProps {
  className?: string;
  type?: string;
  data?: any;
  value?: string;
}

export const Block: React.FC<PropsWithChildren<BlockProps>> = ({ type = 'div', className, data, children }): JSX.Element => {

  const Element = type as keyof JSX.IntrinsicElements;

  return <Element className={className}>
    {
      children ? children : <Render data={data} />
    }
  </Element>
}