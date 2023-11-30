import { useWrapperContext } from "@/hooks";
import DragDropContext, { DndContextValue } from "./dragdrop.provider";
import { DndField } from "./types";
import { groupDataForRender } from "@/utils";
import DropArea from "./drop.area";
import DropSection from "./drop.section";
import DropBlock from "./drop.block";
import DropField from "./drop.field";
import DropElement from "./drop.element";

interface RenderProps {
  data?: DndField[] | null;
  context: DndContextValue;
}

const render = ({ data = [], context }: RenderProps) => {

  return (
    <>
      {
        data?.map(item => {
          const { id, dataType, data: childData = [] } = item;

          switch (dataType) {
            case 'area':
              return <DropArea key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </DropArea>;
            case 'section':
              return <DropSection key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </DropSection>;
            case 'block':
              return <DropBlock key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </DropBlock>;
            case 'field':
              return <DropField key={item.id} {...item} context={context} />;
            case 'element':
              return <DropElement key={item.id} {...item} context={context} />;
            default:
              return null;
          }
        })
      }
    </>
  );
}

function DropRender() {
  const context = useWrapperContext(DragDropContext);
  const renderData = groupDataForRender(context.state.data) as DndField[];
  console.log(renderData);

  return <>{render({ data: renderData, context })}</>
}

export default DropRender;