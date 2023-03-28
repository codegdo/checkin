import React, { createContext, FC, PropsWithChildren, useEffect } from 'react';
import { EditorProps } from './editor.component';

export interface EditorContextValue<T> extends EditorProps<T> {}

export const EditorContext = createContext<EditorContextValue<any>>({} as EditorContextValue<any>);
type EditorProviderProps = PropsWithChildren<EditorProps<any>>;

export const EditorProvider:FC<EditorProviderProps> = ({ children, ...props }) => {
  const value = { ...props };

  console.log(value);
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
