import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";
import { ActionType } from "./reducers";
import { dndHelper } from "./helpers";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropArea({ context, children, ...item }: Props) {
  const { ref, isOver, drop } = useDragDrop({ context, item });
  const className = classNames('droppable-area', {
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const el = target.closest('div[data-id]');

    if (el) {
      const id = el.getAttribute('data-id');
      //const found = context.state.currentData.find(item => item.id == id);
      const found = dndHelper.findItemById(item, id, (item) => (item.dataType === 'area' || item.dataType === 'section' || item.dataType === 'block'))

      console.log('found', found);

      if (found) {
        if (context.state.selectedItem?.id == found.id) {
          context.dispatch({ type: ActionType.UNSELECT_ITEM, });
          return;
        }

        const selectedItem = { ...found };

        context.dispatch({
          type: ActionType.SELECT_ITEM,
          payload: { item: selectedItem }
        });
      }
    }
  };

  drop(ref);

  return (
    <div ref={ref} id={`${item.id}`} className={className} onClick={handleItemClick}>
      {children}
    </div>
  )
}

export default DropArea;