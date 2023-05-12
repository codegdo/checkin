import React, { MouseEvent } from 'react';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.component';
import { Control } from '../control';

export function EditorTab() {
  const { dataSource = {}, activeTab, setActiveTab } = useWrapperContext(EditorContext);

  const handleTabClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return <div className='editor-tab' onClick={handleTabClick}>
    <Control name="tabs" type="tab" data={Object.keys(dataSource)} value={activeTab} onClick={setActiveTab} />
  </div>
}