import { useRef } from 'react';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field } from '../types';
import { useItemSelect } from './hooks';
import { DndContextValue } from './types';

type ItemFieldProps = Field & {
  ctx: DndContextValue;
};

function ItemField({ id, ctx }: ItemFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {isSelect, isEdit, onClick} = useItemSelect(id, ctx);

  return (
    <div data-id={`${id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={onClick} />}
      <label>FIELD</label>
      {isEdit && <ItemEditor onCallback={onClick} />}
    </div>
  )
}

export default ItemField;