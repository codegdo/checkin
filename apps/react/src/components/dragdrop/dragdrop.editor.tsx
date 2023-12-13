import { useEffect } from 'react';
import { useDraggable } from './hooks';
import { useWrapperContext } from '@/hooks';
import DragDropContext from './dragdrop.provider';

interface IProps { }

export function DragDropEditor(props: IProps) {
  const context = useWrapperContext(DragDropContext);
  const { ref, previewRef, drag, drop, preview } = useDraggable({ type: 'panel' });

  useEffect(() => {
    if (context.state.isEditing) {
      drag(ref);
      drop(preview(previewRef));
    }
  }, [context.state.isEditing]);

  return context.state.isEditing ? (
    <div ref={previewRef} style={{ position: 'fixed' }}>
      <div ref={ref} className="editor-title">
        Editor
      </div>
    </div>
  ) : null;
}
