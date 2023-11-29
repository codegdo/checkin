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
import { DndContextValue, DndField } from './types';
import { useWrapperContext } from '../../hooks';

interface RenderProps {
  data?: DndField[] | null;
  ctx: DndContextValue;
}

const render = ({ data, ctx }: RenderProps) => {

  if (data == null) return null;

  return (
    <>
      {data.map((item) => {
        const { dataType, data: childData = [] } = item;

        switch (dataType) {
          case 'area':
            return (
              <DropArea key={item.id} {...item} ctx={ctx}>
                {render({ data: childData, ctx })}
              </DropArea>
            );
          case 'section':
            return (
              <DropSection key={item.id} {...item} ctx={ctx}>
                {render({ data: childData, ctx })}
              </DropSection>
            );
          case 'block':
            return (
              <DropBlock key={item.id} {...item} ctx={ctx}>
                {render({ data: childData, ctx })}
              </DropBlock>
            );
          case 'placeholder':
            return (
              <DropPlaceholder key={item.id} {...item} ctx={''}>
                {render({ data: childData, ctx })}
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
  const normalizeData = dndHelper.normalizeData(ctx.state.data);

  return <>{render({ data: normalizeData, ctx })}</>;
}

export default DropRender;
