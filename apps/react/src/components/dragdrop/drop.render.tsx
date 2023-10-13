import { FC } from 'react';

import DropArea from './drop.area';
import DropSection from './drop.section';
import DropBlock from './drop.block';
import DropPlaceholder from './drop.placeholder';
import DropField from './drop.field';
import DropElement from './drop.element';
import DropGrid from './drop.grid';
import DropGroup from './drop.group';
import DragDropContext from './dragdrop.provider';
import { dndHelper } from './helpers';
import { DndContextValue, Field } from '../types';
import { useWrapperContext } from '../../hooks';

interface RenderProps {
  items: Field[];
  ctx: DndContextValue;
}

const render = ({ items, ctx }:RenderProps) => {
  return (
    <>
      {items.map((item) => {
        const { dataType, data = [] } = item;

        console.log();

        switch (dataType) {
          case 'area':
            return data && (
              <DropArea key={item.id} {...item} ctx={ctx}>
                {render({ items: data, ctx })}
              </DropArea>
            );
          case 'section':
            return data && (
              <DropSection key={item.id} {...item} ctx={ctx}>
                {render({ items: data, ctx })}
              </DropSection>
            );
          case 'block':
            return data && (
              <DropBlock key={item.id} {...item} ctx={ctx}>
                {render({ items: data, ctx })}
              </DropBlock>
            );
          case 'placeholder':
            return data && (
              <DropPlaceholder key={item.id} {...item} ctx={''}>
                {render({ items: data, ctx})}
              </DropPlaceholder>
            );
          case 'grid':
            return <DropGrid key={item.id} {...item} ctx={''} />;
          case 'group':
            return <DropGroup key={item.id} {...item} ctx={''} />;
          case 'field':
            return <DropField key={item.id} {...item} ctx={ctx} />;
          case 'element':
            return <DropElement key={item.id} {...item} ctx={''} />;
          default:
            return null;
        }
      })}
    </>
  );
};

function DropRender(): JSX.Element | null {
  const ctx = useWrapperContext(DragDropContext);

  // normalize data
  const normalizeData = dndHelper.normalizeData(ctx.state.data);

  if (normalizeData === null) {
    return null;
  }

  return <>{render({ items: normalizeData, ctx })}</>;
}

export default DropRender;
