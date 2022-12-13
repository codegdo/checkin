import React, { FC, useContext } from 'react';
import { EditorContext } from './editor.context';
import { EditorContextProps } from './editor.type';

export const EditorDesign: FC<any> = (): JSX.Element => {

  const ctx = useContext((EditorContext as Object) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { editor, values, setValues } = ctx;

  return <>design</>
}