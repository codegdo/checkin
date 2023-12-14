import { useDraggable } from './hooks';
import { useWrapperContext } from '@/hooks';
import DragDropContext from './dragdrop.provider';
import { Editor } from '../editor';

export function DragDropEditor() {
  const context = useWrapperContext(DragDropContext);
  const { clientRect, isEditing } = context.state;
  const { rElement, rPreview } = useDraggable({
    type: 'drag',
    init: isEditing,
    offset: {
      x: clientRect?.right,
      y: clientRect?.top
    }
  });

  return isEditing ? (
    <div ref={rPreview} className="editor">
      <Editor ref={rElement} />
    </div>
  ) : null;
}
