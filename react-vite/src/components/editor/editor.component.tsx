import React, { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { DataSource } from './editor.type';
import { KeyValue } from '../input';
import { ActionClickType } from '../../constants';
import { useEditor } from './hooks/use-editor.hook';

export interface EditorProps<T> extends PropsWithChildren {
  title?: string;
  dataSource?: DataSource;
  dataObject: T;
  onChange?: (keyValue: KeyValue) => void;
  onClick?: (actionType: string) => void;
};

export interface EditorContextValue<T> {
  title?: string;
  dataSource: DataSource;
  dataRef: Record<string, string>;
  dataObject: T;
  activeTab: string;
  isReset?: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (keyValue: KeyValue) => void;
  onClick: (actionType: string) => void;
}

export const EditorContext = createContext<EditorContextValue<any>>({} as EditorContextValue<any>);

export function Editor<T>({
  title,
  dataSource = {},
  dataObject,
  children,
  onChange,
  onClick
}: EditorProps<T>) {
  const {
    dataRef,
    activeTab,
    isReset,
    setActiveTab,
    setIsReset,
    handleChange,
    handleClick
  } = useEditor({ dataSource, onChange, onClick });

  const contextValue: EditorContextValue<T> = {
    title,
    dataSource,
    dataObject,
    dataRef,
    activeTab,
    isReset,
    setActiveTab,
    setIsReset,
    onChange: handleChange,
    onClick: handleClick,
  };

  return (
    <div>
      <EditorContext.Provider value={contextValue}>
        {children}
      </EditorContext.Provider>
    </div>
  );
};
