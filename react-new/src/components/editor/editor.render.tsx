import React, { FC, useContext } from 'react';
import { EditorContent } from './editor.content';
import { EditorContext } from './editor.context';
import { EditorDesign } from './editor.design';
import { EditorSetting } from './editor.setting';
import { EditorContextProps } from './editor.type';

export const Render: FC = (): JSX.Element => {

  const ctx = useContext((EditorContext as Object) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { tab, data } = ctx;

  return <>
    {
      (tab == 'content') && <EditorContent data={data.content} />
    }
    {
      (tab == 'design') && <EditorDesign />
    }
    {
      (tab == 'setting') && <EditorSetting />
    }
  </>
}