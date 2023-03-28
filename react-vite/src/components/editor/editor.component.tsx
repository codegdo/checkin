import React, { PropsWithChildren } from 'react';
import { DndItem } from '../dragdrop';
import { EditorProvider } from './editor.context';
import { EditorData } from './editor.type';

export interface EditorProps<T> extends PropsWithChildren {
  data?: EditorData;
  value: T;
  onChange?: () => void;
  onClick?: () => void;
};

export function Editor<T>({ children, ...props }: EditorProps<T>) {
  return (
    <EditorProvider {...props}>
      {children}
    </EditorProvider>
  );
}