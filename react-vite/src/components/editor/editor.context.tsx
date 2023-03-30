import React, { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ActionClickType } from '../../constants';
import { util } from '../../helpers';
import { KeyValue } from '../input';
import { EditorProps } from './editor.component';
import { DataSource } from './editor.type';

export interface EditorContextValue<T> {
  title?: string;
  dataSource: DataSource;
  dataRef: Record<string, string>;
  dataObject: T;
  initialRef: Record<string, string>;
  activeTab: string;
  isReset?: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (keyValue: KeyValue) => void;
  onClick: (name: string) => void;
}

export const EditorContext = createContext<EditorContextValue<any>>({} as EditorContextValue<any>);

type EditorProviderProps<T> = PropsWithChildren<EditorProps<T>>;

export function EditorProvider<T>({
  title,
  dataSource = {},
  dataObject,
  children,
  onChange: handleDataChange,
  onClick: handleActionClick
}: EditorProviderProps<T>) {
  const [activeTab, setActiveTab] = useState('');
  const [isReset, setIsReset] = useState(false);
  let { current: dataRef } = useRef<Record<string, string>>({});
  let { current: initialRef } = useRef<Record<string, string>>({});

  useEffect(() => {
    const defaultTab = Object.keys(dataSource)[0] || '';
    setActiveTab(defaultTab);
  }, [dataSource]);

  useEffect(() => {
    if (isReset) {
      dataRef = {};
      console.log('RESET INITIAL REF', initialRef, dataObject);
    }
    return () => setIsReset(false);
  }, [isReset]);

  const handleChange = ({ key, value }: KeyValue) => {
    dataRef[key] = value;

    const { updatedData } = util.getSetObjectValue(dataObject, key, value);

    handleDataChange?.(updatedData);
  };

  const handleClick = (actionType: string) => {
    if (actionType === ActionClickType.EDITOR_RESET) {

      setIsReset(true);
    }
    handleActionClick?.(actionType);
  };

  const contextValue: EditorContextValue<T> = {
    title,
    dataSource,
    dataRef,
    dataObject,
    initialRef,
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