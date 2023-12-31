import { MouseEvent } from 'react';
import { Editor } from 'slate';

import { IMarkButton, SlateEditor } from './types';

type IProps = IMarkButton & {
  editor: SlateEditor;
}

export function MarkButton({ name, editor, format }: IProps) {
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