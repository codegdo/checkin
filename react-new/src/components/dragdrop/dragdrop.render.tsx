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
      data.map((item, i, data) => {
        const { role } = item;
        switch (role) {
          case 'block': return <DragDropBlock key={i} index={i} list={data} {...item} />
          case 'field': return <DragDropField key={i} index={i} list={data} {...item} />
          default: return null;
        }
      })
    }
  </>
}