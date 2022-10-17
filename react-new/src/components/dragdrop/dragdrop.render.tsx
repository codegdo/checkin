import React, { memo, PropsWithChildren, useContext } from 'react';
//import { useAutoAnimate } from "@formkit/auto-animate/react";

import { formHelper } from '../../helpers';
import { DragDropContext } from './dragdrop.context';
import { DragDropItem } from './dragdrop.item';
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

  const { state, current, item: currentItem, setItem, moveItem, deleteItem, duplicateItem, updateItem } = ctx;
  const list: any[] = data === undefined ? formHelper.mapField(state.data) : data || [];

  return <>
    {
      list.map((item, index) => {
        return <DragDropItem
          key={index}
          current={current}
          list={state.data}
          item={currentItem}
          setItem={setItem}
          moveItem={moveItem}
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          updateItem={updateItem}
          {...item} />
      })
    }
  </>
})