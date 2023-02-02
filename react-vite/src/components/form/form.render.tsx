import React, { PropsWithChildren } from 'react';
import { useWrapperContext } from '../../hooks';
import { Block } from './form.block';
import { FormContext } from './form.context';
import { Field } from './form.field';
import { FieldGrid } from './form.grid';
import { FieldGroup } from './form.group';

interface RenderProps {
  data?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ data, children }): JSX.Element | null => {
  const ctx = useWrapperContext(FormContext);

  const { onClick } = ctx;

  return <>
    {
      children ? children : data?.map((item, i) => {
        const { role } = item;

        switch (role) {
          case 'block': return <Block key={i} {...item} />;
          case 'field': return <Field key={i} {...item} />;
          case 'group': return <FieldGroup key={i} {...item} />;
          case 'grid': return <FieldGrid key={i} {...item} />;
          default: return null;
        }
      })
    }

    <button type='button' onClick={() => onClick({ key: '', value: '' })}>Click</button>

  </>
}