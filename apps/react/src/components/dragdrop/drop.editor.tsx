import React from 'react';
import { ActionType } from './reducers';
import { Field } from './types';

export interface KeyValue {
  key: string;
  value: any;
}

interface IProps {
  field: Field;
  onClick?: (name: keyof typeof ActionType) => void;
  onChange?: (keyValue: KeyValue) => void;
}

function DropEditor({ field, onClick, onChange }: IProps) {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as Element;
    const clickedElement = target.closest('button');

    if (clickedElement) {
      const name = clickedElement.getAttribute('name') as keyof typeof ActionType;
      onClick && onClick(name);
    }
  };

  const handleChange = (keyValue: KeyValue) => {
    onChange?.(keyValue);
  };

  return (
    <div data-field-editor>
      <div onClick={handleClick}>
        <button type="button" name={ActionType.CLOSE_EDITING}>Close</button>
      </div>
      <div>
        <input value={field?.title || ''} onChange={(event) => handleChange({key: 'title', value: event.target.value})} />
      </div>
    </div>
  )
}

export default DropEditor;