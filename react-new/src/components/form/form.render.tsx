import React, { PropsWithChildren } from 'react';
import { Block } from './form.block';
import { Field } from './form.field';
import { FieldGrid } from './form.grid';
import { FieldGroup } from './form.group';

interface RenderProps {
  data?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ children, data }): JSX.Element | null => {
  console.log('DATA', data);
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
  </>
}