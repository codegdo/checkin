import React from 'react';
import { useWrapperContext } from '../../hooks';
import { DataSource } from './editor.type';

import { EditorContext } from './editor.component';
import { EditorRender } from './editor.render';

export function EditorContent() {
  const { dataSource = {}, activeTab } = useWrapperContext(EditorContext);
  const data = dataSource[activeTab as keyof DataSource];

  return (
    <div className='editor-content'>
      <EditorRender data={data} />
    </div>
  );

}