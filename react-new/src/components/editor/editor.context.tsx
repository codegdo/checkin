import React, { FC, PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState, useRef } from 'react';
import { editorHelper } from '../../helpers';

import { EditorContextProps, EditorProps } from './editor.type';

export const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider: FC<PropsWithChildren<EditorProps>> = ({ type, values, children, onChange, onClick }) => {

  const data = editorHelper.getData(type);
  const [tab, setTab] = useState('content');

  console.log('EDITOR CONTEXT VALUES', values);

  return <EditorContext.Provider value={{ data, values, tab, setTab, onChange, onClick }}>
    {children}
  </EditorContext.Provider>
}