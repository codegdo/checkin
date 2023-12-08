import { PropsWithChildren } from "react";

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";
import { ActionType } from "./reducers";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropArea({ context, children, ...item }: Props) {
  const { ref, isOver, drop } = useDragDrop({ context, item });
  const className = classNames('drop-area', {
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const el = target.closest('div[data-id]');

    if (el) {
      const id = el.getAttribute('data-id');
      const item = context.state.currentData.find(item => item.id == id);

      if (item) {
        if (context.state.selectedItem?.id == item.id) {
          context.dispatch({type: ActionType.UNSELECT_ITEM,});
          return;
        }

        const updatedItem = { ...item };

        context.dispatch({
          type: ActionType.SELECT_ITEM,
          payload: { item: updatedItem }
        });
      }
    }
  };

  drop(ref);

  return (<div ref={ref} id={`${item.id}`} className={className} onClick={handleItemClick}>
    {children}
  </div>)
}

export default DropArea;