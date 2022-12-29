import React, { FC, useContext } from 'react';
import { EditorContent } from './editor.content';
import { EditorContext } from './editor.context';
import { EditorDesign } from './editor.design';
import { EditorSetting } from './editor.setting';
import { EditorContextProps } from './editor.type';

export const EditorRender: FC<any> = ({ children }): JSX.Element => {

  const ctx = useContext((EditorContext as Object) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { tab } = ctx;

  switch (tab) {
    case 'content': return <EditorContent />;
    case 'design': return <EditorDesign />;
    case 'setting': return <EditorSetting />;
    default: return <>{children}</>;
  }

}