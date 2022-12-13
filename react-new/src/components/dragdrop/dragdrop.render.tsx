import React, { memo, PropsWithChildren, useContext } from 'react';

import { formHelper } from '../../helpers';
import { DragDropBlock } from './dragdrop.block';
import { DragDropContext } from './dragdrop.context';
import { DragDropElement } from './dragdrop.element';
import { DragDropField } from './dragdrop.field';
import { DragDropItem } from './dragdrop.item';
import { DragDropContextProps } from './dragdrop.type';

interface RenderProps {
  data?: any[]
}

export const DragDropRender: React.FC = (): JSX.Element => {
  const ctx = useContext((DragDropContext) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  return <DragDropBlock
    id="dropzone"
    className="form"
    name="block"
    dataType="dropzone"
    context={ctx}
  >
    <Render data={formHelper.mapField(ctx.state.data)} />
  </DragDropBlock>

}

export const Render: React.FC<PropsWithChildren<RenderProps>> = memo(({ data = [] }): JSX.Element => {

  const ctx = useContext((DragDropContext) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  return <>
    {
      data.map((item) => {
        switch (item.dataType) {
          case 'block':
          case 'dropzone':
          case 'placeholder':
            return <DragDropBlock key={item.id} context={ctx} {...item} />
          case 'element':
            return <DragDropElement key={item.id} context={ctx} {...item} />
          case 'field':
            return <DragDropField key={item.id} context={ctx} {...item} />
          default: return null;
        }
      })
    }
  </>
})