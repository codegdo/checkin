import React, { PropsWithChildren, useEffect } from 'react';
import { FormRender } from './form.render';
import { Element } from './form.type';
import { util } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { FormContext } from './form.component';
import { formHelper } from './helpers/form.helper';

export interface SectionProps extends PropsWithChildren {
  id?: number | string;
  type?: string;
  className?: string;
  data?: Element[];
}

export function FormSection({ id, type = 'div', className = 'form-section', data = [], children }: SectionProps) {

  const { stepIndex, steps = [] } = useWrapperContext(FormContext);
  const index = formHelper.findSectionIndexByKey(steps, `${id}`); //steps.indexOf(`${id}`);

  const classNames = util.classNames(className, {
    'is-active': stepIndex === index,
    'is-inactive': stepIndex !== index,
  });

  const JSXElement = type as keyof JSX.IntrinsicElements;

  return (
    <JSXElement className={classNames} data-step={index}>
      {children || <FormRender data={data} />}
    </JSXElement>
  );
}
