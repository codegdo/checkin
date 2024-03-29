import { useWrapperContext } from "@/hooks";
import { sortableHelper } from "./helpers";
import { SortableField } from "./types";

import SortableArea from "./sortable.area";
import SortableItem from "./sortable.item";
import SortableList from "./sortable.list";
import SortableContext, { SortableContextValue } from "./sortable.provider";

interface RenderProps {
  data?: SortableField[] | null;
  ctx: SortableContextValue;
}

const render = ({ data, ctx }: RenderProps) => {

  if (data == null) return null;

  const siblings = data?.map(obj => `${obj.id}`);

  return (
    <>
      {
        data.map(item => {
          const { dataType, data: childData = [] } = item;

          switch (dataType) {
            case 'area':
              return (
                <SortableArea key={item.id} {...item} ctx={ctx} siblings={siblings}>
                  {render({ data: childData, ctx })}
                </SortableArea>
              );
            case 'list':
              return (
                <SortableList key={item.id} {...item} ctx={ctx} siblings={siblings}>
                  {render({ data: childData, ctx })}
                </SortableList>
              );
            case 'item':
              return <SortableItem key={item.id} {...item} ctx={ctx} siblings={siblings} />
            default:
              return null;
          }
        })
      }
    </>
  );
}

function SortableRender() {
  const ctx = useWrapperContext(SortableContext);
  const normalizeData = sortableHelper.normalizeData(ctx.state.data);

  return (<>{render({ data: normalizeData, ctx })}</>)
}

export default SortableRender;