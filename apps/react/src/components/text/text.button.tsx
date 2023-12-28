import { MouseEvent } from 'react';
import { BaseEditor, Editor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

interface IProps {
  name: 'mark' | 'block';
  editor: BaseEditor & ReactEditor & HistoryEditor;
  format: string;
  icon?: string;
}

export function TextButton({ name, editor, format }: IProps) {
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

  return <button type="button" name={name} className={isActive() ? 'active' : ''} onMouseDown={handleOnMouseDown}>mark</button>;
}