import { useDragDropContext } from './dragdrop.provider';
import { Editor } from '../editor';
import { dndHelper } from './helpers';

function DragDropEditor() {
  const context = useDragDropContext();
  const { isEditing } = context.state;
  const { item, target, callback } = context.current?.selectedItem || {};
  const offset = dndHelper.calculateDisplayOffset(target);

  return isEditing ? <Editor data={item} onChange={callback?.onChange} options={{ offset }} /> : null;
}

export default DragDropEditor;