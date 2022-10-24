import React, { memo, PropsWithChildren, useContext } from 'react';

import { formHelper } from '../../helpers';
import { DragDropContext } from './dragdrop.context';
import { DragDropItem } from './dragdrop.item';
import { DragDropContextProps } from './dragdrop.type';

interface RenderProps {
  data?: any[]
}

export const DragDropRender: React.FC = (): JSX.Element => {
  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { state, current } = ctx;

  return <DragDropItem
    id="dropzone"
    name="block"
    role="dropzone"
    draggable={false}
    current={current}>
    <Render data={formHelper.mapField(state.data)} />
  </DragDropItem>

}

export const Render: React.FC<PropsWithChildren<RenderProps>> = memo(({ data = [] }): JSX.Element => {

  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { state, current, item: currentItem, setItem, moveItem, deleteItem, duplicateItem, updateItem } = ctx;

  return <>
    {
      data.map((item, index) => {
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