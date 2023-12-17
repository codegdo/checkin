import { useDraggable } from './hooks';
import { useWrapperContext } from '@/hooks';
import DragDropContext from './dragdrop.provider';
import { Editor } from '../editor';
import { dndHelper } from './helpers';

export function DragDropEditor() {
  const context = useWrapperContext(DragDropContext);
  const { isEditing } = context.state;
  const {item, target, callback} = context.current?.selectedItem || {};
  const offset = dndHelper.calculateDisplayOffset(target);

  const { rElement, rPreview } = useDraggable({
    type: 'drag',
    init: isEditing,
    offset
  });


  return isEditing ? (
    <div ref={rPreview} className="drag-editor">
      <Editor ref={rElement} data={item} onChange={callback?.onChange} />
    </div>
  ) : null;
}
