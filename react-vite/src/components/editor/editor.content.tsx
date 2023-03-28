import React from 'react';
import { useWrapperContext } from '../../hooks';
import { EditorData } from './editor.type';

import { EditorContext } from './editor.context';
import { EditorRender } from './editor.render';

export function EditorContent() {
  const { data = {}, tab } = useWrapperContext(EditorContext);
  const tabData = data[tab as keyof EditorData];

  return <EditorRender data={tabData} />

}