import React, { FC, PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { editorHelper } from '../../helpers';

import { EditorContextProps, EditorProps } from './editor.type';

export const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider: FC<PropsWithChildren<EditorProps>> = ({ type, values: initialValues, onChange, onClick, children }) => {

  const data = editorHelper.getData(type);
  const [values, setValues] = useState(initialValues);
  const [tab, setTab] = useState('content');

  console.log(data, type);

  return <EditorContext.Provider value={{ values, data, tab, setTab, setValues, onChange, onClick }}>
    {children}
  </EditorContext.Provider>
}