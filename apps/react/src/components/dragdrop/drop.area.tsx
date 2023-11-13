import { PropsWithChildren, useRef } from 'react';

import { DndField, DndActionType, DndContextValue } from './types';
import { useDragDrop } from './hooks';
import { utils } from '@libs/shared-code';

type DropAreaProps = PropsWithChildren<DndField & {
  ctx: DndContextValue;
}>;

function DropArea({ ctx, children, ...item }: DropAreaProps) {
  //const ref = useRef(null);
  const { state, dispatch } = ctx;

  const { ref, drop, isOver } = useDragDrop({ item, ctx });

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const el = target.closest('div[data-id]');

    if (el) {
      const id = el.getAttribute('data-id');
      const item = state.data.find(item => item.id == id);

      if (item) {
        if (state.item?.id == item.id) {
          dispatch({
            type: DndActionType.UNSELECT_ITEM,
            payload: null
          });
          return;
        }

        const updatedItem = { ...item };

        dispatch({
          type: DndActionType.SELECT_ITEM,
          payload: { item: updatedItem }
        });
      }
    }
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.target as Element;
    const el = target.closest('div[data-id]');

    if (el) {
      el.classList.add('is-hover');
    }
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.target as Element;
    const el = target.closest('div[data-id]');

    if (el) {
      el.classList.remove('is-hover');
    }
  };

  const classNames = utils.classNames('drop-area', {
    'is-over': isOver
  });

  drop(ref);

  return (
    <div className={classNames} ref={ref} onClick={handleItemClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{children}</div>
  )
}

export default DropArea;