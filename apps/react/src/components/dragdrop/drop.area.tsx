import { PropsWithChildren, useEffect } from "react";

import utils from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop } from "./hooks";

type Props = PropsWithChildren<Field & {
  context: ContextValue;
}>;

function DropArea({ context, children, ...item }: Props) {
  const { rElement, isOver, drop } = useDragDrop({ context, item });
  const className = utils.classNames('droppable-area', {
    'is-over': isOver,
    'is-empty': item.data?.length == 0
  });

  // const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();

  //   const target = e.target as Element;
  //   const el = target.closest('div[data-id]');

  //   if (el) {
  //     const id = el.getAttribute('data-id');
  //     const slateEditor = target.closest('div[data-slate-editor]');
  //     const fieldEditor = target.closest('div[data-field-editor]');

  //     //const found = context.state.dataValue.find(item => item.id == id);
  //     const found = dndHelper.findItemById(item, id, (item) => (item.dataType === 'area' || item.dataType === 'section' || item.dataType === 'block'));

  //     if (found) {

  //       const { item: selectedItem } = context.current.selectedRef || {};

  //       if (selectedItem?.id == found.id && (slateEditor || fieldEditor)) {
  //         return;
  //       } else if (selectedItem?.id == found.id) {
  //         context.current.selectedRef = null;
  //         context.dispatch({ type: ActionType.UNSELECT_ITEM, });
  //         return;
  //       }

  //       context.current.selectedRef = { item: {...found}, el };
  //       context.dispatch({type: ActionType.SELECT_ITEM});
  //     }
  //   }
  // };

  useEffect(() => {
    drop(rElement);
  }, [rElement.current]);

  return (
    <div ref={rElement} id={`${item.id}`} className={className}>
      {children}
    </div>
  )
}

export default DropArea;