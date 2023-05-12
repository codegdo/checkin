import React, { PropsWithChildren } from 'react';
import { FormRender } from './form.render';
import { Element } from './form.type';

export interface BlockProps extends PropsWithChildren {
  type?: string;
  className?: string;
  data?: Element[];
}

export function FormBlock({ type = 'div', className, data = [], children }: BlockProps) {

  const JSXElement = type as keyof JSX.IntrinsicElements;

  return (
    <JSXElement className={className}>
      {children ? children : <FormRender data={data} />}
    </JSXElement>
  );
}
