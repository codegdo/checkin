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
  data: Field[] | null;
}

function DragDropRender({ data = [] }: DragDropRenderProps): ReactNode {

  const renderItems = (items: Field[]): ReactNode[] => {
    return items.map(item => {
      const { dataType, data = [] } = item;

      switch (dataType) {
        case 'block':
          return data && <ItemBlock key={item.id} {...item} ctx={''}>{renderItems(data)}</ItemBlock>;
        case 'placeholder':
          return data && <ItemPlaceholder key={item.id} {...item} ctx={''}>{renderItems(data)}</ItemPlaceholder>;
        case 'grid':
          return <ItemGrid key={item.id} {...item} ctx={''} />;
        case 'group':
          return <ItemGroup key={item.id} {...item} ctx={''} />;
        case 'field':
          return <ItemField key={item.id} {...item} ctx={''} />;
        case 'element':
          return <ItemElement key={item.id} {...item} ctx={''} />;
        default:
          return null;
      }
    });
  };

  if (data === null) {
    return null;
  }

  return renderItems(data);
}

export default DragDropRender;