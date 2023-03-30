import React, { PropsWithChildren } from 'react';
import { DndItem } from '../dragdrop';
import { EditorProvider } from './editor.context';
import { DataSource } from './editor.type';

export interface EditorProps<T> extends PropsWithChildren {
  dataSource?: DataSource;
  dataObject: T;
  onDataChange?: (updatedData: T) => void;
  onActionClick?: (actionType:string) => void;
};

export function Editor<T>({ children, ...props }: EditorProps<T>) {
  return (
    <EditorProvider<T> {...props}>
      {children}
    </EditorProvider>
  );
}