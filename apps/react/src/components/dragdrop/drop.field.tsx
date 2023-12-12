import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { classNames } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDrop, useOnClick } from "./hooks";
import DropMenu from "./drop.menu";
import DropEditor from "./drop.editor";
import { useMemo } from 'react';

interface IProps extends Field {
  context: ContextValue;
}

function DropField({ context, ...item }: IProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const { ref, isDragging, isOver, drag, drop } = useDragDrop({ context, item });
  const { isSelecting, isEditing, handleClick } = useOnClick(context, item);

  const className = classNames('drop-item', {
    'is-dragging': isDragging,
    'is-over': isOver,
  });

  drag(drop(ref));

  return (
    <div data-id={`${item.id}`} ref={ref} className={className}>
      {isSelecting && <DropMenu onClick={handleClick} />}

      <Slate editor={editor} initialValue={[{ type: 'paragraph', children: [{ text: item.title }] }]}>
        <Editable placeholder="Enter some plain text..." />
      </Slate>

      {isEditing && <DropEditor onClick={handleClick} />}
    </div>
  )
}

export default DropField;