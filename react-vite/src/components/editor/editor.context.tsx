import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { EditorProps } from './editor.component';

export interface EditorContextValue<T> extends EditorProps<T> {
  tab: string,
  setTab: React.Dispatch<React.SetStateAction<string>>
}

export const EditorContext = createContext<EditorContextValue<any>>({} as EditorContextValue<any>);

type EditorProviderProps<T> = PropsWithChildren<EditorProps<T>>;

export function EditorProvider<T>({ data = {}, children, ...rest }: EditorProviderProps<T>) {

  const [tab, setTab] = useState('');
  const contextValue: EditorContextValue<T> = { data, tab, setTab, ...rest };

  useEffect(() => {
    const defaultTab = Object.keys(data)[0] || '';
    setTab(defaultTab);
  }, [data]);

  return (
    <div>
      <EditorContext.Provider value={contextValue}>
        {children}
      </EditorContext.Provider>
    </div>
  );
};