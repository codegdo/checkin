import React, { MouseEvent } from 'react';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.component';

export function EditorTab() {
  const { dataSource = {}, dataRef, activeTab, setActiveTab } = useWrapperContext(EditorContext);

  const handleClick = (key: string) => {
    setActiveTab(key);
    console.log('CLICK', dataRef);
  }

  const handleTabClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return <div onClick={handleTabClick}>
    {Object.keys(dataSource).map((key) => {
      return <button key={key} name={key} type='button' onClick={() => handleClick(key)}>{key}</button>
    })}
  </div>
}