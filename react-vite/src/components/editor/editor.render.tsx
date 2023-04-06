import React from 'react';
import { util } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { Control } from '../control';
import { EditorContext } from './editor.context';
import { ItemData } from './editor.type';

interface EditorRenderProps extends ItemData { }

export function EditorRender({ data = [] }: EditorRenderProps) {
  const { dataObject, dataRef, isReset, onChange: handleDataChange, onClick: handleActionClick } = useWrapperContext(EditorContext);

  const renderData = (items: ItemData[] = []) => {
    return items.map(({ id, name = '', type, dataType, data: nestedData }) => {
      if (dataType === 'panel') {
        return (
          <div key={id}>
            {renderData(nestedData)}
          </div>
        );
      } else if (dataType === 'control') {
        if (!(name in dataRef) || isReset) {
          const value = util.getObjectValue(name, dataObject) ?? '';
          dataRef[name] = value;
        }

        const controlValue = dataRef[name];

        return (
          <Control
            key={id}
            id={id}
            name={name}
            type={type}
            value={controlValue}
            isReset={isReset}
            onChange={handleDataChange}
            onClick={handleActionClick}
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



