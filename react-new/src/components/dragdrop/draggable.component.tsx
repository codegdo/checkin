import React, { FC, useContext, useRef } from 'react';


import { DragDropContext } from './dragdrop.context';
import { DragDropContextProps } from './dragdrop.type';
import { DraggableItem } from './draggable.item';

const blocks = [
  {
    id: null,
    name: 'block',
    label: "Block",
    description: null,
    role: 'block',
    type: 'div',
    data: [],
    component: null,
    style: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    name: 'component',
    label: "Component",
    description: null,
    role: 'block',
    type: 'div',
    data: [],
    component: null,
    style: {},
    value: `<div class="row">
      <div class="column"><jsx id='placeholder_0'></jsx></div>
      <div class="column"><jsx id='placeholder_1'></jsx></div>
    </div>`,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    name: 'link',
    label: "Link",
    description: null,
    role: 'element',
    type: 'link',
    data: null,
    component: null,
    style: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    name: 'button',
    label: "Button",
    description: null,
    role: 'element',
    type: 'button',
    data: null,
    component: null,
    style: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    name: 'html',
    label: "Html",
    description: null,
    role: 'element',
    type: 'html',
    data: null,
    component: null,
    style: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    name: 'text',
    label: "Text",
    description: null,
    role: 'element',
    type: 'text',
    data: null,
    component: null,
    style: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  }
]

export const Draggable: FC = (): JSX.Element => {
  const ctx = useContext((DragDropContext) as React.Context<DragDropContextProps>);

  if (!ctx) {
    throw new Error();
  }

  return <div>
    {
      blocks.map((block, i) => {
        return <DraggableItem
          key={i}
          {...block}
          context={ctx}
        />
      })
    }

  </div>
}