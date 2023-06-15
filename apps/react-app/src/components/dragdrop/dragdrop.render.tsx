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
import { useWrapperContext } from '../../hooks';
import DragDropContext from './dragdrop.provider';
import ItemArea from './item.area';
import ItemSection from './item.section';

function DragDropRender(): JSX.Element | null {

  const ctx = useWrapperContext(DragDropContext);

  // normalize data
  const normalizeData = ctx.state.data;

  const renderItems = (items: Field[]): ReactNode[] => {
    return items.map(item => {
      const { dataType, data = [] } = item;

      switch (dataType) {
        case 'area':
          return data && <ItemArea key={item.id} {...item} ctx={ctx}>{renderItems(data)}</ItemArea>;
        case 'section':
          return data && <ItemSection key={item.id} {...item} ctx={ctx}>{renderItems(data)}</ItemSection>;
        case 'block':
          return data && <ItemBlock key={item.id} {...item} ctx={ctx}>{renderItems(data)}</ItemBlock>;
        case 'placeholder':
          return data && <ItemPlaceholder key={item.id} {...item} ctx={''}>{renderItems(data)}</ItemPlaceholder>;
        case 'grid':
          return <ItemGrid key={item.id} {...item} ctx={''} />;
        case 'group':
          return <ItemGroup key={item.id} {...item} ctx={''} />;
        case 'field':
          return <ItemField key={item.id} {...item} ctx={ctx} />;
        case 'element':
          return <ItemElement key={item.id} {...item} ctx={''} />;
        default:
          return null;
      }
    });
  };

  if (normalizeData === null) {
    return null;
  }

  return <>{renderItems(normalizeData)}</>;
}

export default DragDropRender;