import React, { FC, useContext } from 'react';

import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';
import { DraggableItem } from './draggable.item';

const blocks = [
  {
    id: null,
    name: 'block',
    role: 'block',
    type: 'div',
    data: [],
    value: null,
    position: null,
    parentId: null,
    holderId: null
  },
  {
    id: null,
    name: 'component',
    role: 'component',
    type: 'div',
    data: [],
    value: `<div class="row">
      <div class="column"><jsx id='dropholder_0'></jsx></div>
      <div class="column"><jsx id='dropholder_1'></jsx></div>
    </div>`,
    position: null,
    parentId: null,
    holderId: null
  },
  {
    id: null,
    name: 'link',
    role: 'element',
    type: 'link',
    data: null,
    value: null,
    position: null,
    parentId: null,
    holderId: null
  },
  {
    id: null,
    name: 'button',
    role: 'element',
    type: 'button',
    data: null,
    value: null,
    position: null,
    parentId: null,
    holderId: null
  },
  {
    id: null,
    name: 'html',
    role: 'element',
    type: 'html',
    data: null,
    value: null,
    position: null,
    parentId: null,
    holderId: null
  },
  {
    id: null,
    name: 'text',
    role: 'element',
    type: 'text',
    data: null,
    value: null,
    position: null,
    parentId: null,
    holderId: null
  }
]

export const Draggable: FC = (): JSX.Element => {
  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { state, current, addItem, setFocus } = ctx;

  return <div>
    {
      blocks.map((block, i) => {
        return <DraggableItem
          key={i}
          {...block}
          current={current}
          list={state.data}
          setFocus={setFocus}
          addItem={addItem}
        />
      })
    }
  </div>
}