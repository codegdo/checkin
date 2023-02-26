import React, { PropsWithChildren } from 'react';
import { Render } from './form.render';
import { BlockData, FieldData } from './form.type';

export interface BlockProps {
  type?: string;
  className?: string;
  data?: (BlockData | FieldData)[];
}

const Block: React.FC<PropsWithChildren<BlockProps>> = ({ type = 'div', className, data = [], children }): JSX.Element => {

  const Element = type as keyof JSX.IntrinsicElements;

  return (
    <Element className={className}>
      {children ? children : <Render data={data} />}
    </Element>
  );
}

export default Block;