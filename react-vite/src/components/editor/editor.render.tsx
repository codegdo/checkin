import React from 'react';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.context';
import { ItemData } from './editor.type';

interface EditorRenderProps extends ItemData { }

export function EditorRender({ data = [] }: EditorRenderProps) {
  const { value, tab, onChange, onClick } = useWrapperContext(EditorContext);

  return (
    <>
      {data.map((item) => {
        const { id, name, dataType, data: nestedData } = item;

        switch (dataType) {
          case 'panel':
            return (
              <div key={id}>
                <EditorRender data={nestedData} />
              </div>
            );
          case 'control':
            return <div key={id}>{name}</div>;
          default:
            return null;
        }
      })}
    </>
  );
}