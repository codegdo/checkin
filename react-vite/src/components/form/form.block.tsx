import React, { PropsWithChildren } from 'react';
import { FormRender } from './form.render';
import { BlockData, FieldData } from './form.type';

export interface BlockProps extends PropsWithChildren {
  type?: string;
  className?: string;
  data?: (BlockData | FieldData)[];
}

const FormBlock: React.FC<BlockProps> = ({ type = 'div', className, data = [], children }): JSX.Element => {

  const JSXElement = type as keyof JSX.IntrinsicElements;

  return (
    <JSXElement className={className}>
      {children ? children : <FormRender data={data} />}
    </JSXElement>
  );
}

export default FormBlock;