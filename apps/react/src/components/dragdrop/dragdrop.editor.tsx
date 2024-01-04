import { useDraggable } from './hooks';
import { useDragDropContext } from './dragdrop.provider';
import { Editor } from '../editor';
import { dndHelper } from './helpers';

function DragDropEditor() {
  const context = useDragDropContext();
  const { isEditing } = context.state;
  const { item, target, callback } = context.current?.selectedItem || {};
  const offset = dndHelper.calculateDisplayOffset(target);

  const { rElement, rPreview } = useDraggable({
    type: 'drag',
    init: isEditing,
    offset
  });

  return isEditing ? (
    <div ref={rPreview} className="dragdrop-editor">
      <Editor ref={rElement} data={item} onChange={callback?.onChange} />
    </div>
  ) : null;
}

export default DragDropEditor;