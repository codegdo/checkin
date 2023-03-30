import React, { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { util } from '../../helpers';
import { KeyValue } from '../input';
import { EditorProps } from './editor.component';
import { DataSource } from './editor.type';

export interface EditorContextValue<T> {
  dataSource: DataSource;
  dataRef: Record<string, string>;
  dataObject: T;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  onDataChange: (keyValue: KeyValue) => void;
  onActionClick: (actionType: string) => void;
}

export const EditorContext = createContext<EditorContextValue<any>>({} as EditorContextValue<any>);

type EditorProviderProps<T> = PropsWithChildren<EditorProps<T>>;

export function EditorProvider<T>({
  dataSource = {},
  dataObject,
  children,
  onDataChange,
  onActionClick
}: EditorProviderProps<T>) {
  const [activeTab, setActiveTab] = useState('');
  const { current: dataRef } = useRef<Record<string, string>>({});

  const handleDataChange = ({ key, value }: KeyValue) => {
    dataRef[key] = value;

    const {updatedData} = util.getSetObjectValue(dataObject, key, value);
    
    onDataChange?.(updatedData);
    console.log('DATA REF', dataRef);
    console.log('UPDATED DATA', updatedData);
  };

  const handleActionClick = () => { };

  const contextValue: EditorContextValue<T> = {
    dataSource,
    dataRef,
    dataObject,
    activeTab,
    setActiveTab,
    onDataChange: handleDataChange,
    onActionClick: handleActionClick,

  };

  useEffect(() => {
    const defaultTab = Object.keys(dataSource)[0] || '';
    setActiveTab(defaultTab);
  }, [dataSource]);

  return (
    <div>
      <EditorContext.Provider value={contextValue}>
        {children}
      </EditorContext.Provider>
    </div>
  );
};