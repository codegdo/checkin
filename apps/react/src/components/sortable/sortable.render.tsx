import { useWrapperContext } from "@/hooks";
import SortableContext, { SortableContextValue } from "./sortable.provider";
import { SortableField } from "./types";
import { groupDataForRender } from "@/utils";
import SortableArea from "./sortable.area";

interface RenderProps {
  data?: SortableField[] | null;
  context: SortableContextValue;
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
              return <div key={id}>list</div>;
            case 'item':
              return <div key={id}>item</div>;
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
  const renderData = groupDataForRender(context.state.data) as SortableField[];
  console.log(renderData, context);
  return <>{render({ data: renderData, context })}</>
}

export default SortableRender;