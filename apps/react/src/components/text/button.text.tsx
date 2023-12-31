import { MouseEvent } from 'react';
import { Editor } from 'slate';

import { IButtonBlock, SlateEditor } from './types';

type IProps = IButtonBlock & {
  editor: SlateEditor;
}

export function ButtonText({ name, editor }: IProps) {
  const isActive = () => {
    const marks = Editor.marks(editor) || {};

    return (marks as Record<string, unknown>)[name] === true;
  };

  const handleOnMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isActive()) {
      Editor.removeMark(editor, name);
    } else {
      Editor.addMark(editor, name, true);
    }
  }

  return <button type="button" name={name} className={isActive() ? 'active' : ''} onMouseDown={handleOnMouseDown}>{name}</button>;
}