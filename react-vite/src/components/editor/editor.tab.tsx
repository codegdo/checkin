import React, { MouseEvent } from 'react';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.context';

export function EditorTab() {
  const { data = {}, tab, setTab } = useWrapperContext(EditorContext);

  const handleClick = (key: string) => {
    setTab(key);
  }

  const handleTabClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return <div onClick={handleTabClick}>
    {Object.keys(data).map((key) => {
      return <button key={key} name={key} type='button' onClick={() => handleClick(key)}>{key}</button>
    })}
  </div>
}