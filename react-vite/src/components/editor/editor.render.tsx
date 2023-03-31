import React from 'react';
import { util } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { Control } from '../control';
import { EditorContext } from './editor.context';
import { ItemData } from './editor.type';

interface EditorRenderProps extends ItemData { }

export function EditorRender({ data = [] }: EditorRenderProps) {
  const { dataObject, dataRef, initialRef, isReset, onChange: handleDataChange, onClick: handleActionClick } = useWrapperContext(EditorContext);

  const renderData = (data: ItemData[] = []) => {
    return data.map(({ id, name = '', type, dataType, data: nestedData }) => {
      if (dataType === 'panel') {
        return (
          <div key={id}>
            {renderData(nestedData)}
          </div>
        );
      } else if (dataType === 'control') {

        let controlValue = '';
        const value = util.getObjectValue(dataObject, name) ?? '';

        if (!initialRef.hasOwnProperty(name)) {
          initialRef[name] = value;
        }

        if (isReset) {
          controlValue = initialRef[name];
          //util.getSetObjectValue(dataObject, name, initialRef[name]);
        } else {
          controlValue = value;
          dataRef[name] = controlValue
        }

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