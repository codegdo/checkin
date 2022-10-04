import React, { useContext } from 'react';
import { DraggableBlock } from './draggable.block';
import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';

const blocks = [
  {
    id: null,
    name: 'block',
    role: 'parent',
    type: 'div',
    data: [],
    value: null,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'component',
    role: 'component',
    type: 'div',
    data: [],
    value: `<div>test</div><div>test</div>`,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'link',
    role: 'block',
    type: 'link',
    data: null,
    value: null,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'button',
    role: 'block',
    type: 'button',
    data: null,
    value: null,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'html',
    role: 'block',
    type: 'html',
    data: null,
    value: null,
    position: null,
    parentId: null
  },
  {
    id: null,
    name: 'text',
    role: 'block',
    type: 'text',
    data: null,
    value: null,
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