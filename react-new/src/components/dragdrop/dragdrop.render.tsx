import React, { memo, PropsWithChildren, useContext, useEffect } from 'react';
import { formHelper } from '../../helpers';
import { DragDropBlock } from './dragdrop.block';
import { DragDropContext } from './dragdrop.context';
import { DragDropField } from './dragdrop.field';
import { DragDropContextProps } from './dragdrop.type';

interface RenderProps {
  data?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = memo(({ data }): JSX.Element => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { state, current, focus, setFocus, moveItem } = ctx;
  const list: any[] = data || formHelper.mapField(state.data) || [];

  return <>
    {
      list.map((item, i, list) => {
        const { role, position } = item;
        switch (role) {
          case 'block':
            return <DragDropBlock
              key={i}
              position={position}
              current={current}
              focus={focus}
              setFocus={setFocus}
              moveItem={moveItem}
              {...item} />
          case 'field':
            return <DragDropField
              key={i}
              position={position}
              current={current}
              focus={focus}
              setFocus={setFocus}
              moveItem={moveItem}
              {...item} />
          default: return null;
        }
      })
    }
  </>
})