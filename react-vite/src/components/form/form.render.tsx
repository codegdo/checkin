import React, { PropsWithChildren, useContext } from 'react';
import { Block } from './form.block';
import { FormContext } from './form.context';
import { Field } from './form.field';
import { FieldGrid } from './form.grid';
import { FieldGroup } from './form.group';
import { FormContextProps } from './form.type';

interface RenderProps {
  data?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ data, children }): JSX.Element | null => {
  console.log('DATA', data);

  const ctx = useContext((FormContext as Object) as React.Context<FormContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { onClick } = ctx;

  return <>
    {
      children ? children : data && data?.map((item, i) => {
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