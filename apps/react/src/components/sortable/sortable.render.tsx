import { useWrapperContext } from "@/hooks";
import { groupDataForRender } from "@/utils";

import { ContextValue, Field } from "./types";
import SortableContext from "./sortable.provider";
import SortableArea from "./sortable.area";
import SortableList from "./sortable.list";
import SortableItem from "./sortable.item";

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
              return <SortableArea key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </SortableArea>
            case 'list':
              return <SortableList key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </SortableList>
            case 'item':
              return <SortableItem key={item.id} {...item} context={context} />;
            default:
              return null;
          }
        })
      }
    </>
  );
}

function SortableRender() {
  const context = useWrapperContext(SortableContext);
  const renderData = groupDataForRender(context.state.data) as Field[];
  console.log(renderData, context);
  return <>{render({ data: renderData, context })}</>
}

export default SortableRender;