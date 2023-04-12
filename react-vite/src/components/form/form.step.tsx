import React, { PropsWithChildren } from 'react';
import { FormRender } from './form.render';
import { Element } from './form.type';
import { util } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { FormContext } from './form.component';

export interface StepProps extends PropsWithChildren {
  id?: number | string;
  type?: string;
  className?: string;
  data?: Element[];
}

export function FormStep({ id, type = 'div', className = '', data = [], children }: StepProps) {

  const { currentStepIndex, steps = [] } = useWrapperContext(FormContext);
  const index = steps.indexOf(`${id}`);

  const classNames = util.classNames(className, {
    'is-active': currentStepIndex === index,
    'is-hidden': currentStepIndex !== index,
  });

  const JSXElement = type as keyof JSX.IntrinsicElements;

  return (
    <JSXElement className={classNames} data-step={index}>
      {children || <FormRender data={data} />}
    </JSXElement>
  );
}
