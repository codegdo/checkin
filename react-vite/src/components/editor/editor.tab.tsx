import React from 'react';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.context';

export const EditorTab = () => {
  const { data = {} } = useWrapperContext(EditorContext);
  console.log('EDITOR TAB', data);
  return <>
    {Object.keys(data).map((key) => {
      return <span key={key}>
        <button name={key} type='button'>{key}</button>
      </span>
    })}
  </>
}