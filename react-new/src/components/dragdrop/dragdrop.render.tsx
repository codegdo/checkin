import React, { PropsWithChildren } from 'react';
import { DragDropBlock } from './dragdrop.block';
import { DragDropField } from './dragdrop.field';

interface RenderProps {
  data?: any[],
  parent?: any
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ data = [], parent }): JSX.Element => {

  return <>
    {
      data.map((item, i) => {
        const { role } = item;
        switch (role) {
          case 'block': return <DragDropBlock key={i} {...item} />
          case 'field': return <DragDropField key={i} {...item} />
          default: return null;
        }
      })
    }
  </>
}