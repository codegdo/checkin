import React from 'react';
import { util } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { Control } from '../control';
import { EditorContext } from './editor.context';
import { ItemData } from './editor.type';

interface EditorRenderProps extends ItemData { }

export function EditorRender({ data = [] }: EditorRenderProps) {
  const { dataObject, dataRef, onChange, onClick } = useWrapperContext(EditorContext);

  const renderData = (data: ItemData[] = []) => {
    return data.map(({ id, name = '', type, dataType, data: nestedData }) => {
      if (dataType === 'panel') {
        return (
          <div key={id}>
            {renderData(nestedData)}
          </div>
        );
      } else if (dataType === 'control') {
        const { value } = util.getSetObjectValue(dataObject, name);
        const controlValue = dataRef[name] ?? value;

        return (
          <Control
            key={id}
            id={id}
            name={name}
            type={type}
            value={controlValue}
            onChange={onChange}
            onClick={onClick}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {renderData(data)}
    </>
  );
}