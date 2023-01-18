import React, { FC } from 'react';
import { useWrapperContext } from '../../hooks';
import { EditorContext } from './editor.context';
import { EditorContextProps } from './editor.type';

export const EditorSetting: FC<any> = (): JSX.Element => {

  const ctx = useWrapperContext((EditorContext) as React.Context<EditorContextProps>);

  if (!ctx) {
    throw new Error();
  }

  const { editor, values, setValues } = ctx;

  return <>setting</>
}