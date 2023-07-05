import { useWrapperContext } from "../../hooks";
import { sortableHelper } from "./helpers";
import SortableItem from "./sortable.item";
import SortableList from "./sortable.list";
import SortableContext, { SortableContextValue } from "./sortable.provider";
import { Field } from "./types";

interface RenderProps {
  data: Field[] | null;
  ctx: SortableContextValue;
}
  
const render = ({ data, ctx }:RenderProps) => {

  if (data == null) return null;

  return (
    <>
      {
        data.map(item => {
          const {group, data: _data = []} = item;

          switch(group) {
            case 'area':
            case 'block':
              return (
                <SortableList key={item.id} {...item} ctx={ctx}>
                  {render({ data: _data, ctx })}
                </SortableList>
              );
            case 'field':
              return <SortableItem key={item.id} {...item} ctx={ctx} />
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
  const data = sortableHelper.renderData(ctx.state.data);

  return (<>{render({data, ctx})}</>)
}

export default SortableRender;