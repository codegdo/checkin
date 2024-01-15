import { useMemo } from "react";

import { groupDataForRender } from "@/utils";
import { useDragDropContext } from "./hooks";
import { ContextValue } from "./contexts";
import { DndField } from "./types";
import { DropBlock } from "./drop.block";
import { DropField } from "./drop.field";
import { DropArea } from "./drop.area";
import { DropGrid } from "./drop.grid";
import { DropGroup } from "./drop.group";

export function DropRender() {
  const context = useDragDropContext() as ContextValue;

  const drop = useMemo(() => {
    return {
      id: 'root-area',
      name: 'area',
      type: 'area',
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

    switch(item.type) {
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
      case 'grid':
        return <DropGrid key={key} {...item} context={context} />
      case 'group':
        return <DropGroup key={key} {...item} context={context} />
      default:
        return <DropField key={key} {...item} context={context} />
    }
  }) || null;
}