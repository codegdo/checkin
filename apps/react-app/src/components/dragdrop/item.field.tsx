
import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field, DndContextValue } from '../types';
import { useDragDrop, useItemSelect } from './hooks';

type ItemFieldProps = Field & {
  ctx: DndContextValue;
};

function ItemField({ ctx, ...item }: ItemFieldProps) {
  const { ref } = useDragDrop({ item, ctx });
  const { isSelect, isEdit, onClick } = useItemSelect(item.id, ctx);

  return (
    <div data-id={`${item.id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={onClick} />}
      <label>FIELD</label>
      {isEdit && <ItemEditor onCallback={onClick} />}
    </div>
  )
}

export default ItemField;