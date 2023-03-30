import React, { PropsWithChildren, MouseEvent } from 'react';
import { ActionClickType } from '../../constants';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.context';

interface EditorFooterProps extends PropsWithChildren {
  className?: string;
}

export function EditorFooter({ className = 'editor-footer', children }: EditorFooterProps) {
  const { onClick: handleActionClick } = useWrapperContext(EditorContext);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleActionClick(ActionClickType.EDITOR_RESET);
  }

  return <footer className={className}>
    <button type='button' onClick={handleClick}>reset</button>
  </footer>
};