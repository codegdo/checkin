import React, { memo } from 'react';

import { useWrapperContext } from '../../hooks';

import DragDropContext from './dragdrop.provider';

import ItemBlock from './item.block';
import ItemField from './item.field';
import ItemElement from './item.element';
import ItemPlaceholder from './item.placeholder';
import ItemGrid from './item.grid';
import ItemGroup from './item.group';


function DragDropRender({ data = [] }: { data: any[] }) {
  const context = useWrapperContext(DragDropContext);

  const renderItems = (items: any[]): React.ReactNode[] => {
    return items.map(item => {
      const { dataType, children } = item;

      switch (dataType) {
        case 'block':
          return (
            <ItemBlock key={item.id}>{renderItems(children)}</ItemBlock>
          );
        case 'placcholder':
          return (
            <ItemPlaceholder key={item.id}>{renderItems(children)}</ItemPlaceholder>
          );
        case 'grid':
          return (
            <ItemGrid key={item.id}>{renderItems(children)}</ItemGrid>
          );
        case 'group':
          return (
            <ItemGroup key={item.id}>{renderItems(children)}</ItemGroup>
          );
        case 'field':
          return (
            <ItemField key={item.id}></ItemField>
          );
        case 'element':
          return (
            <ItemElement key={item.id}></ItemElement>
          );
        default:
          break;
      }

      if (children && children.length > 0) {
        return (
          <div key={item.id}>
            {renderItems(children)}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <>
      {renderItems(data)}
    </>
  );
}

export default DragDropRender;