import React, { PropsWithChildren, MouseEvent } from 'react';
import { ActionClickType } from '../../constants';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.context';

interface EditorHeaderProps extends PropsWithChildren {
  className?: string;
}

export const EditorHeader = React.forwardRef<HTMLElement, EditorHeaderProps>(({ className = 'editor-header', children }, ref) => {
  const { title, onClick: handleActionClick } = useWrapperContext(EditorContext);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleActionClick(ActionClickType.EDITOR_CLOSE);
  }

  return <header ref={ref} className={className}>
    <span>{title}</span>
    <button type='button' onClick={handleClick}>close</button>
  </header>
});