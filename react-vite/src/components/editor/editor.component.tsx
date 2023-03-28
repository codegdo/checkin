import React, { FC, PropsWithChildren } from 'react';
import { EditorProvider} from './editor.context';

export interface EditorData {
  content?: any[];
  design?: any[];
  setting?: any[];
}

type EditorProps<T> = PropsWithChildren<{
  data?: EditorData;
  value?: T;
  onChange?: () => void;
  onClick?: () => void;
}>;

export function Editor<T>({ children, ...props }: EditorProps<T>): JSX.Element {
  return (
    <EditorProvider {...props}>
      {children}
    </EditorProvider>
  );
}