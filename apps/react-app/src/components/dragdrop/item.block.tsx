import React, { PropsWithChildren, useRef, useState } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';
import { useItemSelect } from './hooks';
import { DndActionType, DndContextValue } from './types';

type ItemBlockProps = PropsWithChildren<Field & {
  ctx: DndContextValue;
}>;

function ItemBlock({ id, ctx, children }: ItemBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { state, dispatch } = ctx;
  const { item, isSelecting, isEditing } = state || {};

  console.log('CTX', ctx);

  const match = item?.id == id;
  const isSelect = match ? isSelecting ?? false : false;
  const isEdit = match ? isEditing ?? false : false;

  const handleClick = (name: keyof typeof DndActionType) => {
    switch (name) {
      case DndActionType.OPEN_EDITING_ITEM:
        dispatch({
          type: name,
          payload: null
        });
        break;
      case DndActionType.CLOSE_EDITING_ITEM:
        dispatch({
          type: name,
          payload: null
        });
        break;
      default:
    }
  }

  return (
    <div data-id={`${id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={handleClick} />}
      {children}
      {isEdit && <ItemEditor onCallback={handleClick} />}
    </div>
  )
}

export default ItemBlock;