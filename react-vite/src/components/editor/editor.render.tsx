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
        const { value } = util.getSetObjectValue(dataObject, name);

        if (!initialRef.hasOwnProperty(name)) {
          initialRef[name] = value;
        }

        if (isReset) {
          const { value: resetValue } = util.getSetObjectValue(dataObject, name, initialRef[name] || '');


          controlValue = initialRef[name] || '';


          console.log('AAAAAA', controlValue);
        } else {
          controlValue = dataRef[name] ?? value;
        }

        // const { value } = util.getSetObjectValue(dataObject, name);

        // if (!initialRef.hasOwnProperty(name)) {
        //   initialRef[name] = value;
        // }

        // let controlValue = isReset ? (initialRef[name] || '') : (dataRef[name] ?? value);


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