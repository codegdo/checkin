import React, { useContext } from 'react';
import { DraggableBlock } from './draggable.block';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

const blocks = [
  {
    id: null,
    name: 'drop',
    role: 'parent',
    data: [],
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'link',
    type: 'link',
    role: 'block',
    data: null,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'button',
    type: 'button',
    role: 'block',
    data: null,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'html',
    type: 'html',
    role: 'block',
    data: null,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'text',
    type: 'text',
    role: 'block',
    data: null,
    position: null,
    parentId: null
  }
]

export const Draggable = (): JSX.Element => {
  const ctx = useContext((DragDropContext as Object) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { state, current, addItem, setFocus } = ctx;
  return <div>
    {
      blocks.map((block, i) => {
        return <DraggableBlock
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