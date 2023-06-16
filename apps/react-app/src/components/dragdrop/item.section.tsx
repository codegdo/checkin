import { PropsWithChildren, useRef } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';
import { useItemSelect } from './hooks';
import { DndContextValue } from './types';

type ItemSectionProps = PropsWithChildren<Field & {
  ctx: DndContextValue;
}>;

function ItemSection({ id, ctx, children }: ItemSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {isSelect, isEdit, onClick} = useItemSelect(id, ctx);

  return (
    <div data-id={`${id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={onClick} />}
      {children}
      {isEdit && <ItemEditor onCallback={onClick} />}
    </div>
  )
}

export default ItemSection;