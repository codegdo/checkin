import { memo, FC } from 'react';

import ItemArea from './item.area';
import ItemSection from './item.section';
import ItemBlock from './item.block';
import ItemPlaceholder from './item.placeholder';
import ItemField from './item.field';
import ItemElement from './item.element';
import ItemGrid from './item.grid';
import ItemGroup from './item.group';
import DragDropContext from './dragdrop.provider';
import { dndHelper } from './helpers';
import { Field } from '../types';
import { useWrapperContext } from '../../hooks';

interface RenderItemsProps {
  items: Field[];
}

const RenderItems: FC<RenderItemsProps> = ({ items }) => {
  const ctx = useWrapperContext(DragDropContext);

  return (
    <>
      {items.map((item) => {
        const { dataType, data = [] } = item;

        switch (dataType) {
          case 'area':
            return data && (
              <ItemArea key={item.id} {...item} ctx={ctx}>
                <RenderItems items={data} />
              </ItemArea>
            );
          case 'section':
            return data && (
              <ItemSection key={item.id} {...item} ctx={ctx}>
                <RenderItems items={data} />
              </ItemSection>
            );
          case 'block':
            return data && (
              <ItemBlock key={item.id} {...item} ctx={ctx}>
                <RenderItems items={data} />
              </ItemBlock>
            );
          case 'placeholder':
            return data && (
              <ItemPlaceholder key={item.id} {...item} ctx={''}>
                <RenderItems items={data} />
              </ItemPlaceholder>
            );
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
      })}
    </>
  );
};

function DragDropRender(): JSX.Element | null {
  const ctx = useWrapperContext(DragDropContext);

  // normalize data
  const normalizeData = dndHelper.normalizeData(ctx.state.data);

  const MemoizedRenderItems = memo(RenderItems);

  if (normalizeData === null) {
    return null;
  }

  return <MemoizedRenderItems items={normalizeData} />;
}

export default DragDropRender;
