import React, { PropsWithChildren } from 'react';
import { Block } from './form.block';
import { Field } from './form.field';
import { Element } from './form.element';
import { Grid } from './form.grid';
import { Group } from './form.group';

interface RenderProps {
  data?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ data, children }): JSX.Element | null => {

  return <>
    {
      children ? children : data?.map((item, i) => {
        switch (item?.dataType) {
          case 'block': return <Block key={i} {...item} />;
          case 'field': return <Field key={i} {...item} />;
          case 'element': return <Element key={i} {...item} />;
          case 'group': return <Group key={i} {...item} />;
          case 'grid': return <Grid key={i} {...item} />;
          default: return null;
        }
      })
    }
  </>
}