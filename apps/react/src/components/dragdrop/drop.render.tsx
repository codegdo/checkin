import { useWrapperContext } from "@/hooks";
import { groupDataForRender } from "@/utils";
import { ContextValue, Field } from "./types";
import DragDropContext from "./dragdrop.provider";
import DropArea from "./drop.area";
import DropSection from "./drop.section";
import DropBlock from "./drop.block";
import DropField from "./drop.field";
import DropElement from "./drop.element";

interface RenderProps {
  data?: Field[] | null;
  context: ContextValue;
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
  const renderData = groupDataForRender(context.state.data) as Field[];
  console.log(renderData);

  return <>{render({ data: renderData, context })}</>
}

export default DropRender;