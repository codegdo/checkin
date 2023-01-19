import React, { FC } from 'react';
import { useWrapperContext } from '../../hooks';


import { DragDropContext } from './dragdrop.context';
import { DraggableItem } from './draggable.item';

const blocks = [
  {
    id: null,
    className: '',
    name: 'block',
    label: "Block",
    description: null,
    dataType: 'block',
    type: 'div',
    data: [],
    component: null,
    styles: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    className: '',
    name: 'component',
    label: "Component",
    description: null,
    dataType: 'block',
    type: 'div',
    data: [],
    component: null,
    styles: {},
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
    className: '',
    name: 'link',
    label: "Link",
    description: null,
    dataType: 'element',
    type: 'link',
    data: null,
    component: null,
    styles: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    className: '',
    name: 'button',
    label: "Button",
    description: null,
    dataType: 'element',
    type: 'button',
    data: null,
    component: null,
    styles: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    className: '',
    name: 'html',
    label: "Html",
    description: null,
    dataType: 'element',
    type: 'html',
    data: null,
    component: null,
    styles: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  },
  {
    id: null,
    className: '',
    name: 'text',
    label: "Text",
    description: null,
    dataType: 'element',
    type: 'text',
    data: null,
    component: null,
    styles: {},
    value: null,
    position: null,
    parentId: null,
    placeholderId: null
  }
]

export const Draggable: FC = (): JSX.Element => {
  const { current, state, dispatch } = useWrapperContext(DragDropContext);

  return <div>
    {
      blocks.map((block, i) => {
        return <DraggableItem
          key={i}
          {...block}
          current={current}
          state={state}
          dispatch={dispatch}
        />
      })
    }
  </div>
}