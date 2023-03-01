import React, { memo } from 'react';

import { DndItem, DndItemType } from './dragdrop.type';
import DropBlock from './drop.block';
import DropElement from './drop.element';
import DropField from './drop.field';
import DropGrid from './drop.grid';
import DropGroup from './drop.group';

export interface DragDropRenderProps {
  data?: DndItem[];
}

const DragDropRender: React.FC<DragDropRenderProps> = memo(({ data = [] }): JSX.Element => {
  return (
    <>
      {
        data.map((item, i) => {
          const { id, dataType } = item;

          switch (dataType) {
            case DndItemType.Block: return <DropBlock key={i} {...item} />;
            case DndItemType.Element: return <DropElement key={i} {...item} />;
            case DndItemType.Field: return <DropField key={i} {...item} />;
            case DndItemType.Group: return <DropGroup key={i} {...item} />;
            case DndItemType.Grid: return <DropGrid key={i} {...item} />;
            default: return null;
          }
        })
      }
    </>
  );
});

export default DragDropRender;