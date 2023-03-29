import React from 'react';
import { util } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { Control } from '../control';
import { EditorContext } from './editor.context';
import { ItemData } from './editor.type';

interface EditorRenderProps extends ItemData { }

export function EditorRender({ data = [] }: EditorRenderProps) {
  const { dataObject, dataRef, onChange, onClick } = useWrapperContext(EditorContext);

  return (
    <>
      {data.map(({ id, name = '', type, dataType, data: nestedData }) => {
        let { value } = util.getSetObjectValue(dataObject, name);

        switch (dataType) {
          case 'panel':
            return (
              <div key={id}>
                <EditorRender data={nestedData} />
              </div>
            );
          case 'control':
            return (
              <Control
                key={id}
                id={id}
                name={name}
                type={type}
                value={dataType === 'control' ? (dataRef[name] ?? value) : undefined}
                onChange={onChange}
                onClick={onClick}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}