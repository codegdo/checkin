import { useDraggable } from './hooks';
import { useWrapperContext } from '@/hooks';
import DragDropContext from './dragdrop.provider';
import { Editor } from '../editor';
import { dndHelper } from './helpers';

export function DragDropEditor() {
  const context = useWrapperContext(DragDropContext);
  const { isEditing } = context.state;
  const selectedElement = context.current.elementRef[`${context.state.selectedItem?.id}`];
  const offset = dndHelper.calculateDisplayOffset(selectedElement);

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
