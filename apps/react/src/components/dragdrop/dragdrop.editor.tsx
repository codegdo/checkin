import { useDraggable } from './hooks';
import { useWrapperContext } from '@/hooks';
import DragDropContext from './dragdrop.provider';
import { Editor } from '../editor';
import { dndHelper } from './helpers';

export function DragDropEditor() {
  const context = useWrapperContext(DragDropContext);
  const { isEditing } = context.state;
  const selectedRef = context.current.selectedRef;
  const offset = dndHelper.calculateDisplayOffset(selectedRef);

  const { rElement, rPreview } = useDraggable({
    type: 'drag',
    init: isEditing,
    offset
  });

  return isEditing ? (
    <div ref={rPreview} className="drag-editor">
      <Editor ref={rElement} />
    </div>
  ) : null;
}
