import React, { ReactNode, memo } from 'react';

//import { useWrapperContext } from '../../hooks';
//import DragDropContext from './dragdrop.provider';

import ItemBlock from './item.block';
import ItemField from './item.field';
import ItemElement from './item.element';
import ItemPlaceholder from './item.placeholder';
import ItemGrid from './item.grid';
import ItemGroup from './item.group';
import { Field } from '../types';

interface DragDropRenderProps {
  data: Field[];
}

function DragDropRender({ data = [] }: DragDropRenderProps): ReactNode {
  const renderItems = (items: Field[]): ReactNode[] => {
    return items.map(item => {
      const { dataType } = item;

      switch (dataType) {
        case 'block':
          return <ItemBlock key={item.id}>{renderItems(item.data)}</ItemBlock>;
        case 'placeholder':
          return <ItemPlaceholder key={item.id}>{renderItems(item.data)}</ItemPlaceholder>;
        case 'grid':
          return <ItemGrid key={item.id} />;
        case 'group':
          return <ItemGroup key={item.id} />;
        case 'field':
          return <ItemField key={item.id} />;
        case 'element':
          return <ItemElement key={item.id} />;
        default:
          return null;
      }
    });
  };

  return renderItems(data);
}

export default DragDropRender;