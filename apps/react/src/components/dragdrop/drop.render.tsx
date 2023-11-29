import { useWrapperContext } from "@/hooks";
import DragDropContext, { DndContextValue } from "./dragdrop.provider";
import { DndField } from "./types";
import { groupDataForRender } from "@/utils";

interface RenderProps {
  data?: DndField[];
  context: DndContextValue;
}

const render = ({ data = [], context }: RenderProps) => {

  return (
    <>
      {
        data.map(item => {
          const { id, dataType, data: childData = [] } = item;

          switch (dataType) {
            case 'area':
              return <div key={id}>area</div>;
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

function DropRender() {
  const context = useWrapperContext(DragDropContext);
  const renderData = groupDataForRender(context.state.data) as DndField[];
  console.log(renderData);

  return <>{render({ data: renderData, context })}</>
}

export default DropRender;