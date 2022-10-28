import React, { FC, useContext, useRef } from 'react';
import { useToggle } from '../../hooks/use-toggle.hook';
import { Panel } from '../box/box.component';
import { PanelFooter } from '../box/box.footer';
import { PanelHeader } from '../box/box.header';
import { PanelMain } from '../box/box.main';

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
    value: null,
    position: null,
    parentId: null,
    holderId: null
  },
  {
    id: null,
    name: 'component',
    label: "Component",
    description: null,
    role: 'block',
    type: 'div',
    data: [],
    value: {
      data: [],
      value: `<div class="row">
        <div class="column"><jsx id='dropholder_0'></jsx></div>
        <div class="column"><jsx id='dropholder_1'></jsx></div>
      </div>`
    },
    position: null,
    parentId: null,
    holderId: null
  },
  {
    id: null,
    name: 'link',
    label: "Link",
    description: null,
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
    label: "Button",
    description: null,
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
    label: "Html",
    description: null,
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
    label: "Text",
    description: null,
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

  const { state, current, addItem, setItem } = ctx;

  return <div>
    {
      blocks.map((block, i) => {
        return <DraggableItem
          key={i}
          {...block}
          current={current}
          list={state.data}
          setItem={setItem}
          addItem={addItem}
        />
      })
    }

  </div>
}