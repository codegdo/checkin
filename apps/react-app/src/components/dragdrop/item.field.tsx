import { utils } from '@libs/shared-code';

import ItemMenu from './item.menu';
import ItemEditor from './item.editor';
import { Field, DndContextValue } from '../types';
import { useDragDrop, useDragDropSelect } from './hooks';

type ItemFieldProps = Field & {
  ctx: DndContextValue;
};

function ItemField({ ctx, ...item }: ItemFieldProps) {
  const { ref, isDragging, isOver } = useDragDrop({ item, ctx });
  const { isSelect, isEdit, onClick } = useDragDropSelect(item.id, ctx);

  const classNames = utils.classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver
  });

  return (
    <div className={classNames} data-id={`${item.id}`} ref={ref}>
      {isSelect && <ItemMenu onCallback={onClick} />}
      <label>{`${item.name} ${item.id}`}</label>
      {isEdit && <ItemEditor onCallback={onClick} />}
    </div>
  )
}

export default ItemField;