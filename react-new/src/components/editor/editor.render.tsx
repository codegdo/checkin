import React, { FC, useContext } from 'react';
import { EditorContent } from './editor.content';
import { EditorContext } from './editor.context';
import { EditorDesign } from './editor.design';
import { EditorSetting } from './editor.setting';
import { EditorContextProps } from './editor.type';

export const Render: FC<any> = ({ children }): JSX.Element => {

  const ctx = useContext((EditorContext as Object) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { data, values, tab, setTab, setValues } = ctx;
  const { content, design, setting } = data;

  switch (tab) {
    case 'content': return <EditorContent data={content} setTab={setTab} setValues={setValues} />;
    case 'design': return <EditorDesign data={design} setTab={setTab} setValues={setValues} />;
    case 'setting': return <EditorSetting data={setting} setTab={setTab} setValues={setValues} />;
    default: return <>{children}</>;
  }

}