import React, { FC, useContext } from 'react';
import { EditorContext } from './editor.context';
import { EditorContextProps } from './editor.type';

export const EditorSetting: FC<any> = (): JSX.Element => {

  const ctx = useContext((EditorContext) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { data, values, setValues } = ctx;

  return <>setting</>
}