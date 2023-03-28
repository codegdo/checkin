import React, { memo } from 'react';

import { useWrapperContext } from '../../hooks';

import { DragDropContext } from './dragdrop.context';
import { DndItem, DndItemType } from './dragdrop.type';

import { DropBlock } from './drop.block';
import { DropElement } from './drop.element';
import { DropField } from './drop.field';
import { DropGrid } from './drop.grid';
import { DropGroup } from './drop.group';

export interface DragDropRenderProps {
  data?: DndItem[];
}

export const DragDropRender = memo(({ data = [] }: DragDropRenderProps) => {
  const context = useWrapperContext(DragDropContext);
  return (
    <>
      {
        data.map((item, i) => {
          const { id, dataType } = item;

          switch (dataType) {
            case DndItemType.BLOCK: return <DropBlock key={id} {...item} {...context} />;
            case DndItemType.ELEMENT: return <DropElement key={id} {...item} {...context} />;
            case DndItemType.FIELD: return <DropField key={id} {...item} {...context} />;
            case DndItemType.GROUP: return <DropGroup key={id} {...item} {...context} />;
            case DndItemType.GRID: return <DropGrid key={id} {...item} {...context} />;
            default: return null;
          }
        })
      }
    </>
  );
});