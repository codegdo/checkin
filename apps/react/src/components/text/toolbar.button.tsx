import { MouseEvent } from 'react';
import { Editor } from 'slate';

import { BlockButton, SlateEditor, MarkButton } from './types';

type IProps = MarkButton & BlockButton & {
  editor: SlateEditor;
}

export function ToolbarButton({ name, editor, format }: IProps) {
  const isActive = () => {
    const marks = Editor.marks(editor) || {};

    return (marks as Record<string, unknown>)[format] === true;
  };

  const handleOnMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isActive()) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }

  return <button type="button" name={name} className={isActive() ? 'active' : ''} onMouseDown={handleOnMouseDown}>{format}</button>;
}