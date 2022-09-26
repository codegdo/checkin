import React, { memo, PropsWithChildren, useContext, useEffect } from 'react';
//import { useAutoAnimate } from "@formkit/auto-animate/react";

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

  //const [ref] = useAutoAnimate<HTMLDivElement>({ duration: 120 });

  const { state, current, focus, setFocus, moveItem, deleteItem } = ctx;
  const list: any[] = data === undefined ? formHelper.mapField(state.data) : data || [];

  return <>
    {
      list.map((item, i, list) => {
        const { role, position } = item;
        switch (role) {
          case 'parent':
          case 'block':
            return <DragDropBlock
              key={i}
              position={position}
              current={current}
              focus={focus}
              setFocus={setFocus}
              moveItem={moveItem}
              deleteItem={deleteItem}
              {...item} />
          case 'field':
            return <DragDropField
              key={i}
              position={position}
              current={current}
              focus={focus}
              setFocus={setFocus}
              moveItem={moveItem}
              deleteItem={deleteItem}
              {...item} />
          default: return null;
        }
      })
    }
  </>
})