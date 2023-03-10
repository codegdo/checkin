import React, { PropsWithChildren } from 'react';
import { FormRender } from './form.render';
import { Element } from './form.type';

export interface BlockProps extends PropsWithChildren {
  type?: string;
  className?: string;
  data?: Element[];
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