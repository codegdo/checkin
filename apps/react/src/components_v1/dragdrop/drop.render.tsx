import { useMemo } from "react";

import { useDragDropContext } from "./hooks";
import { ContextValue } from "./contexts";
import { dndHelper } from "./helpers";
import { DndField } from "./types";

export function DropRender() {
  const context = useDragDropContext() as ContextValue;

  const data = useMemo(() => dndHelper.groupData(context.state.data) as DndField[], [context.state.data]);

  const root = {
    id: 'root-area',
    name: 'area',
    type: 'div',
    blockType: 'area',
    data,
  };

  console.log(context, root);

  return (
    <>
      {render(root)}
    </>
  );
}

function render(drop: DndField) {
  const { data } = drop;

  return data?.map((item) => {
    const key = item.id || item.name;

    return <div key={key}></div>
  }) || null;
}