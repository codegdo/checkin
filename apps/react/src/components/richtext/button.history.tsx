import { MouseEvent } from 'react';

import { IButtonMark, SlateEditor } from './types';

type IProps = IButtonMark & {
  editor: SlateEditor;
}

export function ButtonHistory({ name, editor }: IProps) {


  const handleOnMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if(e.currentTarget.name === 'undo') {
        editor.undo;
    } else {
        editor.redo;
    }
    
  }

  return (
    <button 
      type="button" 
      name={name} 
      className={''} 
      onMouseDown={handleOnMouseDown}
    >
      {name}
    </button>
  );
}