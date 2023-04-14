import React, { PropsWithChildren, useEffect } from 'react';
import { FormRender } from './form.render';
import { Element } from './form.type';
import { util } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { FormContext } from './form.component';

export interface SectionProps extends PropsWithChildren {
  id?: number | string;
  type?: string;
  className?: string;
  data?: Element[];
}

export function FormSection({ id, type = 'div', className = 'form-section', data = [], children }: SectionProps) {

  const { currentStepIndex, steps = [] } = useWrapperContext(FormContext);
  const index = steps.indexOf(`${id}`);

  const classNames = util.classNames(className, {
    'is-active': currentStepIndex === index,
    'is-inactive': currentStepIndex !== index,
  });

  const JSXElement = type as keyof JSX.IntrinsicElements;

  return (
    <JSXElement className={classNames} data-step={index}>
      {children || <FormRender data={data} />}
    </JSXElement>
  );
}
