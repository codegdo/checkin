import { utils } from '@libs/shared-code';

import DropMenu from './drop.menu';
import DropEditor from './drop.editor';
import { DndField, DndContextValue } from './types';
import { useDragDrop, useDragDropSelect } from './hooks';

type DropFieldProps = DndField & {
  ctx: DndContextValue;
};

function DropField({ ctx, ...item }: DropFieldProps) {
  const { ref, drag, drop, isDragging, isOver } = useDragDrop({ item, ctx });
  const { isSelect, isEdit, onClick } = useDragDropSelect(item.id, ctx);

  const classNames = utils.classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver
  });

  drag(drop(ref));

  return (
    <div className={classNames} data-id={`${item.id}`} ref={ref}>
      {isSelect && <DropMenu onCallback={onClick} />}
      <label>{`${item.name} ${item.id}`}</label>
      {isEdit && <DropEditor onCallback={onClick} />}
    </div>
  )
}

export default DropField;