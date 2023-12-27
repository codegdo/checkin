import { MouseEvent } from 'react';
import { BaseEditor, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

interface IProps {
  editor: BaseEditor & ReactEditor;
  format: string;
  icon?: string;
}

export function ButtonMark({ editor, format }: IProps) {
  const isActive = () => {
    const marks = Editor.marks(editor) || {};

    return (marks as Record<string, unknown>)[format] === true;
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isActive()) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }

    // Ensure you're getting the updated marks after the operation
    Editor.marks(editor);
  };

  return <button type="button" className={isActive() ? 'active' : ''} onClick={handleClick}>mark</button>;
}
