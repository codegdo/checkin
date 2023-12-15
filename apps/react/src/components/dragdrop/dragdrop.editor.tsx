import { useDraggable } from './hooks';
import { useWrapperContext } from '@/hooks';
import DragDropContext from './dragdrop.provider';
import { Editor } from '../editor';
import { dndHelper } from './helpers';

export function DragDropEditor() {
  const context = useWrapperContext(DragDropContext);
  const { clientRect, isEditing } = context.state;
  const offset = dndHelper.calculateDisplayOffset(clientRect);

  const { rElement, rPreview } = useDraggable({
    type: 'drag',
    init: isEditing,
    offset
  });

  return isEditing ? (
    <div ref={rPreview} className="editor">
      <Editor ref={rElement} />
    </div>
  ) : null;
}
