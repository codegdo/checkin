import { useMemo } from "react";

import { groupDataForRender } from "@/utils";
import { useDragDropContext } from "./hooks";
import { ContextValue } from "./contexts";
import { DndField } from "./types";
import { DropBlock } from "./drop.block";
import { DropField } from "./drop.field";
import { DropArea } from "./drop.area";
import { DropElement } from "./drop.element";

export function DropRender() {
  const context = useDragDropContext() as ContextValue;

  const drop = useMemo(() => {
    return {
      id: 'root-area',
      name: 'area',
      type: 'div',
      dataType: 'area',
      data: groupDataForRender(context.state.data),
    }
  }, [context.state.data]);

  console.log(drop, context);

  return (
    <>
      {render(drop, context)}
    </>
  );
}

function render(drop: DndField, context: ContextValue) {
  const { data = [] } = drop;

  return data?.map((item) => {
    const key = item.id || item.name;

    switch(item.dataType) {
      case 'area': {
        return (
          <DropArea key={key} {...item} context={context}>
            {render(item, context)}
          </DropArea>
        );
      }
      case 'section':
      case 'block': {
        return (
          <DropBlock key={key} {...item} context={context}>
            {render(item, context)}
          </DropBlock>
        );
      }
      case 'field': {
        return <DropField key={key} {...item} context={context} />
      }
      case 'element': {
        return <DropElement key={key} {...item} context={context} />
      }
      default:
        return null;
    }
  }) || null;
}