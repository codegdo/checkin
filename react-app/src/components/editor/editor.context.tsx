import React, { FC, PropsWithChildren, createContext, useCallback, useEffect, useReducer, useState, useRef } from 'react';
import { editorHelper } from '../../helpers';

import { EditorContextProps, EditorProps } from './editor.type';

export const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider: FC<PropsWithChildren<EditorProps>> = ({ values: dataValues, children, onChange, onClick }) => {

  const { editor, values } = editorHelper.getEditor(dataValues);
  const [tab, setTab] = useState('content');

  console.log('EDITOR CONTEXT VALUES', values);

  return <EditorContext.Provider value={{ editor, values, tab, setTab, onChange, onClick }}>
    {children}
  </EditorContext.Provider>
}